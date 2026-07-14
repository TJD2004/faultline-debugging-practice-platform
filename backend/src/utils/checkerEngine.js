/**
 * Generic, data-driven checker.
 *
 * Each challenge stores its validation as a JSON array of rules in the
 * `checker_rules` column instead of a hand-written JS function. This means
 * new challenges can be added purely with SQL INSERT statements (e.g. from
 * MySQL Workbench) — no backend code changes required.
 *
 * Rule shape:
 *   {
 *     "type": "must" | "must_not",
 *     "pattern": "<JS regex source, no slashes>",
 *     "flags": "i" | "m" | "im" | "" (optional, default ""),
 *     "error": "<message shown in the terminal on failure>",
 *     "line": <number, gutter line to highlight>
 *   }
 *
 * "must"     → submission FAILS if `pattern` does NOT match the code.
 * "must_not" → submission FAILS if `pattern` DOES match the code.
 *
 * A submission passes only if every rule passes.
 */
function runChecker(code, rules) {
  const errors = [];

  for (const rule of rules) {
    let regex;
    try {
      regex = new RegExp(rule.pattern, rule.flags || "");
    } catch (e) {
      // A malformed rule shouldn't crash the whole request.
      console.error(`Invalid checker regex: ${rule.pattern}`, e.message);
      continue;
    }

    const matched = regex.test(code);
    const failed = rule.type === "must_not" ? matched : !matched;

    if (failed) {
      errors.push({ line: rule.line || 1, msg: rule.error || "Check failed." });
    }
  }

  return { success: errors.length === 0, errors };
}

module.exports = { runChecker };

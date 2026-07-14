/**
 * Evaluates submitted code against `check_rules` (JSON stored in the
 * database). Works for both:
 *   - single-file challenges: evaluateCode(codeString, rules)
 *   - multi-file projects:    evaluateCode({ "path/a.js": "...", ... }, rules)
 *
 * Rule shape:
 *   { type: "requireMatch" | "forbidMatch", pattern, flags?, file?, line?, message }
 *
 * `file` is only meaningful for multi-file targets — it scopes the rule to
 * one file's content. Omit it to test against all files concatenated
 * together (or just the single code string, for classic challenges).
 */
function evaluateCode(target, rules) {
  const isMultiFile = target !== null && typeof target === "object";
  const combined = isMultiFile ? Object.values(target).join("\n") : target;
  const errors = [];
  const list = Array.isArray(rules) ? rules : [];

  for (const rule of list) {
    let regex;
    try {
      regex = new RegExp(rule.pattern, rule.flags || "");
    } catch (err) {
      // A malformed rule shouldn't crash the request — just skip it.
      continue;
    }

    const testAgainst = isMultiFile && rule.file ? target[rule.file] || "" : combined;
    const matched = regex.test(testAgainst);

    if (rule.type === "requireMatch" && !matched) {
      errors.push({ file: rule.file || null, line: rule.line || 1, msg: rule.message });
    } else if (rule.type === "forbidMatch" && matched) {
      errors.push({ file: rule.file || null, line: rule.line || 1, msg: rule.message });
    }
  }

  return { success: errors.length === 0, errors };
}

module.exports = { evaluateCode };

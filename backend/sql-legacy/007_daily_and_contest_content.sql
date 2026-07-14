-- Faultline — 30 new Daily Challenges + 12 new Contests (96 challenges)
-- Every one of these 126 challenges is brand new (zero overlap with the
-- existing Practice pool) and self-tested: each buggy snippet was confirmed
-- to fail its own rule, and each solution confirmed to pass, before this
-- file was generated.
--
-- Contest challenges and daily challenges do NOT show up in Practice while
-- "in use" — challengeController.js already excludes any challenge that's
-- either (a) assigned to a future/today's daily slot, or (b) attached to a
-- contest that hasn't ended yet. The moment that window passes, the
-- challenge automatically appears in Practice — no further action needed.
--
-- HOW TO RUN: MySQL Workbench > File > Open SQL Script > this file > execute.

USE faultline;

-- ============================= 30 DAILY CHALLENGES =============================
-- Challenges themselves:
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-reduce-no-initial', 'Empty cart total crashes checkout', 'JavaScript', 'Easy', 80, 15,
  'total([]) throws instead of returning 0 — checkout crashes whenever the cart is empty.', 'Understand why reduce() needs an explicit initial value.', '[\"Without an initial value, reduce() uses the first array element as the starting point — which doesn\'t exist for an empty array.\",\"Pass 0 as the second argument to reduce().\"]', 'total([]) returns 0.', 'total.js',
  'function total(prices) {\n  return prices.reduce((sum, p) => sum + p);\n}\n\nconsole.log(total([]));', 'function total(prices) {\n  return prices.reduce((sum, p) => sum + p, 0);\n}\n\nconsole.log(total([]));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"reduce\\\\(\\\\(sum,\\\\s*p\\\\)\\\\s*=>\\\\s*sum\\\\s*\\\\+\\\\s*p,\\\\s*0\\\\)\",\"message\":\"TypeError: Reduce of empty array with no initial value\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-default-sort-numeric', 'Leaderboard sorts scores like text, not numbers', 'JavaScript', 'Easy', 80, 15,
  'sortScores([10, 1, 21, 2]) returns [1, 10, 2, 21] instead of numeric order.', 'Understand why Array.sort() defaults to lexicographic (string) comparison.', '[\"sort() converts elements to strings by default, so 10 sorts before 2.\",\"Pass a comparator: (a, b) => a - b.\"]', 'sortScores([10, 1, 21, 2]) returns [1, 2, 10, 21].', 'sortScores.js',
  'function sortScores(scores) {\n  return scores.sort();\n}\n\nconsole.log(sortScores([10, 1, 21, 2]));', 'function sortScores(scores) {\n  return scores.sort((a, b) => a - b);\n}\n\nconsole.log(sortScores([10, 1, 21, 2]));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"sort\\\\(\\\\(a,\\\\s*b\\\\)\\\\s*=>\\\\s*a\\\\s*-\\\\s*b\\\\)\",\"message\":\"[1, 10, 2, 21] — default sort() compares elements as strings.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-object-reference-equality', 'Duplicate-user check never fires', 'JavaScript', 'Easy', 85, 16,
  'isSameUser({id:1}, {id:1}) returns false, even though both represent the same user.', 'Understand why === compares object references, not their contents.', '[\"Two separately-created objects are never === equal, even with identical fields.\",\"Compare the actual id fields instead of the objects themselves.\"]', 'isSameUser({id:1}, {id:1}) returns true.', 'isSameUser.js',
  'function isSameUser(a, b) {\n  return a === b;\n}\n\nconsole.log(isSameUser({id:1}, {id:1}));', 'function isSameUser(a, b) {\n  return a.id === b.id;\n}\n\nconsole.log(isSameUser({id:1}, {id:1}));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"a\\\\.id\\\\s*===\\\\s*b\\\\.id\",\"message\":\"false — comparing two distinct objects with === always fails, even with identical fields.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-find-returns-undefined', 'Looking up a missing user crashes the page', 'JavaScript', 'Medium', 115, 23,
  'getUserName(users, 2) throws \"Cannot read properties of undefined\" when no user has that id.', 'Understand why Array.find() returning undefined needs a guard before you use the result.', '[\"find() returns undefined when nothing matches — it doesn\'t throw.\",\"Check for a missing result before accessing .name.\"]', 'getUserName(users, 2) returns \"Unknown\" instead of throwing.', 'getUserName.js',
  'function getUserName(users, id) {\n  const user = users.find(u => u.id === id);\n  return user.name.toUpperCase();\n}\n\nconsole.log(getUserName([{id:1,name:\"Ava\"}], 2));', 'function getUserName(users, id) {\n  const user = users.find(u => u.id === id);\n  if (!user) return \"Unknown\";\n  return user.name.toUpperCase();\n}\n\nconsole.log(getUserName([{id:1,name:\"Ava\"}], 2));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"if\\\\s*\\\\(!user\\\\)\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'name\')\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'ts-unsafe-type-assertion', 'Greeting crashes despite TypeScript\'s types', 'TypeScript', 'Medium', 120, 24,
  'greet(raw as User) throws at runtime even though TypeScript compiled it with no errors.', 'Understand that `as` type assertions are unchecked — they can lie to the compiler about real, unsafe data.', '[\"`as User` doesn\'t validate anything — it just tells the compiler to trust you.\",\"Add a runtime guard before trusting external/untyped data.\"]', 'Invalid user data is rejected with a clear error before greet() ever runs.', 'greet.ts',
  'interface User { name: string; age: number; }\n\nfunction greet(user: User) {\n  console.log(\"Hello \" + user.name.toUpperCase());\n}\n\nconst raw: any = { name: null, age: 30 };\ngreet(raw as User);', 'interface User { name: string; age: number; }\n\nfunction greet(user: User) {\n  console.log(\"Hello \" + user.name.toUpperCase());\n}\n\nconst raw: any = { name: null, age: 30 };\nif (!raw.name) {\n  throw new Error(\"Invalid user data\");\n}\ngreet(raw as User);', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"if\\\\s*\\\\(!raw\\\\.name\\\\)\",\"message\":\"TypeError: Cannot read properties of null (reading \'toUpperCase\') — `as User` skipped all validation.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'ts-optional-property-unchecked', 'Timeout calculation returns NaN', 'TypeScript', 'Easy', 90, 17,
  'getTimeout({}) returns NaN instead of a sensible default.', 'Understand why an optional property needs a fallback before you use it in arithmetic.', '[\"config.timeout is number | undefined — undefined * 2 is NaN, not an error.\",\"Use the ?? operator to supply a default when timeout is missing.\"]', 'getTimeout({}) returns 0.', 'config.ts',
  'interface Config { timeout?: number; }\n\nfunction getTimeout(config: Config): number {\n  return config.timeout * 2;\n}\n\nconsole.log(getTimeout({}));', 'interface Config { timeout?: number; }\n\nfunction getTimeout(config: Config): number {\n  return (config.timeout ?? 0) * 2;\n}\n\nconsole.log(getTimeout({}));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"config\\\\.timeout\\\\s*\\\\?\\\\?\\\\s*0\",\"message\":\"error TS2532: Object is possibly \'undefined\'.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'ts-non-exhaustive-switch', 'One status value silently returns blank', 'TypeScript', 'Medium', 115, 23,
  'label(Status.Closed) returns an empty string instead of \"Closed\" — no compiler warning caught it.', 'Understand that a switch over an enum isn\'t checked for exhaustiveness by default.', '[\"The switch is missing a case for Status.Closed entirely.\",\"Add the missing case, returning \\\"Closed\\\".\"]', 'label(Status.Closed) returns \"Closed\".', 'label.ts',
  'enum Status { Pending, Active, Closed }\n\nfunction label(status: Status): string {\n  switch (status) {\n    case Status.Pending: return \"Pending\";\n    case Status.Active: return \"Active\";\n  }\n  return \"\";\n}\n\nconsole.log(label(Status.Closed));', 'enum Status { Pending, Active, Closed }\n\nfunction label(status: Status): string {\n  switch (status) {\n    case Status.Pending: return \"Pending\";\n    case Status.Active: return \"Active\";\n    case Status.Closed: return \"Closed\";\n  }\n  return \"\";\n}\n\nconsole.log(label(Status.Closed));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"case\\\\s+Status\\\\.Closed\",\"message\":\"Returns \\\"\\\" for Status.Closed — the switch has no case for it.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-unboundlocal-global', 'Incrementing a counter crashes immediately', 'Python', 'Easy', 85, 16,
  'increment() throws UnboundLocalError the very first time it\'s called.', 'Understand why assigning to a name inside a function makes it local, even if a global of the same name exists.', '[\"counter += 1 makes Python treat counter as a local variable for the whole function.\",\"Declare `global counter` before modifying it.\"]', 'increment() returns 1.', 'counter.py',
  'counter = 0\n\ndef increment():\n    counter += 1\n    return counter\n\nprint(increment())', 'counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n    return counter\n\nprint(increment())', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"global counter\",\"message\":\"UnboundLocalError: local variable \'counter\' referenced before assignment\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-typo-swallowed-by-bare-except', 'Price lookup always returns 0', 'Python', 'Medium', 110, 22,
  'get_price({\"price\": 25}) returns 0 — the real KeyError is being silently swallowed.', 'Understand why a bare except: hides real bugs instead of surfacing them.', '[\"A bare except catches everything, including typos in dictionary keys.\",\"Check the actual key being accessed against the data being passed in.\"]', 'get_price({\"price\": 25}) returns 25.', 'pricing.py',
  'def get_price(item):\n    try:\n        return item[\"proce\"]\n    except:\n        return 0\n\nprint(get_price({\"price\": 25}))', 'def get_price(item):\n    try:\n        return item[\"price\"]\n    except KeyError:\n        return 0\n\nprint(get_price({\"price\": 25}))', 'python',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"item\\\\[\\\"proce\\\"\\\\]\",\"message\":\"Returns 0 — item[\\\"proce\\\"] is a typo for item[\\\"price\\\"], and the bare except hid it.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-float-equality', 'A value that should equal 1.0 doesn\'t', 'Python', 'Medium', 115, 23,
  'is_one(0.1 + 0.1 + 0.1 + 0.7) returns False, even though the math clearly totals 1.0.', 'Understand floating-point imprecision and why exact equality is unreliable for floats.', '[\"0.1 can\'t be represented exactly in binary floating point.\",\"Compare with a small tolerance instead of ==, e.g. abs(x - 1.0) < 1e-9.\"]', 'is_one(0.1 + 0.1 + 0.1 + 0.7) returns True.', 'rounding.py',
  'def is_one(x):\n    return x == 1.0\n\nprint(is_one(0.1 + 0.1 + 0.1 + 0.7))', 'def is_one(x):\n    return abs(x - 1.0) < 1e-9\n\nprint(is_one(0.1 + 0.1 + 0.1 + 0.7))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"abs\\\\(x\\\\s*-\\\\s*1\\\\.0\\\\)\\\\s*<\",\"message\":\"False — floating point rounding means the sum isn\'t exactly 1.0.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-shared-list-reference', 'Changing one grid row changes every row', 'Python', 'Hard', 170, 34,
  'Setting grid[0][0] = 1 changes every row\'s first column, not just row 0.', 'Understand why [[0]*cols]*rows creates multiple references to the same inner list.', '[\"[[0]*cols]*rows repeats the SAME inner list object rows times, not rows separate lists.\",\"Use a list comprehension so each row is created independently.\"]', 'Setting grid[0][0] = 1 only changes row 0.', 'grid.py',
  'def make_grid(rows, cols):\n    return [[0] * cols] * rows\n\ngrid = make_grid(3, 3)\ngrid[0][0] = 1\nprint(grid)', 'def make_grid(rows, cols):\n    return [[0] * cols for _ in range(rows)]\n\ngrid = make_grid(3, 3)\ngrid[0][0] = 1\nprint(grid)', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"for _ in range\\\\(rows\\\\)\",\"message\":\"[[1, 0, 0], [1, 0, 0], [1, 0, 0]] — all three rows are the same list object.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-integer-cache-equality', 'Score comparison passes in testing, fails in production', 'Java', 'Medium', 115, 23,
  'Comparing two Integer objects with == works for small test values but fails for larger real ones.', 'Understand Java\'s Integer cache (-128 to 127) and why == is unreliable for boxed Integer comparison.', '[\"Small Integer values are cached and reused, so == can accidentally work for them.\",\"Use .equals() to compare Integer values reliably at any size.\"]', 'Comparing two Integer(200) objects with .equals() returns true.', 'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        Integer a = 200;\n        Integer b = 200;\n        System.out.println(a == b);\n    }\n}', 'public class Main {\n    public static void main(String[] args) {\n        Integer a = 200;\n        Integer b = 200;\n        System.out.println(a.equals(b));\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"a\\\\.equals\\\\(b\\\\)\",\"message\":\"false — 200 is outside the Integer cache range (-128 to 127), so == compares references.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-shallow-clone-2d-array', 'Modifying a copied grid corrupts the original', 'Java', 'Hard', 165, 33,
  'Changing copy[0][0] also changes grid[0][0] in the original array.', 'Understand why clone() on a 2D array only performs a shallow copy of the outer array.', '[\"clone() copies the outer int[][] but the inner int[] rows are still shared references.\",\"Clone each row individually to get a true deep copy.\"]', 'grid[0][0] stays 1 after copy[0][0] is set to 99.', 'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2},{3,4}};\n        int[][] copy = grid.clone();\n        copy[0][0] = 99;\n        System.out.println(grid[0][0]);\n    }\n}', 'public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2},{3,4}};\n        int[][] copy = new int[grid.length][];\n        for (int i = 0; i < grid.length; i++) {\n            copy[i] = grid[i].clone();\n        }\n        copy[0][0] = 99;\n        System.out.println(grid[0][0]);\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"copy\\\\[i\\\\]\\\\s*=\\\\s*grid\\\\[i\\\\]\\\\.clone\\\\(\\\\)\",\"message\":\"Prints 99 — clone() on a 2D array shares the inner row arrays.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-unintended-static-field', 'Every counter instance shares one number', 'Java', 'Easy', 85, 16,
  'Each Counter instance is supposed to track its own count, but they\'re all sharing the same number.', 'Understand the difference between a static field (shared across all instances) and an instance field.', '[\"static fields belong to the class, not any one object — every instance sees the same value.\",\"Remove `static` so each Counter gets its own independent count.\"]', 'A new Counter() starts at 0, unaffected by other instances.', 'Counter.java',
  'public class Counter {\n    static int count = 0;\n    Counter() { count++; }\n\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = new Counter();\n        System.out.println(a.count);\n    }\n}', 'public class Counter {\n    int count = 0;\n    Counter() { count++; }\n\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = new Counter();\n        System.out.println(a.count);\n    }\n}', 'java',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"static int count\",\"message\":\"Prints 2 — count is shared across every instance instead of tracked per-object.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-signed-unsigned-comparison', 'Negative number compares as \"not less\" than 1', 'C', 'Hard', 160, 32,
  'Comparing -1 to an unsigned 1 says -1 is NOT less than 1.', 'Understand how comparing signed and unsigned integers implicitly converts the signed value.', '[\"When int is compared to unsigned int, the int is converted to unsigned first.\",\"-1 becomes a huge positive number once converted — cast both sides to a wider signed type to compare safely.\"]', 'Prints \"a is less\".', 'main.c',
  '#include <stdio.h>\nint main() {\n    int a = -1;\n    unsigned int b = 1;\n    if (a < b) {\n        printf(\"a is less\\n\");\n    } else {\n        printf(\"a is not less\\n\");\n    }\n    return 0;\n}', '#include <stdio.h>\nint main() {\n    int a = -1;\n    unsigned int b = 1;\n    if ((long)a < (long)b) {\n        printf(\"a is less\\n\");\n    } else {\n        printf(\"a is not less\\n\");\n    }\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\(long\\\\)a\\\\s*<\\\\s*\\\\(long\\\\)b\",\"message\":\"Prints \\\"a is not less\\\" — -1 was implicitly converted to a huge unsigned value.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-switch-fallthrough', 'Selecting Tuesday also prints Wednesday', 'C', 'Easy', 80, 15,
  'Setting day = 2 prints both \"Tuesday\" and \"Wednesday\" instead of just \"Tuesday\".', 'Practice recognizing switch-case fallthrough in C.', '[\"Without break, execution falls through into the next case.\",\"Add break; after each case\'s statements.\"]', 'day = 2 prints only \"Tuesday\".', 'main.c',
  '#include <stdio.h>\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Monday\\n\");\n        case 2:\n            printf(\"Tuesday\\n\");\n        case 3:\n            printf(\"Wednesday\\n\");\n    }\n    return 0;\n}', '#include <stdio.h>\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Monday\\n\");\n            break;\n        case 2:\n            printf(\"Tuesday\\n\");\n            break;\n        case 3:\n            printf(\"Wednesday\\n\");\n            break;\n    }\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"break;\",\"message\":\"Prints both Tuesday and Wednesday — no break statements to stop the fallthrough.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-format-specifier-mismatch', 'Price prints as a garbage integer', 'C', 'Easy', 85, 16,
  'printf(\"Price: %d\", price) prints an unpredictable garbage number instead of 19.99.', 'Understand why printf\'s format specifier must match the actual argument type.', '[\"%d tells printf to read an int from the stack, but price is a double — the bytes are interpreted completely wrong.\",\"Use %f (or %.2f) for a double.\"]', 'Prints \"Price: 19.99\".', 'main.c',
  '#include <stdio.h>\nint main() {\n    double price = 19.99;\n    printf(\"Price: %d\\n\", price);\n    return 0;\n}', '#include <stdio.h>\nint main() {\n    double price = 19.99;\n    printf(\"Price: %.2f\\n\", price);\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"printf\\\\(\\\"Price: %d\",\"message\":\"Prints a garbage number — %d reads a double\'s bytes as if they were an int.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-iterator-invalidation', 'Reading an old iterator after push_back crashes', 'C++', 'Hard', 165, 33,
  'Dereferencing an iterator taken before push_back sometimes crashes, sometimes prints garbage.', 'Understand why push_back can invalidate existing iterators by reallocating the vector\'s buffer.', '[\"push_back may need to grow the vector, which reallocates its internal buffer and invalidates old iterators.\",\"Get the iterator (or value) you need AFTER the mutation, not before.\"]', 'No use of an invalidated iterator — the program behaves predictably.', 'main.cpp',
  '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums = {1,2,3};\n    auto it = nums.begin();\n    nums.push_back(4);\n    cout << *it << endl;\n    return 0;\n}', '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums = {1,2,3};\n    nums.push_back(4);\n    auto it = nums.begin();\n    cout << *it << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"nums\\\\.begin\\\\(\\\\);\\\\s*\\\\n\\\\s*nums\\\\.push_back\",\"message\":\"Undefined behavior — *it dereferences an iterator invalidated by push_back\'s reallocation.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-integer-division-truncation', 'Average prints 3 instead of 3.5', 'C++', 'Easy', 85, 16,
  'average should be 3.5 for sum=7, count=2, but it prints 3.', 'Understand that int / int truncates before the result is ever assigned to a double.', '[\"sum / count is integer division — the fractional part is discarded before the assignment happens.\",\"Cast at least one operand to double before dividing.\"]', 'Prints 3.5.', 'main.cpp',
  '#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 7;\n    int count = 2;\n    double average = sum / count;\n    cout << average << endl;\n    return 0;\n}', '#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 7;\n    int count = 2;\n    double average = (double)sum / count;\n    cout << average << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\(double\\\\)sum\\\\s*/\\\\s*count\",\"message\":\"Prints 3 — sum / count truncates as integer division before the result is stored.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-member-init-order', 'Rectangle area is garbage on construction', 'C++', 'Hard', 170, 34,
  'print() shows a garbage number for area right after constructing a Rectangle.', 'Understand that C++ initializes members in declaration order, not the order listed in the initializer list.', '[\"Members are initialized top-to-bottom based on where they\'re declared in the class body, regardless of initializer-list order.\",\"area is declared before width/height, so it\'s computed using their still-uninitialized garbage values — reorder the declarations.\"]', 'print() shows 20 for a 4x5 rectangle.', 'main.cpp',
  '#include <iostream>\nusing namespace std;\nclass Rectangle {\npublic:\n    Rectangle(int w, int h) : width(w), height(h), area(width * height) {}\n    void print() { cout << area << endl; }\nprivate:\n    int area;\n    int width;\n    int height;\n};\nint main() {\n    Rectangle r(4, 5);\n    r.print();\n    return 0;\n}', '#include <iostream>\nusing namespace std;\nclass Rectangle {\npublic:\n    Rectangle(int w, int h) : width(w), height(h), area(width * height) {}\n    void print() { cout << area << endl; }\nprivate:\n    int width;\n    int height;\n    int area;\n};\nint main() {\n    Rectangle r(4, 5);\n    r.print();\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"int area;\\\\s*\\\\n\\\\s*int width;\",\"message\":\"Prints garbage — area is declared (and thus initialized) before width/height.\",\"line\":8}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-slice-append-aliasing', 'Appending to a sub-slice corrupts the original', 'Go', 'Hard', 165, 33,
  'a is supposed to stay [1 2 3], but after appending to b (a slice of a), a becomes [1 2 99].', 'Understand that slicing doesn\'t copy — append can silently overwrite the original array\'s data.', '[\"b := a[:2] shares a\'s underlying array; appending within capacity overwrites a[2].\",\"Use a three-index slice expression a[:2:2] to force append to allocate a new array.\"]', 'a stays [1 2 3] after appending to b.', 'main.go',
  'package main\nimport \"fmt\"\nfunc main() {\n\ta := []int{1, 2, 3}\n\tb := a[:2]\n\tb = append(b, 99)\n\tfmt.Println(a)\n}', 'package main\nimport \"fmt\"\nfunc main() {\n\ta := []int{1, 2, 3}\n\tb := a[:2:2]\n\tb = append(b, 99)\n\tfmt.Println(a)\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"a\\\\[:2:2\\\\]\",\"message\":\"Prints [1 2 99] — b shares a\'s underlying array, so append overwrote a[2].\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-struct-pass-by-value', 'moveRight doesn\'t actually move the point', 'Go', 'Medium', 115, 23,
  'p.X stays 1 after calling moveRight(p) — it should become 11.', 'Understand that Go passes structs by value, so a function receives (and can only modify) a copy.', '[\"moveRight(p Point) receives a copy — changes inside it never touch the caller\'s struct.\",\"Use a pointer receiver (*Point) so the function can modify the original.\"]', 'p.X becomes 11 after moveRight(&p).', 'main.go',
  'package main\nimport \"fmt\"\ntype Point struct { X, Y int }\nfunc moveRight(p Point) { p.X += 10 }\nfunc main() {\n\tp := Point{X: 1, Y: 2}\n\tmoveRight(p)\n\tfmt.Println(p.X)\n}', 'package main\nimport \"fmt\"\ntype Point struct { X, Y int }\nfunc moveRight(p *Point) { p.X += 10 }\nfunc main() {\n\tp := Point{X: 1, Y: 2}\n\tmoveRight(&p)\n\tfmt.Println(p.X)\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"func moveRight\\\\(p \\\\*Point\\\\)\",\"message\":\"Prints 1 — moveRight received a copy of p, so the original is untouched.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-defer-in-loop', 'Processing many files exhausts open file handles', 'Go', 'Medium', 120, 24,
  'With enough files, processFiles fails with \"too many open files\" — every file stays open until the whole function returns.', 'Understand that defer runs at function return, not at the end of each loop iteration.', '[\"defer f.Close() inside the loop doesn\'t fire until processFiles itself returns — all files stay open simultaneously.\",\"Move the open/defer/work into its own per-file helper function so defer fires each iteration.\"]', 'Each file is closed right after it\'s processed, not all at the end.', 'main.go',
  'package main\nimport (\"fmt\"; \"os\")\nfunc processFiles(names []string) {\n\tfor _, name := range names {\n\t\tf, _ := os.Open(name)\n\t\tdefer f.Close()\n\t\tfmt.Println(\"processing\", name)\n\t}\n}\nfunc main() {\n\tprocessFiles([]string{\"a.txt\", \"b.txt\", \"c.txt\"})\n}', 'package main\nimport (\"fmt\"; \"os\")\nfunc processOne(name string) {\n\tf, _ := os.Open(name)\n\tdefer f.Close()\n\tfmt.Println(\"processing\", name)\n}\nfunc processFiles(names []string) {\n\tfor _, name := range names {\n\t\tprocessOne(name)\n\t}\n}\nfunc main() {\n\tprocessFiles([]string{\"a.txt\", \"b.txt\", \"c.txt\"})\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"func processOne\\\\(\",\"message\":\"too many open files — every file handle stays open until processFiles itself returns.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-like-missing-wildcard', 'Product search finds nothing', 'SQL', 'Easy', 80, 15,
  'Searching for \"Wireless\" returns zero rows, even though \"Wireless Mouse\" is clearly in the table.', 'Understand that LIKE without a wildcard behaves like an exact match.', '[\"\'Wireless\' with no % matches only the exact string \\\"Wireless\\\", not anything containing it.\",\"Add a trailing % to match anything starting with \\\"Wireless\\\".\"]', 'Returns every product whose name starts with \"Wireless\".', 'search.sql',
  'SELECT * FROM products WHERE name LIKE \'Wireless\';', 'SELECT * FROM products WHERE name LIKE \'Wireless%\';', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"products\",\"create\":\"CREATE TABLE products (\\n  id     INT AUTO_INCREMENT PRIMARY KEY,\\n  name   VARCHAR(255) NOT NULL,\\n  price  DECIMAL(10,2) NOT NULL\\n);\",\"columns\":[\"id\",\"name\",\"price\"],\"rows\":[[\"1\",\"Wireless Mouse\",\"19.99\"],[\"2\",\"USB Cable\",\"5.99\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"LIKE\\\\s*\'Wireless%\'\",\"flags\":\"i\",\"message\":\"Empty result set — LIKE \'Wireless\' with no wildcard requires an exact match.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-count-column-skips-null', 'Review count is lower than it should be', 'SQL', 'Medium', 110, 22,
  'COUNT(rating) undercounts the total number of reviews — some reviews have no rating yet.', 'Understand that COUNT(column) skips NULL values, while COUNT(*) counts every row.', '[\"COUNT(rating) only counts rows where rating is NOT NULL.\",\"Use COUNT(*) to count every review row regardless of rating.\"]', 'Returns the true total number of review rows, including unrated ones.', 'review_count.sql',
  'SELECT COUNT(rating) FROM reviews;', 'SELECT COUNT(*) FROM reviews;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"reviews\",\"create\":\"CREATE TABLE reviews (\\n  id           INT AUTO_INCREMENT PRIMARY KEY,\\n  product_id   INT NOT NULL,\\n  rating       INT NULL\\n);\",\"columns\":[\"id\",\"product_id\",\"rating\"],\"rows\":[[\"1\",\"1\",\"5\"],[\"2\",\"1\",\"NULL\"],[\"3\",\"2\",\"4\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"COUNT\\\\(rating\\\\)\",\"flags\":\"i\",\"message\":\"Returns 2 instead of 3 — COUNT(rating) skips the row where rating is NULL.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-not-equal-null', 'Shipped-orders report is unexpectedly empty', 'SQL', 'Easy', 85, 16,
  'Filtering for orders where shipped_at != NULL returns zero rows, even for orders that are clearly shipped.', 'Understand why NULL requires IS NOT NULL instead of != NULL.', '[\"Comparing anything to NULL with != (or =) always evaluates to unknown, never true.\",\"Use IS NOT NULL to correctly test for a non-NULL value.\"]', 'Returns every order where shipped_at is set.', 'shipped_orders.sql',
  'SELECT * FROM orders WHERE shipped_at != NULL;', 'SELECT * FROM orders WHERE shipped_at IS NOT NULL;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id            INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id   INT NOT NULL,\\n  shipped_at    TIMESTAMP NULL\\n);\",\"columns\":[\"id\",\"customer_id\",\"shipped_at\"],\"rows\":[[\"1\",\"9\",\"2026-06-01 10:00\"],[\"2\",\"11\",\"NULL\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"shipped_at\\\\s*!=\\\\s*NULL\",\"flags\":\"i\",\"message\":\"Empty result set — != NULL always evaluates to unknown, never true.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'docker-exec-form-no-var-substitution', 'Server receives the literal text \"$PORT\"', 'Docker', 'Medium', 120, 24,
  'The server logs show it received the argument \"$PORT\" literally, instead of the actual port number.', 'Understand that exec-form CMD doesn\'t invoke a shell, so environment variables aren\'t substituted.', '[\"CMD [\\\"...\\\"] (exec form) runs the program directly, with no shell to expand $PORT.\",\"Use shell form (CMD without brackets) so /bin/sh -c expands the variable.\"]', 'The server receives the actual port number, e.g. 3000.', 'Dockerfile',
  'FROM node:20-slim\nWORKDIR /app\nCOPY . .\nRUN npm install\nENV PORT=3000\nCMD [\"node\", \"server.js\", \"--port\", \"$PORT\"]', 'FROM node:20-slim\nWORKDIR /app\nCOPY . .\nRUN npm install\nENV PORT=3000\nCMD node server.js --port $PORT', 'docker',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"CMD \\\\[\\\"node\\\", \\\"server\\\\.js\\\", \\\"--port\\\", \\\"\\\\$PORT\\\"\\\\]\",\"message\":\"Server receives the literal string \\\"$PORT\\\" — exec-form CMD never invokes a shell to expand it.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'docker-multistage-copy-typo', 'Production image build fails: stage not found', 'Docker', 'Medium', 125, 25,
  'docker build fails with \"stage not found\" on the final COPY --from instruction.', 'Understand how multi-stage builds reference earlier stages by their declared name.', '[\"The first stage is named `builder` (FROM ... AS builder).\",\"COPY --from=build has a typo — it should say --from=builder.\"]', 'The build completes, copying compiled output from the builder stage.', 'Dockerfile',
  'FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]', 'FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]', 'docker',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"--from=build(?!er)\",\"message\":\"failed to solve: stage not found: build\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'git-force-push-overwrite', 'A teammate\'s push disappeared after yours', 'Git', 'Medium', 120, 24,
  'After you force-pushed, a teammate\'s commits from minutes earlier are just gone from the remote branch.', 'Understand why plain --force can silently destroy commits you haven\'t even seen yet.', '[\"--force overwrites the remote branch unconditionally, no matter what\'s changed there since you last fetched.\",\"--force-with-lease refuses to push if the remote has commits your local copy doesn\'t know about.\"]', 'The push is safely rejected if the remote has new commits you haven\'t fetched.', 'terminal',
  'git push --force origin main', 'git push --force-with-lease origin main', 'git',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"--force(?!-with-lease)\\\\b\",\"message\":\"Your teammate\'s commits were silently overwritten on the remote.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'git-unresolved-merge-markers', 'The build broke right after merging a feature branch', 'Git', 'Easy', 90, 17,
  'Right after merging feature/greeting, the app fails to even parse — there\'s a syntax error in greet.js.', 'Recognize unresolved merge conflict markers accidentally left in committed code.', '[\"<<<<<<<, =======, and >>>>>>> are conflict markers Git inserts — they must be resolved and removed before committing.\",\"Pick the correct version of the code and delete every marker line.\"]', 'greet.js contains valid JavaScript with no conflict markers.', 'greet.js',
  'function greet(name) {\n<<<<<<< HEAD\n  return \"Hi \" + name;\n=======\n  return \"Hello, \" + name + \"!\";\n>>>>>>> feature/greeting\n}', 'function greet(name) {\n  return \"Hello, \" + name + \"!\";\n}', 'git',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"<<<<<<<\",\"message\":\"SyntaxError: Unexpected token \'<\' — unresolved merge conflict markers were committed.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

-- Daily schedule: today + next 29 days, one per day, 30 days covered with
-- zero further queries needed (re-run this block again after ~4 weeks to
-- extend the schedule further).
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 0 DAY), 1.50 FROM challenges WHERE slug = 'js-reduce-no-initial'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1.50 FROM challenges WHERE slug = 'js-default-sort-numeric'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1.50 FROM challenges WHERE slug = 'js-object-reference-equality'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1.50 FROM challenges WHERE slug = 'js-find-returns-undefined'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 4 DAY), 1.50 FROM challenges WHERE slug = 'ts-unsafe-type-assertion'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 1.50 FROM challenges WHERE slug = 'ts-optional-property-unchecked'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 6 DAY), 1.50 FROM challenges WHERE slug = 'ts-non-exhaustive-switch'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 7 DAY), 1.50 FROM challenges WHERE slug = 'py-unboundlocal-global'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 8 DAY), 1.50 FROM challenges WHERE slug = 'py-typo-swallowed-by-bare-except'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 9 DAY), 1.50 FROM challenges WHERE slug = 'py-float-equality'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 1.50 FROM challenges WHERE slug = 'py-shared-list-reference'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 11 DAY), 1.50 FROM challenges WHERE slug = 'java-integer-cache-equality'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 12 DAY), 1.50 FROM challenges WHERE slug = 'java-shallow-clone-2d-array'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 13 DAY), 1.50 FROM challenges WHERE slug = 'java-unintended-static-field'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 1.50 FROM challenges WHERE slug = 'c-signed-unsigned-comparison'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 15 DAY), 1.50 FROM challenges WHERE slug = 'c-switch-fallthrough'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 16 DAY), 1.50 FROM challenges WHERE slug = 'c-format-specifier-mismatch'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 17 DAY), 1.50 FROM challenges WHERE slug = 'cpp-iterator-invalidation'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 18 DAY), 1.50 FROM challenges WHERE slug = 'cpp-integer-division-truncation'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 19 DAY), 1.50 FROM challenges WHERE slug = 'cpp-member-init-order'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 1.50 FROM challenges WHERE slug = 'go-slice-append-aliasing'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 21 DAY), 1.50 FROM challenges WHERE slug = 'go-struct-pass-by-value'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 22 DAY), 1.50 FROM challenges WHERE slug = 'go-defer-in-loop'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 23 DAY), 1.50 FROM challenges WHERE slug = 'sql-like-missing-wildcard'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 24 DAY), 1.50 FROM challenges WHERE slug = 'sql-count-column-skips-null'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 25 DAY), 1.50 FROM challenges WHERE slug = 'sql-not-equal-null'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 26 DAY), 1.50 FROM challenges WHERE slug = 'docker-exec-form-no-var-substitution'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 27 DAY), 1.50 FROM challenges WHERE slug = 'docker-multistage-copy-typo'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 28 DAY), 1.50 FROM challenges WHERE slug = 'git-force-push-overwrite'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 29 DAY), 1.50 FROM challenges WHERE slug = 'git-unresolved-merge-markers'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

-- ============================= 12 CONTESTS (96 challenges) =============================
-- Each contest: exactly 8 challenges, 1 hour long, starting at 7:00 PM on
-- consecutive Saturdays beginning with the very next Saturday from whenever
-- this script is run. All 12 are scheduled up front — about 3 months of
-- contests running automatically with zero manual scheduling.

-- --- Sprint #1: First Strike ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-js-array-includes-case', 'Array Includes Case', 'JavaScript', 'Easy', 80, 15,
  'hasTag([\'Sale\',\'New\'], \'sale\') returns false even though a matching tag exists (case difference aside).', 'Understand why Array.includes() is case-sensitive and exact-match only.', '[\"includes() does a strict === comparison — \'Sale\' !== \'sale\'.\",\"Normalize both sides to the same case before comparing.\"]', 'hasTag([\'Sale\',\'New\'], \'sale\') returns true.', 'search.js',
  'function hasTag(tags, target) {\n  return tags.includes(target);\n}\n\nconsole.log(hasTag([\"Sale\",\"New\"], \"sale\"));', 'function hasTag(tags, target) {\n  return tags.some(t => t.toLowerCase() === target.toLowerCase());\n}\n\nconsole.log(hasTag([\"Sale\",\"New\"], \"sale\"));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"toLowerCase\\\\(\\\\)\\\\s*===\\\\s*target\\\\.toLowerCase\\\\(\\\\)\",\"message\":\"false — includes() is case-sensitive.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-py-list-copy-alias', 'List Copy Alias', 'Python', 'Easy', 85, 16,
  'Clearing a temporary copy of the cart also wipes the original cart.', 'Understand that assignment (=) creates an alias, not a copy, for lists.', '[\"temp = cart makes temp point to the SAME list object.\",\"Use cart.copy() or cart[:] to make a real independent copy.\"]', 'Clearing temp leaves the original cart untouched.', 'cart.py',
  'cart = [\"apple\", \"banana\"]\ntemp = cart\ntemp.clear()\nprint(cart)', 'cart = [\"apple\", \"banana\"]\ntemp = cart.copy()\ntemp.clear()\nprint(cart)', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"cart\\\\.copy\\\\(\\\\)\",\"message\":\"[] — clearing temp also cleared cart, since both names pointed to the same list.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-sql-order-by-alias', 'Order By Alias', 'SQL', 'Easy', 85, 16,
  'Ordering the customer report by total spend errors out instead of returning sorted rows.', 'Understand that some SQL engines don\'t allow ORDER BY to reference a SELECT-list alias inside an aggregate expression written differently — here it\'s a typo\'d column name.', '[\"The ORDER BY clause references a column name that doesn\'t exist in the result set.\",\"Order by the exact alias defined in SELECT: total_spent.\"]', 'Rows ordered by total_spent, descending.', 'top_customers.sql',
  'SELECT customer_id, SUM(amount) AS total_spent\nFROM orders\nGROUP BY customer_id\nORDER BY total_spend DESC;', 'SELECT customer_id, SUM(amount) AS total_spent\nFROM orders\nGROUP BY customer_id\nORDER BY total_spent DESC;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id INT NOT NULL,\\n  amount DECIMAL(10,2) NOT NULL\\n);\",\"columns\":[\"id\",\"customer_id\",\"amount\"],\"rows\":[[\"1\",\"1\",\"50.00\"],[\"2\",\"2\",\"120.00\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"ORDER\\\\s+BY\\\\s+total_spend\\\\b\",\"flags\":\"i\",\"message\":\"ERROR 1054 (42S22): Unknown column \'total_spend\' in \'order clause\'\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-go-string-concat-loop', 'String Concat Loop', 'Go', 'Medium', 120, 24,
  'Building a large report string is extremely slow for big inputs, even though the logic is correct.', 'Understand why repeated += string concatenation in a loop is O(n²), and how strings.Builder fixes it.', '[\"Each += on a string allocates an entirely new string — repeated in a loop, this is quadratic.\",\"Use a strings.Builder and WriteString() to accumulate efficiently.\"]', 'Report builds in linear time using strings.Builder.', 'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc buildReport(lines []string) string {\n\treport := \"\"\n\tfor _, l := range lines {\n\t\treport += l + \"\\n\"\n\t}\n\treturn report\n}\n\nfunc main() {\n\tfmt.Print(buildReport([]string{\"a\", \"b\", \"c\"}))\n}', 'package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc buildReport(lines []string) string {\n\tvar sb strings.Builder\n\tfor _, l := range lines {\n\t\tsb.WriteString(l)\n\t\tsb.WriteString(\"\\n\")\n\t}\n\treturn sb.String()\n}\n\nfunc main() {\n\tfmt.Print(buildReport([]string{\"a\", \"b\", \"c\"}))\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"strings\\\\.Builder\",\"message\":\"Report generation takes seconds instead of milliseconds on large inputs — O(n²) string concatenation.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-java-string-builder-loop', 'String Builder Loop', 'Java', 'Medium', 120, 24,
  'Generating a CSV export of 100,000 rows takes minutes instead of seconds.', 'Understand why repeated String concatenation in a loop is expensive, and how StringBuilder fixes it.', '[\"Every += on a String creates a brand-new String object — Strings are immutable in Java.\",\"Use a StringBuilder and .append() to build the result efficiently.\"]', 'CSV builds efficiently regardless of row count.', 'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        String csv = \"\";\n        for (int i = 0; i < 100000; i++) {\n            csv += i + \",\";\n        }\n        System.out.println(csv.length());\n    }\n}', 'public class Main {\n    public static void main(String[] args) {\n        StringBuilder csv = new StringBuilder();\n        for (int i = 0; i < 100000; i++) {\n            csv.append(i).append(\",\");\n        }\n        System.out.println(csv.length());\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"StringBuilder\",\"message\":\"Export takes minutes — repeated String += allocates a new object on every iteration.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-php-array-key-exists', 'Array Key Exists', 'PHP', 'Medium', 115, 23,
  'A setting explicitly set to false is treated as if it were never set at all.', 'Understand the difference between isset() (false for null/missing) and array_key_exists() (true if the key exists, even if its value is null or false).', '[\"isset($settings[\'darkMode\']) returns false when the value IS false — that\'s a false negative here.\",\"Use array_key_exists() to check presence regardless of the stored value.\"]', 'getSetting($settings, \'darkMode\') correctly reports the key exists, with value false.', 'settings.php',
  '<?php\nfunction getSetting($settings, $key) {\n    if (isset($settings[$key])) {\n        return $settings[$key];\n    }\n    return \"not set\";\n}\n\n$settings = [\"darkMode\" => false];\necho getSetting($settings, \"darkMode\");', '<?php\nfunction getSetting($settings, $key) {\n    if (array_key_exists($key, $settings)) {\n        return $settings[$key];\n    }\n    return \"not set\";\n}\n\n$settings = [\"darkMode\" => false];\necho getSetting($settings, \"darkMode\");', 'php',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"array_key_exists\\\\(\",\"message\":\"Prints \\\"not set\\\" even though darkMode is explicitly set to false.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-cpp-integer-division', 'Integer Division', 'C++', 'Hard', 175, 34,
  'average(7, 2) returns 3 instead of 3.5.', 'Understand why dividing two ints in C++ truncates instead of producing a decimal result.', '[\"int / int always performs integer division, discarding the remainder.\",\"Cast at least one operand to double before dividing.\"]', 'average(7, 2) returns 3.5.', 'main.cpp',
  '#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b) {\n    return (a + b) / 2;\n}\n\nint main() {\n    cout << average(7, 2) << endl;\n    return 0;\n}', '#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b) {\n    return (a + b) / 2.0;\n}\n\nint main() {\n    cout << average(7, 2) << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\/\\\\s*2\\\\.0\",\"message\":\"Prints 3 instead of 3.5 — integer division truncates the result before it\'s ever stored as a double.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c1-py-generator-exhaustion', 'Generator Exhaustion', 'Python', 'Hard', 180, 36,
  'The second call to sum() on the same generator returns 0, even though the first call worked fine.', 'Understand that generators are single-use — once iterated, they\'re exhausted.', '[\"A generator can only be consumed once; a second pass over it yields nothing.\",\"Convert it to a list first if you need to use the values more than once.\"]', 'Both the total and the count are computed correctly from the same source data.', 'stats.py',
  'def analyze(numbers):\n    total = sum(numbers)\n    count = sum(1 for _ in numbers)\n    return total, count\n\ngen = (n for n in [1, 2, 3])\nprint(analyze(gen))', 'def analyze(numbers):\n    numbers = list(numbers)\n    total = sum(numbers)\n    count = sum(1 for _ in numbers)\n    return total, count\n\ngen = (n for n in [1, 2, 3])\nprint(analyze(gen))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"numbers\\\\s*=\\\\s*list\\\\(numbers\\\\)\",\"message\":\"(6, 0) — the generator was fully consumed by sum(numbers), leaving nothing for the second pass.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-01-first-strike', 'Sprint #1: First Strike', 'Eight bugs, sixty minutes. Fastest correct total wins.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 0 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 0 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 1
FROM challenges WHERE slug = 'c1-js-array-includes-case'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 2
FROM challenges WHERE slug = 'c1-py-list-copy-alias'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 3
FROM challenges WHERE slug = 'c1-sql-order-by-alias'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 4
FROM challenges WHERE slug = 'c1-go-string-concat-loop'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 5
FROM challenges WHERE slug = 'c1-java-string-builder-loop'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 6
FROM challenges WHERE slug = 'c1-php-array-key-exists'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 7
FROM challenges WHERE slug = 'c1-cpp-integer-division'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-01-first-strike'), id, 8
FROM challenges WHERE slug = 'c1-py-generator-exhaustion'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #2: Null and Void ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-js-optional-chaining', 'Optional Chaining', 'JavaScript', 'Easy', 80, 15,
  'Rendering a user with no address set throws instead of showing a blank field.', 'Understand how optional chaining avoids errors on missing nested properties.', '[\"user.address.city throws when address itself is undefined.\",\"Use user.address?.city to short-circuit safely.\"]', 'Prints \"City: Unknown\" instead of throwing.', 'profile.js',
  'function city(user) {\n  return \"City: \" + user.address.city;\n}\n\nconsole.log(city({ name: \"Ava\" }));', 'function city(user) {\n  return \"City: \" + (user.address?.city ?? \"Unknown\");\n}\n\nconsole.log(city({ name: \"Ava\" }));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"user\\\\.address\\\\?\\\\.city\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'city\')\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-java-optional-get', 'Optional Get', 'Java', 'Easy', 85, 16,
  'Looking up a missing user throws NoSuchElementException instead of returning a default.', 'Understand that Optional.get() throws when empty — use orElse() for a safe default.', '[\"find() returns Optional.empty() when nothing matches; .get() on that throws.\",\"Use .orElse(\\\"Guest\\\") to supply a fallback.\"]', 'Prints \"Guest\" for a missing user instead of throwing.', 'Main.java',
  'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Ava\", \"Ben\");\n        Optional<String> found = names.stream().filter(n -> n.equals(\"Cleo\")).findFirst();\n        System.out.println(found.get());\n    }\n}', 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Ava\", \"Ben\");\n        Optional<String> found = names.stream().filter(n -> n.equals(\"Cleo\")).findFirst();\n        System.out.println(found.orElse(\"Guest\"));\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"orElse\\\\(\",\"message\":\"Exception in thread \\\"main\\\" java.util.NoSuchElementException: No value present\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-sql-coalesce-missing', 'Coalesce Missing', 'SQL', 'Easy', 85, 16,
  'The customer report shows blank cells for anyone with no phone number, instead of \"N/A\".', 'Understand how COALESCE() supplies a fallback for NULL values.', '[\"A NULL phone column displays as empty, not as any specific text.\",\"Wrap the column in COALESCE(phone, \'N/A\').\"]', 'Every row shows either a real phone number or the text \'N/A\'.', 'report.sql',
  'SELECT name, phone FROM customers;', 'SELECT name, COALESCE(phone, \'N/A\') AS phone FROM customers;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"customers\",\"create\":\"CREATE TABLE customers (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  name VARCHAR(255) NOT NULL,\\n  phone VARCHAR(30) NULL\\n);\",\"columns\":[\"id\",\"name\",\"phone\"],\"rows\":[[\"1\",\"Ava K\",\"555-0101\"],[\"2\",\"Ben R\",\"NULL\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"COALESCE\\\\(\\\\s*phone\",\"flags\":\"i\",\"message\":\"Ben R\'s phone column shows blank instead of a readable placeholder.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-py-none-default-mutation', 'None Default Mutation', 'Python', 'Medium', 120, 24,
  'get_children(node) crashes with AttributeError when a leaf node has no children set.', 'Understand why checking for None explicitly (rather than assuming a list) avoids this crash.', '[\"node.children can legitimately be None for a leaf.\",\"Return an empty list instead of None when there are no children.\"]', 'get_children(leaf) returns [] instead of throwing.', 'tree.py',
  'class Node:\n    def __init__(self, value, children=None):\n        self.value = value\n        self.children = children\n\ndef get_children(node):\n    return [c.value for c in node.children]\n\nleaf = Node(\"x\")\nprint(get_children(leaf))', 'class Node:\n    def __init__(self, value, children=None):\n        self.value = value\n        self.children = children if children is not None else []\n\ndef get_children(node):\n    return [c.value for c in node.children]\n\nleaf = Node(\"x\")\nprint(get_children(leaf))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"children\\\\s+if\\\\s+children\\\\s+is\\\\s+not\\\\s+None\\\\s+else\\\\s+\\\\[\\\\]\",\"message\":\"AttributeError: \'NoneType\' object is not iterable\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-go-nil-pointer-deref', 'Nil Pointer Deref', 'Go', 'Medium', 125, 25,
  'Printing a user\'s email panics with a nil pointer dereference for users created without one.', 'Understand why dereferencing a nil pointer panics, and how to guard against it.', '[\"Email is *string — it can be nil, meaning no address was set.\",\"Check for nil before dereferencing with *user.Email.\"]', 'Prints \"no email\" instead of panicking.', 'main.go',
  'package main\n\nimport \"fmt\"\n\ntype User struct {\n\tName  string\n\tEmail *string\n}\n\nfunc main() {\n\tu := User{Name: \"Ava\"}\n\tfmt.Println(*u.Email)\n}', 'package main\n\nimport \"fmt\"\n\ntype User struct {\n\tName  string\n\tEmail *string\n}\n\nfunc main() {\n\tu := User{Name: \"Ava\"}\n\tif u.Email == nil {\n\t\tfmt.Println(\"no email\")\n\t} else {\n\t\tfmt.Println(*u.Email)\n\t}\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"u\\\\.Email\\\\s*==\\\\s*nil\",\"message\":\"panic: runtime error: invalid memory address or nil pointer dereference\",\"line\":11}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-ts-null-assertion-abuse', 'Null Assertion Abuse', 'TypeScript', 'Medium', 120, 24,
  'getEmail(user) crashes at runtime even though TypeScript\'s compiler accepted the code with no errors.', 'Understand that the ! non-null assertion silences the compiler but does nothing at runtime.', '[\"user.email! tells TypeScript \\\"trust me, this isn\'t null\\\" — it adds no actual runtime check.\",\"Add a real runtime guard instead of asserting non-null.\"]', 'getEmail({ name: \'Ava\' }) returns \"unknown\" instead of throwing.', 'user.ts',
  'interface User { name: string; email?: string; }\n\nfunction getEmail(user: User): string {\n  return user.email!.toLowerCase();\n}\n\nconsole.log(getEmail({ name: \"Ava\" }));', 'interface User { name: string; email?: string; }\n\nfunction getEmail(user: User): string {\n  return user.email ? user.email.toLowerCase() : \"unknown\";\n}\n\nconsole.log(getEmail({ name: \"Ava\" }));', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"user\\\\.email!\\\\.toLowerCase\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'toLowerCase\') — the ! assertion was a lie.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-java-null-equals-crash', 'Null Equals Crash', 'Java', 'Hard', 175, 34,
  'Checking a role against \"admin\" throws NullPointerException whenever role hasn\'t been assigned yet.', 'Understand why calling .equals() ON a possibly-null variable is unsafe, and how flipping the comparison fixes it.', '[\"role.equals(\\\"admin\\\") throws if role itself is null.\",\"\\\"admin\\\".equals(role) is null-safe, since the literal is never null.\"]', 'Returns false for a null role instead of throwing.', 'Main.java',
  'public class Main {\n    static boolean isAdmin(String role) {\n        return role.equals(\"admin\");\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAdmin(null));\n    }\n}', 'public class Main {\n    static boolean isAdmin(String role) {\n        return \"admin\".equals(role);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAdmin(null));\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\"admin\\\"\\\\.equals\\\\(role\\\\)\",\"message\":\"Exception in thread \\\"main\\\" java.lang.NullPointerException\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c2-cpp-nullptr-deref', 'Nullptr Deref', 'C++', 'Hard', 180, 36,
  'The program crashes with a segmentation fault whenever findUser() doesn\'t find a match.', 'Understand why dereferencing a nullptr crashes, and how to guard against it before use.', '[\"findUser can legitimately return nullptr when nothing matches.\",\"Check the pointer against nullptr before dereferencing it.\"]', 'Prints \"not found\" instead of crashing.', 'main.cpp',
  '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nstruct User { const char* name; };\n\nUser* findUser(User* users, int n, const char* target) {\n    for (int i = 0; i < n; i++) {\n        if (strcmp(users[i].name, target) == 0) return &users[i];\n    }\n    return nullptr;\n}\n\nint main() {\n    User users[] = { {\"Ava\"} };\n    User* found = findUser(users, 1, \"Ben\");\n    cout << found->name << endl;\n    return 0;\n}', '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nstruct User { const char* name; };\n\nUser* findUser(User* users, int n, const char* target) {\n    for (int i = 0; i < n; i++) {\n        if (strcmp(users[i].name, target) == 0) return &users[i];\n    }\n    return nullptr;\n}\n\nint main() {\n    User users[] = { {\"Ava\"} };\n    User* found = findUser(users, 1, \"Ben\");\n    if (found == nullptr) {\n        cout << \"not found\" << endl;\n    } else {\n        cout << found->name << endl;\n    }\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"found\\\\s*==\\\\s*nullptr\",\"message\":\"Segmentation fault (core dumped)\",\"line\":17}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-02-null-and-void', 'Sprint #2: Null and Void', 'A contest built entirely around null, undefined, and empty-state bugs.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 7 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 7 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 1
FROM challenges WHERE slug = 'c2-js-optional-chaining'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 2
FROM challenges WHERE slug = 'c2-java-optional-get'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 3
FROM challenges WHERE slug = 'c2-sql-coalesce-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 4
FROM challenges WHERE slug = 'c2-py-none-default-mutation'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 5
FROM challenges WHERE slug = 'c2-go-nil-pointer-deref'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 6
FROM challenges WHERE slug = 'c2-ts-null-assertion-abuse'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 7
FROM challenges WHERE slug = 'c2-java-null-equals-crash'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-02-null-and-void'), id, 8
FROM challenges WHERE slug = 'c2-cpp-nullptr-deref'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #3: Async Abyss ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-js-promise-all-order', 'Promise All Order', 'JavaScript', 'Easy', 80, 15,
  'Fetching three users one-by-one with await in a loop takes 3x longer than necessary.', 'Understand how Promise.all() runs independent async operations concurrently instead of sequentially.', '[\"Awaiting inside a for loop runs each request only after the previous one finishes.\",\"Start all the promises first, then await them together with Promise.all().\"]', 'All three users are fetched concurrently, not one after another.', 'fetchAll.js',
  'async function fetchAll(ids, fetchUser) {\n  const users = [];\n  for (const id of ids) {\n    users.push(await fetchUser(id));\n  }\n  return users;\n}', 'async function fetchAll(ids, fetchUser) {\n  return Promise.all(ids.map(id => fetchUser(id)));\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"Promise\\\\.all\\\\(\",\"message\":\"Fetching 3 users takes 3x longer than needed — each await blocks the next request from starting.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-py-async-forgot-await', 'Async Forgot Await', 'Python', 'Easy', 85, 16,
  'get_status() returns a coroutine object printed as text, instead of the actual status string.', 'Understand that calling an async function without await just creates a coroutine object — it doesn\'t run it.', '[\"fetch_status(url) without await returns an un-awaited coroutine, not a result.\",\"Add await before the call inside the async function.\"]', 'Prints the actual status string, not a coroutine repr.', 'fetcher.py',
  'import asyncio\n\nasync def fetch_status(url):\n    return \"ok\"\n\nasync def get_status(url):\n    result = fetch_status(url)\n    return result\n\nprint(asyncio.run(get_status(\"x\")))', 'import asyncio\n\nasync def fetch_status(url):\n    return \"ok\"\n\nasync def get_status(url):\n    result = await fetch_status(url)\n    return result\n\nprint(asyncio.run(get_status(\"x\")))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"await\\\\s+fetch_status\\\\(url\\\\)\",\"message\":\"<coroutine object fetch_status at 0x...> — the coroutine was never awaited.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-sql-transaction-missing', 'Transaction Missing', 'SQL', 'Easy', 85, 16,
  'If the second UPDATE fails, money disappears — debited from one account but never credited to the other.', 'Understand why a multi-step money transfer needs to be wrapped in a transaction.', '[\"Without a transaction, each statement commits independently — a failure midway leaves inconsistent data.\",\"Wrap both UPDATEs in START TRANSACTION / COMMIT.\"]', 'Both updates succeed together, or neither does.', 'transfer.sql',
  'UPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;', 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"accounts\",\"create\":\"CREATE TABLE accounts (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  balance DECIMAL(10,2) NOT NULL\\n);\",\"columns\":[\"id\",\"balance\"],\"rows\":[[\"1\",\"500.00\"],[\"2\",\"100.00\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"START\\\\s+TRANSACTION\",\"flags\":\"i\",\"message\":\"A failure between the two UPDATEs would leave $100 debited with nowhere credited.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-go-goroutine-no-wait', 'Goroutine No Wait', 'Go', 'Medium', 120, 24,
  'main() exits before any of the launched goroutines print anything.', 'Understand that main() doesn\'t wait for goroutines to finish unless you explicitly tell it to.', '[\"Launching a goroutine returns immediately — main() keeps going without waiting.\",\"Use a sync.WaitGroup to block until all goroutines finish.\"]', 'All 3 goroutines print before the program exits.', 'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 0; i < 3; i++ {\n\t\tgo fmt.Println(i)\n\t}\n}', 'package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func(i int) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}(i)\n\t}\n\twg.Wait()\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"sync\\\\.WaitGroup\",\"message\":\"Program exits immediately, printing nothing — main() never waits for the goroutines.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-js-race-condition-counter', 'Race Condition Counter', 'JavaScript', 'Medium', 125, 25,
  'Clicking \"Save\" rapidly sometimes saves an outdated count, overwriting a more recent one.', 'Understand a request race condition: an older, slower response can resolve after a newer one.', '[\"If a slow earlier request resolves after a faster later one, its stale data overwrites the fresh data.\",\"Track a request id/token and ignore responses that aren\'t the latest one issued.\"]', 'Only the response for the most recently issued request is applied.', 'counter.js',
  'let latestCount = 0;\n\nasync function save(count, saveToServer) {\n  const result = await saveToServer(count);\n  latestCount = result;\n}', 'let latestCount = 0;\nlet requestId = 0;\n\nasync function save(count, saveToServer) {\n  const myId = ++requestId;\n  const result = await saveToServer(count);\n  if (myId === requestId) {\n    latestCount = result;\n  }\n}', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"myId\\\\s*===\\\\s*requestId\",\"message\":\"An older, slower save() call overwrote a newer value that had already resolved.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-py-threading-shared-state', 'Threading Shared State', 'Python', 'Medium', 130, 26,
  'Running 100 threads that each increment a shared counter by 1 often produces a final count less than 100.', 'Understand why incrementing a shared variable across threads isn\'t atomic without a lock.', '[\"counter += 1 is actually read-modify-write — two threads can interleave and lose an update.\",\"Protect the increment with a threading.Lock().\"]', 'The final counter value is always exactly 100.', 'counter.py',
  'import threading\n\ncounter = 0\n\ndef increment():\n    global counter\n    counter += 1\n\nthreads = [threading.Thread(target=increment) for _ in range(100)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter)', 'import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef increment():\n    global counter\n    with lock:\n        counter += 1\n\nthreads = [threading.Thread(target=increment) for _ in range(100)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter)', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"threading\\\\.Lock\\\\(\\\\)\",\"message\":\"Final count is 97 (or similar) instead of 100 — a data race lost some increments.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-go-channel-deadlock-select', 'Channel Deadlock Select', 'Go', 'Hard', 175, 34,
  'The worker never receives a shutdown signal because the main goroutine sends it after the worker has already stopped listening.', 'Understand a timing bug where a signal is sent before anyone is ready to receive it, and how a done channel with select fixes it.', '[\"Sending on an unbuffered channel with no active receiver blocks forever if the worker already exited its loop.\",\"A select with a done channel lets the worker check for shutdown alongside normal work.\"]', 'The worker cleanly stops when signaled, with no deadlock.', 'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc worker(jobs <-chan int) {\n\tfor j := range jobs {\n\t\tfmt.Println(\"processing\", j)\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int)\n\tdone := make(chan bool)\n\tgo worker(jobs)\n\tjobs <- 1\n\tclose(jobs)\n\tdone <- true\n}', 'package main\n\nimport \"fmt\"\n\nfunc worker(jobs <-chan int, done chan bool) {\n\tfor {\n\t\tselect {\n\t\tcase j, ok := <-jobs:\n\t\t\tif !ok {\n\t\t\t\tdone <- true\n\t\t\t\treturn\n\t\t\t}\n\t\t\tfmt.Println(\"processing\", j)\n\t\t}\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int)\n\tdone := make(chan bool)\n\tgo worker(jobs, done)\n\tjobs <- 1\n\tclose(jobs)\n\t<-done\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"select\\\\s*\\\\{\",\"message\":\"fatal error: all goroutines are asleep - deadlock! — done is sent to with nothing listening.\",\"line\":16}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c3-js-stale-closure-state', 'Stale Closure State', 'JavaScript', 'Hard', 180, 36,
  'A repeating timer always logs the count from when it started, never the updated value.', 'Understand how a setInterval callback closes over the variable\'s value at creation time, not its later updates.', '[\"The callback captures `count` from the outer scope, but reassigning count elsewhere doesn\'t update what setInterval already captured if it\'s re-declared each time incorrectly.\",\"Use a mutable reference (like an object or a functional update) so the interval always reads the latest value.\"]', 'Each tick logs the current, up-to-date count.', 'timer.js',
  'function startTimer() {\n  let count = 0;\n  setInterval(() => {\n    console.log(count);\n  }, 1000);\n\n  document.getElementById(\"inc\").onclick = () => {\n    let count = count + 1; // shadows outer count, never updates it\n  };\n}', 'function startTimer() {\n  let count = 0;\n  setInterval(() => {\n    console.log(count);\n  }, 1000);\n\n  document.getElementById(\"inc\").onclick = () => {\n    count = count + 1;\n  };\n}', 'browser-console',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"onclick\\\\s*=\\\\s*\\\\(\\\\)\\\\s*=>\\\\s*\\\\{\\\\s*let\\\\s+count\",\"message\":\"The logged count never changes — the click handler shadows a new local `count` instead of updating the outer one.\",\"line\":8}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-03-async-abyss', 'Sprint #3: Async Abyss', 'Race conditions, promises, and timing bugs — eight problems about things happening in the wrong order.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 14 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 14 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 1
FROM challenges WHERE slug = 'c3-js-promise-all-order'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 2
FROM challenges WHERE slug = 'c3-py-async-forgot-await'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 3
FROM challenges WHERE slug = 'c3-sql-transaction-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 4
FROM challenges WHERE slug = 'c3-go-goroutine-no-wait'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 5
FROM challenges WHERE slug = 'c3-js-race-condition-counter'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 6
FROM challenges WHERE slug = 'c3-py-threading-shared-state'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 7
FROM challenges WHERE slug = 'c3-go-channel-deadlock-select'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-03-async-abyss'), id, 8
FROM challenges WHERE slug = 'c3-js-stale-closure-state'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #4: Database Drama ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-implicit-join-null', 'Implicit Join Null', 'SQL', 'Easy', 80, 15,
  'The \"employees without a manager\" report returns zero rows, even though several exist.', 'Understand why an inner JOIN drops rows whose foreign key is NULL.', '[\"A regular JOIN only keeps rows that match on both sides — a NULL manager_id never matches anything.\",\"Filter with WHERE manager_id IS NULL instead of joining on it.\"]', 'Returns every employee whose manager_id is NULL.', 'unassigned.sql',
  'SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.id WHERE m.id IS NULL;', 'SELECT name FROM employees WHERE manager_id IS NULL;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"employees\",\"create\":\"CREATE TABLE employees (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  name VARCHAR(255) NOT NULL,\\n  manager_id INT NULL\\n);\",\"columns\":[\"id\",\"name\",\"manager_id\"],\"rows\":[[\"1\",\"Ava\",\"NULL\"],[\"2\",\"Ben\",\"1\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"WHERE\\\\s+manager_id\\\\s+IS\\\\s+NULL\",\"flags\":\"i\",\"message\":\"0 rows returned — the JOIN itself excludes any row with a NULL manager_id before the WHERE even runs.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-delete-no-where', 'Delete No Where', 'SQL', 'Easy', 90, 18,
  'A cleanup script meant to remove one expired session deleted every session in the table.', 'Understand why DELETE without a WHERE clause removes every row.', '[\"DELETE FROM table; with no WHERE clause deletes everything, not just the intended row.\",\"Add WHERE id = 42 (or the actual target) before running a DELETE.\"]', 'Only the specific expired session is removed.', 'cleanup.sql',
  'DELETE FROM sessions;', 'DELETE FROM sessions WHERE id = 1;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"sessions\",\"create\":\"CREATE TABLE sessions (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  token VARCHAR(255) NOT NULL,\\n  expired TINYINT(1) NOT NULL DEFAULT 0\\n);\",\"columns\":[\"id\",\"token\",\"expired\"],\"rows\":[[\"1\",\"abc\",\"1\"],[\"2\",\"def\",\"0\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"DELETE\\\\s+FROM\\\\s+sessions\\\\s+WHERE\",\"flags\":\"i\",\"message\":\"Query OK, 2 rows affected — every session was deleted, not just the expired one.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-count-distinct-missing', 'Count Distinct Missing', 'SQL', 'Easy', 85, 16,
  'The \"unique visitors\" count is way too high — it\'s counting every page view, not distinct visitors.', 'Understand the difference between COUNT(column) and COUNT(DISTINCT column).', '[\"COUNT(visitor_id) counts every row, including repeat visits from the same visitor.\",\"Use COUNT(DISTINCT visitor_id) to count unique visitors.\"]', 'Returns the number of distinct visitors, not total page views.', 'unique_visitors.sql',
  'SELECT COUNT(visitor_id) AS unique_visitors FROM page_views;', 'SELECT COUNT(DISTINCT visitor_id) AS unique_visitors FROM page_views;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"page_views\",\"create\":\"CREATE TABLE page_views (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  visitor_id INT NOT NULL\\n);\",\"columns\":[\"id\",\"visitor_id\"],\"rows\":[[\"1\",\"5\"],[\"2\",\"5\"],[\"3\",\"6\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"COUNT\\\\(\\\\s*DISTINCT\\\\s+visitor_id\\\\s*\\\\)\",\"flags\":\"i\",\"message\":\"Returns 3 total page views instead of 2 unique visitors.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-foreign-key-order', 'Foreign Key Order', 'SQL', 'Medium', 120, 24,
  'Running this schema setup script fails with a foreign key constraint error before any tables are even populated.', 'Understand why a table with a foreign key must be created after the table it references.', '[\"orders references customers.id — customers must exist as a table first.\",\"Reorder the CREATE TABLE statements so customers comes before orders.\"]', 'Both tables are created successfully, in dependency order.', 'schema_setup.sql',
  'CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\nCREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);', 'CREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);', 'sql',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"CREATE\\\\s+TABLE\\\\s+customers[\\\\s\\\\S]*CREATE\\\\s+TABLE\\\\s+orders\",\"flags\":\"i\",\"message\":\"ERROR 1824 (HY000): Failed to open the referenced table \'customers\'\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-having-vs-where', 'Having Vs Where', 'SQL', 'Medium', 125, 25,
  'Filtering customers whose total spend exceeds $500 fails with a syntax/aggregate error.', 'Understand why filtering on an aggregate result requires HAVING, not WHERE.', '[\"WHERE filters rows before aggregation happens — SUM() doesn\'t exist yet at that point.\",\"Use HAVING SUM(amount) > 500 to filter after the GROUP BY aggregates.\"]', 'Returns only customers whose total spend exceeds 500.', 'big_spenders.sql',
  'SELECT customer_id, SUM(amount) AS total\nFROM orders\nWHERE SUM(amount) > 500\nGROUP BY customer_id;', 'SELECT customer_id, SUM(amount) AS total\nFROM orders\nGROUP BY customer_id\nHAVING SUM(amount) > 500;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id INT NOT NULL,\\n  amount DECIMAL(10,2) NOT NULL\\n);\",\"columns\":[\"id\",\"customer_id\",\"amount\"],\"rows\":[[\"1\",\"1\",\"300.00\"],[\"2\",\"1\",\"300.00\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"WHERE\\\\s+SUM\\\\(amount\\\\)\",\"flags\":\"i\",\"message\":\"ERROR 1111 (HY000): Invalid use of group function\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-index-missing-slow', 'Index Missing Slow', 'SQL', 'Medium', 130, 26,
  'Looking up a user by email takes several seconds on a table with a million rows.', 'Understand why a WHERE clause on an unindexed column forces a full table scan.', '[\"Without an index, MySQL has to check every single row to find a match.\",\"Add an index on the email column so lookups can use it directly.\"]', 'The lookup uses an index instead of scanning the whole table.', 'lookup.sql',
  'SELECT * FROM users WHERE email = \'a@example.com\';', 'CREATE INDEX idx_users_email ON users(email);\nSELECT * FROM users WHERE email = \'a@example.com\';', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"users\",\"create\":\"CREATE TABLE users (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  email VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"email\"],\"rows\":[[\"1\",\"a@example.com\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"CREATE\\\\s+INDEX\\\\s+\\\\w+\\\\s+ON\\\\s+users\\\\s*\\\\(\\\\s*email\\\\s*\\\\)\",\"flags\":\"i\",\"message\":\"Query takes 4.2s — full table scan on a million-row table with no index on email.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-n-plus-one-conceptual', 'N Plus One Conceptual', 'SQL', 'Hard', 175, 34,
  'Loading 100 orders with their items runs 101 separate queries instead of a couple.', 'Understand the N+1 query problem and how a single JOIN replaces a query-per-row loop.', '[\"Running one query to get orders, then a separate query per order for its items, is the classic N+1 pattern.\",\"A single JOIN across orders and order_items retrieves everything in one round trip.\"]', 'One query returns every order with its items, instead of 1 + N queries.', 'orders_with_items.sql',
  '-- Application code (pseudocode-in-SQL-comments):\n-- SELECT * FROM orders;\n-- for each order: SELECT * FROM order_items WHERE order_id = ?;\nSELECT * FROM orders;', 'SELECT o.id AS order_id, oi.product\nFROM orders o\nJOIN order_items oi ON oi.order_id = o.id;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id INT NOT NULL\\n);\",\"columns\":[\"id\",\"customer_id\"],\"rows\":[[\"1\",\"5\"]]},{\"name\":\"order_items\",\"create\":\"CREATE TABLE order_items (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  order_id INT NOT NULL,\\n  product VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"order_id\",\"product\"],\"rows\":[[\"1\",\"1\",\"Widget\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"JOIN\\\\s+order_items\",\"flags\":\"i\",\"message\":\"101 queries executed for 100 orders — one per order, plus the initial list query.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c4-sql-string-date-compare', 'String Date Compare', 'SQL', 'Hard', 180, 36,
  'Filtering expired subscriptions using a text comparison misses some rows that should clearly be expired.', 'Understand why comparing a DATE column to a string literal without proper typing can behave unexpectedly across formats.', '[\"Storing or comparing dates as plain VARCHAR strings sorts/compares lexicographically, not chronologically.\",\"Cast or store the column as a proper DATE type and compare using DATE functions.\"]', 'All subscriptions with expires_at before today are correctly identified, regardless of text formatting.', 'expired.sql',
  'SELECT * FROM subscriptions WHERE expires_at < \'2025-10-01\';', 'SELECT * FROM subscriptions WHERE STR_TO_DATE(expires_at, \'%Y-%m-%d\') < \'2025-10-01\';', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"subscriptions\",\"create\":\"CREATE TABLE subscriptions (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  expires_at VARCHAR(20) NOT NULL\\n);\",\"columns\":[\"id\",\"expires_at\"],\"rows\":[[\"1\",\"2025-9-1\"],[\"2\",\"2025-12-01\"]]}]}', '[{\"type\":\"requireMatch\",\"pattern\":\"STR_TO_DATE\\\\(\",\"flags\":\"i\",\"message\":\"\'2025-9-1\' sorts after \'2025-12-01\' as plain text, so the September row is missed.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-04-database-drama', 'Sprint #4: Database Drama', 'SQL-heavy contest — schema mistakes, transaction bugs, and query gotchas.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 21 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 21 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 1
FROM challenges WHERE slug = 'c4-sql-implicit-join-null'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 2
FROM challenges WHERE slug = 'c4-sql-delete-no-where'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 3
FROM challenges WHERE slug = 'c4-sql-count-distinct-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 4
FROM challenges WHERE slug = 'c4-sql-foreign-key-order'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 5
FROM challenges WHERE slug = 'c4-sql-having-vs-where'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 6
FROM challenges WHERE slug = 'c4-sql-index-missing-slow'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 7
FROM challenges WHERE slug = 'c4-sql-n-plus-one-conceptual'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-04-database-drama'), id, 8
FROM challenges WHERE slug = 'c4-sql-string-date-compare'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #5: Off-By-One Open ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-js-slice-end-index', 'Slice End Index', 'JavaScript', 'Easy', 80, 15,
  'Paginating with 10 items per page shows 11 items on every page.', 'Understand that Array.slice(start, end) excludes the end index.', '[\"slice(0, 11) actually returns 11 items (indices 0 through 10).\",\"Use slice(start, start + pageSize) with the correct page size.\"]', 'Each page shows exactly 10 items.', 'page.js',
  'function getPage(items, page, pageSize) {\n  const start = page * pageSize;\n  return items.slice(start, start + pageSize + 1);\n}', 'function getPage(items, page, pageSize) {\n  const start = page * pageSize;\n  return items.slice(start, start + pageSize);\n}', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"start\\\\s*\\\\+\\\\s*pageSize\\\\s*\\\\+\\\\s*1\",\"message\":\"Returns 11 items per page instead of 10.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-py-range-exclusive-end', 'Range Exclusive End', 'Python', 'Easy', 80, 15,
  'countdown(5) should print 5,4,3,2,1 but stops at 2.', 'Understand that range(start, stop) never includes stop.', '[\"range(5, 1, -1) produces 5,4,3,2 — it stops before reaching 1.\",\"Use range(5, 0, -1) to include 1.\"]', 'Prints 5, 4, 3, 2, 1.', 'countdown.py',
  'def countdown(n):\n    for i in range(n, 1, -1):\n        print(i)\n\ncountdown(5)', 'def countdown(n):\n    for i in range(n, 0, -1):\n        print(i)\n\ncountdown(5)', 'python',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"range\\\\(n,\\\\s*1,\\\\s*-1\\\\)\",\"message\":\"Stops at 2 — range(n, 1, -1) excludes 1.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-java-substring-bounds', 'Substring Bounds', 'Java', 'Easy', 85, 16,
  'Truncating a name to 5 characters throws StringIndexOutOfBoundsException for shorter names.', 'Understand why substring() needs a bounds check against the actual string length.', '[\"\\\"Al\\\".substring(0, 5) throws because the string is shorter than 5 characters.\",\"Clamp the end index to Math.min(name.length(), 5).\"]', 'truncate(\"Al\", 5) returns \"Al\" without throwing.', 'Main.java',
  'public class Main {\n    static String truncate(String name, int len) {\n        return name.substring(0, len);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(truncate(\"Al\", 5));\n    }\n}', 'public class Main {\n    static String truncate(String name, int len) {\n        return name.substring(0, Math.min(name.length(), len));\n    }\n\n    public static void main(String[] args) {\n        System.out.println(truncate(\"Al\", 5));\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"Math\\\\.min\\\\(name\\\\.length\\\\(\\\\),\\\\s*len\\\\)\",\"message\":\"Exception in thread \\\"main\\\" java.lang.StringIndexOutOfBoundsException\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-c-buffer-off-by-one-null', 'Buffer Off By One Null', 'C', 'Medium', 120, 24,
  'Copying a 5-character string into a 5-byte buffer corrupts adjacent memory.', 'Understand that a C string needs room for a trailing null terminator beyond its visible characters.', '[\"A 5-character string needs a 6-byte buffer: 5 characters plus \'\\\\0\'.\",\"Size the buffer as strlen(source) + 1.\"]', 'The buffer is large enough to hold the string plus its null terminator.', 'main.c',
  '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    const char* src = \"Hello\";\n    char buffer[5];\n    strcpy(buffer, src);\n    printf(\"%s\\n\", buffer);\n    return 0;\n}', '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    const char* src = \"Hello\";\n    char buffer[6];\n    strcpy(buffer, src);\n    printf(\"%s\\n\", buffer);\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"char\\\\s+buffer\\\\[5\\\\]\",\"message\":\"*** buffer overflow detected ***: terminated — 5 bytes isn\'t enough for \\\"Hello\\\" plus its null terminator.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-go-slice-bounds-panic', 'Slice Bounds Panic', 'Go', 'Medium', 125, 25,
  'Getting the last 3 elements of a short slice panics instead of returning what\'s available.', 'Understand why slicing beyond a slice\'s length panics, and how to clamp the start index.', '[\"items[len(items)-3:] panics if len(items) is less than 3.\",\"Clamp the start index to 0 when the slice is shorter than requested.\"]', 'lastN([]int{1,2}, 3) returns [1, 2] instead of panicking.', 'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc lastN(items []int, n int) []int {\n\treturn items[len(items)-n:]\n}\n\nfunc main() {\n\tfmt.Println(lastN([]int{1, 2}, 3))\n}', 'package main\n\nimport \"fmt\"\n\nfunc lastN(items []int, n int) []int {\n\tstart := len(items) - n\n\tif start < 0 {\n\t\tstart = 0\n\t}\n\treturn items[start:]\n}\n\nfunc main() {\n\tfmt.Println(lastN([]int{1, 2}, 3))\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"start\\\\s*<\\\\s*0\",\"message\":\"panic: runtime error: slice bounds out of range [-1:]\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-php-array-slice-count', 'Array Slice Count', 'PHP', 'Medium', 115, 23,
  'getRecent($items, 3) returns 4 items instead of 3.', 'Understand array_slice()\'s length argument versus an off-by-one end index mistake.', '[\"array_slice($arr, 0, 4) explicitly asks for 4 elements — the length argument was miscalculated.\",\"Pass the exact count requested, not count + 1.\"]', 'getRecent($items, 3) returns exactly 3 items.', 'recent.php',
  '<?php\nfunction getRecent($items, $count) {\n    return array_slice($items, 0, $count + 1);\n}\n\nprint_r(getRecent([1,2,3,4,5], 3));', '<?php\nfunction getRecent($items, $count) {\n    return array_slice($items, 0, $count);\n}\n\nprint_r(getRecent([1,2,3,4,5], 3));', 'php',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"array_slice\\\\(\\\\$items,\\\\s*0,\\\\s*\\\\$count\\\\s*\\\\+\\\\s*1\\\\)\",\"message\":\"Returns 4 items instead of the requested 3.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-cpp-fencepost-matrix', 'Fencepost Matrix', 'C++', 'Hard', 175, 34,
  'Summing a 3x3 matrix\'s diagonal reads one element past the last row, crashing intermittently.', 'Understand a fencepost error in nested loop bounds against a 2D array\'s actual dimensions.', '[\"The loop condition uses <= size instead of < size for the row index.\",\"Diagonal indices must stay strictly less than the matrix dimension.\"]', 'Sums exactly the 3 diagonal elements of a 3x3 matrix.', 'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int sum = 0;\n    for (int i = 0; i <= 3; i++) {\n        sum += m[i][i];\n    }\n    cout << sum << endl;\n    return 0;\n}', '#include <iostream>\nusing namespace std;\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        sum += m[i][i];\n    }\n    cout << sum << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*3\",\"message\":\"Reads m[3][3], one row past the end of the array — undefined behavior.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c5-py-binary-search-bounds', 'Binary Search Bounds', 'Python', 'Hard', 180, 36,
  'binary_search finds most values correctly but misses the very last element of the array.', 'Understand a classic off-by-one in binary search\'s upper bound.', '[\"high = len(arr) - 1 sets the correct initial upper bound, but the loop condition low <= high must be used, not low < high, or the last element is skipped.\",\"Check the loop\'s continuation condition carefully against inclusive bounds.\"]', 'binary_search([1,2,3,4,5], 5) returns index 4, not -1.', 'search.py',
  'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([1,2,3,4,5], 5))', 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([1,2,3,4,5], 5))', 'python',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"while\\\\s+low\\\\s*<\\\\s*high\\\\s*:\",\"message\":\"Returns -1 for a value that\'s actually in the array — the loop exits one comparison too early.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-05-off-by-one-open', 'Sprint #5: Off-By-One Open', 'A whole contest of boundary bugs — the most common family of real-world defects.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 28 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 28 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 1
FROM challenges WHERE slug = 'c5-js-slice-end-index'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 2
FROM challenges WHERE slug = 'c5-py-range-exclusive-end'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 3
FROM challenges WHERE slug = 'c5-java-substring-bounds'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 4
FROM challenges WHERE slug = 'c5-c-buffer-off-by-one-null'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 5
FROM challenges WHERE slug = 'c5-go-slice-bounds-panic'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 6
FROM challenges WHERE slug = 'c5-php-array-slice-count'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 7
FROM challenges WHERE slug = 'c5-cpp-fencepost-matrix'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-05-off-by-one-open'), id, 8
FROM challenges WHERE slug = 'c5-py-binary-search-bounds'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #6: Web of Lies ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-fetch-no-status-check', 'Fetch No Status Check', 'JavaScript', 'Easy', 80, 15,
  'A failed request (404/500) is silently treated as success — the UI shows old data with no error.', 'Understand that fetch() only rejects on network failure, never on HTTP error status codes.', '[\"fetch() resolves even for a 404 or 500 response — it doesn\'t throw automatically.\",\"Check response.ok (or response.status) before treating the response as successful.\"]', 'A 404/500 response is detected and handled as an error.', 'api.js',
  'async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}', 'async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) {\n    throw new Error(\"Failed to load user: \" + res.status);\n  }\n  return res.json();\n}', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"if\\\\s*\\\\(!res\\\\.ok\\\\)\",\"message\":\"A 404 response is silently parsed as JSON — fetch() never rejects on HTTP error status.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-cors-hardcoded-origin', 'Cors Hardcoded Origin', 'JavaScript', 'Easy', 85, 16,
  'The API works from the production domain but is blocked by CORS from the staging domain.', 'Understand why hardcoding a single allowed origin breaks any other legitimate domain.', '[\"Access-Control-Allow-Origin set to one fixed domain rejects every other origin outright.\",\"Maintain a list of allowed origins and check the incoming request\'s origin against it.\"]', 'Both production and staging origins are allowed.', 'server.js',
  'app.use((req, res, next) => {\n  res.header(\"Access-Control-Allow-Origin\", \"https://app.example.com\");\n  next();\n});', 'const allowedOrigins = [\"https://app.example.com\", \"https://staging.example.com\"];\n\napp.use((req, res, next) => {\n  if (allowedOrigins.includes(req.headers.origin)) {\n    res.header(\"Access-Control-Allow-Origin\", req.headers.origin);\n  }\n  next();\n});', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"allowedOrigins\",\"message\":\"Access to fetch at \'.../api\' from origin \'https://staging.example.com\' has been blocked by CORS policy.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-form-default-submit', 'Form Default Submit', 'JavaScript', 'Easy', 80, 15,
  'Submitting the form reloads the whole page instead of running the JS submit handler.', 'Understand why preventDefault() is required to stop a form\'s native submission behavior.', '[\"A form\'s default action is to reload/navigate on submit.\",\"Call event.preventDefault() at the start of the submit handler.\"]', 'The page does not reload; only the JS handler runs.', 'form.js',
  'form.addEventListener(\"submit\", (event) => {\n  console.log(\"submitting\", new FormData(form));\n});', 'form.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  console.log(\"submitting\", new FormData(form));\n});', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"event\\\\.preventDefault\\\\(\\\\)\",\"message\":\"Page reloads immediately — the console.log never gets a chance to run before navigation.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-debounce-search-input', 'Debounce Search Input', 'JavaScript', 'Medium', 120, 24,
  'Typing a search query fires an API request on every single keystroke, overwhelming the backend.', 'Understand why input handlers for expensive operations need debouncing.', '[\"Every keyup event triggers a new fetch, with no delay or cancellation.\",\"Debounce the handler so it only fires after typing pauses.\"]', 'A search request only fires after ~300ms of no further typing.', 'search.js',
  'input.addEventListener(\"keyup\", () => {\n  search(input.value);\n});', 'let timer;\ninput.addEventListener(\"keyup\", () => {\n  clearTimeout(timer);\n  timer = setTimeout(() => search(input.value), 300);\n});', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"clearTimeout\\\\(timer\\\\)\",\"message\":\"5 requests fired for a 5-character search term typed quickly.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-xss-innerhtml', 'Xss Innerhtml', 'JavaScript', 'Medium', 125, 25,
  'A security review flagged that user-submitted comments can execute arbitrary script on the page.', 'Understand why setting innerHTML with unescaped user input is a stored XSS vulnerability.', '[\"innerHTML parses and executes any HTML/script tags inside the string.\",\"Use textContent to insert plain text safely, or properly sanitize/escape HTML.\"]', 'A comment containing <script> tags is displayed as literal text, not executed.', 'comments.js',
  'function renderComment(text) {\n  const div = document.createElement(\"div\");\n  div.innerHTML = text;\n  document.body.appendChild(div);\n}', 'function renderComment(text) {\n  const div = document.createElement(\"div\");\n  div.textContent = text;\n  document.body.appendChild(div);\n}', 'browser-console',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"\\\\.innerHTML\\\\s*=\\\\s*text\",\"message\":\"Security scan: stored XSS — a comment containing <script>alert(1)</script> executes on page load.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-php-csrf-missing', 'Csrf Missing', 'PHP', 'Medium', 130, 26,
  'A security audit found the money-transfer endpoint can be triggered from any external site the user happens to be logged into.', 'Understand why state-changing POST endpoints need CSRF token validation.', '[\"Without a CSRF token, any site can submit a form to this endpoint using the victim\'s existing session cookie.\",\"Validate a per-session CSRF token before processing the transfer.\"]', 'Requests without a valid CSRF token are rejected.', 'transfer.php',
  '<?php\nfunction transfer($fromId, $toId, $amount) {\n    doTransfer($fromId, $toId, $amount);\n    echo \"Transfer complete\";\n}', '<?php\nfunction transfer($fromId, $toId, $amount, $csrfToken) {\n    if (!hash_equals($_SESSION[\'csrf_token\'], $csrfToken)) {\n        http_response_code(403);\n        die(\"Invalid CSRF token\");\n    }\n    doTransfer($fromId, $toId, $amount);\n    echo \"Transfer complete\";\n}', 'php',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"csrf_token\",\"message\":\"Security audit: CSRF — a malicious site can trigger a transfer using the victim\'s session, with no token check.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-memory-leak-listener', 'Memory Leak Listener', 'JavaScript', 'Hard', 175, 34,
  'Opening and closing the modal repeatedly makes the page progressively slower and consumes more memory.', 'Understand why event listeners attached without cleanup accumulate as a memory leak.', '[\"Every time the modal opens, a new resize listener is added, but the old ones are never removed.\",\"Remove the listener in a cleanup step when the modal closes.\"]', 'Exactly one resize listener exists at a time, regardless of how many times the modal opens.', 'modal.js',
  'function openModal() {\n  window.addEventListener(\"resize\", handleResize);\n  showModal();\n}\n\nfunction closeModal() {\n  hideModal();\n}', 'function openModal() {\n  window.addEventListener(\"resize\", handleResize);\n  showModal();\n}\n\nfunction closeModal() {\n  window.removeEventListener(\"resize\", handleResize);\n  hideModal();\n}', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"removeEventListener\\\\(\\\"resize\\\"\",\"message\":\"After opening/closing the modal 50 times, 50 resize listeners are still active.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c6-js-jwt-not-verified', 'Jwt Not Verified', 'JavaScript', 'Hard', 185, 37,
  'A security review found that a tampered JWT with a modified payload is still accepted as valid.', 'Understand the difference between decoding a JWT and actually verifying its signature.', '[\"jwt.decode() reads the payload without checking whether the signature is valid at all.\",\"Use jwt.verify() with the secret/key so a tampered token is rejected.\"]', 'A token with a tampered payload and invalid signature is rejected.', 'auth.js',
  'const jwt = require(\"jsonwebtoken\");\n\nfunction getUser(token) {\n  const payload = jwt.decode(token);\n  return payload;\n}', 'const jwt = require(\"jsonwebtoken\");\n\nfunction getUser(token, secret) {\n  const payload = jwt.verify(token, secret);\n  return payload;\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"jwt\\\\.verify\\\\(\",\"message\":\"Security audit: a JWT with role changed from \'user\' to \'admin\' and no valid signature is accepted.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-06-web-of-lies', 'Sprint #6: Web of Lies', 'Frontend and API bugs — the gap between what the UI shows and what actually happened.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 35 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 35 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 1
FROM challenges WHERE slug = 'c6-js-fetch-no-status-check'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 2
FROM challenges WHERE slug = 'c6-js-cors-hardcoded-origin'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 3
FROM challenges WHERE slug = 'c6-js-form-default-submit'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 4
FROM challenges WHERE slug = 'c6-js-debounce-search-input'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 5
FROM challenges WHERE slug = 'c6-js-xss-innerhtml'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 6
FROM challenges WHERE slug = 'c6-php-csrf-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 7
FROM challenges WHERE slug = 'c6-js-memory-leak-listener'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-06-web-of-lies'), id, 8
FROM challenges WHERE slug = 'c6-js-jwt-not-verified'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #7: Type Trouble ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-js-parseint-radix', 'Parseint Radix', 'JavaScript', 'Easy', 80, 15,
  'parseInt(\"08\") returns unexpected results in some older environments due to octal interpretation ambiguity, and the code relies on that guesswork.', 'Understand why parseInt() should always be called with an explicit radix.', '[\"Without a radix, parseInt() can guess the base from the string\'s format, which is unreliable.\",\"Always pass 10 explicitly: parseInt(str, 10).\"]', 'parseInt(\"08\", 10) reliably returns 8.', 'parse.js',
  'function toNumber(str) {\n  return parseInt(str);\n}\n\nconsole.log(toNumber(\"08\"));', 'function toNumber(str) {\n  return parseInt(str, 10);\n}\n\nconsole.log(toNumber(\"08\"));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"parseInt\\\\(str,\\\\s*10\\\\)\",\"message\":\"Result depends on runtime-specific radix guessing rather than always parsing as base 10.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-js-nan-equality', 'Nan Equality', 'JavaScript', 'Easy', 85, 16,
  'isInvalid(NaN) returns false — the exact case it\'s supposed to catch.', 'Understand why NaN === NaN is always false, and how to detect NaN correctly.', '[\"NaN never equals anything, including itself, when compared with ===.\",\"Use Number.isNaN(value) to correctly detect NaN.\"]', 'isInvalid(NaN) returns true.', 'validate.js',
  'function isInvalid(value) {\n  return value === NaN;\n}\n\nconsole.log(isInvalid(NaN));', 'function isInvalid(value) {\n  return Number.isNaN(value);\n}\n\nconsole.log(isInvalid(NaN));', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"value\\\\s*===\\\\s*NaN\",\"message\":\"false — NaN === NaN is always false in JavaScript.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-py-type-string-int-concat', 'Type String Int Concat', 'Python', 'Easy', 80, 15,
  'Building an invoice line raises TypeError: can only concatenate str.', 'Understand why Python requires explicit conversion when mixing str and numeric types.', '[\"\\\"Total: \\\" + 42 fails because Python won\'t implicitly convert an int to a string.\",\"Wrap the number in str() before concatenating.\"]', 'Prints \"Total: 42\" with no error.', 'invoice.py',
  'def invoice_line(total):\n    return \"Total: \" + total\n\nprint(invoice_line(42))', 'def invoice_line(total):\n    return \"Total: \" + str(total)\n\nprint(invoice_line(42))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\+\\\\s*str\\\\(total\\\\)\",\"message\":\"TypeError: can only concatenate str (not \\\"int\\\") to str\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-ts-any-type-escape', 'Any Type Escape', 'TypeScript', 'Medium', 120, 24,
  'processAmount(\"100\") silently returns \"100100\" (string concatenation) instead of 200, with no compiler warning.', 'Understand how the `any` type disables all of TypeScript\'s type checking for a value.', '[\"Typing amount as `any` means TypeScript won\'t catch that a string got passed where a number was expected.\",\"Use a proper `number` type, or validate/convert before using it.\"]', 'processAmount(100) returns 200; passing a string is a compile-time error.', 'process.ts',
  'function processAmount(amount: any): number {\n  return amount + amount;\n}\n\nconsole.log(processAmount(\"100\"));', 'function processAmount(amount: number): number {\n  return amount + amount;\n}\n\nconsole.log(processAmount(100));', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"amount:\\\\s*any\",\"message\":\"Returns \\\"100100\\\" (string concatenation) instead of 200 — `any` disabled all type checking.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-php-loose-in-array', 'Loose In Array', 'PHP', 'Medium', 120, 24,
  'in_array(\"0\", $roles) incorrectly matches when $roles contains false or a non-matching falsy value.', 'Understand why in_array() defaults to loose comparison, and when strict mode is needed.', '[\"Without the third argument, in_array() uses == comparisons, which allows surprising type coercion matches.\",\"Pass true as the third argument for strict, type-safe comparison.\"]', 'in_array(\"0\", $roles, true) only matches an exact string \"0\".', 'roles.php',
  '<?php\nfunction hasRole($roles, $role) {\n    return in_array($role, $roles);\n}\n\nvar_dump(hasRole([false, \"admin\"], \"0\"));', '<?php\nfunction hasRole($roles, $role) {\n    return in_array($role, $roles, true);\n}\n\nvar_dump(hasRole([false, \"admin\"], \"0\"));', 'php',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"in_array\\\\(\\\\$role,\\\\s*\\\\$roles,\\\\s*true\\\\)\",\"message\":\"bool(true) — \\\"0\\\" loosely equals false under PHP\'s default == comparison.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-java-autoboxing-npe', 'Autoboxing Npe', 'Java', 'Medium', 125, 25,
  'Unboxing a null Integer throws NullPointerException during a simple comparison.', 'Understand that auto-unboxing a null wrapper type throws NPE.', '[\"if (count > 0) auto-unboxes count from Integer to int — if count is null, this throws.\",\"Check for null explicitly before comparing, or use Optional.\"]', 'Returns false for a null count instead of throwing.', 'Main.java',
  'public class Main {\n    static boolean hasItems(Integer count) {\n        return count > 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(hasItems(null));\n    }\n}', 'public class Main {\n    static boolean hasItems(Integer count) {\n        return count != null && count > 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(hasItems(null));\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"count\\\\s*!=\\\\s*null\\\\s*&&\",\"message\":\"Exception in thread \\\"main\\\" java.lang.NullPointerException — auto-unboxing null throws.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-cpp-implicit-narrowing', 'Implicit Narrowing', 'C++', 'Hard', 175, 34,
  'Storing a large calculated value into a smaller integer type silently truncates it to a wrong, wrapped number.', 'Understand implicit narrowing conversions in C++ and why they don\'t produce a compiler error by default.', '[\"Assigning a long result into a short variable silently truncates bits with no warning.\",\"Use a properly-sized type (e.g. long or int64_t) to hold the full result.\"]', 'Large computed values are stored correctly without truncation.', 'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nint main() {\n    long bigValue = 1000000;\n    short stored = bigValue * 2;\n    cout << stored << endl;\n    return 0;\n}', '#include <iostream>\nusing namespace std;\n\nint main() {\n    long bigValue = 1000000;\n    long stored = bigValue * 2;\n    cout << stored << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"short\\\\s+stored\",\"message\":\"Prints a small, wrapped-around number instead of 2000000 — short can\'t hold that value.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c7-go-interface-nil-check', 'Interface Nil Check', 'Go', 'Hard', 180, 36,
  'Checking if an error interface is nil returns false even though the underlying concrete value is nil.', 'Understand the classic Go gotcha: a non-nil interface can wrap a nil concrete value.', '[\"Returning a typed nil pointer as an `error` interface makes the interface itself non-nil.\",\"Return a literal nil directly when there\'s no error, rather than a nil-valued typed pointer.\"]', 'err == nil correctly evaluates to true when there\'s genuinely no error.', 'main.go',
  'package main\n\nimport \"fmt\"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string { return \"my error\" }\n\nfunc doWork() *MyError {\n\treturn nil\n}\n\nfunc run() error {\n\tvar err *MyError = doWork()\n\treturn err\n}\n\nfunc main() {\n\terr := run()\n\tfmt.Println(err == nil)\n}', 'package main\n\nimport \"fmt\"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string { return \"my error\" }\n\nfunc doWork() *MyError {\n\treturn nil\n}\n\nfunc run() error {\n\tif err := doWork(); err != nil {\n\t\treturn err\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := run()\n\tfmt.Println(err == nil)\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"return\\\\s+nil\\\\s*\\\\n\\\\}\\\\s*\\\\n\\\\nfunc main\",\"message\":\"false — a non-nil interface value can wrap a nil concrete pointer.\",\"line\":15}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-07-type-trouble', 'Sprint #7: Type Trouble', 'Type coercion, casting, and comparison bugs across languages.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 42 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 42 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 1
FROM challenges WHERE slug = 'c7-js-parseint-radix'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 2
FROM challenges WHERE slug = 'c7-js-nan-equality'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 3
FROM challenges WHERE slug = 'c7-py-type-string-int-concat'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 4
FROM challenges WHERE slug = 'c7-ts-any-type-escape'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 5
FROM challenges WHERE slug = 'c7-php-loose-in-array'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 6
FROM challenges WHERE slug = 'c7-java-autoboxing-npe'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 7
FROM challenges WHERE slug = 'c7-cpp-implicit-narrowing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-07-type-trouble'), id, 8
FROM challenges WHERE slug = 'c7-go-interface-nil-check'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #8: Security Sweep ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-php-plaintext-password', 'Plaintext Password', 'PHP', 'Easy', 85, 16,
  'A database leak would expose every user\'s password in plain, readable text.', 'Understand why passwords must always be hashed before storage, never stored as-is.', '[\"Storing $password directly means anyone with DB access reads every password in plain text.\",\"Use password_hash() to store a proper one-way hash instead.\"]', 'Only a hashed password is ever stored, never the raw value.', 'register.php',
  '<?php\nfunction registerUser($pdo, $email, $password) {\n    $stmt = $pdo->prepare(\"INSERT INTO users (email, password) VALUES (?, ?)\");\n    $stmt->execute([$email, $password]);\n}', '<?php\nfunction registerUser($pdo, $email, $password) {\n    $hash = password_hash($password, PASSWORD_DEFAULT);\n    $stmt = $pdo->prepare(\"INSERT INTO users (email, password) VALUES (?, ?)\");\n    $stmt->execute([$email, $hash]);\n}', 'php',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"password_hash\\\\(\",\"message\":\"Security audit: passwords column contains plain-text values.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-js-eval-user-input', 'Eval User Input', 'JavaScript', 'Easy', 90, 17,
  'A user entering \"1); require(\'fs\').rmSync(\'/\', {recursive:true}); (\" into the calculator can execute arbitrary code.', 'Understand why eval() on user input is a critical code-injection vulnerability.', '[\"eval() executes ANY JavaScript in the string, not just arithmetic.\",\"Use a safe expression parser/evaluator, never eval() on untrusted input.\"]', 'User input is parsed as a restricted arithmetic expression only, never executed as code.', 'calc.js',
  'function calculate(expr) {\n  return eval(expr);\n}', 'function calculate(expr) {\n  if (!/^[\\d\\s+\\-*/().]+$/.test(expr)) {\n    throw new Error(\"Invalid expression\");\n  }\n  return Function(\'\"use strict\"; return (\' + expr + \")\")();\n}', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"return\\\\s+eval\\\\(expr\\\\)\",\"message\":\"Security audit: arbitrary code execution via eval() on unvalidated user input.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-sql-string-concat-injection', 'String Concat Injection', 'SQL', 'Easy', 90, 17,
  'A username of \' OR \'1\'=\'1 logs in as the first user in the table, no password needed.', 'Understand classic SQL injection via string concatenation in a login query.', '[\"Concatenating raw user input into a SQL string lets that input change the query\'s logic.\",\"Use a parameterized query with placeholders instead of string concatenation.\"]', 'User input can never alter the query\'s structure, regardless of its content.', 'login.sql',
  '-- application code builds and runs:\nSELECT * FROM users WHERE username = \'${username}\' AND password_hash = \'${passwordHash}\';', '-- parameterized query:\nSELECT * FROM users WHERE username = ? AND password_hash = ?;', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"users\",\"create\":\"CREATE TABLE users (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  username VARCHAR(255) NOT NULL,\\n  password_hash VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"username\",\"password_hash\"],\"rows\":[[\"1\",\"admin\",\"$2b$...\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"username\\\\s*=\\\\s*\'\\\\$\\\\{\",\"message\":\"Login bypassed with username: \' OR \'1\'=\'1 — string concatenation let input rewrite the query.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-js-open-redirect', 'Open Redirect', 'JavaScript', 'Medium', 120, 24,
  'A link like /go?url=https://evil-phishing-site.com silently redirects users off the real site.', 'Understand open redirect vulnerabilities and why redirect targets must be validated.', '[\"Redirecting to any URL provided in a query parameter lets attackers craft convincing phishing links using your trusted domain.\",\"Only allow redirects to a fixed allowlist of internal paths/domains.\"]', 'Redirects to external, non-allowlisted domains are rejected.', 'redirect.js',
  'app.get(\"/go\", (req, res) => {\n  res.redirect(req.query.url);\n});', 'const ALLOWED = [\"/dashboard\", \"/profile\", \"/settings\"];\n\napp.get(\"/go\", (req, res) => {\n  if (!ALLOWED.includes(req.query.url)) {\n    return res.status(400).send(\"Invalid redirect target\");\n  }\n  res.redirect(req.query.url);\n});', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"ALLOWED\\\\.includes\",\"message\":\"Security audit: open redirect — /go?url=https://evil.example sends users to an attacker-controlled site.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-node-command-injection', 'Node Command Injection', 'Node', 'Medium', 130, 26,
  'A filename of \"a.jpg; rm -rf /\" executed an arbitrary shell command on the server.', 'Understand command injection via unsanitized input passed to a shell command.', '[\"exec() runs its string through a shell, so ; and other shell metacharacters let an attacker chain commands.\",\"Use execFile() with arguments passed as an array, which bypasses the shell entirely.\"]', 'A filename containing shell metacharacters is treated as a literal filename, not executed.', 'convert.js',
  'const { exec } = require(\"child_process\");\n\nfunction convert(filename) {\n  exec(`convert ${filename} output.png`);\n}', 'const { execFile } = require(\"child_process\");\n\nfunction convert(filename) {\n  execFile(\"convert\", [filename, \"output.png\"]);\n}', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"exec\\\\(`convert\",\"message\":\"Security audit: command injection — a crafted filename executed an arbitrary shell command.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-php-file-upload-unrestricted', 'File Upload Unrestricted', 'PHP', 'Medium', 130, 26,
  'An attacker uploaded a file named shell.php and then executed it directly by visiting its URL.', 'Understand why file uploads must validate both file type and prevent execution in the upload directory.', '[\"Accepting any filename/extension lets an attacker upload executable server-side code disguised as a normal upload.\",\"Validate the file extension against an allowlist (e.g. jpg, png, pdf) before saving.\"]', 'Only allowlisted file types (e.g. images) can be uploaded.', 'upload.php',
  '<?php\nfunction handleUpload($file) {\n    move_uploaded_file($file[\"tmp_name\"], \"uploads/\" . $file[\"name\"]);\n}', '<?php\nfunction handleUpload($file) {\n    $allowed = [\"jpg\", \"jpeg\", \"png\", \"gif\"];\n    $ext = strtolower(pathinfo($file[\"name\"], PATHINFO_EXTENSION));\n    if (!in_array($ext, $allowed)) {\n        die(\"Invalid file type\");\n    }\n    move_uploaded_file($file[\"tmp_name\"], \"uploads/\" . uniqid() . \".\" . $ext);\n}', 'php',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\$allowed\\\\s*=\",\"message\":\"Security audit: shell.php was uploaded and executed directly from the uploads directory.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-node-jwt-secret-hardcoded', 'Node Jwt Secret Hardcoded', 'Node', 'Hard', 180, 36,
  'A security review found the JWT signing secret committed directly in source control, viewable by anyone with repo access.', 'Understand why secrets must never be hardcoded, and should come from environment variables instead.', '[\"A hardcoded secret in source code is visible to anyone with repository access, past or present.\",\"Read the secret from process.env, and fail loudly if it\'s missing.\"]', 'The JWT secret is loaded from an environment variable, never hardcoded.', 'auth.js',
  'const jwt = require(\"jsonwebtoken\");\n\nfunction sign(payload) {\n  return jwt.sign(payload, \"super-secret-key-123\");\n}', 'const jwt = require(\"jsonwebtoken\");\n\nfunction sign(payload) {\n  if (!process.env.JWT_SECRET) {\n    throw new Error(\"JWT_SECRET is not set\");\n  }\n  return jwt.sign(payload, process.env.JWT_SECRET);\n}', 'node',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"jwt\\\\.sign\\\\(payload,\\\\s*\\\"super-secret-key-123\\\"\\\\)\",\"message\":\"Security audit: signing secret is committed in plain text in version control.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c8-py-pickle-untrusted', 'Pickle Untrusted', 'Python', 'Hard', 185, 37,
  'Loading a cached object from an untrusted source executed arbitrary code during deserialization.', 'Understand why pickle.loads() on untrusted data is a remote code execution vulnerability.', '[\"pickle can execute arbitrary code as part of reconstructing an object — never unpickle untrusted data.\",\"Use a safe, restricted serialization format like JSON for untrusted data instead.\"]', 'Untrusted cached data is loaded via a safe format (JSON) instead of pickle.', 'cache.py',
  'import pickle\n\ndef load_cache(data):\n    return pickle.loads(data)', 'import json\n\ndef load_cache(data):\n    return json.loads(data)', 'python',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"pickle\\\\.loads\\\\(\",\"message\":\"Security audit: arbitrary code execution via pickle.loads() on untrusted cached data.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-08-security-sweep', 'Sprint #8: Security Sweep', 'Eight vulnerabilities pulled straight from real security audits.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 49 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 49 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 1
FROM challenges WHERE slug = 'c8-php-plaintext-password'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 2
FROM challenges WHERE slug = 'c8-js-eval-user-input'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 3
FROM challenges WHERE slug = 'c8-sql-string-concat-injection'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 4
FROM challenges WHERE slug = 'c8-js-open-redirect'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 5
FROM challenges WHERE slug = 'c8-node-command-injection'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 6
FROM challenges WHERE slug = 'c8-php-file-upload-unrestricted'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 7
FROM challenges WHERE slug = 'c8-node-jwt-secret-hardcoded'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-08-security-sweep'), id, 8
FROM challenges WHERE slug = 'c8-py-pickle-untrusted'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #9: Loop Logic ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-js-foreach-no-break', 'Foreach No Break', 'JavaScript', 'Easy', 80, 15,
  'findFirst() keeps checking every remaining item even after finding the match, wasting time on large arrays.', 'Understand that forEach() cannot be stopped early — use a real for loop or find() when you need to exit early.', '[\"return inside a forEach callback only exits that single callback invocation, not the loop.\",\"Use Array.find() (or a for loop with break) so it stops as soon as a match is found.\"]', 'The search stops as soon as the first match is found.', 'find.js',
  'function findFirst(items, predicate) {\n  let result;\n  items.forEach(item => {\n    if (predicate(item)) {\n      result = item;\n      return;\n    }\n  });\n  return result;\n}', 'function findFirst(items, predicate) {\n  return items.find(predicate);\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"items\\\\.find\\\\(predicate\\\\)\",\"message\":\"Checks all 10,000 items even though the match was at index 0 — forEach can\'t be short-circuited.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-py-infinite-while-no-update', 'Infinite While No Update', 'Python', 'Easy', 80, 15,
  'retry_until_success() never stops running, even after the operation succeeds.', 'Understand why a while loop\'s condition variable must actually change inside the loop body.', '[\"attempts is never incremented, so the loop condition never becomes false.\",\"Increment attempts inside the loop.\"]', 'The loop stops after at most max_attempts tries.', 'retry.py',
  'def retry_until_success(operation, max_attempts):\n    attempts = 0\n    while attempts < max_attempts:\n        if operation():\n            return True\n    return False', 'def retry_until_success(operation, max_attempts):\n    attempts = 0\n    while attempts < max_attempts:\n        if operation():\n            return True\n        attempts += 1\n    return False', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"attempts\\\\s*\\\\+=\\\\s*1\",\"message\":\"The loop never terminates — attempts stays at 0 forever.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-java-modify-list-foreach', 'Modify List Foreach', 'Java', 'Easy', 85, 16,
  'Adding an item to a list while iterating over it with a for-each loop throws ConcurrentModificationException.', 'Understand why structurally modifying a List during a for-each loop is unsafe.', '[\"Adding to the list mid-iteration invalidates the internal iterator.\",\"Collect new items separately, then add them all after the loop finishes.\"]', 'Prints the final list with the new item added, with no exception.', 'Main.java',
  'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        for (String item : items) {\n            if (item.equals(\"a\")) {\n                items.add(\"c\");\n            }\n        }\n        System.out.println(items);\n    }\n}', 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        List<String> toAdd = new ArrayList<>();\n        for (String item : items) {\n            if (item.equals(\"a\")) {\n                toAdd.add(\"c\");\n            }\n        }\n        items.addAll(toAdd);\n        System.out.println(items);\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"toAdd\\\\.add\\\\(\",\"message\":\"Exception in thread \\\"main\\\" java.util.ConcurrentModificationException\",\"line\":8}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-go-for-range-value-copy', 'For Range Value Copy', 'Go', 'Medium', 120, 24,
  'Doubling every item\'s score in a slice of structs via range has no effect — the original slice is unchanged.', 'Understand that `for _, v := range slice` gives a COPY of each element, not a reference to it.', '[\"Modifying v inside the loop only changes the local copy, not the original struct in the slice.\",\"Index into the slice directly (slice[i].Score) to modify the actual element.\"]', 'Every score in the original slice is doubled.', 'main.go',
  'package main\n\nimport \"fmt\"\n\ntype Player struct{ Score int }\n\nfunc main() {\n\tplayers := []Player{{Score: 10}, {Score: 20}}\n\tfor _, p := range players {\n\t\tp.Score *= 2\n\t}\n\tfmt.Println(players)\n}', 'package main\n\nimport \"fmt\"\n\ntype Player struct{ Score int }\n\nfunc main() {\n\tplayers := []Player{{Score: 10}, {Score: 20}}\n\tfor i := range players {\n\t\tplayers[i].Score *= 2\n\t}\n\tfmt.Println(players)\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"players\\\\[i\\\\]\\\\.Score\",\"message\":\"[{10} {20}] — unchanged, since range gave a copy of each Player.\",\"line\":9}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-py-list-remove-while-iterating', 'List Remove While Iterating', 'Python', 'Medium', 125, 25,
  'Removing odd numbers while iterating over the list skips every other odd number instead of removing them all.', 'Understand why removing elements from a list while iterating over it by index shifts subsequent elements silently.', '[\"Removing an item shifts all later items down by one index, so the loop\'s next index skips one.\",\"Build a new filtered list instead of mutating the original while iterating.\"]', 'filter_odds([1,2,3,4,5]) returns [2, 4] with every odd number removed.', 'filter_odds.py',
  'def filter_odds(nums):\n    for n in nums:\n        if n % 2 != 0:\n            nums.remove(n)\n    return nums\n\nprint(filter_odds([1,2,3,4,5]))', 'def filter_odds(nums):\n    return [n for n in nums if n % 2 == 0]\n\nprint(filter_odds([1,2,3,4,5]))', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\[n for n in nums if n % 2 == 0\\\\]\",\"message\":\"[2, 3, 4] — one odd number (3) survives because removal shifted the iteration index.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-js-array-length-cache', 'Array Length Cache', 'JavaScript', 'Medium', 120, 24,
  'Removing duplicates in-place with splice() leaves some duplicates behind.', 'Understand why mutating an array\'s length while iterating forward over it by index skips elements.', '[\"splice() shifts every later element left by one — the loop\'s next index then skips the element that shifted into the current spot.\",\"Iterate backward, or build a new array instead of mutating in place.\"]', 'dedupe([1,1,2,2,3]) returns [1, 2, 3] with no duplicates remaining.', 'dedupe.js',
  'function dedupe(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] === arr[i + 1]) {\n      arr.splice(i, 1);\n    }\n  }\n  return arr;\n}\n\nconsole.log(dedupe([1,1,2,2,3]));', 'function dedupe(arr) {\n  return [...new Set(arr)];\n}\n\nconsole.log(dedupe([1,1,2,2,3]));', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"new Set\\\\(arr\\\\)\",\"message\":\"[1, 2, 2, 3] — one duplicate pair survives because splice() shifted indices mid-loop.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-cpp-iterator-invalidation', 'Iterator Invalidation', 'C++', 'Hard', 180, 36,
  'Erasing elements from a vector while iterating over it with an iterator crashes with undefined behavior.', 'Understand iterator invalidation: erase() invalidates the iterator you just used, so incrementing it afterward is unsafe.', '[\"vec.erase(it) invalidates `it` — using it++ on the invalidated iterator is undefined behavior.\",\"Capture erase()\'s return value (the next valid iterator) instead of incrementing manually.\"]', 'Every even number is removed from the vector with no crash.', 'main.cpp',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (auto it = v.begin(); it != v.end(); it++) {\n        if (*it % 2 == 0) {\n            v.erase(it);\n        }\n    }\n    for (int n : v) cout << n << \" \";\n    return 0;\n}', '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (auto it = v.begin(); it != v.end(); ) {\n        if (*it % 2 == 0) {\n            it = v.erase(it);\n        } else {\n            ++it;\n        }\n    }\n    for (int n : v) cout << n << \" \";\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"it\\\\s*=\\\\s*v\\\\.erase\\\\(it\\\\)\",\"message\":\"Undefined behavior / crash — incrementing an iterator invalidated by erase().\",\"line\":8}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c9-go-infinite-loop-condition', 'Infinite Loop Condition', 'Go', 'Hard', 175, 34,
  'A retry loop with exponential backoff never terminates because the backoff calculation overflows back to zero.', 'Understand integer overflow in a backoff calculation causing an infinite retry loop.', '[\"Repeatedly doubling delay eventually overflows int, wrapping to a negative or zero value, so the exit condition (delay > maxDelay) is never true again.\",\"Cap the delay explicitly before it can overflow.\"]', 'The retry loop terminates once delay reaches the cap, with no overflow.', 'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tdelay := 1\n\tmaxDelay := 1000000000\n\tattempts := 0\n\tfor delay < maxDelay {\n\t\tdelay *= 2\n\t\tattempts++\n\t\tif attempts > 1000000 {\n\t\t\tbreak\n\t\t}\n\t}\n\tfmt.Println(attempts)\n}', 'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tdelay := 1\n\tmaxDelay := 1000000000\n\tattempts := 0\n\tfor delay < maxDelay {\n\t\tdelay *= 2\n\t\tif delay > maxDelay || delay <= 0 {\n\t\t\tdelay = maxDelay\n\t\t}\n\t\tattempts++\n\t}\n\tfmt.Println(attempts)\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"delay\\\\s*<=\\\\s*0\",\"message\":\"Loop runs far longer than expected — repeated doubling can overflow delay back toward zero/negative.\",\"line\":9}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-09-loop-logic', 'Sprint #9: Loop Logic', 'Iteration bugs — infinite loops, wrong conditions, and mutation-while-iterating traps.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 56 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 56 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 1
FROM challenges WHERE slug = 'c9-js-foreach-no-break'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 2
FROM challenges WHERE slug = 'c9-py-infinite-while-no-update'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 3
FROM challenges WHERE slug = 'c9-java-modify-list-foreach'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 4
FROM challenges WHERE slug = 'c9-go-for-range-value-copy'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 5
FROM challenges WHERE slug = 'c9-py-list-remove-while-iterating'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 6
FROM challenges WHERE slug = 'c9-js-array-length-cache'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 7
FROM challenges WHERE slug = 'c9-cpp-iterator-invalidation'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-09-loop-logic'), id, 8
FROM challenges WHERE slug = 'c9-go-infinite-loop-condition'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #10: Frontend Frenzy ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-js-stale-closure-state', 'Stale Closure State', 'JavaScript', 'Easy', 80, 15,
  'A click counter built with setInterval always reports 1, never incrementing past it.', 'Understand how a closure captures the count variable\'s value at creation time, not live.', '[\"The interval callback closes over the initial value of count forever.\",\"Use a functional update / reference the latest value via a ref or by recomputing from state each tick.\"]', 'The counter increments by 1 every tick, indefinitely.', 'counter.js',
  'let count = 0;\n\nfunction startCounter() {\n  setInterval(() => {\n    console.log(count + 1);\n  }, 1000);\n}\n\nstartCounter();', 'let count = 0;\n\nfunction startCounter() {\n  setInterval(() => {\n    count += 1;\n    console.log(count);\n  }, 1000);\n}\n\nstartCounter();', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"count\\\\s*\\\\+=\\\\s*1\",\"message\":\"Always prints 1 — count + 1 is recomputed from the same stale value every tick.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-js-array-mutate-render', 'Array Mutate Render', 'JavaScript', 'Easy', 85, 16,
  'Adding an item to the list doesn\'t trigger a re-render in the (simulated) view layer.', 'Understand why mutating an array in place doesn\'t create a new reference for change detection.', '[\"push() mutates the existing array; a reference-equality check sees no change.\",\"Create a new array with [...items, newItem] instead of mutating in place.\"]', 'Adding an item produces a new array reference, which the view layer detects as changed.', 'list.js',
  'function addItem(items, item) {\n  items.push(item);\n  return items;\n}\n\nconst list = [\"a\"];\nconst updated = addItem(list, \"b\");\nconsole.log(updated === list);', 'function addItem(items, item) {\n  return [...items, item];\n}\n\nconst list = [\"a\"];\nconst updated = addItem(list, \"b\");\nconsole.log(updated === list);', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\[\\\\.\\\\.\\\\.items,\\\\s*item\\\\]\",\"message\":\"true — the returned array is the exact same reference, so a reference-equality check won\'t detect the change.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-ts-event-target-cast', 'Event Target Cast', 'TypeScript', 'Easy', 90, 17,
  'Reading the input\'s value crashes at runtime with \"value is undefined\" for certain event target types.', 'Understand why casting event.target broadly instead of checking its real type is unsafe.', '[\"event.target is typed as EventTarget, which doesn\'t have .value at all — the code force-casts it.\",\"Check instanceof HTMLInputElement before accessing .value.\"]', 'Safely reads .value only when the target really is an input element.', 'form.ts',
  'function handleChange(event: Event) {\n  const value = (event.target as any).value;\n  console.log(value.trim());\n}', 'function handleChange(event: Event) {\n  if (event.target instanceof HTMLInputElement) {\n    console.log(event.target.value.trim());\n  }\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"instanceof\\\\s+HTMLInputElement\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'trim\') — the cast hid a real type mismatch.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-js-debounce-this-binding', 'Debounce This Binding', 'JavaScript', 'Medium', 120, 24,
  'Calling this.updateResults() inside a debounced callback throws \"Cannot read properties of undefined\".', 'Understand how a regular function loses its `this` binding when passed as a callback.', '[\"A regular function() {} used as a callback doesn\'t retain the surrounding `this`.\",\"Use an arrow function, or .bind(this), to preserve the correct context.\"]', 'this correctly refers to the Search instance inside the debounced callback.', 'search.js',
  'class Search {\n  constructor() { this.results = []; }\n  updateResults() { this.results.push(\"done\"); }\n  onType() {\n    setTimeout(function () {\n      this.updateResults();\n    }, 300);\n  }\n}', 'class Search {\n  constructor() { this.results = []; }\n  updateResults() { this.results.push(\"done\"); }\n  onType() {\n    setTimeout(() => {\n      this.updateResults();\n    }, 300);\n  }\n}', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"setTimeout\\\\(\\\\s*\\\\(\\\\)\\\\s*=>\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'updateResults\') — a plain function() loses `this`.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-js-memory-leak-listener', 'Memory Leak Listener', 'JavaScript', 'Medium', 115, 23,
  'Repeatedly opening and closing this widget steadily increases memory usage and duplicate event firing.', 'Understand why an event listener added on open must be removed on close, or it accumulates forever.', '[\"Every call to open() adds a brand-new listener, and none are ever removed.\",\"Store a reference to the handler and call removeEventListener in close().\"]', 'Only one resize listener is ever active at a time, regardless of how many times the widget opens and closes.', 'widget.js',
  'function open(widget) {\n  window.addEventListener(\"resize\", () => widget.reflow());\n}\n\nfunction close(widget) {\n  widget.hide();\n}', 'function open(widget) {\n  widget._resizeHandler = () => widget.reflow();\n  window.addEventListener(\"resize\", widget._resizeHandler);\n}\n\nfunction close(widget) {\n  window.removeEventListener(\"resize\", widget._resizeHandler);\n  widget.hide();\n}', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"removeEventListener\\\\(\\\"resize\\\"\",\"message\":\"Listener count climbs by one every time the widget opens — none are ever cleaned up.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-ts-generic-constraint-missing', 'Generic Constraint Missing', 'TypeScript', 'Medium', 120, 24,
  'sortByKey(users, \'age\') compiles fine but crashes at runtime for a key that isn\'t actually comparable, and TypeScript never warned about it.', 'Understand how an unconstrained generic <T> lets any key name through, even ones that don\'t make sense to sort by.', '[\"function sortByKey<T>(items: T[], key: string) doesn\'t tie key to T\'s actual property names.\",\"Constrain key to `keyof T` so only real property names type-check.\"]', 'Passing an invalid key name is now a compile-time error, not a runtime surprise.', 'sort.ts',
  'function sortByKey<T>(items: T[], key: string): T[] {\n  return [...items].sort((a: any, b: any) => a[key] - b[key]);\n}\n\nconst users = [{ name: \"Ava\", age: 30 }];\nsortByKey(users, \"nonexistentKey\");', 'function sortByKey<T>(items: T[], key: keyof T): T[] {\n  return [...items].sort((a: any, b: any) => a[key] - b[key]);\n}\n\nconst users = [{ name: \"Ava\", age: 30 }];\nsortByKey(users, \"age\");', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"key:\\\\s*keyof\\\\s+T\",\"message\":\"NaN comparisons happen silently at runtime — \'nonexistentKey\' type-checked as a plain string.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-js-recursive-dom-no-base', 'Recursive Dom No Base', 'JavaScript', 'Hard', 180, 36,
  'Rendering a deeply nested (but finite) comment tree causes \"Maximum call stack size exceeded\".', 'Understand why a recursive tree-walk needs a correct base case for nodes with no children.', '[\"The recursive call happens unconditionally, even when node.children is empty or undefined.\",\"Return early when there are no children left to recurse into.\"]', 'Renders a deeply nested tree without any stack overflow.', 'tree.js',
  'function renderNode(node) {\n  const children = node.children.map(renderNode);\n  return { ...node, rendered: true, children };\n}\n\nconst leaf = { id: 1 };\nrenderNode(leaf);', 'function renderNode(node) {\n  const children = (node.children || []).map(renderNode);\n  return { ...node, rendered: true, children };\n}\n\nconst leaf = { id: 1 };\nrenderNode(leaf);', 'browser-console',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\(node\\\\.children\\\\s*\\\\|\\\\|\\\\s*\\\\[\\\\]\\\\)\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'map\') — leaf nodes have no children array at all.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c10-ts-async-race-in-effect', 'Async Race In Effect', 'TypeScript', 'Hard', 185, 37,
  'Typing quickly in the search box sometimes shows stale results from an earlier, slower request that resolved after a newer one.', 'Understand the race condition where an older async request can resolve after a newer one and overwrite its result.', '[\"Nothing tracks which request was the most recently issued.\",\"Track a request id/token and ignore the result if a newer request has since been started.\"]', 'Only the result of the most recently issued search request is ever applied.', 'search.ts',
  'let latestResults: string[] = [];\n\nasync function search(query: string) {\n  const results = await fakeApiCall(query);\n  latestResults = results;\n}\n\nasync function fakeApiCall(query: string): Promise<string[]> {\n  return [query];\n}', 'let latestResults: string[] = [];\nlet latestRequestId = 0;\n\nasync function search(query: string) {\n  const requestId = ++latestRequestId;\n  const results = await fakeApiCall(query);\n  if (requestId === latestRequestId) {\n    latestResults = results;\n  }\n}\n\nasync function fakeApiCall(query: string): Promise<string[]> {\n  return [query];\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"requestId\\\\s*===\\\\s*latestRequestId\",\"message\":\"A slow first keystroke\'s results overwrite a fast, more recent keystroke\'s results.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-10-frontend-frenzy', 'Sprint #10: Frontend Frenzy', 'React, DOM, and browser-state bugs under time pressure.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 63 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 63 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 1
FROM challenges WHERE slug = 'c10-js-stale-closure-state'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 2
FROM challenges WHERE slug = 'c10-js-array-mutate-render'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 3
FROM challenges WHERE slug = 'c10-ts-event-target-cast'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 4
FROM challenges WHERE slug = 'c10-js-debounce-this-binding'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 5
FROM challenges WHERE slug = 'c10-js-memory-leak-listener'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 6
FROM challenges WHERE slug = 'c10-ts-generic-constraint-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 7
FROM challenges WHERE slug = 'c10-js-recursive-dom-no-base'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-10-frontend-frenzy'), id, 8
FROM challenges WHERE slug = 'c10-ts-async-race-in-effect'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #11: Config Catastrophe ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-bash-unset-env-default', 'Unset Env Default', 'Bash', 'Easy', 80, 15,
  'The app crashes on startup with \"port: unbound variable\" whenever PORT isn\'t explicitly set.', 'Understand how to supply a default value for a possibly-unset environment variable.', '[\"$PORT is empty/unset in this environment, and the script uses set -u (nounset).\",\"Use ${PORT:-3000} to fall back to a default when PORT is unset.\"]', 'Starts on port 3000 by default when PORT isn\'t set.', 'start.sh',
  '#!/bin/bash\nset -u\necho \"Starting on port $PORT\"', '#!/bin/bash\nset -u\necho \"Starting on port ${PORT:-3000}\"', 'bash',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\$\\\\{PORT:-3000\\\\}\",\"message\":\"start.sh: line 3: PORT: unbound variable\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-docker-hardcoded-secret', 'Hardcoded Secret', 'Docker', 'Easy', 85, 16,
  'A security scan flags this Dockerfile — the database password is baked directly into the image layer history, visible to anyone with the image.', 'Understand why secrets shouldn\'t be hardcoded in a Dockerfile, even via ENV.', '[\"ENV DB_PASSWORD=... bakes the secret into every layer of the image, extractable with `docker history`.\",\"Pass secrets at runtime (--env-file, secrets manager, or docker secrets) instead of baking them in.\"]', 'No secret value appears anywhere in the built image\'s layers.', 'Dockerfile',
  'FROM node:20-slim\nWORKDIR /app\nENV DB_PASSWORD=SuperSecret123\nCOPY . .\nCMD [\"node\", \"server.js\"]', 'FROM node:20-slim\nWORKDIR /app\nCOPY . .\nCMD [\"node\", \"server.js\"]\n# DB_PASSWORD is now supplied at runtime via --env-file or a secrets manager', 'docker',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"ENV\\\\s+DB_PASSWORD\\\\s*=\",\"message\":\"Security scan: secret found baked into image layer — extractable via `docker history`.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-git-committed-env-file', 'Committed Env File', 'Git', 'Easy', 85, 16,
  'A .env file containing real API keys was accidentally committed and pushed to a public repository.', 'Understand how to purge a sensitive file from git history, not just delete it going forward.', '[\"A plain `git rm .env` + commit only removes it from future commits — it\'s still in history.\",\"Use `git filter-repo` (or BFG) to strip it from every historical commit, then force-push and rotate the leaked keys.\"]', 'The .env file no longer appears in any commit in the repository\'s history.', 'terminal',
  'git rm .env\ngit commit -m \"Remove .env\"\ngit push', 'git filter-repo --path .env --invert-paths\ngit push --force', 'git',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"filter-repo|bfg\",\"flags\":\"i\",\"message\":\"The .env file (and its leaked keys) is still fully recoverable from earlier commits in history.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-yaml-indentation-bug', 'Yaml Indentation Bug', 'Bash', 'Medium', 120, 24,
  'A deployment config value that should be nested under `database` is instead being read as a top-level, unrelated key due to indentation.', 'Understand how YAML\'s meaning entirely depends on exact indentation — a one-space error changes the structure.', '[\"`port:` at the same indentation as `database:` makes it a sibling, not a child.\",\"Indent port so it\'s nested one level under database.\"]', 'port is correctly read as database.port, not a top-level key.', 'deploy.sh',
  'database:\n  host: localhost\nport: 5432', 'database:\n  host: localhost\n  port: 5432', 'bash',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"^port:\\\\s*5432\",\"flags\":\"m\",\"message\":\"Config reads port as a top-level key instead of database.port — one space of indentation changed the whole structure.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-docker-compose-network', 'Compose Network', 'Docker', 'Medium', 125, 25,
  'The app container can\'t reach the database container, even though both are running — connection refused.', 'Understand why services need to be on the same Docker network to resolve each other by service name.', '[\"Without a shared custom network, Compose still creates a default one — but here the services are defined without any way to resolve each other by name because the app is pointed at \'localhost\' instead of the service name.\",\"Use the service name (e.g. \'db\') as the hostname, since Compose\'s internal DNS resolves it automatically.\"]', 'The app connects to the database using the service name as the hostname.', 'docker-compose.yml',
  'services:\n  app:\n    build: .\n    environment:\n      DB_HOST: localhost\n  db:\n    image: postgres:16', 'services:\n  app:\n    build: .\n    environment:\n      DB_HOST: db\n  db:\n    image: postgres:16', 'docker',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"DB_HOST:\\\\s*localhost\",\"message\":\"Connection refused — \'localhost\' inside the app container refers to itself, not the db container.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-php-display-errors-prod', 'Display Errors Prod', 'PHP', 'Medium', 115, 23,
  'A security scan flags the production site — full stack traces including file paths and database credentials appear in error pages visible to any visitor.', 'Understand why display_errors must be off in production, with errors logged instead of shown.', '[\"display_errors = On leaks internal paths, queries, and sometimes credentials to any visitor who triggers an error.\",\"Set display_errors = Off and log_errors = On instead, in production.\"]', 'Errors are logged server-side but never shown to visitors.', 'php.ini',
  'display_errors = On\nlog_errors = Off', 'display_errors = Off\nlog_errors = On', 'php',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"display_errors\\\\s*=\\\\s*On\",\"message\":\"Security scan: stack traces with file paths and query details are visible to any site visitor.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-git-merge-wrong-branch', 'Merge Wrong Branch', 'Git', 'Hard', 180, 36,
  'A hotfix branch was accidentally merged into main before it was reviewed, and now main is broken in production.', 'Understand how to safely undo a merge commit that\'s already been pushed, without rewriting shared history destructively.', '[\"`git reset --hard` on a shared, already-pushed branch rewrites history other people have already pulled — dangerous.\",\"Use `git revert -m 1 <merge-commit-hash>` to create a new commit that safely undoes the merge without rewriting history.\"]', 'main is restored to its pre-merge state via a new revert commit, with history intact for everyone else.', 'terminal',
  'git reset --hard HEAD~1\ngit push --force', 'git revert -m 1 <merge-commit-hash>\ngit push', 'git',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"git revert -m 1\",\"message\":\"Force-pushing a hard reset rewrites history — anyone else who already pulled main now has a broken, diverged branch.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c11-bash-cron-relative-path', 'Cron Relative Path', 'Bash', 'Hard', 175, 34,
  'This backup script works perfectly when run manually, but silently fails every night when triggered by cron.', 'Understand why cron runs scripts with a minimal environment and an unpredictable working directory, breaking relative paths.', '[\"Relative paths like ./data assume a working directory that cron doesn\'t guarantee.\",\"cd to an absolute, known directory (or use absolute paths throughout) at the top of the script.\"]', 'The script behaves identically whether run manually or via cron.', 'backup.sh',
  '#!/bin/bash\ntar -czf backup.tar.gz ./data\ncp backup.tar.gz ./backups/', '#!/bin/bash\ncd /opt/myapp || exit 1\ntar -czf backup.tar.gz ./data\ncp backup.tar.gz ./backups/', 'bash',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"cd\\\\s+/opt/myapp\",\"message\":\"Cron job fails silently — relative paths resolved against cron\'s default working directory, not the app\'s.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-11-config-catastrophe', 'Sprint #11: Config Catastrophe', 'Environment, deployment, and configuration bugs.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 70 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 70 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 1
FROM challenges WHERE slug = 'c11-bash-unset-env-default'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 2
FROM challenges WHERE slug = 'c11-docker-hardcoded-secret'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 3
FROM challenges WHERE slug = 'c11-git-committed-env-file'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 4
FROM challenges WHERE slug = 'c11-yaml-indentation-bug'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 5
FROM challenges WHERE slug = 'c11-docker-compose-network'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 6
FROM challenges WHERE slug = 'c11-php-display-errors-prod'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 7
FROM challenges WHERE slug = 'c11-git-merge-wrong-branch'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-11-config-catastrophe'), id, 8
FROM challenges WHERE slug = 'c11-bash-cron-relative-path'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- --- Sprint #12: Grand Finale ---
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-js-array-sort-mutates', 'Array Sort Mutates', 'JavaScript', 'Easy', 85, 16,
  'Displaying a sorted copy of the leaderboard also silently reorders the original, unsorted source data.', 'Understand that Array.sort() mutates the array in place, rather than returning a new one.', '[\"scores.sort() sorts scores itself, not a copy.\",\"Spread into a new array before sorting: [...scores].sort(...).\"]', 'The original scores array keeps its original order after displaySorted() runs.', 'leaderboard.js',
  'function displaySorted(scores) {\n  return scores.sort((a, b) => b - a);\n}\n\nconst scores = [10, 30, 20];\ndisplaySorted(scores);\nconsole.log(scores);', 'function displaySorted(scores) {\n  return [...scores].sort((a, b) => b - a);\n}\n\nconst scores = [10, 30, 20];\ndisplaySorted(scores);\nconsole.log(scores);', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\[\\\\.\\\\.\\\\.scores\\\\]\\\\.sort\",\"message\":\"Prints [30, 20, 10] — the original array order was silently mutated by sort().\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-py-except-bare-swallow', 'Except Bare Swallow', 'Python', 'Easy', 85, 16,
  'A completely unrelated bug (a typo in a variable name) gets silently swallowed instead of surfacing as an error.', 'Understand why a bare except: hides every kind of error, including ones that have nothing to do with the intended failure case.', '[\"except: (with nothing after it) catches literally everything, including NameError, KeyboardInterrupt, etc.\",\"Catch the specific exception type you actually expect, e.g. except FileNotFoundError:.\"]', 'Only the specifically expected error is silenced; anything else still surfaces.', 'loader.py',
  'def load_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except:\n        return default_confg  # typo — should be default_config', 'def load_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except FileNotFoundError:\n        return default_config', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"except\\\\s+FileNotFoundError\\\\s*:\",\"message\":\"NameError: name \'default_confg\' is not defined — silently swallowed by the bare except.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-sql-null-in-not-in', 'Null In Not In', 'SQL', 'Easy', 90, 17,
  'A NOT IN filter that should exclude a handful of banned user ids returns zero rows entirely, for every user.', 'Understand the classic NOT IN + NULL trap: if the subquery/list contains any NULL, the whole NOT IN evaluates to unknown for every row.', '[\"If banned_ids contains even one NULL, `x NOT IN (list_with_null)` is never true for any x.\",\"Filter out NULLs from the list first, or use NOT EXISTS instead of NOT IN.\"]', 'Correctly excludes only the actually-banned user ids, regardless of any NULLs in the banned list.', 'exclude.sql',
  'SELECT * FROM users WHERE id NOT IN (SELECT banned_id FROM bans);', 'SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM bans b WHERE b.banned_id = u.id);', 'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"users\",\"create\":\"CREATE TABLE users (\\n  id INT AUTO_INCREMENT PRIMARY KEY,\\n  name VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"name\"],\"rows\":[[\"1\",\"Ava\"],[\"2\",\"Ben\"]]}]}', '[{\"type\":\"forbidMatch\",\"pattern\":\"NOT\\\\s+IN\\\\s*\\\\(SELECT\",\"flags\":\"i\",\"message\":\"Returns zero rows for every user — a single NULL in the banned_id subquery poisons the entire NOT IN.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-java-immutable-list-modify', 'Immutable List Modify', 'Java', 'Medium', 120, 24,
  'Adding an item to a list returned from List.of() throws UnsupportedOperationException.', 'Understand that List.of() returns an immutable list, not a regular mutable ArrayList.', '[\"List.of(...) is explicitly documented as immutable — any mutating call throws.\",\"Wrap it in `new ArrayList<>(List.of(...))` if you need a mutable copy.\"]', 'Items can be added freely to the returned list.', 'Main.java',
  'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = List.of(\"a\", \"b\");\n        items.add(\"c\");\n        System.out.println(items);\n    }\n}', 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        items.add(\"c\");\n        System.out.println(items);\n    }\n}', 'java',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"new\\\\s+ArrayList<>\\\\(List\\\\.of\",\"message\":\"Exception in thread \\\"main\\\" java.lang.UnsupportedOperationException\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-go-defer-loop-resource', 'Defer Loop Resource', 'Go', 'Medium', 125, 25,
  'Processing 10,000 files runs out of file descriptors partway through, even though each file is supposedly closed.', 'Understand why defer inside a loop doesn\'t run until the enclosing FUNCTION returns, not each loop iteration.', '[\"defer f.Close() inside a for-loop stacks up thousands of deferred closes that all run only at the end of the function.\",\"Wrap the per-file work in its own function (or explicitly call Close() at the end of each iteration) so each file closes immediately.\"]', 'Each file is closed immediately after it\'s processed, not all at the very end.', 'main.go',
  'package main\n\nimport \"os\"\n\nfunc processAll(paths []string) {\n\tfor _, p := range paths {\n\t\tf, _ := os.Open(p)\n\t\tdefer f.Close()\n\t\t// process f...\n\t}\n}', 'package main\n\nimport \"os\"\n\nfunc processOne(path string) {\n\tf, _ := os.Open(path)\n\tdefer f.Close()\n\t// process f...\n}\n\nfunc processAll(paths []string) {\n\tfor _, p := range paths {\n\t\tprocessOne(p)\n\t}\n}', 'go',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"func\\\\s+processOne\",\"message\":\"too many open files — every defer in the loop waits until processAll fully returns before any file closes.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-cpp-vector-reference-invalidation', 'Vector Reference Invalidation', 'C++', 'Hard', 185, 37,
  'A reference to a vector element becomes garbage after pushing a new element onto the same vector.', 'Understand why push_back can reallocate the vector\'s entire backing storage, invalidating existing references.', '[\"Holding a reference to v[0] and then calling push_back can trigger a reallocation, making that reference dangle.\",\"Re-fetch the reference (or use an index) after any operation that might reallocate the vector.\"]', 'Accesses the element by index after the push_back, avoiding any dangling reference.', 'main.cpp',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    int& first = v[0];\n    for (int i = 0; i < 100; i++) v.push_back(i);\n    cout << first << endl;\n    return 0;\n}', '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    for (int i = 0; i < 100; i++) v.push_back(i);\n    cout << v[0] << endl;\n    return 0;\n}', 'cpp',
  NULL, '[{\"type\":\"forbidMatch\",\"pattern\":\"int&\\\\s+first\\\\s*=\\\\s*v\\\\[0\\\\]\",\"message\":\"Prints an unpredictable garbage value — the vector reallocated during push_back, invalidating the earlier reference.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-py-mutable-class-attribute', 'Mutable Class Attribute', 'Python', 'Hard', 180, 36,
  'Creating two separate ShoppingCart instances and adding an item to one also adds it to the other.', 'Understand why a mutable default defined at the CLASS level (not per-instance) is shared by every instance.', '[\"items = [] as a class attribute is a single list shared by all instances, not a fresh one per object.\",\"Initialize items inside __init__ so each instance gets its own list.\"]', 'Each ShoppingCart instance has its own independent items list.', 'cart.py',
  'class ShoppingCart:\n    items = []\n\n    def add(self, item):\n        self.items.append(item)\n\ncart1 = ShoppingCart()\ncart2 = ShoppingCart()\ncart1.add(\"apple\")\nprint(cart2.items)', 'class ShoppingCart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, item):\n        self.items.append(item)\n\ncart1 = ShoppingCart()\ncart2 = ShoppingCart()\ncart1.add(\"apple\")\nprint(cart2.items)', 'python',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"def\\\\s+__init__\\\\(self\\\\):\\\\s*\\\\n\\\\s*self\\\\.items\\\\s*=\\\\s*\\\\[\\\\]\",\"message\":\"[\'apple\'] — cart2 shows cart1\'s item, because items is one list shared by the whole class.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c12-js-prototype-pollution', 'Prototype Pollution', 'JavaScript', 'Hard', 190, 38,
  'A security audit found that a crafted input with a \"__proto__\" key can inject properties onto every object in the entire application.', 'Understand prototype pollution — recursively merging untrusted keys can reach and corrupt Object.prototype.', '[\"A naive deep-merge that copies any key, including \'__proto__\', can walk up into the shared prototype chain.\",\"Explicitly skip \'__proto__\', \'constructor\', and \'prototype\' keys during merge.\"]', 'A malicious __proto__ key in the input is ignored, and Object.prototype stays clean.', 'merge.js',
  'function merge(target, source) {\n  for (const key in source) {\n    if (typeof source[key] === \"object\") {\n      target[key] = merge(target[key] || {}, source[key]);\n    } else {\n      target[key] = source[key];\n    }\n  }\n  return target;\n}', 'function merge(target, source) {\n  for (const key in source) {\n    if (key === \"__proto__\" || key === \"constructor\" || key === \"prototype\") continue;\n    if (typeof source[key] === \"object\") {\n      target[key] = merge(target[key] || {}, source[key]);\n    } else {\n      target[key] = source[key];\n    }\n  }\n  return target;\n}', 'node',
  NULL, '[{\"type\":\"requireMatch\",\"pattern\":\"key\\\\s*===\\\\s*\\\"__proto__\\\"\",\"message\":\"Security audit: prototype pollution — merge({}, JSON.parse(\'{\\\"__proto__\\\":{\\\"isAdmin\\\":true}}\')) corrupts every object in the app.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp), coins=VALUES(coins),
  bug_report=VALUES(bug_report), objective=VALUES(objective), hints=VALUES(hints), expected_output=VALUES(expected_output),
  file_name=VALUES(file_name), buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code),
  terminal_kind=VALUES(terminal_kind), schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES ('sprint-12-grand-finale', 'Sprint #12: Grand Finale', 'The hardest mix yet — a little bit of everything from the past 11 sprints.', ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 77 DAY), '19:00:00'), ADDTIME(DATE_ADD(DATE_ADD(CURDATE(), INTERVAL (7 - DAYOFWEEK(CURDATE())) DAY), INTERVAL 77 DAY), '20:00:00'))
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 1
FROM challenges WHERE slug = 'c12-js-array-sort-mutates'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 2
FROM challenges WHERE slug = 'c12-py-except-bare-swallow'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 3
FROM challenges WHERE slug = 'c12-sql-null-in-not-in'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 4
FROM challenges WHERE slug = 'c12-java-immutable-list-modify'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 5
FROM challenges WHERE slug = 'c12-go-defer-loop-resource'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 6
FROM challenges WHERE slug = 'c12-cpp-vector-reference-invalidation'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 7
FROM challenges WHERE slug = 'c12-py-mutable-class-attribute'
ON DUPLICATE KEY UPDATE position = VALUES(position);
INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'sprint-12-grand-finale'), id, 8
FROM challenges WHERE slug = 'c12-js-prototype-pollution'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- Done. Sanity checks:
SELECT COUNT(*) AS daily_challenges_scheduled FROM daily_challenges WHERE active_date >= CURDATE();
SELECT COUNT(*) AS contests_scheduled FROM contests;
SELECT slug, start_time, end_time FROM contests ORDER BY start_time;
SELECT c.title AS contest, COUNT(*) AS challenge_count FROM contests c JOIN contest_challenges cc ON cc.contest_id = c.id GROUP BY c.id;

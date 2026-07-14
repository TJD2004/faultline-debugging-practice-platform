-- Faultline — Batch 2: additional practice challenges
-- Covers JavaScript, Python, Java, C, C++, Go, SQL, Bash, PHP
-- 52 new challenges: ~6 per language (mix of Easy/Medium/Hard)
--
-- HOW TO RUN THIS IN MYSQL WORKBENCH:
-- 1. Make sure you've already run the migration below if your table
--    predates the check_rules/solution_code columns:
--
--    ALTER TABLE challenges ADD COLUMN solution_code MEDIUMTEXT NOT NULL AFTER buggy_code;
--    ALTER TABLE challenges ADD COLUMN check_rules JSON NOT NULL AFTER schema_json;
--
-- 2. Open this file in Workbench (File > Open SQL Script) and execute it
--    (the lightning bolt icon, or Ctrl+Shift+Enter) against your faultline schema.
-- 3. Refresh the app — GET /api/challenges will include all of these immediately,
--    no backend restart required.

USE faultline;

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-array-off-by-one',
  'Product list crashes on the last item',
  'JavaScript',
  'Easy',
  80,
  15,
  'The product list works fine until the very last row, then throws \'Cannot read properties of undefined\'.',
  'Spot an off-by-one bug in a manual loop over an array.',
  '[\"arr.length is the count of items, not the last valid index.\",\"The last valid index is arr.length - 1.\"]',
  'Prints all three item names in uppercase with no error.',
  'printAll.js',
  'function printAll(items) {\n  for (let i = 0; i <= items.length; i++) {\n    console.log(items[i].toUpperCase());\n  }\n}\n\nprintAll([\"red\", \"green\", \"blue\"]);',
  'function printAll(items) {\n  for (let i = 0; i < items.length; i++) {\n    console.log(items[i].toUpperCase());\n  }\n}\n\nprintAll([\"red\", \"green\", \"blue\"]);',
  'node',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*items\\\\.length\",\"message\":\"TypeError: Cannot read properties of undefined (reading \'toUpperCase\')\\n    at printAll (printAll.js:3:15)\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-assignment-in-filter',
  'Every user shows up as active',
  'JavaScript',
  'Easy',
  85,
  16,
  'The \'active users\' filter returns every single user, including ones marked inactive — and it\'s silently changing their status too.',
  'Tell the difference between assignment (=) and comparison (===) inside a condition.',
  '[\"A single = inside a condition assigns a value and returns it — it doesn\'t compare anything.\",\"u.status = \\\"active\\\" both sets status to \\\"active\\\" AND evaluates as truthy.\"]',
  'Only users whose status is already \"active\" are returned; nobody\'s data is mutated.',
  'activeUsers.js',
  'function activeUsers(users) {\n  return users.filter(function (u) {\n    return u.status = \"active\";\n  });\n}',
  'function activeUsers(users) {\n  return users.filter(function (u) {\n    return u.status === \"active\";\n  });\n}',
  'node',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"u\\\\.status\\\\s(?<!=)=(?!=)\\\\s*\\\"active\\\"\",\"message\":\"Warning: assignment used as a condition — every user\'s status is being overwritten to \\\"active\\\".\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-switch-fallthrough',
  'Every score classifies as \"positive\"',
  'JavaScript',
  'Easy',
  75,
  14,
  'classify(-5) should return \"negative\" but it always returns \"positive\", no matter what number goes in.',
  'Understand switch-case fallthrough and why break matters.',
  '[\"Without break, execution falls through into the next case after a match.\",\"Each case needs its own break to stop it running into the next one.\"]',
  'classify(-5) returns \"negative\", classify(0) returns \"zero\", classify(5) returns \"positive\".',
  'classify.js',
  'function classify(n) {\n  let result;\n  switch (true) {\n    case n < 0:\n      result = \"negative\";\n    case n === 0:\n      result = \"zero\";\n    default:\n      result = \"positive\";\n  }\n  return result;\n}',
  'function classify(n) {\n  let result;\n  switch (true) {\n    case n < 0:\n      result = \"negative\";\n      break;\n    case n === 0:\n      result = \"zero\";\n      break;\n    default:\n      result = \"positive\";\n  }\n  return result;\n}',
  'node',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"break\\\\s*;\",\"message\":\"classify(-5) returned \\\"positive\\\" — switch fell through every case with no break statements.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-missing-await',
  'Invalid forms still get saved',
  'JavaScript',
  'Medium',
  130,
  26,
  'Form validation was added, but invalid submissions still get saved to the server every time.',
  'Understand why forgetting `await` on an async function silently breaks conditional logic.',
  '[\"An async function always returns a Promise, and a Promise object is always truthy.\",\"Forgetting await means isValid is a Promise, not the real true/false result.\"]',
  'Invalid forms are rejected before saveToServer() is ever called.',
  'handleSave.js',
  'async function handleSave(form) {\n  const isValid = validate(form);\n  if (!isValid) return;\n  saveToServer(form);\n  showSuccessToast();\n}\n\nasync function validate(form) {\n  const result = await callValidationApi(form);\n  return result.valid;\n}',
  'async function handleSave(form) {\n  const isValid = await validate(form);\n  if (!isValid) return;\n  saveToServer(form);\n  showSuccessToast();\n}\n\nasync function validate(form) {\n  const result = await callValidationApi(form);\n  return result.valid;\n}',
  'node',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"=\\\\s*validate\\\\(form\\\\)\",\"message\":\"isValid is a pending Promise (always truthy) — validate() was called without await, so invalid forms pass the check.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-var-closure-loop',
  'Every button logs the same number',
  'JavaScript',
  'Medium',
  125,
  25,
  'Clicking any of the 3 buttons logs \"Button 3 clicked\" — even button 0 and button 1.',
  'Understand how var vs let changes what a closure captures inside a loop.',
  '[\"var is function-scoped, so every closure in the loop shares the exact same i.\",\"let creates a new binding of i for each iteration.\"]',
  'Clicking button 0 logs \"Button 0 clicked\", button 1 logs \"Button 1 clicked\", etc.',
  'setupButtons.js',
  'function setupButtons(buttons) {\n  for (var i = 0; i < buttons.length; i++) {\n    buttons[i].addEventListener(\"click\", function () {\n      console.log(\"Button \" + i + \" clicked\");\n    });\n  }\n}',
  'function setupButtons(buttons) {\n  for (let i = 0; i < buttons.length; i++) {\n    buttons[i].addEventListener(\"click\", function () {\n      console.log(\"Button \" + i + \" clicked\");\n    });\n  }\n}',
  'browser-console',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"for\\\\s*\\\\(\\\\s*var\\\\s+i\",\"message\":\"Every button logs \\\"Button 3 clicked\\\" — var i is shared across all closures instead of one per iteration.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'js-debounce-no-clear',
  'Search box fires a request per keystroke',
  'JavaScript',
  'Hard',
  180,
  36,
  'The search box was supposed to wait until typing stops, but it\'s firing a network request on every single keystroke.',
  'Understand how debounce relies on clearing the previous timer before starting a new one.',
  '[\"Each call to debounce\'s returned function starts a new setTimeout without canceling the old one.\",\"clearTimeout(timer) must run before setTimeout is called again.\"]',
  'Rapid calls only trigger fn() once, after `delay` ms of silence.',
  'debounce.js',
  'function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}',
  'function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}',
  'node',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"clearTimeout\\\\(timer\\\\)\",\"message\":\"5 requests fired for 5 keystrokes within 200ms — the previous timer was never cleared.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-mutable-default-arg',
  'Everyone\'s cart contains other people\'s items',
  'Python',
  'Easy',
  85,
  16,
  'add_item(\"banana\") returns [\"apple\", \"banana\"] even though \"apple\" was added in a completely separate, earlier call.',
  'Understand why a mutable default argument is only evaluated once, at function definition time.',
  '[\"Default argument values in Python are created once, not on every call.\",\"Use None as the default, then create a fresh list inside the function.\"]',
  'add_item(\"banana\") returns just [\"banana\"] when called without an existing cart.',
  'cart.py',
  'def add_item(item, cart=[]):\n    cart.append(item)\n    return cart\n\nprint(add_item(\"apple\"))\nprint(add_item(\"banana\"))',
  'def add_item(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart\n\nprint(add_item(\"apple\"))\nprint(add_item(\"banana\"))',
  'python',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"def\\\\s+add_item\\\\([^)]*cart\\\\s*=\\\\s*\\\\[\\\\]\",\"message\":\"add_item(\\\"banana\\\") returned [\'apple\', \'banana\'] — the default list is shared across every call.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-string-int-compare',
  'Nobody is allowed to vote',
  'Python',
  'Easy',
  80,
  15,
  'can_vote(20) throws a TypeError instead of returning True.',
  'Understand that Python 3 raises TypeError when comparing an int to a str with >=.',
  '[\"\\\"18\\\" is a string, not a number — comparing int >= str isn\'t allowed in Python 3.\",\"Compare against the integer 18, not the string \\\"18\\\".\"]',
  'can_vote(20) returns True, can_vote(16) returns False, with no exception.',
  'voting.py',
  'def can_vote(age):\n    if age >= \"18\":\n        return True\n    return False\n\nprint(can_vote(20))',
  'def can_vote(age):\n    if age >= 18:\n        return True\n    return False\n\nprint(can_vote(20))',
  'python',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"age\\\\s*>=\\\\s*[\\\"\']18[\\\"\']\",\"message\":\"TypeError: \'>=\' not supported between instances of \'int\' and \'str\'\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-is-vs-equals',
  'Perfect scores stopped being recognized',
  'Python',
  'Medium',
  120,
  24,
  'is_valid_score(100) used to work in testing with small numbers, but is_valid_score(1000) never returns \"Perfect!\" in production.',
  'Understand the difference between `is` (identity) and `==` (value equality) for numbers.',
  '[\"CPython caches small integers (-5 to 256), so `is` accidentally works for them.\",\"Larger integers are separate objects each time, so `is` fails even when the value matches — always use == for value comparisons.\"]',
  'is_valid_score(1000) returns \"Perfect!\".',
  'scoring.py',
  'def is_valid_score(score):\n    if score is 1000:\n        return \"Perfect!\"\n    return \"Keep trying\"\n\nprint(is_valid_score(1000))',
  'def is_valid_score(score):\n    if score == 1000:\n        return \"Perfect!\"\n    return \"Keep trying\"\n\nprint(is_valid_score(1000))',
  'python',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"is\\\\s+1000\\\\b\",\"message\":\"SyntaxWarning: \\\"is\\\" with a literal is not reliable for large integers — 1000 is a different object each time.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-dict-mutation-during-iteration',
  'Session cleanup crashes randomly',
  'Python',
  'Medium',
  130,
  26,
  'remove_expired() throws \"RuntimeError: dictionary changed size during iteration\" on some runs but not others.',
  'Understand why you can\'t delete dict keys while iterating over that same dict.',
  '[\"sessions.items() gives you a live view of the dictionary, not a snapshot.\",\"Iterate over list(sessions.items()) to safely loop over a copy while deleting from the original.\"]',
  'All expired sessions are removed with no RuntimeError.',
  'sessions.py',
  'def remove_expired(sessions):\n    for token, expiry in sessions.items():\n        if expiry < 0:\n            del sessions[token]\n    return sessions',
  'def remove_expired(sessions):\n    for token, expiry in list(sessions.items()):\n        if expiry < 0:\n            del sessions[token]\n    return sessions',
  'python',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"in\\\\s+(?<!list\\\\()sessions\\\\.items\\\\(\\\\)\",\"message\":\"RuntimeError: dictionary changed size during iteration\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'py-recursion-base-case',
  'factorial(0) freezes the whole script',
  'Python',
  'Hard',
  175,
  34,
  'factorial(5) works fine, but factorial(0) never returns — it eventually crashes with a RecursionError.',
  'Understand why a recursive function needs to handle every terminating case, including 0.',
  '[\"The base case only checks n == 1, so n = 0 keeps recursing into negative numbers forever.\",\"Change the base case to n <= 1 so it also catches 0.\"]',
  'factorial(0) returns 1 immediately.',
  'factorial.py',
  'def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))',
  'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))',
  'python',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"if\\\\s+n\\\\s*==\\\\s*1\\\\s*:\",\"message\":\"RecursionError: maximum recursion depth exceeded — factorial(0) never hits the base case.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-null-pointer',
  'Startup crashes before anything even prints',
  'Java',
  'Easy',
  80,
  15,
  'The app crashes immediately on launch with a NullPointerException, before any real logic runs.',
  'Understand why an uninitialized static field defaults to null, not an empty value.',
  '[\"A static String field defaults to null until you explicitly assign it.\",\"Calling a method like .toUpperCase() on null throws immediately.\"]',
  'Prints \"GUEST\" with no exception.',
  'Main.java',
  'public class Main {\n    static String name;\n\n    public static void main(String[] args) {\n        System.out.println(name.toUpperCase());\n    }\n}',
  'public class Main {\n    static String name = \"guest\";\n\n    public static void main(String[] args) {\n        System.out.println(name.toUpperCase());\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"name\\\\s*=\\\\s*\\\"[^\\\"]*\\\"\",\"message\":\"Exception in thread \\\"main\\\" java.lang.NullPointerException: Cannot invoke \\\"String.toUpperCase()\\\" because \\\"Main.name\\\" is null\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-array-bounds',
  'Score printer crashes on the last score',
  'Java',
  'Easy',
  80,
  15,
  'The scoreboard printer works for the first two scores, then throws ArrayIndexOutOfBoundsException.',
  'Practice spotting <= vs < in a loop bound against array length.',
  '[\"Valid array indices go from 0 to length - 1.\",\"Using <= scores.length reads one index past the end of the array.\"]',
  'Prints all 3 scores with no exception.',
  'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        int[] scores = {90, 85, 78};\n        for (int i = 0; i <= scores.length; i++) {\n            System.out.println(scores[i]);\n        }\n    }\n}',
  'public class Main {\n    public static void main(String[] args) {\n        int[] scores = {90, 85, 78};\n        for (int i = 0; i < scores.length; i++) {\n            System.out.println(scores[i]);\n        }\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*scores\\\\.length\",\"message\":\"Exception in thread \\\"main\\\" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-string-reference-equality',
  'Confirmation always fails for typed input',
  'Java',
  'Easy',
  85,
  16,
  'Typing exactly \"yes\" into the confirmation box always shows \"Not confirmed\".',
  'Understand why == compares object references for Strings, not their text content.',
  '[\"new String(\\\"yes\\\") creates a new object, so == compares memory addresses, not text.\",\"Use .equals() to compare String content.\"]',
  'Typing \"yes\" prints \"Confirmed\".',
  'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        String input = new String(\"yes\");\n        if (input == \"yes\") {\n            System.out.println(\"Confirmed\");\n        } else {\n            System.out.println(\"Not confirmed\");\n        }\n    }\n}',
  'public class Main {\n    public static void main(String[] args) {\n        String input = new String(\"yes\");\n        if (input.equals(\"yes\")) {\n            System.out.println(\"Confirmed\");\n        } else {\n            System.out.println(\"Not confirmed\");\n        }\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"input\\\\s*==\\\\s*\\\"yes\\\"\",\"message\":\"Prints \\\"Not confirmed\\\" even when input is the text \\\"yes\\\" — == compared object references, not content.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-concurrent-modification',
  'Filtering even numbers throws mid-loop',
  'Java',
  'Medium',
  120,
  24,
  'Removing even numbers from the list throws ConcurrentModificationException partway through.',
  'Understand why modifying a List during a for-each loop over it is unsafe.',
  '[\"A for-each loop uses an Iterator internally that detects structural changes and fails fast.\",\"removeIf() handles safe removal internally without you managing an iterator.\"]',
  'Prints [1, 3, 5] with no exception.',
  'Main.java',
  'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));\n        for (Integer n : nums) {\n            if (n % 2 == 0) {\n                nums.remove(n);\n            }\n        }\n        System.out.println(nums);\n    }\n}',
  'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));\n        nums.removeIf(n -> n % 2 == 0);\n        System.out.println(nums);\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"removeIf\\\\(\",\"message\":\"Exception in thread \\\"main\\\" java.util.ConcurrentModificationException\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-integer-overflow',
  'Large multiplication prints a negative number',
  'Java',
  'Medium',
  125,
  25,
  'Multiplying 100000 by 100000 prints a negative number instead of 10 billion.',
  'Understand int overflow and when you need to widen to long before multiplying.',
  '[\"int in Java is 32-bit; 100000 * 100000 exceeds Integer.MAX_VALUE and silently wraps around.\",\"Declare the result (or cast one operand) as long to get correct 64-bit arithmetic.\"]',
  'Prints 10000000000.',
  'Main.java',
  'public class Main {\n    public static void main(String[] args) {\n        int a = 100000;\n        int b = 100000;\n        int result = a * b;\n        System.out.println(result);\n    }\n}',
  'public class Main {\n    public static void main(String[] args) {\n        int a = 100000;\n        int b = 100000;\n        long result = (long) a * b;\n        System.out.println(result);\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"long\\\\s+result\\\\s*=\",\"message\":\"Prints -727379968 — int multiplication overflowed silently.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'java-hashcode-missing',
  'Duplicate points aren\'t detected in a HashSet',
  'Java',
  'Hard',
  180,
  36,
  'Adding the same Point(1, 2) twice to a HashSet reports a size of 2 instead of 1.',
  'Understand why overriding equals() without hashCode() breaks hash-based collections.',
  '[\"HashSet uses hashCode() first to find a bucket, then equals() within that bucket.\",\"Without a matching hashCode() override, two \'equal\' objects can land in different buckets and never get compared.\"]',
  'points.size() prints 1.',
  'Main.java',
  'import java.util.*;\n\npublic class Main {\n    static class Point {\n        int x, y;\n        Point(int x, int y) { this.x = x; this.y = y; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof Point)) return false;\n            Point p = (Point) o;\n            return x == p.x && y == p.y;\n        }\n    }\n\n    public static void main(String[] args) {\n        Set<Point> points = new HashSet<>();\n        points.add(new Point(1, 2));\n        points.add(new Point(1, 2));\n        System.out.println(points.size());\n    }\n}',
  'import java.util.*;\n\npublic class Main {\n    static class Point {\n        int x, y;\n        Point(int x, int y) { this.x = x; this.y = y; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof Point)) return false;\n            Point p = (Point) o;\n            return x == p.x && y == p.y;\n        }\n\n        @Override\n        public int hashCode() {\n            return Objects.hash(x, y);\n        }\n    }\n\n    public static void main(String[] args) {\n        Set<Point> points = new HashSet<>();\n        points.add(new Point(1, 2));\n        points.add(new Point(1, 2));\n        System.out.println(points.size());\n    }\n}',
  'java',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"public\\\\s+int\\\\s+hashCode\\\\s*\\\\(\\\\s*\\\\)\",\"message\":\"points.size() prints 2 — equals() was overridden but hashCode() wasn\'t, so HashSet can\'t recognize the duplicate.\",\"line\":8}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-array-bounds',
  'Score printer reads garbage on the last value',
  'C',
  'Easy',
  80,
  15,
  'printf prints an unexpected 4th number that was never in the scores array.',
  'Practice catching an off-by-one loop bound in C.',
  '[\"C does no bounds checking — reading scores[3] just reads whatever memory is next.\",\"Change <= to < so the loop stops at the last valid index.\"]',
  'Prints exactly 90, 85, 78 and nothing else.',
  'main.c',
  '#include <stdio.h>\n\nint main() {\n    int scores[3] = {90, 85, 78};\n    for (int i = 0; i <= 3; i++) {\n        printf(\"%d\\n\", scores[i]);\n    }\n    return 0;\n}',
  '#include <stdio.h>\n\nint main() {\n    int scores[3] = {90, 85, 78};\n    for (int i = 0; i < 3; i++) {\n        printf(\"%d\\n\", scores[i]);\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*3\",\"message\":\"Prints a 4th garbage value — scores[3] reads past the end of a 3-element array.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-uninitialized-variable',
  'Total is a different random number every run',
  'C',
  'Easy',
  80,
  15,
  'The sum of 1 through 5 should always be 15, but the program prints a different garbage number every time it runs.',
  'Understand why local variables in C are not automatically zeroed.',
  '[\"An uninitialized local variable holds whatever garbage was already in that memory.\",\"Explicitly initialize total to 0 before accumulating into it.\"]',
  'Prints 15 every time.',
  'main.c',
  '#include <stdio.h>\n\nint main() {\n    int total;\n    for (int i = 1; i <= 5; i++) {\n        total += i;\n    }\n    printf(\"%d\\n\", total);\n    return 0;\n}',
  '#include <stdio.h>\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 5; i++) {\n        total += i;\n    }\n    printf(\"%d\\n\", total);\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"int\\\\s+total\\\\s*=\\\\s*0\\\\s*;\",\"message\":\"Prints an unpredictable garbage number — total was never initialized.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-assignment-in-condition',
  'Every user is treated as an adult',
  'C',
  'Easy',
  85,
  16,
  'Regardless of the age variable\'s actual value, the program always prints \"Just became an adult\".',
  'Understand the classic C bug: = inside an if condition assigns instead of compares.',
  '[\"if (age = 18) assigns 18 to age and then evaluates 18 as true.\",\"Use == to compare values instead of = to assign them.\"]',
  'With age = 20, prints \"Not 18\".',
  'main.c',
  '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age = 18) {\n        printf(\"Just became an adult\\n\");\n    } else {\n        printf(\"Not 18\\n\");\n    }\n    return 0;\n}',
  '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age == 18) {\n        printf(\"Just became an adult\\n\");\n    } else {\n        printf(\"Not 18\\n\");\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"if\\\\s*\\\\(\\\\s*age\\\\s*=(?!=)\\\\s*18\\\\s*\\\\)\",\"message\":\"Prints \\\"Just became an adult\\\" regardless of age — the condition assigns 18 instead of comparing.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-dangling-pointer',
  'Returned array contains garbage values',
  'C',
  'Medium',
  130,
  26,
  'createArray()\'s first element prints an unpredictable value instead of 1.',
  'Understand why returning the address of a local (stack) array is undefined behavior.',
  '[\"A local array is destroyed the instant the function returns — its memory can be reused by anything.\",\"Use malloc() to allocate memory on the heap that survives after the function returns.\"]',
  'Prints 1.',
  'main.c',
  '#include <stdio.h>\n#include <stdlib.h>\n\nint* createArray() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    return arr;\n}\n\nint main() {\n    int* result = createArray();\n    printf(\"%d\\n\", result[0]);\n    return 0;\n}',
  '#include <stdio.h>\n#include <stdlib.h>\n\nint* createArray() {\n    int* arr = malloc(5 * sizeof(int));\n    arr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4; arr[4] = 5;\n    return arr;\n}\n\nint main() {\n    int* result = createArray();\n    printf(\"%d\\n\", result[0]);\n    free(result);\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"malloc\\\\(\",\"message\":\"warning: function returns address of local variable [-Wreturn-local-addr] — the array is destroyed when the function returns.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-memory-leak',
  'Server memory usage climbs and never comes down',
  'C',
  'Medium',
  135,
  27,
  'After handling 1000 requests, the process is using far more memory than it should — and it never goes back down.',
  'Understand why every malloc() needs a matching free().',
  '[\"Memory allocated with malloc() stays reserved until you explicitly free() it.\",\"Free the buffer before processRequest() returns.\"]',
  'Memory usage stays flat across repeated calls.',
  'main.c',
  '#include <stdio.h>\n#include <stdlib.h>\n\nvoid processRequest() {\n    int* buffer = malloc(1024 * sizeof(int));\n    buffer[0] = 42;\n    printf(\"%d\\n\", buffer[0]);\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        processRequest();\n    }\n    return 0;\n}',
  '#include <stdio.h>\n#include <stdlib.h>\n\nvoid processRequest() {\n    int* buffer = malloc(1024 * sizeof(int));\n    buffer[0] = 42;\n    printf(\"%d\\n\", buffer[0]);\n    free(buffer);\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        processRequest();\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"free\\\\(buffer\\\\)\",\"message\":\"Memory usage grows by 4KB per call and never shrinks — buffer is never freed.\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'c-buffer-overflow',
  'Long names crash the greeting function',
  'C',
  'Hard',
  190,
  38,
  'greet() works for short names but crashes (or corrupts other data) for longer ones.',
  'Understand why strcpy() with no bounds checking is a classic buffer-overflow vulnerability.',
  '[\"strcpy() copies until it hits a null terminator, no matter how big the destination buffer is.\",\"strncpy() with an explicit size limit prevents writing past the buffer\'s end.\"]',
  'greet() never writes past the 10-byte buffer, regardless of input length.',
  'main.c',
  '#include <stdio.h>\n#include <string.h>\n\nvoid greet(char* name) {\n    char buffer[10];\n    strcpy(buffer, name);\n    printf(\"Hello, %s!\\n\", buffer);\n}\n\nint main() {\n    greet(\"ThisNameIsWayTooLongForTheBuffer\");\n    return 0;\n}',
  '#include <stdio.h>\n#include <string.h>\n\nvoid greet(char* name) {\n    char buffer[10];\n    strncpy(buffer, name, sizeof(buffer) - 1);\n    buffer[sizeof(buffer) - 1] = \'\\0\';\n    printf(\"Hello, %s!\\n\", buffer);\n}\n\nint main() {\n    greet(\"ThisNameIsWayTooLongForTheBuffer\");\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"strncpy\\\\(\",\"message\":\"*** stack smashing detected ***: terminated — strcpy() overflowed the 10-byte buffer.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-vector-off-by-one',
  'vector.at() throws on the last element',
  'C++',
  'Easy',
  80,
  15,
  'Looping over a 3-element vector throws std::out_of_range on the last iteration.',
  'Practice catching an off-by-one bound against vector::size().',
  '[\"Valid indices run from 0 to size() - 1.\",\"Change <= to < in the loop condition.\"]',
  'Prints 10, 20, 30 with no exception.',
  'main.cpp',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20, 30};\n    for (int i = 0; i <= nums.size(); i++) {\n        cout << nums.at(i) << endl;\n    }\n    return 0;\n}',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20, 30};\n    for (int i = 0; i < nums.size(); i++) {\n        cout << nums.at(i) << endl;\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*nums\\\\.size\\\\(\\\\)\",\"message\":\"terminate called after throwing an instance of \'std::out_of_range\'\\n  what():  vector::_M_range_check\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-unsigned-underflow',
  'Reverse loop over a vector never stops',
  'C++',
  'Easy',
  90,
  17,
  'Looping backward over a vector using size_t hangs or crashes instead of stopping at index 0.',
  'Understand why comparing an unsigned index to >= 0 is always true, and wraps around instead of going negative.',
  '[\"size_t is unsigned — it can never be less than 0.\",\"Use a signed int for a loop that counts down toward and past zero.\"]',
  'Prints 3, 2, 1 and stops.',
  'main.cpp',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    for (size_t i = nums.size() - 1; i >= 0; i--) {\n        cout << nums[i] << endl;\n    }\n    return 0;\n}',
  '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    for (int i = nums.size() - 1; i >= 0; i--) {\n        cout << nums[i] << endl;\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"size_t\\\\s+i\\\\s*=\\\\s*nums\\\\.size\\\\(\\\\)\\\\s*-\\\\s*1\",\"message\":\"Segmentation fault — i is unsigned, so i >= 0 is always true and wraps to a huge number after 0.\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-missing-return',
  'square(4) prints garbage instead of 16',
  'C++',
  'Easy',
  85,
  16,
  'square(4) should print 16 but prints an unpredictable number instead.',
  'Understand why a non-void function must always return a value on every path.',
  '[\"Falling off the end of a non-void function without returning is undefined behavior.\",\"Add return result; at the end of square().\"]',
  'Prints 16.',
  'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    int result = x * x;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}',
  '#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    int result = x * x;\n    return result;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"return\\\\s+result\\\\s*;\",\"message\":\"warning: control reaches end of non-void function [-Wreturn-type] — square(4) prints garbage.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-memory-leak-new',
  'Handling requests slowly exhausts memory',
  'C++',
  'Medium',
  130,
  26,
  'After handling 1000 requests, memory usage has grown far beyond what a single Connection object should need.',
  'Understand why every `new` needs a matching `delete`.',
  '[\"Objects created with new live on the heap until you explicitly delete them.\",\"Add delete conn; once the connection is done being used.\"]',
  'Memory usage stays flat across 1000 calls.',
  'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nclass Connection {\npublic:\n    Connection() { cout << \"Opening connection\" << endl; }\n};\n\nvoid handleRequest() {\n    Connection* conn = new Connection();\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        handleRequest();\n    }\n    return 0;\n}',
  '#include <iostream>\nusing namespace std;\n\nclass Connection {\npublic:\n    Connection() { cout << \"Opening connection\" << endl; }\n};\n\nvoid handleRequest() {\n    Connection* conn = new Connection();\n    delete conn;\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        handleRequest();\n    }\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"delete\\\\s+conn\\\\s*;\",\"message\":\"1000 Connection objects allocated, 0 freed — memory usage grows with every call.\",\"line\":9}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-object-slicing',
  'render() always draws a generic Shape, never a Circle',
  'C++',
  'Medium',
  135,
  27,
  'Passing a Circle into render() prints \"Shape\" instead of \"Circle\", even though draw() is marked virtual.',
  'Understand object slicing — passing a derived object by value truncates it to the base type.',
  '[\"Passing Shape s (by value) copies only the Shape portion of the object — this is \'slicing\'.\",\"Take the parameter by reference (Shape&) to preserve polymorphism.\"]',
  'render(c) prints \"Circle\".',
  'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual void draw() { cout << \"Shape\" << endl; }\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() override { cout << \"Circle\" << endl; }\n};\n\nvoid render(Shape s) {\n    s.draw();\n}\n\nint main() {\n    Circle c;\n    render(c);\n    return 0;\n}',
  '#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual void draw() { cout << \"Shape\" << endl; }\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() override { cout << \"Circle\" << endl; }\n};\n\nvoid render(Shape& s) {\n    s.draw();\n}\n\nint main() {\n    Circle c;\n    render(c);\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"void\\\\s+render\\\\(Shape&\\\\s*s\\\\)\",\"message\":\"Prints \\\"Shape\\\" instead of \\\"Circle\\\" — passing by value sliced off the Circle-specific part of the object.\",\"line\":13}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'cpp-dangling-reference',
  'getValue() reference is corrupted after the call',
  'C++',
  'Hard',
  185,
  37,
  'ref prints an unpredictable garbage number instead of 42 after calling getValue().',
  'Understand why returning a reference to a local (stack) variable is undefined behavior.',
  '[\"The local variable x is destroyed the instant getValue() returns.\",\"Return by value (int, not int&) so the caller gets an actual copy of the data.\"]',
  'Prints 42.',
  'main.cpp',
  '#include <iostream>\nusing namespace std;\n\nint& getValue() {\n    int x = 42;\n    return x;\n}\n\nint main() {\n    int& ref = getValue();\n    cout << ref << endl;\n    return 0;\n}',
  '#include <iostream>\nusing namespace std;\n\nint getValue() {\n    int x = 42;\n    return x;\n}\n\nint main() {\n    int ref = getValue();\n    cout << ref << endl;\n    return 0;\n}',
  'cpp',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"int&\\\\s+getValue\\\\s*\\\\(\\\\s*\\\\)\",\"message\":\"Prints an unpredictable garbage value — ref is a dangling reference to a destroyed stack variable.\",\"line\":4}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-slice-off-by-one',
  'Score printer panics on the last score',
  'Go',
  'Easy',
  80,
  15,
  'The program panics with \'index out of range\' right as it prints the final score.',
  'Practice catching an off-by-one bound against len().',
  '[\"Valid slice indices run from 0 to len(slice) - 1.\",\"Change <= to < in the loop condition.\"]',
  'Prints 90, 85, 78 with no panic.',
  'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := []int{90, 85, 78}\n\tfor i := 0; i <= len(scores); i++ {\n\t\tfmt.Println(scores[i])\n\t}\n}',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := []int{90, 85, 78}\n\tfor i := 0; i < len(scores); i++ {\n\t\tfmt.Println(scores[i])\n\t}\n}',
  'go',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"i\\\\s*<=\\\\s*len\\\\(scores\\\\)\",\"message\":\"panic: runtime error: index out of range [3] with length 3\",\"line\":7}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-ignored-error',
  'Bad input silently becomes zero',
  'Go',
  'Easy',
  85,
  16,
  'Parsing \"not-a-number\" doesn\'t crash — it just silently prints 0 with no indication anything went wrong.',
  'Understand why ignoring a returned error with _ hides real failures.',
  '[\"strconv.Atoi returns (0, error) when parsing fails — the 0 is meaningless without checking err.\",\"Always check `if err != nil` right after a call that can fail.\"]',
  'Prints an error message instead of silently doubling 0.',
  'main.go',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvalue, _ := strconv.Atoi(\"not-a-number\")\n\tfmt.Println(value * 2)\n}',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvalue, err := strconv.Atoi(\"not-a-number\")\n\tif err != nil {\n\t\tfmt.Println(\"invalid number:\", err)\n\t\treturn\n\t}\n\tfmt.Println(value * 2)\n}',
  'go',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\",\\\\s*_\\\\s*:=\\\\s*strconv\\\\.Atoi\",\"message\":\"Prints 0 with no explanation — the parse error was discarded with _.\",\"line\":9},{\"type\":\"requireMatch\",\"pattern\":\"err\\\\s*!=\\\\s*nil\",\"message\":\"The returned error from Atoi is never checked.\",\"line\":10}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-nil-map-write',
  'Adding to the counts map panics',
  'Go',
  'Easy',
  80,
  15,
  'counts[\"apple\"] = 1 panics with \'assignment to entry in nil map\'.',
  'Understand that a declared-but-unmade map is nil and can\'t be written to.',
  '[\"var counts map[string]int declares a nil map — reading from it is fine, but writing panics.\",\"Use make(map[string]int) to actually initialize it.\"]',
  'Prints map[apple:1] with no panic.',
  'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar counts map[string]int\n\tcounts[\"apple\"] = 1\n\tfmt.Println(counts)\n}',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tcounts[\"apple\"] = 1\n\tfmt.Println(counts)\n}',
  'go',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"make\\\\(map\\\\[string\\\\]int\\\\)\",\"message\":\"panic: assignment to entry in nil map\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-goroutine-loop-capture',
  'All three goroutines print the same number',
  'Go',
  'Medium',
  130,
  26,
  'Three goroutines were meant to print 0, 1, and 2 — instead they all print 3, or all print the same repeated number.',
  'Understand how closures inside a loop can capture a shared loop variable.',
  '[\"Every goroutine\'s closure refers to the same i variable, which keeps changing after they\'re launched.\",\"Pass i as a parameter to the goroutine\'s function so each one gets its own copy.\"]',
  'Prints 0, 1, and 2 in some order — never the same number twice.',
  'main.go',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}()\n\t}\n\twg.Wait()\n}',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func(i int) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}(i)\n\t}\n\twg.Wait()\n}',
  'go',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"go func\\\\(i\\\\s+int\\\\)\",\"message\":\"Prints \\\"3 3 3\\\" (or similar) instead of 0, 1, 2 — every goroutine shares the same loop variable.\",\"line\":12}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-concurrent-map-write',
  'Counter panics under concurrent load',
  'Go',
  'Medium',
  135,
  27,
  'Running 100 goroutines that increment a shared map occasionally panics with \'concurrent map writes\', and the final count is often wrong even when it doesn\'t crash.',
  'Understand why maps aren\'t safe for concurrent writes without external synchronization.',
  '[\"A WaitGroup only waits for goroutines to finish — it does nothing to prevent them from writing at the same time.\",\"Add a sync.Mutex and Lock()/Unlock() around the map write.\"]',
  'Prints 100 every time, with no panic.',
  'main.go',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tcounts[\"hits\"]++\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counts[\"hits\"])\n}',
  'package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tvar mu sync.Mutex\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tmu.Lock()\n\t\t\tcounts[\"hits\"]++\n\t\t\tmu.Unlock()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counts[\"hits\"])\n}',
  'go',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"sync\\\\.Mutex\",\"message\":\"fatal error: concurrent map writes\",\"line\":9}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'go-unbuffered-channel-deadlock',
  'Program hangs forever on startup',
  'Go',
  'Hard',
  185,
  37,
  'The program never prints anything — it just hangs until it\'s killed with \'fatal error: all goroutines are asleep - deadlock!\'.',
  'Understand why sending on an unbuffered channel blocks until a receiver is ready.',
  '[\"An unbuffered channel send blocks until something else is ready to receive at the same instant.\",\"A buffered channel with capacity 1 lets the send complete immediately without a concurrent receiver.\"]',
  'Prints 42 with no deadlock.',
  'main.go',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int)\n\tch <- 42\n\tfmt.Println(<-ch)\n}',
  'package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int, 1)\n\tch <- 42\n\tfmt.Println(<-ch)\n}',
  'go',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"make\\\\(chan int,\\\\s*1\\\\)\",\"message\":\"fatal error: all goroutines are asleep - deadlock!\",\"line\":6}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-null-comparison',
  'Unshipped orders report always comes back empty',
  'SQL',
  'Easy',
  80,
  15,
  'The query for unshipped orders returns zero rows, even though the orders table clearly has unshipped orders in it.',
  'Understand why NULL requires IS NULL instead of = NULL.',
  '[\"NULL represents \'unknown\' — comparing anything to NULL with = always yields unknown (never true).\",\"Use IS NULL to correctly test for a NULL value.\"]',
  'Returns every order where shipped_at is NULL.',
  'unshipped_orders.sql',
  'SELECT * FROM orders WHERE shipped_at = NULL;',
  'SELECT * FROM orders WHERE shipped_at IS NULL;',
  'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id            INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id   INT NOT NULL,\\n  shipped_at    TIMESTAMP NULL\\n);\",\"columns\":[\"id\",\"customer_id\",\"shipped_at\"],\"rows\":[[\"1\",\"12\",\"NULL\"],[\"2\",\"14\",\"2026-05-01 10:00\"]]}]}',
  '[{\"type\":\"forbidMatch\",\"pattern\":\"shipped_at\\\\s*=\\\\s*NULL\",\"flags\":\"i\",\"message\":\"Empty result set — comparing to NULL with = always evaluates to unknown, never true.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-missing-where-update',
  'Every product just got discontinued',
  'SQL',
  'Easy',
  90,
  18,
  'Only product #42 was supposed to be marked discontinued — instead the entire catalog is now discontinued.',
  'Understand why UPDATE without a WHERE clause applies to every single row in the table.',
  '[\"Without a WHERE clause, UPDATE modifies every row in the table.\",\"Add WHERE id = 42 to target only the intended row.\"]',
  'Only the row with id = 42 has discontinued set to 1.',
  'discontinue_product.sql',
  'UPDATE products SET discontinued = 1;',
  'UPDATE products SET discontinued = 1 WHERE id = 42;',
  'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"products\",\"create\":\"CREATE TABLE products (\\n  id            INT AUTO_INCREMENT PRIMARY KEY,\\n  name          VARCHAR(255) NOT NULL,\\n  price         DECIMAL(10,2) NOT NULL,\\n  discontinued  TINYINT(1) NOT NULL DEFAULT 0\\n);\",\"columns\":[\"id\",\"name\",\"price\",\"discontinued\"],\"rows\":[[\"42\",\"Wireless Mouse\",\"19.99\",\"0\"],[\"43\",\"USB Cable\",\"5.99\",\"0\"]]}]}',
  '[{\"type\":\"requireMatch\",\"pattern\":\"UPDATE\\\\s+products\\\\s+SET\\\\s+discontinued\\\\s*=\\\\s*1\\\\s+WHERE\",\"flags\":\"i\",\"message\":\"Query OK, 2 rows affected — every product in the table was updated, not just #42.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-missing-group-by',
  'Regional sales report shows only one row',
  'SQL',
  'Medium',
  120,
  24,
  'The per-region sales totals report is only returning a single row instead of one row per region.',
  'Understand why mixing an aggregate function with a plain column requires GROUP BY.',
  '[\"SUM(amount) collapses all rows into one total unless you tell SQL how to group them.\",\"Add GROUP BY region so SUM() is computed per region.\"]',
  'Returns one row per distinct region, each with its own SUM(amount).',
  'regional_sales.sql',
  'SELECT region, SUM(amount) FROM sales;',
  'SELECT region, SUM(amount) FROM sales GROUP BY region;',
  'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"sales\",\"create\":\"CREATE TABLE sales (\\n  id       INT AUTO_INCREMENT PRIMARY KEY,\\n  region   VARCHAR(100) NOT NULL,\\n  amount   DECIMAL(10,2) NOT NULL\\n);\",\"columns\":[\"id\",\"region\",\"amount\"],\"rows\":[[\"1\",\"East\",\"1200.00\"],[\"2\",\"West\",\"900.00\"],[\"3\",\"East\",\"450.00\"]]}]}',
  '[{\"type\":\"requireMatch\",\"pattern\":\"GROUP\\\\s+BY\\\\s+region\",\"flags\":\"i\",\"message\":\"ERROR 1140 (42000): In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column \'sales.region\'\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-cartesian-join',
  'Order report returns way too many rows',
  'SQL',
  'Medium',
  130,
  26,
  'Joining orders with customers is returning thousands of rows — far more than the number of actual orders.',
  'Understand why listing two tables with a comma but no join condition produces a cartesian product.',
  '[\"FROM orders, customers pairs every order with every customer — that\'s rows(orders) × rows(customers).\",\"Use an explicit JOIN ... ON condition to match orders to their actual customer.\"]',
  'Returns exactly one row per order, matched to its correct customer.',
  'order_report.sql',
  'SELECT orders.id, customers.name FROM orders, customers;',
  'SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;',
  'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"orders\",\"create\":\"CREATE TABLE orders (\\n  id            INT AUTO_INCREMENT PRIMARY KEY,\\n  customer_id   INT NOT NULL\\n);\",\"columns\":[\"id\",\"customer_id\"],\"rows\":[[\"1\",\"1\"],[\"2\",\"2\"]]},{\"name\":\"customers\",\"create\":\"CREATE TABLE customers (\\n  id     INT AUTO_INCREMENT PRIMARY KEY,\\n  name   VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"name\"],\"rows\":[[\"1\",\"Ava Kim\"],[\"2\",\"Ben Ruiz\"]]}]}',
  '[{\"type\":\"requireMatch\",\"pattern\":\"ON\\\\s+orders\\\\.customer_id\\\\s*=\\\\s*customers\\\\.id\",\"flags\":\"i\",\"message\":\"Returns rows(orders) × rows(customers) — no join condition means every order is paired with every customer.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'sql-subquery-multiple-rows',
  'Employee lookup errors out for the Sales department',
  'SQL',
  'Hard',
  175,
  34,
  'The query works for most departments, but errors out specifically when looking up anyone in a department matching \'Sales%\'.',
  'Understand why a subquery used with = must return exactly one row, and when to use IN instead.',
  '[\"LIKE \'Sales%\' can match multiple departments (e.g. \'Sales East\' and \'Sales West\'), so the subquery can return more than one id.\",\"Use IN instead of = so the outer query accepts multiple matching department ids.\"]',
  'Returns every employee in any department matching \'Sales%\', with no error.',
  'sales_employees.sql',
  'SELECT name FROM employees WHERE department_id = (SELECT id FROM departments WHERE name LIKE \'Sales%\');',
  'SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE name LIKE \'Sales%\');',
  'sql',
  '{\"dialect\":\"MySQL\",\"tables\":[{\"name\":\"departments\",\"create\":\"CREATE TABLE departments (\\n  id     INT AUTO_INCREMENT PRIMARY KEY,\\n  name   VARCHAR(255) NOT NULL\\n);\",\"columns\":[\"id\",\"name\"],\"rows\":[[\"1\",\"Sales East\"],[\"2\",\"Sales West\"],[\"3\",\"Engineering\"]]},{\"name\":\"employees\",\"create\":\"CREATE TABLE employees (\\n  id              INT AUTO_INCREMENT PRIMARY KEY,\\n  name            VARCHAR(255) NOT NULL,\\n  department_id   INT NOT NULL\\n);\",\"columns\":[\"id\",\"name\",\"department_id\"],\"rows\":[[\"1\",\"Priya R\",\"1\"],[\"2\",\"Leo B\",\"2\"]]}]}',
  '[{\"type\":\"forbidMatch\",\"pattern\":\"department_id\\\\s*=\\\\s*\\\\(SELECT\",\"flags\":\"i\",\"message\":\"ERROR 1242 (21000): Subquery returns more than 1 row\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-unquoted-variable-test',
  'File check reports missing even when the file exists',
  'Bash',
  'Easy',
  80,
  15,
  'The script says \"Not found\" even though \"my report.txt\" is sitting right there in the directory.',
  'Understand why unquoted variables in [ ] tests break on filenames containing spaces.',
  '[\"Without quotes, $filename splits into separate words wherever there\'s whitespace.\",\"Wrap it in double quotes: [ -f \\\"$filename\\\" ].\"]',
  'Prints \"Found it\".',
  'check_file.sh',
  '#!/bin/bash\nfilename=\"my report.txt\"\nif [ -f $filename ]; then\n  echo \"Found it\"\nelse\n  echo \"Not found\"\nfi',
  '#!/bin/bash\nfilename=\"my report.txt\"\nif [ -f \"$filename\" ]; then\n  echo \"Found it\"\nelse\n  echo \"Not found\"\nfi',
  'bash',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"\\\\[\\\\s*-f\\\\s+\\\\$filename\\\\s*\\\\]\",\"message\":\"Not found — the unquoted variable split into two words (\\\"my\\\" and \\\"report.txt\\\"), breaking the test.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-word-splitting-loop',
  'Log processor mangles filenames with spaces',
  'Bash',
  'Easy',
  85,
  16,
  'A log file named \"daily report.log\" gets processed as two separate, broken filenames instead of one.',
  'Understand why looping over an unquoted command substitution word-splits on whitespace.',
  '[\"$(ls *.log) is unquoted, so the shell splits it on every space, not just between filenames.\",\"Loop directly over the glob (for f in *.log) instead of parsing ls output.\"]',
  'Processes \"daily report.log\" as a single filename.',
  'process_logs.sh',
  '#!/bin/bash\nfiles=$(ls *.log)\nfor f in $files; do\n  echo \"Processing $f\"\ndone',
  '#!/bin/bash\nfor f in *.log; do\n  echo \"Processing $f\"\ndone',
  'bash',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"for\\\\s+f\\\\s+in\\\\s+\\\\$files\",\"message\":\"Processing daily / Processing report.log — the filename was split into two words.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-missing-variable-sigil',
  'Greeting prints the literal word \"name\"',
  'Bash',
  'Easy',
  75,
  14,
  'The greeting prints \"Hello, name!\" literally, instead of substituting the actual name.',
  'Understand that bash only expands a variable when it\'s prefixed with $.',
  '[\"Without the $ sigil, bash treats \\\"name\\\" as literal text, not a variable reference.\",\"Use $name inside the string to substitute its value.\"]',
  'Prints \"Hello, World!\".',
  'greet.sh',
  '#!/bin/bash\nname=\"World\"\necho \"Hello, name!\"',
  '#!/bin/bash\nname=\"World\"\necho \"Hello, $name!\"',
  'bash',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"echo \\\"Hello, \\\\$name!\\\"\",\"message\":\"Prints \\\"Hello, name!\\\" literally — missing the $ sigil to reference the variable.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-no-error-checking',
  'Deploy script wipes the wrong directory',
  'Bash',
  'Medium',
  130,
  26,
  'When the target directory doesn\'t exist yet, the script still runs \'rm -rf build\' — but in the wrong place, since cd silently failed.',
  'Understand why a script needs to stop immediately after a failing command instead of continuing.',
  '[\"By default, bash keeps running the next line even if the previous command failed.\",\"Add `set -e` at the top so any failing command stops the whole script immediately.\"]',
  'If cd fails, the script stops immediately instead of running further commands.',
  'deploy.sh',
  '#!/bin/bash\ncd /opt/myapp\nrm -rf build\nmkdir build\ncp -r src/* build/',
  '#!/bin/bash\nset -e\ncd /opt/myapp\nrm -rf build\nmkdir build\ncp -r src/* build/',
  'bash',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"set\\\\s+-e\",\"message\":\"rm -rf build ran in the wrong directory — cd failed silently and the script kept going.\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-arithmetic-string-concat',
  'Total shows \"count+1\" instead of a number',
  'Bash',
  'Medium',
  120,
  24,
  '$total prints the literal text \"count+1\" instead of doing any actual math.',
  'Understand that bash needs $(( )) to perform arithmetic — plain assignment just concatenates text.',
  '[\"total=count+1 is a plain string assignment; bash does no math here.\",\"Use $(( count + 1 )) to actually compute the sum.\"]',
  'Prints \"Total: 6\".',
  'counter.sh',
  '#!/bin/bash\ncount=5\ntotal=count+1\necho \"Total: $total\"',
  '#!/bin/bash\ncount=5\ntotal=$((count + 1))\necho \"Total: $total\"',
  'bash',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"total=\\\\$\\\\(\\\\(count\\\\s*\\\\+\\\\s*1\\\\)\\\\)\",\"message\":\"Prints \\\"Total: count+1\\\" — plain assignment doesn\'t perform arithmetic in bash.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'bash-predictable-tempfile',
  'Concurrent runs corrupt each other\'s temp data',
  'Bash',
  'Hard',
  180,
  36,
  'When this script runs twice at once (e.g. two cron jobs overlapping), the output gets corrupted or mixed between runs.',
  'Understand why a hardcoded, predictable temp filename is unsafe for concurrent or security-sensitive scripts.',
  '[\"A fixed name like /tmp/myapp_temp.txt is shared by every invocation of the script, so concurrent runs collide.\",\"Use mktemp to generate a unique, safely-created temporary file per run.\"]',
  'Each run of the script uses its own unique temp file with no collisions.',
  'process.sh',
  '#!/bin/bash\ntmpfile=\"/tmp/myapp_temp.txt\"\necho \"processing\" > \"$tmpfile\"\ncat \"$tmpfile\"\nrm \"$tmpfile\"',
  '#!/bin/bash\ntmpfile=$(mktemp)\necho \"processing\" > \"$tmpfile\"\ncat \"$tmpfile\"\nrm \"$tmpfile\"',
  'bash',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"tmpfile=\\\\$\\\\(mktemp\\\\)\",\"message\":\"Two concurrent runs both wrote to /tmp/myapp_temp.txt — output got mixed between processes.\",\"line\":2}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-loose-comparison-strpos',
  'Search for a word at the very start always fails',
  'PHP',
  'Easy',
  85,
  16,
  'containsWord(\"hello world\", \"hello\") reports \"Not found\", even though \"hello\" is clearly right there at the start.',
  'Understand the classic PHP gotcha: strpos() returning 0 is falsy under loose comparison.',
  '[\"strpos() returns the position of the match — position 0 means \\\"found at the very start\\\".\",\"0 == false is true in PHP, so == can\'t tell \\\"found at 0\\\" apart from \\\"not found\\\". Use === instead.\"]',
  'Prints \"Found at position 0\".',
  'search.php',
  '<?php\nfunction containsWord($haystack, $needle) {\n    if (strpos($haystack, $needle) == false) {\n        return \"Not found\";\n    }\n    return \"Found at position \" . strpos($haystack, $needle);\n}\n\necho containsWord(\"hello world\", \"hello\");',
  '<?php\nfunction containsWord($haystack, $needle) {\n    if (strpos($haystack, $needle) === false) {\n        return \"Not found\";\n    }\n    return \"Found at position \" . strpos($haystack, $needle);\n}\n\necho containsWord(\"hello world\", \"hello\");',
  'php',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"strpos\\\\([^)]*\\\\)\\\\s*==(?!=)\\\\s*false\",\"message\":\"Prints \\\"Not found\\\" even though \\\"hello\\\" is at position 0 — 0 == false is true in PHP\'s loose comparison.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-undefined-array-key',
  'Users without an email on file crash the page',
  'PHP',
  'Easy',
  80,
  15,
  'getUserName() throws a Warning: Undefined array key \"name\" whenever a user record doesn\'t include that field.',
  'Understand how to safely access array keys that might not exist.',
  '[\"Accessing a missing array key raises a warning and returns null.\",\"The null coalescing operator ?? gives a fallback value when a key is missing.\"]',
  'Prints \"Guest\" for a user with no name field, with no warning.',
  'user.php',
  '<?php\nfunction getUserName($user) {\n    return $user[\'name\'];\n}\n\n$user = [\"email\" => \"a@example.com\"];\necho getUserName($user);',
  '<?php\nfunction getUserName($user) {\n    return $user[\'name\'] ?? \'Guest\';\n}\n\n$user = [\"email\" => \"a@example.com\"];\necho getUserName($user);',
  'php',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"\\\\$user\\\\[\'name\'\\\\]\\\\s*\\\\?\\\\?\",\"message\":\"Warning: Undefined array key \\\"name\\\" in user.php\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-array-off-by-one',
  'Fruit list throws a warning on the last item',
  'PHP',
  'Easy',
  80,
  15,
  'Looping over a 3-item array prints a warning and an empty value on the final iteration.',
  'Practice catching an off-by-one bound against count().',
  '[\"Valid array indices run from 0 to count($arr) - 1.\",\"Change <= to < in the loop condition.\"]',
  'Prints apple, banana, cherry with no warning.',
  'fruits.php',
  '<?php\n$fruits = [\"apple\", \"banana\", \"cherry\"];\nfor ($i = 0; $i <= count($fruits); $i++) {\n    echo $fruits[$i] . \"\\n\";\n}',
  '<?php\n$fruits = [\"apple\", \"banana\", \"cherry\"];\nfor ($i = 0; $i < count($fruits); $i++) {\n    echo $fruits[$i] . \"\\n\";\n}',
  'php',
  NULL,
  '[{\"type\":\"forbidMatch\",\"pattern\":\"\\\\$i\\\\s*<=\\\\s*count\\\\(\\\\$fruits\\\\)\",\"message\":\"Warning: Undefined array key 3 in fruits.php\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-sql-injection',
  'Login lookup is vulnerable to SQL injection',
  'PHP',
  'Medium',
  140,
  28,
  'A security scan flagged findUser() — a username like `\' OR \'1\'=\'1` returns every user in the table.',
  'Understand why concatenating user input directly into SQL is dangerous, and how prepared statements fix it.',
  '[\"String concatenation lets user input change the actual structure of the SQL query.\",\"Use $pdo->prepare() with a bound parameter instead of concatenating the value in.\"]',
  'The username is safely bound as a parameter — it can never alter the query\'s structure.',
  'user_lookup.php',
  '<?php\nfunction findUser($pdo, $username) {\n    $query = \"SELECT * FROM users WHERE username = \'\" . $username . \"\'\";\n    return $pdo->query($query);\n}',
  '<?php\nfunction findUser($pdo, $username) {\n    $stmt = $pdo->prepare(\"SELECT * FROM users WHERE username = ?\");\n    $stmt->execute([$username]);\n    return $stmt;\n}',
  'php',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"prepare\\\\(\",\"message\":\"Security scan: SQL injection vulnerability — username \\\"\' OR \'1\'=\'1\\\" returned every row in the users table.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-foreach-reference-leak',
  'Second pass over the array corrupts its last element',
  'PHP',
  'Medium',
  135,
  27,
  'doubleValues([1, 2, 3]) should return [2, 4, 6] but the last element comes back wrong or duplicated.',
  'Understand the classic PHP foreach-by-reference gotcha, and why you must unset() the reference afterward.',
  '[\"foreach ($arr as &$n) leaves $n as a reference to the array\'s last element even after the loop ends.\",\"unset($n) right after the loop breaks that dangling reference before it\'s reused.\"]',
  'Returns [3, 5, 7] — doubled then incremented, with no corruption.',
  'transform.php',
  '<?php\nfunction doubleValues(&$numbers) {\n    foreach ($numbers as &$n) {\n        $n *= 2;\n    }\n    foreach ($numbers as $n) {\n        $n += 1;\n    }\n    return $numbers;\n}\n\n$nums = [1, 2, 3];\nprint_r(doubleValues($nums));',
  '<?php\nfunction doubleValues(&$numbers) {\n    foreach ($numbers as &$n) {\n        $n *= 2;\n    }\n    unset($n);\n    foreach ($numbers as $n) {\n        $n += 1;\n    }\n    return $numbers;\n}\n\n$nums = [1, 2, 3];\nprint_r(doubleValues($nums));',
  'php',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"unset\\\\(\\\\$n\\\\)\",\"message\":\"print_r shows the last element corrupted — the dangling reference from the first foreach leaked into the second.\",\"line\":5}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

INSERT INTO challenges
  (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, expected_output, file_name, buggy_code, solution_code, terminal_kind, schema_json, check_rules)
VALUES (
  'php-magic-hash-comparison',
  'Completely different tokens are accepted as matching',
  'PHP',
  'Hard',
  190,
  38,
  'A security audit found that certain unrelated tokens (like \"0e123456\" and \"0e654321\") are treated as equal by the verification check.',
  'Understand the PHP \'magic hash\' bug — == treats certain numeric-looking strings as scientific notation.',
  '[\"PHP\'s == performs type juggling: \\\"0e123456\\\" == \\\"0e654321\\\" is true because both look like 0 in scientific notation.\",\"hash_equals() does a type-safe, constant-time string comparison with no juggling.\"]',
  'Only the exact matching token is accepted; unrelated \"0e...\" strings are correctly rejected.',
  'verify.php',
  '<?php\nfunction verifyToken($providedHash, $expectedHash) {\n    if ($providedHash == $expectedHash) {\n        return true;\n    }\n    return false;\n}',
  '<?php\nfunction verifyToken($providedHash, $expectedHash) {\n    return hash_equals($expectedHash, $providedHash);\n}',
  'php',
  NULL,
  '[{\"type\":\"requireMatch\",\"pattern\":\"hash_equals\\\\(\",\"message\":\"verifyToken(\\\"0e123456\\\", \\\"0e654321\\\") returned true — PHP\'s == treats both as 0 in scientific notation.\",\"line\":3}]'
)
ON DUPLICATE KEY UPDATE
  title=VALUES(title), lang=VALUES(lang), difficulty=VALUES(difficulty), xp=VALUES(xp),
  coins=VALUES(coins), bug_report=VALUES(bug_report), objective=VALUES(objective),
  hints=VALUES(hints), expected_output=VALUES(expected_output), file_name=VALUES(file_name),
  buggy_code=VALUES(buggy_code), solution_code=VALUES(solution_code), terminal_kind=VALUES(terminal_kind),
  schema_json=VALUES(schema_json), check_rules=VALUES(check_rules);

-- Done. Sanity check:
SELECT lang, difficulty, COUNT(*) AS total FROM challenges GROUP BY lang, difficulty ORDER BY lang, FIELD(difficulty,'Easy','Medium','Hard','Expert');

/**
 * All practice challenges. Consolidated from the original 4 seed challenges
 * plus every challenge added later via sql/002 and sql/007.
 */
const CHALLENGES = [
  {
    "slug": "react-infinite-fetch",
    "title": "The dashboard keeps freezing the tab",
    "lang": "React",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 25,
    "bugReport": "Users report the analytics dashboard becomes unresponsive a few seconds after loading. The network tab shows hundreds of repeated requests to /api/stats.",
    "objective": "Understand how the useEffect dependency array controls re-execution.",
    "hints": [
      "useEffect re-runs every render unless you give it a dependency array.",
      "An empty dependency array means \"run once, after the first render.\""
    ],
    "expectedOutput": "Stats fetched exactly once on mount. Console shows a single 'Fetched stats' log.",
    "fileName": "AnalyticsPanel.jsx",
    "terminalKind": "browser-console",
    "buggyCode": "import { useEffect, useState } from \"react\";\n\nfunction AnalyticsPanel() {\n  const [stats, setStats] = useState(null);\n\n  useEffect(() => {\n    fetch(\"/api/stats\")\n      .then((r) => r.json())\n      .then((data) => {\n        console.log(\"Fetched stats\");\n        setStats(data);\n      });\n  });\n\n  if (!stats) return <p>Loading...</p>;\n  return <div>{stats.visitors} visitors today</div>;\n}\n\nexport default AnalyticsPanel;",
    "solution": "import { useEffect, useState } from \"react\";\n\nfunction AnalyticsPanel() {\n  const [stats, setStats] = useState(null);\n\n  useEffect(() => {\n    fetch(\"/api/stats\")\n      .then((r) => r.json())\n      .then((data) => {\n        console.log(\"Fetched stats\");\n        setStats(data);\n      });\n  }, []);\n\n  if (!stats) return <p>Loading...</p>;\n  return <div>{stats.visitors} visitors today</div>;\n}\n\nexport default AnalyticsPanel;",
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\}\\s*,\\s*\\[\\s*\\]\\s*\\)\\s*;?",
        "message": "React Hook useEffect has a missing dependency array. This causes it to run after every render, creating an infinite fetch loop.",
        "line": 12
      }
    ]
  },
  {
    "slug": "python-off-by-one",
    "title": "Grade report crashes on the last student",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The script works for every student except it throws IndexError right as it finishes processing the roster.",
    "objective": "Practice reading a Python traceback and spotting off-by-one errors in range().",
    "hints": [
      "range(len(arr)) already covers every valid index of arr.",
      "Adding +1 pushes the loop one index past the end of the list."
    ],
    "expectedOutput": "Prints every student's grade with no traceback.",
    "fileName": "grades.py",
    "terminalKind": "python",
    "buggyCode": "students = [\"Ava\", \"Ben\", \"Cleo\"]\nscores = [92, 81, 76]\n\ndef report(students, scores):\n    for i in range(len(students) + 1):\n        print(f\"{students[i]}: {scores[i]}\")\n\nreport(students, scores)",
    "solution": "students = [\"Ava\", \"Ben\", \"Cleo\"]\nscores = [92, 81, 76]\n\ndef report(students, scores):\n    for i in range(len(students)):\n        print(f\"{students[i]}: {scores[i]}\")\n\nreport(students, scores)",
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "range\\s*\\(\\s*len\\s*\\(\\s*\\w+\\s*\\)\\s*\\+\\s*1\\s*\\)",
        "message": "Traceback (most recent call last):\n  File \"grades.py\", line 6, in report\n    print(f\"{students[i]}: {scores[i]}\")\nIndexError: list index out of range",
        "line": 5
      }
    ]
  },
  {
    "slug": "express-double-response",
    "title": "API randomly returns 500 in production",
    "lang": "Node",
    "difficulty": "Hard",
    "xp": 160,
    "coins": 35,
    "bugReport": "Intermittently, requests to POST /login fail with \"Cannot set headers after they are sent to the client.\" It only happens for invalid passwords.",
    "objective": "Learn why every branch of an Express handler needs to stop execution after sending a response.",
    "hints": [
      "If a response is sent inside an if-block, code below it still keeps running unless you return.",
      "Two res.send() calls on the same request will crash the handler."
    ],
    "expectedOutput": "Invalid password returns a single 401 JSON response, nothing after it executes.",
    "fileName": "authController.js",
    "terminalKind": "node",
    "buggyCode": "app.post(\"/login\", (req, res) => {\n  const { username, password } = req.body;\n  const user = findUser(username);\n\n  if (!user || user.password !== password) {\n    res.status(401).json({ error: \"Invalid credentials\" });\n  }\n\n  const token = signToken(user);\n  res.status(200).json({ token });\n});",
    "solution": "app.post(\"/login\", (req, res) => {\n  const { username, password } = req.body;\n  const user = findUser(username);\n\n  if (!user || user.password !== password) {\n    return res.status(401).json({ error: \"Invalid credentials\" });\n  }\n\n  const token = signToken(user);\n  res.status(200).json({ token });\n});",
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "return\\s+res\\.status\\(401\\)",
        "message": "Error: Cannot set headers after they are sent to the client\n    at ServerResponse.setHeader (node:_http_outgoing:...)\n    at authController.js:9:7",
        "line": 6
      }
    ]
  },
  {
    "slug": "sql-duplicate-key",
    "title": "Signups fail for returning users",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 18,
    "bugReport": "New user signup works once per email, then fails every time afterward — even for a completely different user object with the same generated id.",
    "objective": "Understand primary key uniqueness and why hardcoding an id causes duplicate key violations.",
    "hints": [
      "A PRIMARY KEY column must be unique across every row in the table.",
      "Let the database generate the id (AUTO_INCREMENT) instead of hardcoding it."
    ],
    "expectedOutput": "INSERT succeeds for every new signup, each row getting its own auto-generated id.",
    "fileName": "insert_user.sql",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "users",
          "create": "CREATE TABLE users (\n  id             INT AUTO_INCREMENT PRIMARY KEY,\n  email          VARCHAR(255) UNIQUE NOT NULL,\n  password_hash  TEXT NOT NULL,\n  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
          "columns": [
            "id",
            "email",
            "password_hash",
            "created_at"
          ],
          "rows": [
            [
              "1",
              "ava.k@example.com",
              "$2b$10$••••••••••••",
              "2026-05-11 09:14"
            ],
            [
              "2",
              "ben.r@example.com",
              "$2b$10$••••••••••••",
              "2026-05-14 18:02"
            ]
          ]
        }
      ]
    },
    "buggyCode": "INSERT INTO users (id, email, password_hash)\nVALUES (1, 'new.user@example.com', '$2b$10$abcdefghijklmnopqrstuv');",
    "solution": "INSERT INTO users (email, password_hash)\nVALUES ('new.user@example.com', '$2b$10$abcdefghijklmnopqrstuv');",
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "INSERT\\s+INTO\\s+users\\s*\\(\\s*id\\s*,",
        "flags": "i",
        "message": "ERROR 1062 (23000): Duplicate entry '1' for key 'users.PRIMARY'",
        "line": 1
      }
    ]
  },
  {
    "slug": "js-array-off-by-one",
    "title": "Product list crashes on the last item",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The product list works fine until the very last row, then throws 'Cannot read properties of undefined'.",
    "objective": "Spot an off-by-one bug in a manual loop over an array.",
    "hints": [
      "arr.length is the count of items, not the last valid index.",
      "The last valid index is arr.length - 1."
    ],
    "expectedOutput": "Prints all three item names in uppercase with no error.",
    "fileName": "printAll.js",
    "buggyCode": "function printAll(items) {\n  for (let i = 0; i <= items.length; i++) {\n    console.log(items[i].toUpperCase());\n  }\n}\n\nprintAll([\"red\", \"green\", \"blue\"]);",
    "solution": "function printAll(items) {\n  for (let i = 0; i < items.length; i++) {\n    console.log(items[i].toUpperCase());\n  }\n}\n\nprintAll([\"red\", \"green\", \"blue\"]);",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*items\\.length",
        "message": "TypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at printAll (printAll.js:3:15)",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-assignment-in-filter",
    "title": "Every user shows up as active",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "The 'active users' filter returns every single user, including ones marked inactive — and it's silently changing their status too.",
    "objective": "Tell the difference between assignment (=) and comparison (===) inside a condition.",
    "hints": [
      "A single = inside a condition assigns a value and returns it — it doesn't compare anything.",
      "u.status = \"active\" both sets status to \"active\" AND evaluates as truthy."
    ],
    "expectedOutput": "Only users whose status is already \"active\" are returned; nobody's data is mutated.",
    "fileName": "activeUsers.js",
    "buggyCode": "function activeUsers(users) {\n  return users.filter(function (u) {\n    return u.status = \"active\";\n  });\n}",
    "solution": "function activeUsers(users) {\n  return users.filter(function (u) {\n    return u.status === \"active\";\n  });\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "u\\.status\\s(?<!=)=(?!=)\\s*\"active\"",
        "message": "Warning: assignment used as a condition — every user's status is being overwritten to \"active\".",
        "line": 3
      }
    ]
  },
  {
    "slug": "js-switch-fallthrough",
    "title": "Every score classifies as \"positive\"",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 75,
    "coins": 14,
    "bugReport": "classify(-5) should return \"negative\" but it always returns \"positive\", no matter what number goes in.",
    "objective": "Understand switch-case fallthrough and why break matters.",
    "hints": [
      "Without break, execution falls through into the next case after a match.",
      "Each case needs its own break to stop it running into the next one."
    ],
    "expectedOutput": "classify(-5) returns \"negative\", classify(0) returns \"zero\", classify(5) returns \"positive\".",
    "fileName": "classify.js",
    "buggyCode": "function classify(n) {\n  let result;\n  switch (true) {\n    case n < 0:\n      result = \"negative\";\n    case n === 0:\n      result = \"zero\";\n    default:\n      result = \"positive\";\n  }\n  return result;\n}",
    "solution": "function classify(n) {\n  let result;\n  switch (true) {\n    case n < 0:\n      result = \"negative\";\n      break;\n    case n === 0:\n      result = \"zero\";\n      break;\n    default:\n      result = \"positive\";\n  }\n  return result;\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "break\\s*;",
        "message": "classify(-5) returned \"positive\" — switch fell through every case with no break statements.",
        "line": 5
      }
    ]
  },
  {
    "slug": "js-missing-await",
    "title": "Invalid forms still get saved",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "Form validation was added, but invalid submissions still get saved to the server every time.",
    "objective": "Understand why forgetting `await` on an async function silently breaks conditional logic.",
    "hints": [
      "An async function always returns a Promise, and a Promise object is always truthy.",
      "Forgetting await means isValid is a Promise, not the real true/false result."
    ],
    "expectedOutput": "Invalid forms are rejected before saveToServer() is ever called.",
    "fileName": "handleSave.js",
    "buggyCode": "async function handleSave(form) {\n  const isValid = validate(form);\n  if (!isValid) return;\n  saveToServer(form);\n  showSuccessToast();\n}\n\nasync function validate(form) {\n  const result = await callValidationApi(form);\n  return result.valid;\n}",
    "solution": "async function handleSave(form) {\n  const isValid = await validate(form);\n  if (!isValid) return;\n  saveToServer(form);\n  showSuccessToast();\n}\n\nasync function validate(form) {\n  const result = await callValidationApi(form);\n  return result.valid;\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "=\\s*validate\\(form\\)",
        "message": "isValid is a pending Promise (always truthy) — validate() was called without await, so invalid forms pass the check.",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-var-closure-loop",
    "title": "Every button logs the same number",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Clicking any of the 3 buttons logs \"Button 3 clicked\" — even button 0 and button 1.",
    "objective": "Understand how var vs let changes what a closure captures inside a loop.",
    "hints": [
      "var is function-scoped, so every closure in the loop shares the exact same i.",
      "let creates a new binding of i for each iteration."
    ],
    "expectedOutput": "Clicking button 0 logs \"Button 0 clicked\", button 1 logs \"Button 1 clicked\", etc.",
    "fileName": "setupButtons.js",
    "buggyCode": "function setupButtons(buttons) {\n  for (var i = 0; i < buttons.length; i++) {\n    buttons[i].addEventListener(\"click\", function () {\n      console.log(\"Button \" + i + \" clicked\");\n    });\n  }\n}",
    "solution": "function setupButtons(buttons) {\n  for (let i = 0; i < buttons.length; i++) {\n    buttons[i].addEventListener(\"click\", function () {\n      console.log(\"Button \" + i + \" clicked\");\n    });\n  }\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "for\\s*\\(\\s*var\\s+i",
        "message": "Every button logs \"Button 3 clicked\" — var i is shared across all closures instead of one per iteration.",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-debounce-no-clear",
    "title": "Search box fires a request per keystroke",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "The search box was supposed to wait until typing stops, but it's firing a network request on every single keystroke.",
    "objective": "Understand how debounce relies on clearing the previous timer before starting a new one.",
    "hints": [
      "Each call to debounce's returned function starts a new setTimeout without canceling the old one.",
      "clearTimeout(timer) must run before setTimeout is called again."
    ],
    "expectedOutput": "Rapid calls only trigger fn() once, after `delay` ms of silence.",
    "fileName": "debounce.js",
    "buggyCode": "function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
    "solution": "function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "clearTimeout\\(timer\\)",
        "message": "5 requests fired for 5 keystrokes within 200ms — the previous timer was never cleared.",
        "line": 3
      }
    ]
  },
  {
    "slug": "py-mutable-default-arg",
    "title": "Everyone's cart contains other people's items",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "add_item(\"banana\") returns [\"apple\", \"banana\"] even though \"apple\" was added in a completely separate, earlier call.",
    "objective": "Understand why a mutable default argument is only evaluated once, at function definition time.",
    "hints": [
      "Default argument values in Python are created once, not on every call.",
      "Use None as the default, then create a fresh list inside the function."
    ],
    "expectedOutput": "add_item(\"banana\") returns just [\"banana\"] when called without an existing cart.",
    "fileName": "cart.py",
    "buggyCode": "def add_item(item, cart=[]):\n    cart.append(item)\n    return cart\n\nprint(add_item(\"apple\"))\nprint(add_item(\"banana\"))",
    "solution": "def add_item(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart\n\nprint(add_item(\"apple\"))\nprint(add_item(\"banana\"))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "def\\s+add_item\\([^)]*cart\\s*=\\s*\\[\\]",
        "message": "add_item(\"banana\") returned ['apple', 'banana'] — the default list is shared across every call.",
        "line": 1
      }
    ]
  },
  {
    "slug": "py-string-int-compare",
    "title": "Nobody is allowed to vote",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "can_vote(20) throws a TypeError instead of returning True.",
    "objective": "Understand that Python 3 raises TypeError when comparing an int to a str with >=.",
    "hints": [
      "\"18\" is a string, not a number — comparing int >= str isn't allowed in Python 3.",
      "Compare against the integer 18, not the string \"18\"."
    ],
    "expectedOutput": "can_vote(20) returns True, can_vote(16) returns False, with no exception.",
    "fileName": "voting.py",
    "buggyCode": "def can_vote(age):\n    if age >= \"18\":\n        return True\n    return False\n\nprint(can_vote(20))",
    "solution": "def can_vote(age):\n    if age >= 18:\n        return True\n    return False\n\nprint(can_vote(20))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "age\\s*>=\\s*[\"']18[\"']",
        "message": "TypeError: '>=' not supported between instances of 'int' and 'str'",
        "line": 2
      }
    ]
  },
  {
    "slug": "py-is-vs-equals",
    "title": "Perfect scores stopped being recognized",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "is_valid_score(100) used to work in testing with small numbers, but is_valid_score(1000) never returns \"Perfect!\" in production.",
    "objective": "Understand the difference between `is` (identity) and `==` (value equality) for numbers.",
    "hints": [
      "CPython caches small integers (-5 to 256), so `is` accidentally works for them.",
      "Larger integers are separate objects each time, so `is` fails even when the value matches — always use == for value comparisons."
    ],
    "expectedOutput": "is_valid_score(1000) returns \"Perfect!\".",
    "fileName": "scoring.py",
    "buggyCode": "def is_valid_score(score):\n    if score is 1000:\n        return \"Perfect!\"\n    return \"Keep trying\"\n\nprint(is_valid_score(1000))",
    "solution": "def is_valid_score(score):\n    if score == 1000:\n        return \"Perfect!\"\n    return \"Keep trying\"\n\nprint(is_valid_score(1000))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "is\\s+1000\\b",
        "message": "SyntaxWarning: \"is\" with a literal is not reliable for large integers — 1000 is a different object each time.",
        "line": 2
      }
    ]
  },
  {
    "slug": "py-dict-mutation-during-iteration",
    "title": "Session cleanup crashes randomly",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "remove_expired() throws \"RuntimeError: dictionary changed size during iteration\" on some runs but not others.",
    "objective": "Understand why you can't delete dict keys while iterating over that same dict.",
    "hints": [
      "sessions.items() gives you a live view of the dictionary, not a snapshot.",
      "Iterate over list(sessions.items()) to safely loop over a copy while deleting from the original."
    ],
    "expectedOutput": "All expired sessions are removed with no RuntimeError.",
    "fileName": "sessions.py",
    "buggyCode": "def remove_expired(sessions):\n    for token, expiry in sessions.items():\n        if expiry < 0:\n            del sessions[token]\n    return sessions",
    "solution": "def remove_expired(sessions):\n    for token, expiry in list(sessions.items()):\n        if expiry < 0:\n            del sessions[token]\n    return sessions",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "in\\s+(?<!list\\()sessions\\.items\\(\\)",
        "message": "RuntimeError: dictionary changed size during iteration",
        "line": 2
      }
    ]
  },
  {
    "slug": "py-recursion-base-case",
    "title": "factorial(0) freezes the whole script",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "factorial(5) works fine, but factorial(0) never returns — it eventually crashes with a RecursionError.",
    "objective": "Understand why a recursive function needs to handle every terminating case, including 0.",
    "hints": [
      "The base case only checks n == 1, so n = 0 keeps recursing into negative numbers forever.",
      "Change the base case to n <= 1 so it also catches 0."
    ],
    "expectedOutput": "factorial(0) returns 1 immediately.",
    "fileName": "factorial.py",
    "buggyCode": "def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))",
    "solution": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "if\\s+n\\s*==\\s*1\\s*:",
        "message": "RecursionError: maximum recursion depth exceeded — factorial(0) never hits the base case.",
        "line": 2
      }
    ]
  },
  {
    "slug": "java-null-pointer",
    "title": "Startup crashes before anything even prints",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The app crashes immediately on launch with a NullPointerException, before any real logic runs.",
    "objective": "Understand why an uninitialized static field defaults to null, not an empty value.",
    "hints": [
      "A static String field defaults to null until you explicitly assign it.",
      "Calling a method like .toUpperCase() on null throws immediately."
    ],
    "expectedOutput": "Prints \"GUEST\" with no exception.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    static String name;\n\n    public static void main(String[] args) {\n        System.out.println(name.toUpperCase());\n    }\n}",
    "solution": "public class Main {\n    static String name = \"guest\";\n\n    public static void main(String[] args) {\n        System.out.println(name.toUpperCase());\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "name\\s*=\\s*\"[^\"]*\"",
        "message": "Exception in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.toUpperCase()\" because \"Main.name\" is null",
        "line": 2
      }
    ]
  },
  {
    "slug": "java-array-bounds",
    "title": "Score printer crashes on the last score",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The scoreboard printer works for the first two scores, then throws ArrayIndexOutOfBoundsException.",
    "objective": "Practice spotting <= vs < in a loop bound against array length.",
    "hints": [
      "Valid array indices go from 0 to length - 1.",
      "Using <= scores.length reads one index past the end of the array."
    ],
    "expectedOutput": "Prints all 3 scores with no exception.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {90, 85, 78};\n        for (int i = 0; i <= scores.length; i++) {\n            System.out.println(scores[i]);\n        }\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {90, 85, 78};\n        for (int i = 0; i < scores.length; i++) {\n            System.out.println(scores[i]);\n        }\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*scores\\.length",
        "message": "Exception in thread \"main\" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3",
        "line": 4
      }
    ]
  },
  {
    "slug": "java-string-reference-equality",
    "title": "Confirmation always fails for typed input",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Typing exactly \"yes\" into the confirmation box always shows \"Not confirmed\".",
    "objective": "Understand why == compares object references for Strings, not their text content.",
    "hints": [
      "new String(\"yes\") creates a new object, so == compares memory addresses, not text.",
      "Use .equals() to compare String content."
    ],
    "expectedOutput": "Typing \"yes\" prints \"Confirmed\".",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        String input = new String(\"yes\");\n        if (input == \"yes\") {\n            System.out.println(\"Confirmed\");\n        } else {\n            System.out.println(\"Not confirmed\");\n        }\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        String input = new String(\"yes\");\n        if (input.equals(\"yes\")) {\n            System.out.println(\"Confirmed\");\n        } else {\n            System.out.println(\"Not confirmed\");\n        }\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "input\\s*==\\s*\"yes\"",
        "message": "Prints \"Not confirmed\" even when input is the text \"yes\" — == compared object references, not content.",
        "line": 4
      }
    ]
  },
  {
    "slug": "java-concurrent-modification",
    "title": "Filtering even numbers throws mid-loop",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Removing even numbers from the list throws ConcurrentModificationException partway through.",
    "objective": "Understand why modifying a List during a for-each loop over it is unsafe.",
    "hints": [
      "A for-each loop uses an Iterator internally that detects structural changes and fails fast.",
      "removeIf() handles safe removal internally without you managing an iterator."
    ],
    "expectedOutput": "Prints [1, 3, 5] with no exception.",
    "fileName": "Main.java",
    "buggyCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));\n        for (Integer n : nums) {\n            if (n % 2 == 0) {\n                nums.remove(n);\n            }\n        }\n        System.out.println(nums);\n    }\n}",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));\n        nums.removeIf(n -> n % 2 == 0);\n        System.out.println(nums);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "removeIf\\(",
        "message": "Exception in thread \"main\" java.util.ConcurrentModificationException",
        "line": 6
      }
    ]
  },
  {
    "slug": "java-integer-overflow",
    "title": "Large multiplication prints a negative number",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Multiplying 100000 by 100000 prints a negative number instead of 10 billion.",
    "objective": "Understand int overflow and when you need to widen to long before multiplying.",
    "hints": [
      "int in Java is 32-bit; 100000 * 100000 exceeds Integer.MAX_VALUE and silently wraps around.",
      "Declare the result (or cast one operand) as long to get correct 64-bit arithmetic."
    ],
    "expectedOutput": "Prints 10000000000.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        int a = 100000;\n        int b = 100000;\n        int result = a * b;\n        System.out.println(result);\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int a = 100000;\n        int b = 100000;\n        long result = (long) a * b;\n        System.out.println(result);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "long\\s+result\\s*=",
        "message": "Prints -727379968 — int multiplication overflowed silently.",
        "line": 5
      }
    ]
  },
  {
    "slug": "java-hashcode-missing",
    "title": "Duplicate points aren't detected in a HashSet",
    "lang": "Java",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Adding the same Point(1, 2) twice to a HashSet reports a size of 2 instead of 1.",
    "objective": "Understand why overriding equals() without hashCode() breaks hash-based collections.",
    "hints": [
      "HashSet uses hashCode() first to find a bucket, then equals() within that bucket.",
      "Without a matching hashCode() override, two 'equal' objects can land in different buckets and never get compared."
    ],
    "expectedOutput": "points.size() prints 1.",
    "fileName": "Main.java",
    "buggyCode": "import java.util.*;\n\npublic class Main {\n    static class Point {\n        int x, y;\n        Point(int x, int y) { this.x = x; this.y = y; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof Point)) return false;\n            Point p = (Point) o;\n            return x == p.x && y == p.y;\n        }\n    }\n\n    public static void main(String[] args) {\n        Set<Point> points = new HashSet<>();\n        points.add(new Point(1, 2));\n        points.add(new Point(1, 2));\n        System.out.println(points.size());\n    }\n}",
    "solution": "import java.util.*;\n\npublic class Main {\n    static class Point {\n        int x, y;\n        Point(int x, int y) { this.x = x; this.y = y; }\n\n        @Override\n        public boolean equals(Object o) {\n            if (!(o instanceof Point)) return false;\n            Point p = (Point) o;\n            return x == p.x && y == p.y;\n        }\n\n        @Override\n        public int hashCode() {\n            return Objects.hash(x, y);\n        }\n    }\n\n    public static void main(String[] args) {\n        Set<Point> points = new HashSet<>();\n        points.add(new Point(1, 2));\n        points.add(new Point(1, 2));\n        System.out.println(points.size());\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "public\\s+int\\s+hashCode\\s*\\(\\s*\\)",
        "message": "points.size() prints 2 — equals() was overridden but hashCode() wasn't, so HashSet can't recognize the duplicate.",
        "line": 8
      }
    ]
  },
  {
    "slug": "c-array-bounds",
    "title": "Score printer reads garbage on the last value",
    "lang": "C",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "printf prints an unexpected 4th number that was never in the scores array.",
    "objective": "Practice catching an off-by-one loop bound in C.",
    "hints": [
      "C does no bounds checking — reading scores[3] just reads whatever memory is next.",
      "Change <= to < so the loop stops at the last valid index."
    ],
    "expectedOutput": "Prints exactly 90, 85, 78 and nothing else.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n\nint main() {\n    int scores[3] = {90, 85, 78};\n    for (int i = 0; i <= 3; i++) {\n        printf(\"%d\\n\", scores[i]);\n    }\n    return 0;\n}",
    "solution": "#include <stdio.h>\n\nint main() {\n    int scores[3] = {90, 85, 78};\n    for (int i = 0; i < 3; i++) {\n        printf(\"%d\\n\", scores[i]);\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*3",
        "message": "Prints a 4th garbage value — scores[3] reads past the end of a 3-element array.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c-uninitialized-variable",
    "title": "Total is a different random number every run",
    "lang": "C",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The sum of 1 through 5 should always be 15, but the program prints a different garbage number every time it runs.",
    "objective": "Understand why local variables in C are not automatically zeroed.",
    "hints": [
      "An uninitialized local variable holds whatever garbage was already in that memory.",
      "Explicitly initialize total to 0 before accumulating into it."
    ],
    "expectedOutput": "Prints 15 every time.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n\nint main() {\n    int total;\n    for (int i = 1; i <= 5; i++) {\n        total += i;\n    }\n    printf(\"%d\\n\", total);\n    return 0;\n}",
    "solution": "#include <stdio.h>\n\nint main() {\n    int total = 0;\n    for (int i = 1; i <= 5; i++) {\n        total += i;\n    }\n    printf(\"%d\\n\", total);\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "int\\s+total\\s*=\\s*0\\s*;",
        "message": "Prints an unpredictable garbage number — total was never initialized.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c-assignment-in-condition",
    "title": "Every user is treated as an adult",
    "lang": "C",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Regardless of the age variable's actual value, the program always prints \"Just became an adult\".",
    "objective": "Understand the classic C bug: = inside an if condition assigns instead of compares.",
    "hints": [
      "if (age = 18) assigns 18 to age and then evaluates 18 as true.",
      "Use == to compare values instead of = to assign them."
    ],
    "expectedOutput": "With age = 20, prints \"Not 18\".",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age = 18) {\n        printf(\"Just became an adult\\n\");\n    } else {\n        printf(\"Not 18\\n\");\n    }\n    return 0;\n}",
    "solution": "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    if (age == 18) {\n        printf(\"Just became an adult\\n\");\n    } else {\n        printf(\"Not 18\\n\");\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "if\\s*\\(\\s*age\\s*=(?!=)\\s*18\\s*\\)",
        "message": "Prints \"Just became an adult\" regardless of age — the condition assigns 18 instead of comparing.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c-dangling-pointer",
    "title": "Returned array contains garbage values",
    "lang": "C",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "createArray()'s first element prints an unpredictable value instead of 1.",
    "objective": "Understand why returning the address of a local (stack) array is undefined behavior.",
    "hints": [
      "A local array is destroyed the instant the function returns — its memory can be reused by anything.",
      "Use malloc() to allocate memory on the heap that survives after the function returns."
    ],
    "expectedOutput": "Prints 1.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint* createArray() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    return arr;\n}\n\nint main() {\n    int* result = createArray();\n    printf(\"%d\\n\", result[0]);\n    return 0;\n}",
    "solution": "#include <stdio.h>\n#include <stdlib.h>\n\nint* createArray() {\n    int* arr = malloc(5 * sizeof(int));\n    arr[0] = 1; arr[1] = 2; arr[2] = 3; arr[3] = 4; arr[4] = 5;\n    return arr;\n}\n\nint main() {\n    int* result = createArray();\n    printf(\"%d\\n\", result[0]);\n    free(result);\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "malloc\\(",
        "message": "warning: function returns address of local variable [-Wreturn-local-addr] — the array is destroyed when the function returns.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c-memory-leak",
    "title": "Server memory usage climbs and never comes down",
    "lang": "C",
    "difficulty": "Medium",
    "xp": 135,
    "coins": 27,
    "bugReport": "After handling 1000 requests, the process is using far more memory than it should — and it never goes back down.",
    "objective": "Understand why every malloc() needs a matching free().",
    "hints": [
      "Memory allocated with malloc() stays reserved until you explicitly free() it.",
      "Free the buffer before processRequest() returns."
    ],
    "expectedOutput": "Memory usage stays flat across repeated calls.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n#include <stdlib.h>\n\nvoid processRequest() {\n    int* buffer = malloc(1024 * sizeof(int));\n    buffer[0] = 42;\n    printf(\"%d\\n\", buffer[0]);\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        processRequest();\n    }\n    return 0;\n}",
    "solution": "#include <stdio.h>\n#include <stdlib.h>\n\nvoid processRequest() {\n    int* buffer = malloc(1024 * sizeof(int));\n    buffer[0] = 42;\n    printf(\"%d\\n\", buffer[0]);\n    free(buffer);\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        processRequest();\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "free\\(buffer\\)",
        "message": "Memory usage grows by 4KB per call and never shrinks — buffer is never freed.",
        "line": 7
      }
    ]
  },
  {
    "slug": "c-buffer-overflow",
    "title": "Long names crash the greeting function",
    "lang": "C",
    "difficulty": "Hard",
    "xp": 190,
    "coins": 38,
    "bugReport": "greet() works for short names but crashes (or corrupts other data) for longer ones.",
    "objective": "Understand why strcpy() with no bounds checking is a classic buffer-overflow vulnerability.",
    "hints": [
      "strcpy() copies until it hits a null terminator, no matter how big the destination buffer is.",
      "strncpy() with an explicit size limit prevents writing past the buffer's end."
    ],
    "expectedOutput": "greet() never writes past the 10-byte buffer, regardless of input length.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n#include <string.h>\n\nvoid greet(char* name) {\n    char buffer[10];\n    strcpy(buffer, name);\n    printf(\"Hello, %s!\\n\", buffer);\n}\n\nint main() {\n    greet(\"ThisNameIsWayTooLongForTheBuffer\");\n    return 0;\n}",
    "solution": "#include <stdio.h>\n#include <string.h>\n\nvoid greet(char* name) {\n    char buffer[10];\n    strncpy(buffer, name, sizeof(buffer) - 1);\n    buffer[sizeof(buffer) - 1] = '\\0';\n    printf(\"Hello, %s!\\n\", buffer);\n}\n\nint main() {\n    greet(\"ThisNameIsWayTooLongForTheBuffer\");\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "strncpy\\(",
        "message": "*** stack smashing detected ***: terminated — strcpy() overflowed the 10-byte buffer.",
        "line": 6
      }
    ]
  },
  {
    "slug": "cpp-vector-off-by-one",
    "title": "vector.at() throws on the last element",
    "lang": "C++",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Looping over a 3-element vector throws std::out_of_range on the last iteration.",
    "objective": "Practice catching an off-by-one bound against vector::size().",
    "hints": [
      "Valid indices run from 0 to size() - 1.",
      "Change <= to < in the loop condition."
    ],
    "expectedOutput": "Prints 10, 20, 30 with no exception.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20, 30};\n    for (int i = 0; i <= nums.size(); i++) {\n        cout << nums.at(i) << endl;\n    }\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20, 30};\n    for (int i = 0; i < nums.size(); i++) {\n        cout << nums.at(i) << endl;\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*nums\\.size\\(\\)",
        "message": "terminate called after throwing an instance of 'std::out_of_range'\n  what():  vector::_M_range_check",
        "line": 7
      }
    ]
  },
  {
    "slug": "cpp-unsigned-underflow",
    "title": "Reverse loop over a vector never stops",
    "lang": "C++",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "Looping backward over a vector using size_t hangs or crashes instead of stopping at index 0.",
    "objective": "Understand why comparing an unsigned index to >= 0 is always true, and wraps around instead of going negative.",
    "hints": [
      "size_t is unsigned — it can never be less than 0.",
      "Use a signed int for a loop that counts down toward and past zero."
    ],
    "expectedOutput": "Prints 3, 2, 1 and stops.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    for (size_t i = nums.size() - 1; i >= 0; i--) {\n        cout << nums[i] << endl;\n    }\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3};\n    for (int i = nums.size() - 1; i >= 0; i--) {\n        cout << nums[i] << endl;\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "size_t\\s+i\\s*=\\s*nums\\.size\\(\\)\\s*-\\s*1",
        "message": "Segmentation fault — i is unsigned, so i >= 0 is always true and wraps to a huge number after 0.",
        "line": 6
      }
    ]
  },
  {
    "slug": "cpp-missing-return",
    "title": "square(4) prints garbage instead of 16",
    "lang": "C++",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "square(4) should print 16 but prints an unpredictable number instead.",
    "objective": "Understand why a non-void function must always return a value on every path.",
    "hints": [
      "Falling off the end of a non-void function without returning is undefined behavior.",
      "Add return result; at the end of square()."
    ],
    "expectedOutput": "Prints 16.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    int result = x * x;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nint square(int x) {\n    int result = x * x;\n    return result;\n}\n\nint main() {\n    cout << square(4) << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "return\\s+result\\s*;",
        "message": "warning: control reaches end of non-void function [-Wreturn-type] — square(4) prints garbage.",
        "line": 5
      }
    ]
  },
  {
    "slug": "cpp-memory-leak-new",
    "title": "Handling requests slowly exhausts memory",
    "lang": "C++",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "After handling 1000 requests, memory usage has grown far beyond what a single Connection object should need.",
    "objective": "Understand why every `new` needs a matching `delete`.",
    "hints": [
      "Objects created with new live on the heap until you explicitly delete them.",
      "Add delete conn; once the connection is done being used."
    ],
    "expectedOutput": "Memory usage stays flat across 1000 calls.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nclass Connection {\npublic:\n    Connection() { cout << \"Opening connection\" << endl; }\n};\n\nvoid handleRequest() {\n    Connection* conn = new Connection();\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        handleRequest();\n    }\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nclass Connection {\npublic:\n    Connection() { cout << \"Opening connection\" << endl; }\n};\n\nvoid handleRequest() {\n    Connection* conn = new Connection();\n    delete conn;\n}\n\nint main() {\n    for (int i = 0; i < 1000; i++) {\n        handleRequest();\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "delete\\s+conn\\s*;",
        "message": "1000 Connection objects allocated, 0 freed — memory usage grows with every call.",
        "line": 9
      }
    ]
  },
  {
    "slug": "cpp-object-slicing",
    "title": "render() always draws a generic Shape, never a Circle",
    "lang": "C++",
    "difficulty": "Medium",
    "xp": 135,
    "coins": 27,
    "bugReport": "Passing a Circle into render() prints \"Shape\" instead of \"Circle\", even though draw() is marked virtual.",
    "objective": "Understand object slicing — passing a derived object by value truncates it to the base type.",
    "hints": [
      "Passing Shape s (by value) copies only the Shape portion of the object — this is 'slicing'.",
      "Take the parameter by reference (Shape&) to preserve polymorphism."
    ],
    "expectedOutput": "render(c) prints \"Circle\".",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual void draw() { cout << \"Shape\" << endl; }\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() override { cout << \"Circle\" << endl; }\n};\n\nvoid render(Shape s) {\n    s.draw();\n}\n\nint main() {\n    Circle c;\n    render(c);\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual void draw() { cout << \"Shape\" << endl; }\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() override { cout << \"Circle\" << endl; }\n};\n\nvoid render(Shape& s) {\n    s.draw();\n}\n\nint main() {\n    Circle c;\n    render(c);\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "void\\s+render\\(Shape&\\s*s\\)",
        "message": "Prints \"Shape\" instead of \"Circle\" — passing by value sliced off the Circle-specific part of the object.",
        "line": 13
      }
    ]
  },
  {
    "slug": "cpp-dangling-reference",
    "title": "getValue() reference is corrupted after the call",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "ref prints an unpredictable garbage number instead of 42 after calling getValue().",
    "objective": "Understand why returning a reference to a local (stack) variable is undefined behavior.",
    "hints": [
      "The local variable x is destroyed the instant getValue() returns.",
      "Return by value (int, not int&) so the caller gets an actual copy of the data."
    ],
    "expectedOutput": "Prints 42.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nint& getValue() {\n    int x = 42;\n    return x;\n}\n\nint main() {\n    int& ref = getValue();\n    cout << ref << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nint getValue() {\n    int x = 42;\n    return x;\n}\n\nint main() {\n    int ref = getValue();\n    cout << ref << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "int&\\s+getValue\\s*\\(\\s*\\)",
        "message": "Prints an unpredictable garbage value — ref is a dangling reference to a destroyed stack variable.",
        "line": 4
      }
    ]
  },
  {
    "slug": "go-slice-off-by-one",
    "title": "Score printer panics on the last score",
    "lang": "Go",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The program panics with 'index out of range' right as it prints the final score.",
    "objective": "Practice catching an off-by-one bound against len().",
    "hints": [
      "Valid slice indices run from 0 to len(slice) - 1.",
      "Change <= to < in the loop condition."
    ],
    "expectedOutput": "Prints 90, 85, 78 with no panic.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := []int{90, 85, 78}\n\tfor i := 0; i <= len(scores); i++ {\n\t\tfmt.Println(scores[i])\n\t}\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := []int{90, 85, 78}\n\tfor i := 0; i < len(scores); i++ {\n\t\tfmt.Println(scores[i])\n\t}\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*len\\(scores\\)",
        "message": "panic: runtime error: index out of range [3] with length 3",
        "line": 7
      }
    ]
  },
  {
    "slug": "go-ignored-error",
    "title": "Bad input silently becomes zero",
    "lang": "Go",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Parsing \"not-a-number\" doesn't crash — it just silently prints 0 with no indication anything went wrong.",
    "objective": "Understand why ignoring a returned error with _ hides real failures.",
    "hints": [
      "strconv.Atoi returns (0, error) when parsing fails — the 0 is meaningless without checking err.",
      "Always check `if err != nil` right after a call that can fail."
    ],
    "expectedOutput": "Prints an error message instead of silently doubling 0.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvalue, _ := strconv.Atoi(\"not-a-number\")\n\tfmt.Println(value * 2)\n}",
    "solution": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvalue, err := strconv.Atoi(\"not-a-number\")\n\tif err != nil {\n\t\tfmt.Println(\"invalid number:\", err)\n\t\treturn\n\t}\n\tfmt.Println(value * 2)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": ",\\s*_\\s*:=\\s*strconv\\.Atoi",
        "message": "Prints 0 with no explanation — the parse error was discarded with _.",
        "line": 9
      },
      {
        "type": "requireMatch",
        "pattern": "err\\s*!=\\s*nil",
        "message": "The returned error from Atoi is never checked.",
        "line": 10
      }
    ]
  },
  {
    "slug": "go-nil-map-write",
    "title": "Adding to the counts map panics",
    "lang": "Go",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "counts[\"apple\"] = 1 panics with 'assignment to entry in nil map'.",
    "objective": "Understand that a declared-but-unmade map is nil and can't be written to.",
    "hints": [
      "var counts map[string]int declares a nil map — reading from it is fine, but writing panics.",
      "Use make(map[string]int) to actually initialize it."
    ],
    "expectedOutput": "Prints map[apple:1] with no panic.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar counts map[string]int\n\tcounts[\"apple\"] = 1\n\tfmt.Println(counts)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tcounts[\"apple\"] = 1\n\tfmt.Println(counts)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "make\\(map\\[string\\]int\\)",
        "message": "panic: assignment to entry in nil map",
        "line": 6
      }
    ]
  },
  {
    "slug": "go-goroutine-loop-capture",
    "title": "All three goroutines print the same number",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "Three goroutines were meant to print 0, 1, and 2 — instead they all print 3, or all print the same repeated number.",
    "objective": "Understand how closures inside a loop can capture a shared loop variable.",
    "hints": [
      "Every goroutine's closure refers to the same i variable, which keeps changing after they're launched.",
      "Pass i as a parameter to the goroutine's function so each one gets its own copy."
    ],
    "expectedOutput": "Prints 0, 1, and 2 in some order — never the same number twice.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}()\n\t}\n\twg.Wait()\n}",
    "solution": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func(i int) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}(i)\n\t}\n\twg.Wait()\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "go func\\(i\\s+int\\)",
        "message": "Prints \"3 3 3\" (or similar) instead of 0, 1, 2 — every goroutine shares the same loop variable.",
        "line": 12
      }
    ]
  },
  {
    "slug": "go-concurrent-map-write",
    "title": "Counter panics under concurrent load",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 135,
    "coins": 27,
    "bugReport": "Running 100 goroutines that increment a shared map occasionally panics with 'concurrent map writes', and the final count is often wrong even when it doesn't crash.",
    "objective": "Understand why maps aren't safe for concurrent writes without external synchronization.",
    "hints": [
      "A WaitGroup only waits for goroutines to finish — it does nothing to prevent them from writing at the same time.",
      "Add a sync.Mutex and Lock()/Unlock() around the map write."
    ],
    "expectedOutput": "Prints 100 every time, with no panic.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tcounts[\"hits\"]++\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counts[\"hits\"])\n}",
    "solution": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tcounts := make(map[string]int)\n\tvar mu sync.Mutex\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tmu.Lock()\n\t\t\tcounts[\"hits\"]++\n\t\t\tmu.Unlock()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counts[\"hits\"])\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "sync\\.Mutex",
        "message": "fatal error: concurrent map writes",
        "line": 9
      }
    ]
  },
  {
    "slug": "go-unbuffered-channel-deadlock",
    "title": "Program hangs forever on startup",
    "lang": "Go",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "The program never prints anything — it just hangs until it's killed with 'fatal error: all goroutines are asleep - deadlock!'.",
    "objective": "Understand why sending on an unbuffered channel blocks until a receiver is ready.",
    "hints": [
      "An unbuffered channel send blocks until something else is ready to receive at the same instant.",
      "A buffered channel with capacity 1 lets the send complete immediately without a concurrent receiver."
    ],
    "expectedOutput": "Prints 42 with no deadlock.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int)\n\tch <- 42\n\tfmt.Println(<-ch)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int, 1)\n\tch <- 42\n\tfmt.Println(<-ch)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "make\\(chan int,\\s*1\\)",
        "message": "fatal error: all goroutines are asleep - deadlock!",
        "line": 6
      }
    ]
  },
  {
    "slug": "sql-null-comparison",
    "title": "Unshipped orders report always comes back empty",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The query for unshipped orders returns zero rows, even though the orders table clearly has unshipped orders in it.",
    "objective": "Understand why NULL requires IS NULL instead of = NULL.",
    "hints": [
      "NULL represents 'unknown' — comparing anything to NULL with = always yields unknown (never true).",
      "Use IS NULL to correctly test for a NULL value."
    ],
    "expectedOutput": "Returns every order where shipped_at is NULL.",
    "fileName": "unshipped_orders.sql",
    "buggyCode": "SELECT * FROM orders WHERE shipped_at = NULL;",
    "solution": "SELECT * FROM orders WHERE shipped_at IS NULL;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id            INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id   INT NOT NULL,\n  shipped_at    TIMESTAMP NULL\n);",
          "columns": [
            "id",
            "customer_id",
            "shipped_at"
          ],
          "rows": [
            [
              "1",
              "12",
              "NULL"
            ],
            [
              "2",
              "14",
              "2026-05-01 10:00"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "shipped_at\\s*=\\s*NULL",
        "flags": "i",
        "message": "Empty result set — comparing to NULL with = always evaluates to unknown, never true.",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-missing-where-update",
    "title": "Every product just got discontinued",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 18,
    "bugReport": "Only product #42 was supposed to be marked discontinued — instead the entire catalog is now discontinued.",
    "objective": "Understand why UPDATE without a WHERE clause applies to every single row in the table.",
    "hints": [
      "Without a WHERE clause, UPDATE modifies every row in the table.",
      "Add WHERE id = 42 to target only the intended row."
    ],
    "expectedOutput": "Only the row with id = 42 has discontinued set to 1.",
    "fileName": "discontinue_product.sql",
    "buggyCode": "UPDATE products SET discontinued = 1;",
    "solution": "UPDATE products SET discontinued = 1 WHERE id = 42;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "products",
          "create": "CREATE TABLE products (\n  id            INT AUTO_INCREMENT PRIMARY KEY,\n  name          VARCHAR(255) NOT NULL,\n  price         DECIMAL(10,2) NOT NULL,\n  discontinued  TINYINT(1) NOT NULL DEFAULT 0\n);",
          "columns": [
            "id",
            "name",
            "price",
            "discontinued"
          ],
          "rows": [
            [
              "42",
              "Wireless Mouse",
              "19.99",
              "0"
            ],
            [
              "43",
              "USB Cable",
              "5.99",
              "0"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "UPDATE\\s+products\\s+SET\\s+discontinued\\s*=\\s*1\\s+WHERE",
        "flags": "i",
        "message": "Query OK, 2 rows affected — every product in the table was updated, not just #42.",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-missing-group-by",
    "title": "Regional sales report shows only one row",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "The per-region sales totals report is only returning a single row instead of one row per region.",
    "objective": "Understand why mixing an aggregate function with a plain column requires GROUP BY.",
    "hints": [
      "SUM(amount) collapses all rows into one total unless you tell SQL how to group them.",
      "Add GROUP BY region so SUM() is computed per region."
    ],
    "expectedOutput": "Returns one row per distinct region, each with its own SUM(amount).",
    "fileName": "regional_sales.sql",
    "buggyCode": "SELECT region, SUM(amount) FROM sales;",
    "solution": "SELECT region, SUM(amount) FROM sales GROUP BY region;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "sales",
          "create": "CREATE TABLE sales (\n  id       INT AUTO_INCREMENT PRIMARY KEY,\n  region   VARCHAR(100) NOT NULL,\n  amount   DECIMAL(10,2) NOT NULL\n);",
          "columns": [
            "id",
            "region",
            "amount"
          ],
          "rows": [
            [
              "1",
              "East",
              "1200.00"
            ],
            [
              "2",
              "West",
              "900.00"
            ],
            [
              "3",
              "East",
              "450.00"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "GROUP\\s+BY\\s+region",
        "flags": "i",
        "message": "ERROR 1140 (42000): In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column 'sales.region'",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-cartesian-join",
    "title": "Order report returns way too many rows",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "Joining orders with customers is returning thousands of rows — far more than the number of actual orders.",
    "objective": "Understand why listing two tables with a comma but no join condition produces a cartesian product.",
    "hints": [
      "FROM orders, customers pairs every order with every customer — that's rows(orders) × rows(customers).",
      "Use an explicit JOIN ... ON condition to match orders to their actual customer."
    ],
    "expectedOutput": "Returns exactly one row per order, matched to its correct customer.",
    "fileName": "order_report.sql",
    "buggyCode": "SELECT orders.id, customers.name FROM orders, customers;",
    "solution": "SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id            INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id   INT NOT NULL\n);",
          "columns": [
            "id",
            "customer_id"
          ],
          "rows": [
            [
              "1",
              "1"
            ],
            [
              "2",
              "2"
            ]
          ]
        },
        {
          "name": "customers",
          "create": "CREATE TABLE customers (\n  id     INT AUTO_INCREMENT PRIMARY KEY,\n  name   VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "name"
          ],
          "rows": [
            [
              "1",
              "Ava Kim"
            ],
            [
              "2",
              "Ben Ruiz"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "ON\\s+orders\\.customer_id\\s*=\\s*customers\\.id",
        "flags": "i",
        "message": "Returns rows(orders) × rows(customers) — no join condition means every order is paired with every customer.",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-subquery-multiple-rows",
    "title": "Employee lookup errors out for the Sales department",
    "lang": "SQL",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "The query works for most departments, but errors out specifically when looking up anyone in a department matching 'Sales%'.",
    "objective": "Understand why a subquery used with = must return exactly one row, and when to use IN instead.",
    "hints": [
      "LIKE 'Sales%' can match multiple departments (e.g. 'Sales East' and 'Sales West'), so the subquery can return more than one id.",
      "Use IN instead of = so the outer query accepts multiple matching department ids."
    ],
    "expectedOutput": "Returns every employee in any department matching 'Sales%', with no error.",
    "fileName": "sales_employees.sql",
    "buggyCode": "SELECT name FROM employees WHERE department_id = (SELECT id FROM departments WHERE name LIKE 'Sales%');",
    "solution": "SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE name LIKE 'Sales%');",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "departments",
          "create": "CREATE TABLE departments (\n  id     INT AUTO_INCREMENT PRIMARY KEY,\n  name   VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "name"
          ],
          "rows": [
            [
              "1",
              "Sales East"
            ],
            [
              "2",
              "Sales West"
            ],
            [
              "3",
              "Engineering"
            ]
          ]
        },
        {
          "name": "employees",
          "create": "CREATE TABLE employees (\n  id              INT AUTO_INCREMENT PRIMARY KEY,\n  name            VARCHAR(255) NOT NULL,\n  department_id   INT NOT NULL\n);",
          "columns": [
            "id",
            "name",
            "department_id"
          ],
          "rows": [
            [
              "1",
              "Priya R",
              "1"
            ],
            [
              "2",
              "Leo B",
              "2"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "department_id\\s*=\\s*\\(SELECT",
        "flags": "i",
        "message": "ERROR 1242 (21000): Subquery returns more than 1 row",
        "line": 1
      }
    ]
  },
  {
    "slug": "bash-unquoted-variable-test",
    "title": "File check reports missing even when the file exists",
    "lang": "Bash",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The script says \"Not found\" even though \"my report.txt\" is sitting right there in the directory.",
    "objective": "Understand why unquoted variables in [ ] tests break on filenames containing spaces.",
    "hints": [
      "Without quotes, $filename splits into separate words wherever there's whitespace.",
      "Wrap it in double quotes: [ -f \"$filename\" ]."
    ],
    "expectedOutput": "Prints \"Found it\".",
    "fileName": "check_file.sh",
    "buggyCode": "#!/bin/bash\nfilename=\"my report.txt\"\nif [ -f $filename ]; then\n  echo \"Found it\"\nelse\n  echo \"Not found\"\nfi",
    "solution": "#!/bin/bash\nfilename=\"my report.txt\"\nif [ -f \"$filename\" ]; then\n  echo \"Found it\"\nelse\n  echo \"Not found\"\nfi",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "\\[\\s*-f\\s+\\$filename\\s*\\]",
        "message": "Not found — the unquoted variable split into two words (\"my\" and \"report.txt\"), breaking the test.",
        "line": 3
      }
    ]
  },
  {
    "slug": "bash-word-splitting-loop",
    "title": "Log processor mangles filenames with spaces",
    "lang": "Bash",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "A log file named \"daily report.log\" gets processed as two separate, broken filenames instead of one.",
    "objective": "Understand why looping over an unquoted command substitution word-splits on whitespace.",
    "hints": [
      "$(ls *.log) is unquoted, so the shell splits it on every space, not just between filenames.",
      "Loop directly over the glob (for f in *.log) instead of parsing ls output."
    ],
    "expectedOutput": "Processes \"daily report.log\" as a single filename.",
    "fileName": "process_logs.sh",
    "buggyCode": "#!/bin/bash\nfiles=$(ls *.log)\nfor f in $files; do\n  echo \"Processing $f\"\ndone",
    "solution": "#!/bin/bash\nfor f in *.log; do\n  echo \"Processing $f\"\ndone",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "for\\s+f\\s+in\\s+\\$files",
        "message": "Processing daily / Processing report.log — the filename was split into two words.",
        "line": 3
      }
    ]
  },
  {
    "slug": "bash-missing-variable-sigil",
    "title": "Greeting prints the literal word \"name\"",
    "lang": "Bash",
    "difficulty": "Easy",
    "xp": 75,
    "coins": 14,
    "bugReport": "The greeting prints \"Hello, name!\" literally, instead of substituting the actual name.",
    "objective": "Understand that bash only expands a variable when it's prefixed with $.",
    "hints": [
      "Without the $ sigil, bash treats \"name\" as literal text, not a variable reference.",
      "Use $name inside the string to substitute its value."
    ],
    "expectedOutput": "Prints \"Hello, World!\".",
    "fileName": "greet.sh",
    "buggyCode": "#!/bin/bash\nname=\"World\"\necho \"Hello, name!\"",
    "solution": "#!/bin/bash\nname=\"World\"\necho \"Hello, $name!\"",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "echo \"Hello, \\$name!\"",
        "message": "Prints \"Hello, name!\" literally — missing the $ sigil to reference the variable.",
        "line": 3
      }
    ]
  },
  {
    "slug": "bash-no-error-checking",
    "title": "Deploy script wipes the wrong directory",
    "lang": "Bash",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "When the target directory doesn't exist yet, the script still runs 'rm -rf build' — but in the wrong place, since cd silently failed.",
    "objective": "Understand why a script needs to stop immediately after a failing command instead of continuing.",
    "hints": [
      "By default, bash keeps running the next line even if the previous command failed.",
      "Add `set -e` at the top so any failing command stops the whole script immediately."
    ],
    "expectedOutput": "If cd fails, the script stops immediately instead of running further commands.",
    "fileName": "deploy.sh",
    "buggyCode": "#!/bin/bash\ncd /opt/myapp\nrm -rf build\nmkdir build\ncp -r src/* build/",
    "solution": "#!/bin/bash\nset -e\ncd /opt/myapp\nrm -rf build\nmkdir build\ncp -r src/* build/",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "set\\s+-e",
        "message": "rm -rf build ran in the wrong directory — cd failed silently and the script kept going.",
        "line": 1
      }
    ]
  },
  {
    "slug": "bash-arithmetic-string-concat",
    "title": "Total shows \"count+1\" instead of a number",
    "lang": "Bash",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "$total prints the literal text \"count+1\" instead of doing any actual math.",
    "objective": "Understand that bash needs $(( )) to perform arithmetic — plain assignment just concatenates text.",
    "hints": [
      "total=count+1 is a plain string assignment; bash does no math here.",
      "Use $(( count + 1 )) to actually compute the sum."
    ],
    "expectedOutput": "Prints \"Total: 6\".",
    "fileName": "counter.sh",
    "buggyCode": "#!/bin/bash\ncount=5\ntotal=count+1\necho \"Total: $total\"",
    "solution": "#!/bin/bash\ncount=5\ntotal=$((count + 1))\necho \"Total: $total\"",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "total=\\$\\(\\(count\\s*\\+\\s*1\\)\\)",
        "message": "Prints \"Total: count+1\" — plain assignment doesn't perform arithmetic in bash.",
        "line": 3
      }
    ]
  },
  {
    "slug": "bash-predictable-tempfile",
    "title": "Concurrent runs corrupt each other's temp data",
    "lang": "Bash",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "When this script runs twice at once (e.g. two cron jobs overlapping), the output gets corrupted or mixed between runs.",
    "objective": "Understand why a hardcoded, predictable temp filename is unsafe for concurrent or security-sensitive scripts.",
    "hints": [
      "A fixed name like /tmp/myapp_temp.txt is shared by every invocation of the script, so concurrent runs collide.",
      "Use mktemp to generate a unique, safely-created temporary file per run."
    ],
    "expectedOutput": "Each run of the script uses its own unique temp file with no collisions.",
    "fileName": "process.sh",
    "buggyCode": "#!/bin/bash\ntmpfile=\"/tmp/myapp_temp.txt\"\necho \"processing\" > \"$tmpfile\"\ncat \"$tmpfile\"\nrm \"$tmpfile\"",
    "solution": "#!/bin/bash\ntmpfile=$(mktemp)\necho \"processing\" > \"$tmpfile\"\ncat \"$tmpfile\"\nrm \"$tmpfile\"",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "tmpfile=\\$\\(mktemp\\)",
        "message": "Two concurrent runs both wrote to /tmp/myapp_temp.txt — output got mixed between processes.",
        "line": 2
      }
    ]
  },
  {
    "slug": "php-loose-comparison-strpos",
    "title": "Search for a word at the very start always fails",
    "lang": "PHP",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "containsWord(\"hello world\", \"hello\") reports \"Not found\", even though \"hello\" is clearly right there at the start.",
    "objective": "Understand the classic PHP gotcha: strpos() returning 0 is falsy under loose comparison.",
    "hints": [
      "strpos() returns the position of the match — position 0 means \"found at the very start\".",
      "0 == false is true in PHP, so == can't tell \"found at 0\" apart from \"not found\". Use === instead."
    ],
    "expectedOutput": "Prints \"Found at position 0\".",
    "fileName": "search.php",
    "buggyCode": "<?php\nfunction containsWord($haystack, $needle) {\n    if (strpos($haystack, $needle) == false) {\n        return \"Not found\";\n    }\n    return \"Found at position \" . strpos($haystack, $needle);\n}\n\necho containsWord(\"hello world\", \"hello\");",
    "solution": "<?php\nfunction containsWord($haystack, $needle) {\n    if (strpos($haystack, $needle) === false) {\n        return \"Not found\";\n    }\n    return \"Found at position \" . strpos($haystack, $needle);\n}\n\necho containsWord(\"hello world\", \"hello\");",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "strpos\\([^)]*\\)\\s*==(?!=)\\s*false",
        "message": "Prints \"Not found\" even though \"hello\" is at position 0 — 0 == false is true in PHP's loose comparison.",
        "line": 3
      }
    ]
  },
  {
    "slug": "php-undefined-array-key",
    "title": "Users without an email on file crash the page",
    "lang": "PHP",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "getUserName() throws a Warning: Undefined array key \"name\" whenever a user record doesn't include that field.",
    "objective": "Understand how to safely access array keys that might not exist.",
    "hints": [
      "Accessing a missing array key raises a warning and returns null.",
      "The null coalescing operator ?? gives a fallback value when a key is missing."
    ],
    "expectedOutput": "Prints \"Guest\" for a user with no name field, with no warning.",
    "fileName": "user.php",
    "buggyCode": "<?php\nfunction getUserName($user) {\n    return $user['name'];\n}\n\n$user = [\"email\" => \"a@example.com\"];\necho getUserName($user);",
    "solution": "<?php\nfunction getUserName($user) {\n    return $user['name'] ?? 'Guest';\n}\n\n$user = [\"email\" => \"a@example.com\"];\necho getUserName($user);",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\$user\\['name'\\]\\s*\\?\\?",
        "message": "Warning: Undefined array key \"name\" in user.php",
        "line": 3
      }
    ]
  },
  {
    "slug": "php-array-off-by-one",
    "title": "Fruit list throws a warning on the last item",
    "lang": "PHP",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Looping over a 3-item array prints a warning and an empty value on the final iteration.",
    "objective": "Practice catching an off-by-one bound against count().",
    "hints": [
      "Valid array indices run from 0 to count($arr) - 1.",
      "Change <= to < in the loop condition."
    ],
    "expectedOutput": "Prints apple, banana, cherry with no warning.",
    "fileName": "fruits.php",
    "buggyCode": "<?php\n$fruits = [\"apple\", \"banana\", \"cherry\"];\nfor ($i = 0; $i <= count($fruits); $i++) {\n    echo $fruits[$i] . \"\\n\";\n}",
    "solution": "<?php\n$fruits = [\"apple\", \"banana\", \"cherry\"];\nfor ($i = 0; $i < count($fruits); $i++) {\n    echo $fruits[$i] . \"\\n\";\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "\\$i\\s*<=\\s*count\\(\\$fruits\\)",
        "message": "Warning: Undefined array key 3 in fruits.php",
        "line": 3
      }
    ]
  },
  {
    "slug": "php-sql-injection",
    "title": "Login lookup is vulnerable to SQL injection",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 140,
    "coins": 28,
    "bugReport": "A security scan flagged findUser() — a username like `' OR '1'='1` returns every user in the table.",
    "objective": "Understand why concatenating user input directly into SQL is dangerous, and how prepared statements fix it.",
    "hints": [
      "String concatenation lets user input change the actual structure of the SQL query.",
      "Use $pdo->prepare() with a bound parameter instead of concatenating the value in."
    ],
    "expectedOutput": "The username is safely bound as a parameter — it can never alter the query's structure.",
    "fileName": "user_lookup.php",
    "buggyCode": "<?php\nfunction findUser($pdo, $username) {\n    $query = \"SELECT * FROM users WHERE username = '\" . $username . \"'\";\n    return $pdo->query($query);\n}",
    "solution": "<?php\nfunction findUser($pdo, $username) {\n    $stmt = $pdo->prepare(\"SELECT * FROM users WHERE username = ?\");\n    $stmt->execute([$username]);\n    return $stmt;\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "prepare\\(",
        "message": "Security scan: SQL injection vulnerability — username \"' OR '1'='1\" returned every row in the users table.",
        "line": 3
      }
    ]
  },
  {
    "slug": "php-foreach-reference-leak",
    "title": "Second pass over the array corrupts its last element",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 135,
    "coins": 27,
    "bugReport": "doubleValues([1, 2, 3]) should return [2, 4, 6] but the last element comes back wrong or duplicated.",
    "objective": "Understand the classic PHP foreach-by-reference gotcha, and why you must unset() the reference afterward.",
    "hints": [
      "foreach ($arr as &$n) leaves $n as a reference to the array's last element even after the loop ends.",
      "unset($n) right after the loop breaks that dangling reference before it's reused."
    ],
    "expectedOutput": "Returns [3, 5, 7] — doubled then incremented, with no corruption.",
    "fileName": "transform.php",
    "buggyCode": "<?php\nfunction doubleValues(&$numbers) {\n    foreach ($numbers as &$n) {\n        $n *= 2;\n    }\n    foreach ($numbers as $n) {\n        $n += 1;\n    }\n    return $numbers;\n}\n\n$nums = [1, 2, 3];\nprint_r(doubleValues($nums));",
    "solution": "<?php\nfunction doubleValues(&$numbers) {\n    foreach ($numbers as &$n) {\n        $n *= 2;\n    }\n    unset($n);\n    foreach ($numbers as $n) {\n        $n += 1;\n    }\n    return $numbers;\n}\n\n$nums = [1, 2, 3];\nprint_r(doubleValues($nums));",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "unset\\(\\$n\\)",
        "message": "print_r shows the last element corrupted — the dangling reference from the first foreach leaked into the second.",
        "line": 5
      }
    ]
  },
  {
    "slug": "php-magic-hash-comparison",
    "title": "Completely different tokens are accepted as matching",
    "lang": "PHP",
    "difficulty": "Hard",
    "xp": 190,
    "coins": 38,
    "bugReport": "A security audit found that certain unrelated tokens (like \"0e123456\" and \"0e654321\") are treated as equal by the verification check.",
    "objective": "Understand the PHP 'magic hash' bug — == treats certain numeric-looking strings as scientific notation.",
    "hints": [
      "PHP's == performs type juggling: \"0e123456\" == \"0e654321\" is true because both look like 0 in scientific notation.",
      "hash_equals() does a type-safe, constant-time string comparison with no juggling."
    ],
    "expectedOutput": "Only the exact matching token is accepted; unrelated \"0e...\" strings are correctly rejected.",
    "fileName": "verify.php",
    "buggyCode": "<?php\nfunction verifyToken($providedHash, $expectedHash) {\n    if ($providedHash == $expectedHash) {\n        return true;\n    }\n    return false;\n}",
    "solution": "<?php\nfunction verifyToken($providedHash, $expectedHash) {\n    return hash_equals($expectedHash, $providedHash);\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "hash_equals\\(",
        "message": "verifyToken(\"0e123456\", \"0e654321\") returned true — PHP's == treats both as 0 in scientific notation.",
        "line": 3
      }
    ]
  },
  {
    "slug": "js-reduce-no-initial",
    "title": "Empty cart total crashes checkout",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "total([]) throws instead of returning 0 — checkout crashes whenever the cart is empty.",
    "objective": "Understand why reduce() needs an explicit initial value.",
    "hints": [
      "Without an initial value, reduce() uses the first array element as the starting point — which doesn't exist for an empty array.",
      "Pass 0 as the second argument to reduce()."
    ],
    "expectedOutput": "total([]) returns 0.",
    "fileName": "total.js",
    "buggyCode": "function total(prices) {\n  return prices.reduce((sum, p) => sum + p);\n}\n\nconsole.log(total([]));",
    "solution": "function total(prices) {\n  return prices.reduce((sum, p) => sum + p, 0);\n}\n\nconsole.log(total([]));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "reduce\\(\\(sum,\\s*p\\)\\s*=>\\s*sum\\s*\\+\\s*p,\\s*0\\)",
        "message": "TypeError: Reduce of empty array with no initial value",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-default-sort-numeric",
    "title": "Leaderboard sorts scores like text, not numbers",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "sortScores([10, 1, 21, 2]) returns [1, 10, 2, 21] instead of numeric order.",
    "objective": "Understand why Array.sort() defaults to lexicographic (string) comparison.",
    "hints": [
      "sort() converts elements to strings by default, so 10 sorts before 2.",
      "Pass a comparator: (a, b) => a - b."
    ],
    "expectedOutput": "sortScores([10, 1, 21, 2]) returns [1, 2, 10, 21].",
    "fileName": "sortScores.js",
    "buggyCode": "function sortScores(scores) {\n  return scores.sort();\n}\n\nconsole.log(sortScores([10, 1, 21, 2]));",
    "solution": "function sortScores(scores) {\n  return scores.sort((a, b) => a - b);\n}\n\nconsole.log(sortScores([10, 1, 21, 2]));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "sort\\(\\(a,\\s*b\\)\\s*=>\\s*a\\s*-\\s*b\\)",
        "message": "[1, 10, 2, 21] — default sort() compares elements as strings.",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-object-reference-equality",
    "title": "Duplicate-user check never fires",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "isSameUser({id:1}, {id:1}) returns false, even though both represent the same user.",
    "objective": "Understand why === compares object references, not their contents.",
    "hints": [
      "Two separately-created objects are never === equal, even with identical fields.",
      "Compare the actual id fields instead of the objects themselves."
    ],
    "expectedOutput": "isSameUser({id:1}, {id:1}) returns true.",
    "fileName": "isSameUser.js",
    "buggyCode": "function isSameUser(a, b) {\n  return a === b;\n}\n\nconsole.log(isSameUser({id:1}, {id:1}));",
    "solution": "function isSameUser(a, b) {\n  return a.id === b.id;\n}\n\nconsole.log(isSameUser({id:1}, {id:1}));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "a\\.id\\s*===\\s*b\\.id",
        "message": "false — comparing two distinct objects with === always fails, even with identical fields.",
        "line": 2
      }
    ]
  },
  {
    "slug": "js-find-returns-undefined",
    "title": "Looking up a missing user crashes the page",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "getUserName(users, 2) throws \"Cannot read properties of undefined\" when no user has that id.",
    "objective": "Understand why Array.find() returning undefined needs a guard before you use the result.",
    "hints": [
      "find() returns undefined when nothing matches — it doesn't throw.",
      "Check for a missing result before accessing .name."
    ],
    "expectedOutput": "getUserName(users, 2) returns \"Unknown\" instead of throwing.",
    "fileName": "getUserName.js",
    "buggyCode": "function getUserName(users, id) {\n  const user = users.find(u => u.id === id);\n  return user.name.toUpperCase();\n}\n\nconsole.log(getUserName([{id:1,name:\"Ava\"}], 2));",
    "solution": "function getUserName(users, id) {\n  const user = users.find(u => u.id === id);\n  if (!user) return \"Unknown\";\n  return user.name.toUpperCase();\n}\n\nconsole.log(getUserName([{id:1,name:\"Ava\"}], 2));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "if\\s*\\(!user\\)",
        "message": "TypeError: Cannot read properties of undefined (reading 'name')",
        "line": 3
      }
    ]
  },
  {
    "slug": "ts-unsafe-type-assertion",
    "title": "Greeting crashes despite TypeScript's types",
    "lang": "TypeScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "greet(raw as User) throws at runtime even though TypeScript compiled it with no errors.",
    "objective": "Understand that `as` type assertions are unchecked — they can lie to the compiler about real, unsafe data.",
    "hints": [
      "`as User` doesn't validate anything — it just tells the compiler to trust you.",
      "Add a runtime guard before trusting external/untyped data."
    ],
    "expectedOutput": "Invalid user data is rejected with a clear error before greet() ever runs.",
    "fileName": "greet.ts",
    "buggyCode": "interface User { name: string; age: number; }\n\nfunction greet(user: User) {\n  console.log(\"Hello \" + user.name.toUpperCase());\n}\n\nconst raw: any = { name: null, age: 30 };\ngreet(raw as User);",
    "solution": "interface User { name: string; age: number; }\n\nfunction greet(user: User) {\n  console.log(\"Hello \" + user.name.toUpperCase());\n}\n\nconst raw: any = { name: null, age: 30 };\nif (!raw.name) {\n  throw new Error(\"Invalid user data\");\n}\ngreet(raw as User);",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "if\\s*\\(!raw\\.name\\)",
        "message": "TypeError: Cannot read properties of null (reading 'toUpperCase') — `as User` skipped all validation.",
        "line": 7
      }
    ]
  },
  {
    "slug": "ts-optional-property-unchecked",
    "title": "Timeout calculation returns NaN",
    "lang": "TypeScript",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "getTimeout({}) returns NaN instead of a sensible default.",
    "objective": "Understand why an optional property needs a fallback before you use it in arithmetic.",
    "hints": [
      "config.timeout is number | undefined — undefined * 2 is NaN, not an error.",
      "Use the ?? operator to supply a default when timeout is missing."
    ],
    "expectedOutput": "getTimeout({}) returns 0.",
    "fileName": "config.ts",
    "buggyCode": "interface Config { timeout?: number; }\n\nfunction getTimeout(config: Config): number {\n  return config.timeout * 2;\n}\n\nconsole.log(getTimeout({}));",
    "solution": "interface Config { timeout?: number; }\n\nfunction getTimeout(config: Config): number {\n  return (config.timeout ?? 0) * 2;\n}\n\nconsole.log(getTimeout({}));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "config\\.timeout\\s*\\?\\?\\s*0",
        "message": "error TS2532: Object is possibly 'undefined'.",
        "line": 4
      }
    ]
  },
  {
    "slug": "ts-non-exhaustive-switch",
    "title": "One status value silently returns blank",
    "lang": "TypeScript",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "label(Status.Closed) returns an empty string instead of \"Closed\" — no compiler warning caught it.",
    "objective": "Understand that a switch over an enum isn't checked for exhaustiveness by default.",
    "hints": [
      "The switch is missing a case for Status.Closed entirely.",
      "Add the missing case, returning \"Closed\"."
    ],
    "expectedOutput": "label(Status.Closed) returns \"Closed\".",
    "fileName": "label.ts",
    "buggyCode": "enum Status { Pending, Active, Closed }\n\nfunction label(status: Status): string {\n  switch (status) {\n    case Status.Pending: return \"Pending\";\n    case Status.Active: return \"Active\";\n  }\n  return \"\";\n}\n\nconsole.log(label(Status.Closed));",
    "solution": "enum Status { Pending, Active, Closed }\n\nfunction label(status: Status): string {\n  switch (status) {\n    case Status.Pending: return \"Pending\";\n    case Status.Active: return \"Active\";\n    case Status.Closed: return \"Closed\";\n  }\n  return \"\";\n}\n\nconsole.log(label(Status.Closed));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "case\\s+Status\\.Closed",
        "message": "Returns \"\" for Status.Closed — the switch has no case for it.",
        "line": 6
      }
    ]
  },
  {
    "slug": "py-unboundlocal-global",
    "title": "Incrementing a counter crashes immediately",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "increment() throws UnboundLocalError the very first time it's called.",
    "objective": "Understand why assigning to a name inside a function makes it local, even if a global of the same name exists.",
    "hints": [
      "counter += 1 makes Python treat counter as a local variable for the whole function.",
      "Declare `global counter` before modifying it."
    ],
    "expectedOutput": "increment() returns 1.",
    "fileName": "counter.py",
    "buggyCode": "counter = 0\n\ndef increment():\n    counter += 1\n    return counter\n\nprint(increment())",
    "solution": "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n    return counter\n\nprint(increment())",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "global counter",
        "message": "UnboundLocalError: local variable 'counter' referenced before assignment",
        "line": 3
      }
    ]
  },
  {
    "slug": "py-typo-swallowed-by-bare-except",
    "title": "Price lookup always returns 0",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 110,
    "coins": 22,
    "bugReport": "get_price({\"price\": 25}) returns 0 — the real KeyError is being silently swallowed.",
    "objective": "Understand why a bare except: hides real bugs instead of surfacing them.",
    "hints": [
      "A bare except catches everything, including typos in dictionary keys.",
      "Check the actual key being accessed against the data being passed in."
    ],
    "expectedOutput": "get_price({\"price\": 25}) returns 25.",
    "fileName": "pricing.py",
    "buggyCode": "def get_price(item):\n    try:\n        return item[\"proce\"]\n    except:\n        return 0\n\nprint(get_price({\"price\": 25}))",
    "solution": "def get_price(item):\n    try:\n        return item[\"price\"]\n    except KeyError:\n        return 0\n\nprint(get_price({\"price\": 25}))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "item\\[\"proce\"\\]",
        "message": "Returns 0 — item[\"proce\"] is a typo for item[\"price\"], and the bare except hid it.",
        "line": 3
      }
    ]
  },
  {
    "slug": "py-float-equality",
    "title": "A value that should equal 1.0 doesn't",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "is_one(0.1 + 0.1 + 0.1 + 0.7) returns False, even though the math clearly totals 1.0.",
    "objective": "Understand floating-point imprecision and why exact equality is unreliable for floats.",
    "hints": [
      "0.1 can't be represented exactly in binary floating point.",
      "Compare with a small tolerance instead of ==, e.g. abs(x - 1.0) < 1e-9."
    ],
    "expectedOutput": "is_one(0.1 + 0.1 + 0.1 + 0.7) returns True.",
    "fileName": "rounding.py",
    "buggyCode": "def is_one(x):\n    return x == 1.0\n\nprint(is_one(0.1 + 0.1 + 0.1 + 0.7))",
    "solution": "def is_one(x):\n    return abs(x - 1.0) < 1e-9\n\nprint(is_one(0.1 + 0.1 + 0.1 + 0.7))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "abs\\(x\\s*-\\s*1\\.0\\)\\s*<",
        "message": "False — floating point rounding means the sum isn't exactly 1.0.",
        "line": 2
      }
    ]
  },
  {
    "slug": "py-shared-list-reference",
    "title": "Changing one grid row changes every row",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 170,
    "coins": 34,
    "bugReport": "Setting grid[0][0] = 1 changes every row's first column, not just row 0.",
    "objective": "Understand why [[0]*cols]*rows creates multiple references to the same inner list.",
    "hints": [
      "[[0]*cols]*rows repeats the SAME inner list object rows times, not rows separate lists.",
      "Use a list comprehension so each row is created independently."
    ],
    "expectedOutput": "Setting grid[0][0] = 1 only changes row 0.",
    "fileName": "grid.py",
    "buggyCode": "def make_grid(rows, cols):\n    return [[0] * cols] * rows\n\ngrid = make_grid(3, 3)\ngrid[0][0] = 1\nprint(grid)",
    "solution": "def make_grid(rows, cols):\n    return [[0] * cols for _ in range(rows)]\n\ngrid = make_grid(3, 3)\ngrid[0][0] = 1\nprint(grid)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "for _ in range\\(rows\\)",
        "message": "[[1, 0, 0], [1, 0, 0], [1, 0, 0]] — all three rows are the same list object.",
        "line": 2
      }
    ]
  },
  {
    "slug": "java-integer-cache-equality",
    "title": "Score comparison passes in testing, fails in production",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "Comparing two Integer objects with == works for small test values but fails for larger real ones.",
    "objective": "Understand Java's Integer cache (-128 to 127) and why == is unreliable for boxed Integer comparison.",
    "hints": [
      "Small Integer values are cached and reused, so == can accidentally work for them.",
      "Use .equals() to compare Integer values reliably at any size."
    ],
    "expectedOutput": "Comparing two Integer(200) objects with .equals() returns true.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 200;\n        Integer b = 200;\n        System.out.println(a == b);\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 200;\n        Integer b = 200;\n        System.out.println(a.equals(b));\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "a\\.equals\\(b\\)",
        "message": "false — 200 is outside the Integer cache range (-128 to 127), so == compares references.",
        "line": 5
      }
    ]
  },
  {
    "slug": "java-shallow-clone-2d-array",
    "title": "Modifying a copied grid corrupts the original",
    "lang": "Java",
    "difficulty": "Hard",
    "xp": 165,
    "coins": 33,
    "bugReport": "Changing copy[0][0] also changes grid[0][0] in the original array.",
    "objective": "Understand why clone() on a 2D array only performs a shallow copy of the outer array.",
    "hints": [
      "clone() copies the outer int[][] but the inner int[] rows are still shared references.",
      "Clone each row individually to get a true deep copy."
    ],
    "expectedOutput": "grid[0][0] stays 1 after copy[0][0] is set to 99.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2},{3,4}};\n        int[][] copy = grid.clone();\n        copy[0][0] = 99;\n        System.out.println(grid[0][0]);\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1,2},{3,4}};\n        int[][] copy = new int[grid.length][];\n        for (int i = 0; i < grid.length; i++) {\n            copy[i] = grid[i].clone();\n        }\n        copy[0][0] = 99;\n        System.out.println(grid[0][0]);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "copy\\[i\\]\\s*=\\s*grid\\[i\\]\\.clone\\(\\)",
        "message": "Prints 99 — clone() on a 2D array shares the inner row arrays.",
        "line": 4
      }
    ]
  },
  {
    "slug": "java-unintended-static-field",
    "title": "Every counter instance shares one number",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Each Counter instance is supposed to track its own count, but they're all sharing the same number.",
    "objective": "Understand the difference between a static field (shared across all instances) and an instance field.",
    "hints": [
      "static fields belong to the class, not any one object — every instance sees the same value.",
      "Remove `static` so each Counter gets its own independent count."
    ],
    "expectedOutput": "A new Counter() starts at 0, unaffected by other instances.",
    "fileName": "Counter.java",
    "buggyCode": "public class Counter {\n    static int count = 0;\n    Counter() { count++; }\n\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = new Counter();\n        System.out.println(a.count);\n    }\n}",
    "solution": "public class Counter {\n    int count = 0;\n    Counter() { count++; }\n\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = new Counter();\n        System.out.println(a.count);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "static int count",
        "message": "Prints 2 — count is shared across every instance instead of tracked per-object.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c-signed-unsigned-comparison",
    "title": "Negative number compares as \"not less\" than 1",
    "lang": "C",
    "difficulty": "Hard",
    "xp": 160,
    "coins": 32,
    "bugReport": "Comparing -1 to an unsigned 1 says -1 is NOT less than 1.",
    "objective": "Understand how comparing signed and unsigned integers implicitly converts the signed value.",
    "hints": [
      "When int is compared to unsigned int, the int is converted to unsigned first.",
      "-1 becomes a huge positive number once converted — cast both sides to a wider signed type to compare safely."
    ],
    "expectedOutput": "Prints \"a is less\".",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\nint main() {\n    int a = -1;\n    unsigned int b = 1;\n    if (a < b) {\n        printf(\"a is less\\n\");\n    } else {\n        printf(\"a is not less\\n\");\n    }\n    return 0;\n}",
    "solution": "#include <stdio.h>\nint main() {\n    int a = -1;\n    unsigned int b = 1;\n    if ((long)a < (long)b) {\n        printf(\"a is less\\n\");\n    } else {\n        printf(\"a is not less\\n\");\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\(long\\)a\\s*<\\s*\\(long\\)b",
        "message": "Prints \"a is not less\" — -1 was implicitly converted to a huge unsigned value.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c-switch-fallthrough",
    "title": "Selecting Tuesday also prints Wednesday",
    "lang": "C",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Setting day = 2 prints both \"Tuesday\" and \"Wednesday\" instead of just \"Tuesday\".",
    "objective": "Practice recognizing switch-case fallthrough in C.",
    "hints": [
      "Without break, execution falls through into the next case.",
      "Add break; after each case's statements."
    ],
    "expectedOutput": "day = 2 prints only \"Tuesday\".",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Monday\\n\");\n        case 2:\n            printf(\"Tuesday\\n\");\n        case 3:\n            printf(\"Wednesday\\n\");\n    }\n    return 0;\n}",
    "solution": "#include <stdio.h>\nint main() {\n    int day = 2;\n    switch (day) {\n        case 1:\n            printf(\"Monday\\n\");\n            break;\n        case 2:\n            printf(\"Tuesday\\n\");\n            break;\n        case 3:\n            printf(\"Wednesday\\n\");\n            break;\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "break;",
        "message": "Prints both Tuesday and Wednesday — no break statements to stop the fallthrough.",
        "line": 7
      }
    ]
  },
  {
    "slug": "c-format-specifier-mismatch",
    "title": "Price prints as a garbage integer",
    "lang": "C",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "printf(\"Price: %d\", price) prints an unpredictable garbage number instead of 19.99.",
    "objective": "Understand why printf's format specifier must match the actual argument type.",
    "hints": [
      "%d tells printf to read an int from the stack, but price is a double — the bytes are interpreted completely wrong.",
      "Use %f (or %.2f) for a double."
    ],
    "expectedOutput": "Prints \"Price: 19.99\".",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\nint main() {\n    double price = 19.99;\n    printf(\"Price: %d\\n\", price);\n    return 0;\n}",
    "solution": "#include <stdio.h>\nint main() {\n    double price = 19.99;\n    printf(\"Price: %.2f\\n\", price);\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "printf\\(\"Price: %d",
        "message": "Prints a garbage number — %d reads a double's bytes as if they were an int.",
        "line": 4
      }
    ]
  },
  {
    "slug": "cpp-iterator-invalidation",
    "title": "Reading an old iterator after push_back crashes",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 165,
    "coins": 33,
    "bugReport": "Dereferencing an iterator taken before push_back sometimes crashes, sometimes prints garbage.",
    "objective": "Understand why push_back can invalidate existing iterators by reallocating the vector's buffer.",
    "hints": [
      "push_back may need to grow the vector, which reallocates its internal buffer and invalidates old iterators.",
      "Get the iterator (or value) you need AFTER the mutation, not before."
    ],
    "expectedOutput": "No use of an invalidated iterator — the program behaves predictably.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums = {1,2,3};\n    auto it = nums.begin();\n    nums.push_back(4);\n    cout << *it << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums = {1,2,3};\n    nums.push_back(4);\n    auto it = nums.begin();\n    cout << *it << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "nums\\.begin\\(\\);\\s*\\n\\s*nums\\.push_back",
        "message": "Undefined behavior — *it dereferences an iterator invalidated by push_back's reallocation.",
        "line": 6
      }
    ]
  },
  {
    "slug": "cpp-integer-division-truncation",
    "title": "Average prints 3 instead of 3.5",
    "lang": "C++",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "average should be 3.5 for sum=7, count=2, but it prints 3.",
    "objective": "Understand that int / int truncates before the result is ever assigned to a double.",
    "hints": [
      "sum / count is integer division — the fractional part is discarded before the assignment happens.",
      "Cast at least one operand to double before dividing."
    ],
    "expectedOutput": "Prints 3.5.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 7;\n    int count = 2;\n    double average = sum / count;\n    cout << average << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 7;\n    int count = 2;\n    double average = (double)sum / count;\n    cout << average << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\(double\\)sum\\s*/\\s*count",
        "message": "Prints 3 — sum / count truncates as integer division before the result is stored.",
        "line": 6
      }
    ]
  },
  {
    "slug": "cpp-member-init-order",
    "title": "Rectangle area is garbage on construction",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 170,
    "coins": 34,
    "bugReport": "print() shows a garbage number for area right after constructing a Rectangle.",
    "objective": "Understand that C++ initializes members in declaration order, not the order listed in the initializer list.",
    "hints": [
      "Members are initialized top-to-bottom based on where they're declared in the class body, regardless of initializer-list order.",
      "area is declared before width/height, so it's computed using their still-uninitialized garbage values — reorder the declarations."
    ],
    "expectedOutput": "print() shows 20 for a 4x5 rectangle.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\nclass Rectangle {\npublic:\n    Rectangle(int w, int h) : width(w), height(h), area(width * height) {}\n    void print() { cout << area << endl; }\nprivate:\n    int area;\n    int width;\n    int height;\n};\nint main() {\n    Rectangle r(4, 5);\n    r.print();\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\nclass Rectangle {\npublic:\n    Rectangle(int w, int h) : width(w), height(h), area(width * height) {}\n    void print() { cout << area << endl; }\nprivate:\n    int width;\n    int height;\n    int area;\n};\nint main() {\n    Rectangle r(4, 5);\n    r.print();\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "int area;\\s*\\n\\s*int width;",
        "message": "Prints garbage — area is declared (and thus initialized) before width/height.",
        "line": 8
      }
    ]
  },
  {
    "slug": "go-slice-append-aliasing",
    "title": "Appending to a sub-slice corrupts the original",
    "lang": "Go",
    "difficulty": "Hard",
    "xp": 165,
    "coins": 33,
    "bugReport": "a is supposed to stay [1 2 3], but after appending to b (a slice of a), a becomes [1 2 99].",
    "objective": "Understand that slicing doesn't copy — append can silently overwrite the original array's data.",
    "hints": [
      "b := a[:2] shares a's underlying array; appending within capacity overwrites a[2].",
      "Use a three-index slice expression a[:2:2] to force append to allocate a new array."
    ],
    "expectedOutput": "a stays [1 2 3] after appending to b.",
    "fileName": "main.go",
    "buggyCode": "package main\nimport \"fmt\"\nfunc main() {\n\ta := []int{1, 2, 3}\n\tb := a[:2]\n\tb = append(b, 99)\n\tfmt.Println(a)\n}",
    "solution": "package main\nimport \"fmt\"\nfunc main() {\n\ta := []int{1, 2, 3}\n\tb := a[:2:2]\n\tb = append(b, 99)\n\tfmt.Println(a)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "a\\[:2:2\\]",
        "message": "Prints [1 2 99] — b shares a's underlying array, so append overwrote a[2].",
        "line": 5
      }
    ]
  },
  {
    "slug": "go-struct-pass-by-value",
    "title": "moveRight doesn't actually move the point",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "p.X stays 1 after calling moveRight(p) — it should become 11.",
    "objective": "Understand that Go passes structs by value, so a function receives (and can only modify) a copy.",
    "hints": [
      "moveRight(p Point) receives a copy — changes inside it never touch the caller's struct.",
      "Use a pointer receiver (*Point) so the function can modify the original."
    ],
    "expectedOutput": "p.X becomes 11 after moveRight(&p).",
    "fileName": "main.go",
    "buggyCode": "package main\nimport \"fmt\"\ntype Point struct { X, Y int }\nfunc moveRight(p Point) { p.X += 10 }\nfunc main() {\n\tp := Point{X: 1, Y: 2}\n\tmoveRight(p)\n\tfmt.Println(p.X)\n}",
    "solution": "package main\nimport \"fmt\"\ntype Point struct { X, Y int }\nfunc moveRight(p *Point) { p.X += 10 }\nfunc main() {\n\tp := Point{X: 1, Y: 2}\n\tmoveRight(&p)\n\tfmt.Println(p.X)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "func moveRight\\(p \\*Point\\)",
        "message": "Prints 1 — moveRight received a copy of p, so the original is untouched.",
        "line": 4
      }
    ]
  },
  {
    "slug": "go-defer-in-loop",
    "title": "Processing many files exhausts open file handles",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "With enough files, processFiles fails with \"too many open files\" — every file stays open until the whole function returns.",
    "objective": "Understand that defer runs at function return, not at the end of each loop iteration.",
    "hints": [
      "defer f.Close() inside the loop doesn't fire until processFiles itself returns — all files stay open simultaneously.",
      "Move the open/defer/work into its own per-file helper function so defer fires each iteration."
    ],
    "expectedOutput": "Each file is closed right after it's processed, not all at the end.",
    "fileName": "main.go",
    "buggyCode": "package main\nimport (\"fmt\"; \"os\")\nfunc processFiles(names []string) {\n\tfor _, name := range names {\n\t\tf, _ := os.Open(name)\n\t\tdefer f.Close()\n\t\tfmt.Println(\"processing\", name)\n\t}\n}\nfunc main() {\n\tprocessFiles([]string{\"a.txt\", \"b.txt\", \"c.txt\"})\n}",
    "solution": "package main\nimport (\"fmt\"; \"os\")\nfunc processOne(name string) {\n\tf, _ := os.Open(name)\n\tdefer f.Close()\n\tfmt.Println(\"processing\", name)\n}\nfunc processFiles(names []string) {\n\tfor _, name := range names {\n\t\tprocessOne(name)\n\t}\n}\nfunc main() {\n\tprocessFiles([]string{\"a.txt\", \"b.txt\", \"c.txt\"})\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "func processOne\\(",
        "message": "too many open files — every file handle stays open until processFiles itself returns.",
        "line": 3
      }
    ]
  },
  {
    "slug": "sql-like-missing-wildcard",
    "title": "Product search finds nothing",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Searching for \"Wireless\" returns zero rows, even though \"Wireless Mouse\" is clearly in the table.",
    "objective": "Understand that LIKE without a wildcard behaves like an exact match.",
    "hints": [
      "'Wireless' with no % matches only the exact string \"Wireless\", not anything containing it.",
      "Add a trailing % to match anything starting with \"Wireless\"."
    ],
    "expectedOutput": "Returns every product whose name starts with \"Wireless\".",
    "fileName": "search.sql",
    "buggyCode": "SELECT * FROM products WHERE name LIKE 'Wireless';",
    "solution": "SELECT * FROM products WHERE name LIKE 'Wireless%';",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "products",
          "create": "CREATE TABLE products (\n  id     INT AUTO_INCREMENT PRIMARY KEY,\n  name   VARCHAR(255) NOT NULL,\n  price  DECIMAL(10,2) NOT NULL\n);",
          "columns": [
            "id",
            "name",
            "price"
          ],
          "rows": [
            [
              "1",
              "Wireless Mouse",
              "19.99"
            ],
            [
              "2",
              "USB Cable",
              "5.99"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "LIKE\\s*'Wireless%'",
        "flags": "i",
        "message": "Empty result set — LIKE 'Wireless' with no wildcard requires an exact match.",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-count-column-skips-null",
    "title": "Review count is lower than it should be",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 110,
    "coins": 22,
    "bugReport": "COUNT(rating) undercounts the total number of reviews — some reviews have no rating yet.",
    "objective": "Understand that COUNT(column) skips NULL values, while COUNT(*) counts every row.",
    "hints": [
      "COUNT(rating) only counts rows where rating is NOT NULL.",
      "Use COUNT(*) to count every review row regardless of rating."
    ],
    "expectedOutput": "Returns the true total number of review rows, including unrated ones.",
    "fileName": "review_count.sql",
    "buggyCode": "SELECT COUNT(rating) FROM reviews;",
    "solution": "SELECT COUNT(*) FROM reviews;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "reviews",
          "create": "CREATE TABLE reviews (\n  id           INT AUTO_INCREMENT PRIMARY KEY,\n  product_id   INT NOT NULL,\n  rating       INT NULL\n);",
          "columns": [
            "id",
            "product_id",
            "rating"
          ],
          "rows": [
            [
              "1",
              "1",
              "5"
            ],
            [
              "2",
              "1",
              "NULL"
            ],
            [
              "3",
              "2",
              "4"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "COUNT\\(rating\\)",
        "flags": "i",
        "message": "Returns 2 instead of 3 — COUNT(rating) skips the row where rating is NULL.",
        "line": 1
      }
    ]
  },
  {
    "slug": "sql-not-equal-null",
    "title": "Shipped-orders report is unexpectedly empty",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Filtering for orders where shipped_at != NULL returns zero rows, even for orders that are clearly shipped.",
    "objective": "Understand why NULL requires IS NOT NULL instead of != NULL.",
    "hints": [
      "Comparing anything to NULL with != (or =) always evaluates to unknown, never true.",
      "Use IS NOT NULL to correctly test for a non-NULL value."
    ],
    "expectedOutput": "Returns every order where shipped_at is set.",
    "fileName": "shipped_orders.sql",
    "buggyCode": "SELECT * FROM orders WHERE shipped_at != NULL;",
    "solution": "SELECT * FROM orders WHERE shipped_at IS NOT NULL;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id            INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id   INT NOT NULL,\n  shipped_at    TIMESTAMP NULL\n);",
          "columns": [
            "id",
            "customer_id",
            "shipped_at"
          ],
          "rows": [
            [
              "1",
              "9",
              "2026-06-01 10:00"
            ],
            [
              "2",
              "11",
              "NULL"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "shipped_at\\s*!=\\s*NULL",
        "flags": "i",
        "message": "Empty result set — != NULL always evaluates to unknown, never true.",
        "line": 1
      }
    ]
  },
  {
    "slug": "docker-exec-form-no-var-substitution",
    "title": "Server receives the literal text \"$PORT\"",
    "lang": "Docker",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "The server logs show it received the argument \"$PORT\" literally, instead of the actual port number.",
    "objective": "Understand that exec-form CMD doesn't invoke a shell, so environment variables aren't substituted.",
    "hints": [
      "CMD [\"...\"] (exec form) runs the program directly, with no shell to expand $PORT.",
      "Use shell form (CMD without brackets) so /bin/sh -c expands the variable."
    ],
    "expectedOutput": "The server receives the actual port number, e.g. 3000.",
    "fileName": "Dockerfile",
    "buggyCode": "FROM node:20-slim\nWORKDIR /app\nCOPY . .\nRUN npm install\nENV PORT=3000\nCMD [\"node\", \"server.js\", \"--port\", \"$PORT\"]",
    "solution": "FROM node:20-slim\nWORKDIR /app\nCOPY . .\nRUN npm install\nENV PORT=3000\nCMD node server.js --port $PORT",
    "terminalKind": "docker",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "CMD \\[\"node\", \"server\\.js\", \"--port\", \"\\$PORT\"\\]",
        "message": "Server receives the literal string \"$PORT\" — exec-form CMD never invokes a shell to expand it.",
        "line": 6
      }
    ]
  },
  {
    "slug": "docker-multistage-copy-typo",
    "title": "Production image build fails: stage not found",
    "lang": "Docker",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "docker build fails with \"stage not found\" on the final COPY --from instruction.",
    "objective": "Understand how multi-stage builds reference earlier stages by their declared name.",
    "hints": [
      "The first stage is named `builder` (FROM ... AS builder).",
      "COPY --from=build has a typo — it should say --from=builder."
    ],
    "expectedOutput": "The build completes, copying compiled output from the builder stage.",
    "fileName": "Dockerfile",
    "buggyCode": "FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]",
    "solution": "FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\nFROM node:20-slim\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]",
    "terminalKind": "docker",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "--from=build(?!er)",
        "message": "failed to solve: stage not found: build",
        "line": 7
      }
    ]
  },
  {
    "slug": "git-force-push-overwrite",
    "title": "A teammate's push disappeared after yours",
    "lang": "Git",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "After you force-pushed, a teammate's commits from minutes earlier are just gone from the remote branch.",
    "objective": "Understand why plain --force can silently destroy commits you haven't even seen yet.",
    "hints": [
      "--force overwrites the remote branch unconditionally, no matter what's changed there since you last fetched.",
      "--force-with-lease refuses to push if the remote has commits your local copy doesn't know about."
    ],
    "expectedOutput": "The push is safely rejected if the remote has new commits you haven't fetched.",
    "fileName": "terminal",
    "buggyCode": "git push --force origin main",
    "solution": "git push --force-with-lease origin main",
    "terminalKind": "git",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "--force(?!-with-lease)\\b",
        "message": "Your teammate's commits were silently overwritten on the remote.",
        "line": 1
      }
    ]
  },
  {
    "slug": "git-unresolved-merge-markers",
    "title": "The build broke right after merging a feature branch",
    "lang": "Git",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "Right after merging feature/greeting, the app fails to even parse — there's a syntax error in greet.js.",
    "objective": "Recognize unresolved merge conflict markers accidentally left in committed code.",
    "hints": [
      "<<<<<<<, =======, and >>>>>>> are conflict markers Git inserts — they must be resolved and removed before committing.",
      "Pick the correct version of the code and delete every marker line."
    ],
    "expectedOutput": "greet.js contains valid JavaScript with no conflict markers.",
    "fileName": "greet.js",
    "buggyCode": "function greet(name) {\n<<<<<<< HEAD\n  return \"Hi \" + name;\n=======\n  return \"Hello, \" + name + \"!\";\n>>>>>>> feature/greeting\n}",
    "solution": "function greet(name) {\n  return \"Hello, \" + name + \"!\";\n}",
    "terminalKind": "git",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "<<<<<<<",
        "message": "SyntaxError: Unexpected token '<' — unresolved merge conflict markers were committed.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c1-js-array-includes-case",
    "title": "Array Includes Case",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "hasTag(['Sale','New'], 'sale') returns false even though a matching tag exists (case difference aside).",
    "objective": "Understand why Array.includes() is case-sensitive and exact-match only.",
    "hints": [
      "includes() does a strict === comparison — 'Sale' !== 'sale'.",
      "Normalize both sides to the same case before comparing."
    ],
    "expectedOutput": "hasTag(['Sale','New'], 'sale') returns true.",
    "fileName": "search.js",
    "buggyCode": "function hasTag(tags, target) {\n  return tags.includes(target);\n}\n\nconsole.log(hasTag([\"Sale\",\"New\"], \"sale\"));",
    "solution": "function hasTag(tags, target) {\n  return tags.some(t => t.toLowerCase() === target.toLowerCase());\n}\n\nconsole.log(hasTag([\"Sale\",\"New\"], \"sale\"));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "toLowerCase\\(\\)\\s*===\\s*target\\.toLowerCase\\(\\)",
        "message": "false — includes() is case-sensitive.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c1-py-list-copy-alias",
    "title": "List Copy Alias",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Clearing a temporary copy of the cart also wipes the original cart.",
    "objective": "Understand that assignment (=) creates an alias, not a copy, for lists.",
    "hints": [
      "temp = cart makes temp point to the SAME list object.",
      "Use cart.copy() or cart[:] to make a real independent copy."
    ],
    "expectedOutput": "Clearing temp leaves the original cart untouched.",
    "fileName": "cart.py",
    "buggyCode": "cart = [\"apple\", \"banana\"]\ntemp = cart\ntemp.clear()\nprint(cart)",
    "solution": "cart = [\"apple\", \"banana\"]\ntemp = cart.copy()\ntemp.clear()\nprint(cart)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "cart\\.copy\\(\\)",
        "message": "[] — clearing temp also cleared cart, since both names pointed to the same list.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c1-sql-order-by-alias",
    "title": "Order By Alias",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Ordering the customer report by total spend errors out instead of returning sorted rows.",
    "objective": "Understand that some SQL engines don't allow ORDER BY to reference a SELECT-list alias inside an aggregate expression written differently — here it's a typo'd column name.",
    "hints": [
      "The ORDER BY clause references a column name that doesn't exist in the result set.",
      "Order by the exact alias defined in SELECT: total_spent."
    ],
    "expectedOutput": "Rows ordered by total_spent, descending.",
    "fileName": "top_customers.sql",
    "buggyCode": "SELECT customer_id, SUM(amount) AS total_spent\nFROM orders\nGROUP BY customer_id\nORDER BY total_spend DESC;",
    "solution": "SELECT customer_id, SUM(amount) AS total_spent\nFROM orders\nGROUP BY customer_id\nORDER BY total_spent DESC;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  amount DECIMAL(10,2) NOT NULL\n);",
          "columns": [
            "id",
            "customer_id",
            "amount"
          ],
          "rows": [
            [
              "1",
              "1",
              "50.00"
            ],
            [
              "2",
              "2",
              "120.00"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "ORDER\\s+BY\\s+total_spend\\b",
        "flags": "i",
        "message": "ERROR 1054 (42S22): Unknown column 'total_spend' in 'order clause'",
        "line": 4
      }
    ]
  },
  {
    "slug": "c1-go-string-concat-loop",
    "title": "String Concat Loop",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Building a large report string is extremely slow for big inputs, even though the logic is correct.",
    "objective": "Understand why repeated += string concatenation in a loop is O(n²), and how strings.Builder fixes it.",
    "hints": [
      "Each += on a string allocates an entirely new string — repeated in a loop, this is quadratic.",
      "Use a strings.Builder and WriteString() to accumulate efficiently."
    ],
    "expectedOutput": "Report builds in linear time using strings.Builder.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc buildReport(lines []string) string {\n\treport := \"\"\n\tfor _, l := range lines {\n\t\treport += l + \"\\n\"\n\t}\n\treturn report\n}\n\nfunc main() {\n\tfmt.Print(buildReport([]string{\"a\", \"b\", \"c\"}))\n}",
    "solution": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc buildReport(lines []string) string {\n\tvar sb strings.Builder\n\tfor _, l := range lines {\n\t\tsb.WriteString(l)\n\t\tsb.WriteString(\"\\n\")\n\t}\n\treturn sb.String()\n}\n\nfunc main() {\n\tfmt.Print(buildReport([]string{\"a\", \"b\", \"c\"}))\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "strings\\.Builder",
        "message": "Report generation takes seconds instead of milliseconds on large inputs — O(n²) string concatenation.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c1-java-string-builder-loop",
    "title": "String Builder Loop",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Generating a CSV export of 100,000 rows takes minutes instead of seconds.",
    "objective": "Understand why repeated String concatenation in a loop is expensive, and how StringBuilder fixes it.",
    "hints": [
      "Every += on a String creates a brand-new String object — Strings are immutable in Java.",
      "Use a StringBuilder and .append() to build the result efficiently."
    ],
    "expectedOutput": "CSV builds efficiently regardless of row count.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    public static void main(String[] args) {\n        String csv = \"\";\n        for (int i = 0; i < 100000; i++) {\n            csv += i + \",\";\n        }\n        System.out.println(csv.length());\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder csv = new StringBuilder();\n        for (int i = 0; i < 100000; i++) {\n            csv.append(i).append(\",\");\n        }\n        System.out.println(csv.length());\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "StringBuilder",
        "message": "Export takes minutes — repeated String += allocates a new object on every iteration.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c1-php-array-key-exists",
    "title": "Array Key Exists",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "A setting explicitly set to false is treated as if it were never set at all.",
    "objective": "Understand the difference between isset() (false for null/missing) and array_key_exists() (true if the key exists, even if its value is null or false).",
    "hints": [
      "isset($settings['darkMode']) returns false when the value IS false — that's a false negative here.",
      "Use array_key_exists() to check presence regardless of the stored value."
    ],
    "expectedOutput": "getSetting($settings, 'darkMode') correctly reports the key exists, with value false.",
    "fileName": "settings.php",
    "buggyCode": "<?php\nfunction getSetting($settings, $key) {\n    if (isset($settings[$key])) {\n        return $settings[$key];\n    }\n    return \"not set\";\n}\n\n$settings = [\"darkMode\" => false];\necho getSetting($settings, \"darkMode\");",
    "solution": "<?php\nfunction getSetting($settings, $key) {\n    if (array_key_exists($key, $settings)) {\n        return $settings[$key];\n    }\n    return \"not set\";\n}\n\n$settings = [\"darkMode\" => false];\necho getSetting($settings, \"darkMode\");",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "array_key_exists\\(",
        "message": "Prints \"not set\" even though darkMode is explicitly set to false.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c1-cpp-integer-division",
    "title": "Integer Division",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "average(7, 2) returns 3 instead of 3.5.",
    "objective": "Understand why dividing two ints in C++ truncates instead of producing a decimal result.",
    "hints": [
      "int / int always performs integer division, discarding the remainder.",
      "Cast at least one operand to double before dividing."
    ],
    "expectedOutput": "average(7, 2) returns 3.5.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b) {\n    return (a + b) / 2;\n}\n\nint main() {\n    cout << average(7, 2) << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\ndouble average(int a, int b) {\n    return (a + b) / 2.0;\n}\n\nint main() {\n    cout << average(7, 2) << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\/\\s*2\\.0",
        "message": "Prints 3 instead of 3.5 — integer division truncates the result before it's ever stored as a double.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c1-py-generator-exhaustion",
    "title": "Generator Exhaustion",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "The second call to sum() on the same generator returns 0, even though the first call worked fine.",
    "objective": "Understand that generators are single-use — once iterated, they're exhausted.",
    "hints": [
      "A generator can only be consumed once; a second pass over it yields nothing.",
      "Convert it to a list first if you need to use the values more than once."
    ],
    "expectedOutput": "Both the total and the count are computed correctly from the same source data.",
    "fileName": "stats.py",
    "buggyCode": "def analyze(numbers):\n    total = sum(numbers)\n    count = sum(1 for _ in numbers)\n    return total, count\n\ngen = (n for n in [1, 2, 3])\nprint(analyze(gen))",
    "solution": "def analyze(numbers):\n    numbers = list(numbers)\n    total = sum(numbers)\n    count = sum(1 for _ in numbers)\n    return total, count\n\ngen = (n for n in [1, 2, 3])\nprint(analyze(gen))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "numbers\\s*=\\s*list\\(numbers\\)",
        "message": "(6, 0) — the generator was fully consumed by sum(numbers), leaving nothing for the second pass.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c2-js-optional-chaining",
    "title": "Optional Chaining",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Rendering a user with no address set throws instead of showing a blank field.",
    "objective": "Understand how optional chaining avoids errors on missing nested properties.",
    "hints": [
      "user.address.city throws when address itself is undefined.",
      "Use user.address?.city to short-circuit safely."
    ],
    "expectedOutput": "Prints \"City: Unknown\" instead of throwing.",
    "fileName": "profile.js",
    "buggyCode": "function city(user) {\n  return \"City: \" + user.address.city;\n}\n\nconsole.log(city({ name: \"Ava\" }));",
    "solution": "function city(user) {\n  return \"City: \" + (user.address?.city ?? \"Unknown\");\n}\n\nconsole.log(city({ name: \"Ava\" }));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "user\\.address\\?\\.city",
        "message": "TypeError: Cannot read properties of undefined (reading 'city')",
        "line": 2
      }
    ]
  },
  {
    "slug": "c2-java-optional-get",
    "title": "Optional Get",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Looking up a missing user throws NoSuchElementException instead of returning a default.",
    "objective": "Understand that Optional.get() throws when empty — use orElse() for a safe default.",
    "hints": [
      "find() returns Optional.empty() when nothing matches; .get() on that throws.",
      "Use .orElse(\"Guest\") to supply a fallback."
    ],
    "expectedOutput": "Prints \"Guest\" for a missing user instead of throwing.",
    "fileName": "Main.java",
    "buggyCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Ava\", \"Ben\");\n        Optional<String> found = names.stream().filter(n -> n.equals(\"Cleo\")).findFirst();\n        System.out.println(found.get());\n    }\n}",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"Ava\", \"Ben\");\n        Optional<String> found = names.stream().filter(n -> n.equals(\"Cleo\")).findFirst();\n        System.out.println(found.orElse(\"Guest\"));\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "orElse\\(",
        "message": "Exception in thread \"main\" java.util.NoSuchElementException: No value present",
        "line": 7
      }
    ]
  },
  {
    "slug": "c2-sql-coalesce-missing",
    "title": "Coalesce Missing",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "The customer report shows blank cells for anyone with no phone number, instead of \"N/A\".",
    "objective": "Understand how COALESCE() supplies a fallback for NULL values.",
    "hints": [
      "A NULL phone column displays as empty, not as any specific text.",
      "Wrap the column in COALESCE(phone, 'N/A')."
    ],
    "expectedOutput": "Every row shows either a real phone number or the text 'N/A'.",
    "fileName": "report.sql",
    "buggyCode": "SELECT name, phone FROM customers;",
    "solution": "SELECT name, COALESCE(phone, 'N/A') AS phone FROM customers;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "customers",
          "create": "CREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  phone VARCHAR(30) NULL\n);",
          "columns": [
            "id",
            "name",
            "phone"
          ],
          "rows": [
            [
              "1",
              "Ava K",
              "555-0101"
            ],
            [
              "2",
              "Ben R",
              "NULL"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "COALESCE\\(\\s*phone",
        "flags": "i",
        "message": "Ben R's phone column shows blank instead of a readable placeholder.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c2-py-none-default-mutation",
    "title": "None Default Mutation",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "get_children(node) crashes with AttributeError when a leaf node has no children set.",
    "objective": "Understand why checking for None explicitly (rather than assuming a list) avoids this crash.",
    "hints": [
      "node.children can legitimately be None for a leaf.",
      "Return an empty list instead of None when there are no children."
    ],
    "expectedOutput": "get_children(leaf) returns [] instead of throwing.",
    "fileName": "tree.py",
    "buggyCode": "class Node:\n    def __init__(self, value, children=None):\n        self.value = value\n        self.children = children\n\ndef get_children(node):\n    return [c.value for c in node.children]\n\nleaf = Node(\"x\")\nprint(get_children(leaf))",
    "solution": "class Node:\n    def __init__(self, value, children=None):\n        self.value = value\n        self.children = children if children is not None else []\n\ndef get_children(node):\n    return [c.value for c in node.children]\n\nleaf = Node(\"x\")\nprint(get_children(leaf))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "children\\s+if\\s+children\\s+is\\s+not\\s+None\\s+else\\s+\\[\\]",
        "message": "AttributeError: 'NoneType' object is not iterable",
        "line": 4
      }
    ]
  },
  {
    "slug": "c2-go-nil-pointer-deref",
    "title": "Nil Pointer Deref",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Printing a user's email panics with a nil pointer dereference for users created without one.",
    "objective": "Understand why dereferencing a nil pointer panics, and how to guard against it.",
    "hints": [
      "Email is *string — it can be nil, meaning no address was set.",
      "Check for nil before dereferencing with *user.Email."
    ],
    "expectedOutput": "Prints \"no email\" instead of panicking.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\ntype User struct {\n\tName  string\n\tEmail *string\n}\n\nfunc main() {\n\tu := User{Name: \"Ava\"}\n\tfmt.Println(*u.Email)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\ntype User struct {\n\tName  string\n\tEmail *string\n}\n\nfunc main() {\n\tu := User{Name: \"Ava\"}\n\tif u.Email == nil {\n\t\tfmt.Println(\"no email\")\n\t} else {\n\t\tfmt.Println(*u.Email)\n\t}\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "u\\.Email\\s*==\\s*nil",
        "message": "panic: runtime error: invalid memory address or nil pointer dereference",
        "line": 11
      }
    ]
  },
  {
    "slug": "c2-ts-null-assertion-abuse",
    "title": "Null Assertion Abuse",
    "lang": "TypeScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "getEmail(user) crashes at runtime even though TypeScript's compiler accepted the code with no errors.",
    "objective": "Understand that the ! non-null assertion silences the compiler but does nothing at runtime.",
    "hints": [
      "user.email! tells TypeScript \"trust me, this isn't null\" — it adds no actual runtime check.",
      "Add a real runtime guard instead of asserting non-null."
    ],
    "expectedOutput": "getEmail({ name: 'Ava' }) returns \"unknown\" instead of throwing.",
    "fileName": "user.ts",
    "buggyCode": "interface User { name: string; email?: string; }\n\nfunction getEmail(user: User): string {\n  return user.email!.toLowerCase();\n}\n\nconsole.log(getEmail({ name: \"Ava\" }));",
    "solution": "interface User { name: string; email?: string; }\n\nfunction getEmail(user: User): string {\n  return user.email ? user.email.toLowerCase() : \"unknown\";\n}\n\nconsole.log(getEmail({ name: \"Ava\" }));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "user\\.email!\\.toLowerCase",
        "message": "TypeError: Cannot read properties of undefined (reading 'toLowerCase') — the ! assertion was a lie.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c2-java-null-equals-crash",
    "title": "Null Equals Crash",
    "lang": "Java",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "Checking a role against \"admin\" throws NullPointerException whenever role hasn't been assigned yet.",
    "objective": "Understand why calling .equals() ON a possibly-null variable is unsafe, and how flipping the comparison fixes it.",
    "hints": [
      "role.equals(\"admin\") throws if role itself is null.",
      "\"admin\".equals(role) is null-safe, since the literal is never null."
    ],
    "expectedOutput": "Returns false for a null role instead of throwing.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    static boolean isAdmin(String role) {\n        return role.equals(\"admin\");\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAdmin(null));\n    }\n}",
    "solution": "public class Main {\n    static boolean isAdmin(String role) {\n        return \"admin\".equals(role);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAdmin(null));\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\"admin\"\\.equals\\(role\\)",
        "message": "Exception in thread \"main\" java.lang.NullPointerException",
        "line": 3
      }
    ]
  },
  {
    "slug": "c2-cpp-nullptr-deref",
    "title": "Nullptr Deref",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "The program crashes with a segmentation fault whenever findUser() doesn't find a match.",
    "objective": "Understand why dereferencing a nullptr crashes, and how to guard against it before use.",
    "hints": [
      "findUser can legitimately return nullptr when nothing matches.",
      "Check the pointer against nullptr before dereferencing it."
    ],
    "expectedOutput": "Prints \"not found\" instead of crashing.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nstruct User { const char* name; };\n\nUser* findUser(User* users, int n, const char* target) {\n    for (int i = 0; i < n; i++) {\n        if (strcmp(users[i].name, target) == 0) return &users[i];\n    }\n    return nullptr;\n}\n\nint main() {\n    User users[] = { {\"Ava\"} };\n    User* found = findUser(users, 1, \"Ben\");\n    cout << found->name << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nstruct User { const char* name; };\n\nUser* findUser(User* users, int n, const char* target) {\n    for (int i = 0; i < n; i++) {\n        if (strcmp(users[i].name, target) == 0) return &users[i];\n    }\n    return nullptr;\n}\n\nint main() {\n    User users[] = { {\"Ava\"} };\n    User* found = findUser(users, 1, \"Ben\");\n    if (found == nullptr) {\n        cout << \"not found\" << endl;\n    } else {\n        cout << found->name << endl;\n    }\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "found\\s*==\\s*nullptr",
        "message": "Segmentation fault (core dumped)",
        "line": 17
      }
    ]
  },
  {
    "slug": "c3-js-promise-all-order",
    "title": "Promise All Order",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Fetching three users one-by-one with await in a loop takes 3x longer than necessary.",
    "objective": "Understand how Promise.all() runs independent async operations concurrently instead of sequentially.",
    "hints": [
      "Awaiting inside a for loop runs each request only after the previous one finishes.",
      "Start all the promises first, then await them together with Promise.all()."
    ],
    "expectedOutput": "All three users are fetched concurrently, not one after another.",
    "fileName": "fetchAll.js",
    "buggyCode": "async function fetchAll(ids, fetchUser) {\n  const users = [];\n  for (const id of ids) {\n    users.push(await fetchUser(id));\n  }\n  return users;\n}",
    "solution": "async function fetchAll(ids, fetchUser) {\n  return Promise.all(ids.map(id => fetchUser(id)));\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "Promise\\.all\\(",
        "message": "Fetching 3 users takes 3x longer than needed — each await blocks the next request from starting.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c3-py-async-forgot-await",
    "title": "Async Forgot Await",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "get_status() returns a coroutine object printed as text, instead of the actual status string.",
    "objective": "Understand that calling an async function without await just creates a coroutine object — it doesn't run it.",
    "hints": [
      "fetch_status(url) without await returns an un-awaited coroutine, not a result.",
      "Add await before the call inside the async function."
    ],
    "expectedOutput": "Prints the actual status string, not a coroutine repr.",
    "fileName": "fetcher.py",
    "buggyCode": "import asyncio\n\nasync def fetch_status(url):\n    return \"ok\"\n\nasync def get_status(url):\n    result = fetch_status(url)\n    return result\n\nprint(asyncio.run(get_status(\"x\")))",
    "solution": "import asyncio\n\nasync def fetch_status(url):\n    return \"ok\"\n\nasync def get_status(url):\n    result = await fetch_status(url)\n    return result\n\nprint(asyncio.run(get_status(\"x\")))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "await\\s+fetch_status\\(url\\)",
        "message": "<coroutine object fetch_status at 0x...> — the coroutine was never awaited.",
        "line": 7
      }
    ]
  },
  {
    "slug": "c3-sql-transaction-missing",
    "title": "Transaction Missing",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "If the second UPDATE fails, money disappears — debited from one account but never credited to the other.",
    "objective": "Understand why a multi-step money transfer needs to be wrapped in a transaction.",
    "hints": [
      "Without a transaction, each statement commits independently — a failure midway leaves inconsistent data.",
      "Wrap both UPDATEs in START TRANSACTION / COMMIT."
    ],
    "expectedOutput": "Both updates succeed together, or neither does.",
    "fileName": "transfer.sql",
    "buggyCode": "UPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;",
    "solution": "START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "accounts",
          "create": "CREATE TABLE accounts (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  balance DECIMAL(10,2) NOT NULL\n);",
          "columns": [
            "id",
            "balance"
          ],
          "rows": [
            [
              "1",
              "500.00"
            ],
            [
              "2",
              "100.00"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "START\\s+TRANSACTION",
        "flags": "i",
        "message": "A failure between the two UPDATEs would leave $100 debited with nowhere credited.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c3-go-goroutine-no-wait",
    "title": "Goroutine No Wait",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "main() exits before any of the launched goroutines print anything.",
    "objective": "Understand that main() doesn't wait for goroutines to finish unless you explicitly tell it to.",
    "hints": [
      "Launching a goroutine returns immediately — main() keeps going without waiting.",
      "Use a sync.WaitGroup to block until all goroutines finish."
    ],
    "expectedOutput": "All 3 goroutines print before the program exits.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 0; i < 3; i++ {\n\t\tgo fmt.Println(i)\n\t}\n}",
    "solution": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func(i int) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println(i)\n\t\t}(i)\n\t}\n\twg.Wait()\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "sync\\.WaitGroup",
        "message": "Program exits immediately, printing nothing — main() never waits for the goroutines.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c3-js-race-condition-counter",
    "title": "Race Condition Counter",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Clicking \"Save\" rapidly sometimes saves an outdated count, overwriting a more recent one.",
    "objective": "Understand a request race condition: an older, slower response can resolve after a newer one.",
    "hints": [
      "If a slow earlier request resolves after a faster later one, its stale data overwrites the fresh data.",
      "Track a request id/token and ignore responses that aren't the latest one issued."
    ],
    "expectedOutput": "Only the response for the most recently issued request is applied.",
    "fileName": "counter.js",
    "buggyCode": "let latestCount = 0;\n\nasync function save(count, saveToServer) {\n  const result = await saveToServer(count);\n  latestCount = result;\n}",
    "solution": "let latestCount = 0;\nlet requestId = 0;\n\nasync function save(count, saveToServer) {\n  const myId = ++requestId;\n  const result = await saveToServer(count);\n  if (myId === requestId) {\n    latestCount = result;\n  }\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "myId\\s*===\\s*requestId",
        "message": "An older, slower save() call overwrote a newer value that had already resolved.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c3-py-threading-shared-state",
    "title": "Threading Shared State",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "Running 100 threads that each increment a shared counter by 1 often produces a final count less than 100.",
    "objective": "Understand why incrementing a shared variable across threads isn't atomic without a lock.",
    "hints": [
      "counter += 1 is actually read-modify-write — two threads can interleave and lose an update.",
      "Protect the increment with a threading.Lock()."
    ],
    "expectedOutput": "The final counter value is always exactly 100.",
    "fileName": "counter.py",
    "buggyCode": "import threading\n\ncounter = 0\n\ndef increment():\n    global counter\n    counter += 1\n\nthreads = [threading.Thread(target=increment) for _ in range(100)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter)",
    "solution": "import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef increment():\n    global counter\n    with lock:\n        counter += 1\n\nthreads = [threading.Thread(target=increment) for _ in range(100)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "threading\\.Lock\\(\\)",
        "message": "Final count is 97 (or similar) instead of 100 — a data race lost some increments.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c3-go-channel-deadlock-select",
    "title": "Channel Deadlock Select",
    "lang": "Go",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "The worker never receives a shutdown signal because the main goroutine sends it after the worker has already stopped listening.",
    "objective": "Understand a timing bug where a signal is sent before anyone is ready to receive it, and how a done channel with select fixes it.",
    "hints": [
      "Sending on an unbuffered channel with no active receiver blocks forever if the worker already exited its loop.",
      "A select with a done channel lets the worker check for shutdown alongside normal work."
    ],
    "expectedOutput": "The worker cleanly stops when signaled, with no deadlock.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc worker(jobs <-chan int) {\n\tfor j := range jobs {\n\t\tfmt.Println(\"processing\", j)\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int)\n\tdone := make(chan bool)\n\tgo worker(jobs)\n\tjobs <- 1\n\tclose(jobs)\n\tdone <- true\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc worker(jobs <-chan int, done chan bool) {\n\tfor {\n\t\tselect {\n\t\tcase j, ok := <-jobs:\n\t\t\tif !ok {\n\t\t\t\tdone <- true\n\t\t\t\treturn\n\t\t\t}\n\t\t\tfmt.Println(\"processing\", j)\n\t\t}\n\t}\n}\n\nfunc main() {\n\tjobs := make(chan int)\n\tdone := make(chan bool)\n\tgo worker(jobs, done)\n\tjobs <- 1\n\tclose(jobs)\n\t<-done\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "select\\s*\\{",
        "message": "fatal error: all goroutines are asleep - deadlock! — done is sent to with nothing listening.",
        "line": 16
      }
    ]
  },
  {
    "slug": "c3-js-stale-closure-state",
    "title": "Stale Closure State",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "A repeating timer always logs the count from when it started, never the updated value.",
    "objective": "Understand how a setInterval callback closes over the variable's value at creation time, not its later updates.",
    "hints": [
      "The callback captures `count` from the outer scope, but reassigning count elsewhere doesn't update what setInterval already captured if it's re-declared each time incorrectly.",
      "Use a mutable reference (like an object or a functional update) so the interval always reads the latest value."
    ],
    "expectedOutput": "Each tick logs the current, up-to-date count.",
    "fileName": "timer.js",
    "buggyCode": "function startTimer() {\n  let count = 0;\n  setInterval(() => {\n    console.log(count);\n  }, 1000);\n\n  document.getElementById(\"inc\").onclick = () => {\n    let count = count + 1; // shadows outer count, never updates it\n  };\n}",
    "solution": "function startTimer() {\n  let count = 0;\n  setInterval(() => {\n    console.log(count);\n  }, 1000);\n\n  document.getElementById(\"inc\").onclick = () => {\n    count = count + 1;\n  };\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "onclick\\s*=\\s*\\(\\)\\s*=>\\s*\\{\\s*let\\s+count",
        "message": "The logged count never changes — the click handler shadows a new local `count` instead of updating the outer one.",
        "line": 8
      }
    ]
  },
  {
    "slug": "c4-sql-implicit-join-null",
    "title": "Implicit Join Null",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The \"employees without a manager\" report returns zero rows, even though several exist.",
    "objective": "Understand why an inner JOIN drops rows whose foreign key is NULL.",
    "hints": [
      "A regular JOIN only keeps rows that match on both sides — a NULL manager_id never matches anything.",
      "Filter with WHERE manager_id IS NULL instead of joining on it."
    ],
    "expectedOutput": "Returns every employee whose manager_id is NULL.",
    "fileName": "unassigned.sql",
    "buggyCode": "SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.id WHERE m.id IS NULL;",
    "solution": "SELECT name FROM employees WHERE manager_id IS NULL;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "employees",
          "create": "CREATE TABLE employees (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  manager_id INT NULL\n);",
          "columns": [
            "id",
            "name",
            "manager_id"
          ],
          "rows": [
            [
              "1",
              "Ava",
              "NULL"
            ],
            [
              "2",
              "Ben",
              "1"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "WHERE\\s+manager_id\\s+IS\\s+NULL",
        "flags": "i",
        "message": "0 rows returned — the JOIN itself excludes any row with a NULL manager_id before the WHERE even runs.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-delete-no-where",
    "title": "Delete No Where",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 18,
    "bugReport": "A cleanup script meant to remove one expired session deleted every session in the table.",
    "objective": "Understand why DELETE without a WHERE clause removes every row.",
    "hints": [
      "DELETE FROM table; with no WHERE clause deletes everything, not just the intended row.",
      "Add WHERE id = 42 (or the actual target) before running a DELETE."
    ],
    "expectedOutput": "Only the specific expired session is removed.",
    "fileName": "cleanup.sql",
    "buggyCode": "DELETE FROM sessions;",
    "solution": "DELETE FROM sessions WHERE id = 1;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "sessions",
          "create": "CREATE TABLE sessions (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  token VARCHAR(255) NOT NULL,\n  expired TINYINT(1) NOT NULL DEFAULT 0\n);",
          "columns": [
            "id",
            "token",
            "expired"
          ],
          "rows": [
            [
              "1",
              "abc",
              "1"
            ],
            [
              "2",
              "def",
              "0"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "DELETE\\s+FROM\\s+sessions\\s+WHERE",
        "flags": "i",
        "message": "Query OK, 2 rows affected — every session was deleted, not just the expired one.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-count-distinct-missing",
    "title": "Count Distinct Missing",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "The \"unique visitors\" count is way too high — it's counting every page view, not distinct visitors.",
    "objective": "Understand the difference between COUNT(column) and COUNT(DISTINCT column).",
    "hints": [
      "COUNT(visitor_id) counts every row, including repeat visits from the same visitor.",
      "Use COUNT(DISTINCT visitor_id) to count unique visitors."
    ],
    "expectedOutput": "Returns the number of distinct visitors, not total page views.",
    "fileName": "unique_visitors.sql",
    "buggyCode": "SELECT COUNT(visitor_id) AS unique_visitors FROM page_views;",
    "solution": "SELECT COUNT(DISTINCT visitor_id) AS unique_visitors FROM page_views;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "page_views",
          "create": "CREATE TABLE page_views (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  visitor_id INT NOT NULL\n);",
          "columns": [
            "id",
            "visitor_id"
          ],
          "rows": [
            [
              "1",
              "5"
            ],
            [
              "2",
              "5"
            ],
            [
              "3",
              "6"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "COUNT\\(\\s*DISTINCT\\s+visitor_id\\s*\\)",
        "flags": "i",
        "message": "Returns 3 total page views instead of 2 unique visitors.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-foreign-key-order",
    "title": "Foreign Key Order",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Running this schema setup script fails with a foreign key constraint error before any tables are even populated.",
    "objective": "Understand why a table with a foreign key must be created after the table it references.",
    "hints": [
      "orders references customers.id — customers must exist as a table first.",
      "Reorder the CREATE TABLE statements so customers comes before orders."
    ],
    "expectedOutput": "Both tables are created successfully, in dependency order.",
    "fileName": "schema_setup.sql",
    "buggyCode": "CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\nCREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);",
    "solution": "CREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);",
    "terminalKind": "sql",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "CREATE\\s+TABLE\\s+customers[\\s\\S]*CREATE\\s+TABLE\\s+orders",
        "flags": "i",
        "message": "ERROR 1824 (HY000): Failed to open the referenced table 'customers'",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-having-vs-where",
    "title": "Having Vs Where",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Filtering customers whose total spend exceeds $500 fails with a syntax/aggregate error.",
    "objective": "Understand why filtering on an aggregate result requires HAVING, not WHERE.",
    "hints": [
      "WHERE filters rows before aggregation happens — SUM() doesn't exist yet at that point.",
      "Use HAVING SUM(amount) > 500 to filter after the GROUP BY aggregates."
    ],
    "expectedOutput": "Returns only customers whose total spend exceeds 500.",
    "fileName": "big_spenders.sql",
    "buggyCode": "SELECT customer_id, SUM(amount) AS total\nFROM orders\nWHERE SUM(amount) > 500\nGROUP BY customer_id;",
    "solution": "SELECT customer_id, SUM(amount) AS total\nFROM orders\nGROUP BY customer_id\nHAVING SUM(amount) > 500;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  amount DECIMAL(10,2) NOT NULL\n);",
          "columns": [
            "id",
            "customer_id",
            "amount"
          ],
          "rows": [
            [
              "1",
              "1",
              "300.00"
            ],
            [
              "2",
              "1",
              "300.00"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "WHERE\\s+SUM\\(amount\\)",
        "flags": "i",
        "message": "ERROR 1111 (HY000): Invalid use of group function",
        "line": 3
      }
    ]
  },
  {
    "slug": "c4-sql-index-missing-slow",
    "title": "Index Missing Slow",
    "lang": "SQL",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "Looking up a user by email takes several seconds on a table with a million rows.",
    "objective": "Understand why a WHERE clause on an unindexed column forces a full table scan.",
    "hints": [
      "Without an index, MySQL has to check every single row to find a match.",
      "Add an index on the email column so lookups can use it directly."
    ],
    "expectedOutput": "The lookup uses an index instead of scanning the whole table.",
    "fileName": "lookup.sql",
    "buggyCode": "SELECT * FROM users WHERE email = 'a@example.com';",
    "solution": "CREATE INDEX idx_users_email ON users(email);\nSELECT * FROM users WHERE email = 'a@example.com';",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "users",
          "create": "CREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "email"
          ],
          "rows": [
            [
              "1",
              "a@example.com"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "CREATE\\s+INDEX\\s+\\w+\\s+ON\\s+users\\s*\\(\\s*email\\s*\\)",
        "flags": "i",
        "message": "Query takes 4.2s — full table scan on a million-row table with no index on email.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-n-plus-one-conceptual",
    "title": "N Plus One Conceptual",
    "lang": "SQL",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "Loading 100 orders with their items runs 101 separate queries instead of a couple.",
    "objective": "Understand the N+1 query problem and how a single JOIN replaces a query-per-row loop.",
    "hints": [
      "Running one query to get orders, then a separate query per order for its items, is the classic N+1 pattern.",
      "A single JOIN across orders and order_items retrieves everything in one round trip."
    ],
    "expectedOutput": "One query returns every order with its items, instead of 1 + N queries.",
    "fileName": "orders_with_items.sql",
    "buggyCode": "-- Application code (pseudocode-in-SQL-comments):\n-- SELECT * FROM orders;\n-- for each order: SELECT * FROM order_items WHERE order_id = ?;\nSELECT * FROM orders;",
    "solution": "SELECT o.id AS order_id, oi.product\nFROM orders o\nJOIN order_items oi ON oi.order_id = o.id;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "orders",
          "create": "CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT NOT NULL\n);",
          "columns": [
            "id",
            "customer_id"
          ],
          "rows": [
            [
              "1",
              "5"
            ]
          ]
        },
        {
          "name": "order_items",
          "create": "CREATE TABLE order_items (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  order_id INT NOT NULL,\n  product VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "order_id",
            "product"
          ],
          "rows": [
            [
              "1",
              "1",
              "Widget"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "JOIN\\s+order_items",
        "flags": "i",
        "message": "101 queries executed for 100 orders — one per order, plus the initial list query.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c4-sql-string-date-compare",
    "title": "String Date Compare",
    "lang": "SQL",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Filtering expired subscriptions using a text comparison misses some rows that should clearly be expired.",
    "objective": "Understand why comparing a DATE column to a string literal without proper typing can behave unexpectedly across formats.",
    "hints": [
      "Storing or comparing dates as plain VARCHAR strings sorts/compares lexicographically, not chronologically.",
      "Cast or store the column as a proper DATE type and compare using DATE functions."
    ],
    "expectedOutput": "All subscriptions with expires_at before today are correctly identified, regardless of text formatting.",
    "fileName": "expired.sql",
    "buggyCode": "SELECT * FROM subscriptions WHERE expires_at < '2025-10-01';",
    "solution": "SELECT * FROM subscriptions WHERE STR_TO_DATE(expires_at, '%Y-%m-%d') < '2025-10-01';",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "subscriptions",
          "create": "CREATE TABLE subscriptions (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  expires_at VARCHAR(20) NOT NULL\n);",
          "columns": [
            "id",
            "expires_at"
          ],
          "rows": [
            [
              "1",
              "2025-9-1"
            ],
            [
              "2",
              "2025-12-01"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "STR_TO_DATE\\(",
        "flags": "i",
        "message": "'2025-9-1' sorts after '2025-12-01' as plain text, so the September row is missed.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c5-js-slice-end-index",
    "title": "Slice End Index",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Paginating with 10 items per page shows 11 items on every page.",
    "objective": "Understand that Array.slice(start, end) excludes the end index.",
    "hints": [
      "slice(0, 11) actually returns 11 items (indices 0 through 10).",
      "Use slice(start, start + pageSize) with the correct page size."
    ],
    "expectedOutput": "Each page shows exactly 10 items.",
    "fileName": "page.js",
    "buggyCode": "function getPage(items, page, pageSize) {\n  const start = page * pageSize;\n  return items.slice(start, start + pageSize + 1);\n}",
    "solution": "function getPage(items, page, pageSize) {\n  const start = page * pageSize;\n  return items.slice(start, start + pageSize);\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "start\\s*\\+\\s*pageSize\\s*\\+\\s*1",
        "message": "Returns 11 items per page instead of 10.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c5-py-range-exclusive-end",
    "title": "Range Exclusive End",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "countdown(5) should print 5,4,3,2,1 but stops at 2.",
    "objective": "Understand that range(start, stop) never includes stop.",
    "hints": [
      "range(5, 1, -1) produces 5,4,3,2 — it stops before reaching 1.",
      "Use range(5, 0, -1) to include 1."
    ],
    "expectedOutput": "Prints 5, 4, 3, 2, 1.",
    "fileName": "countdown.py",
    "buggyCode": "def countdown(n):\n    for i in range(n, 1, -1):\n        print(i)\n\ncountdown(5)",
    "solution": "def countdown(n):\n    for i in range(n, 0, -1):\n        print(i)\n\ncountdown(5)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "range\\(n,\\s*1,\\s*-1\\)",
        "message": "Stops at 2 — range(n, 1, -1) excludes 1.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c5-java-substring-bounds",
    "title": "Substring Bounds",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Truncating a name to 5 characters throws StringIndexOutOfBoundsException for shorter names.",
    "objective": "Understand why substring() needs a bounds check against the actual string length.",
    "hints": [
      "\"Al\".substring(0, 5) throws because the string is shorter than 5 characters.",
      "Clamp the end index to Math.min(name.length(), 5)."
    ],
    "expectedOutput": "truncate(\"Al\", 5) returns \"Al\" without throwing.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    static String truncate(String name, int len) {\n        return name.substring(0, len);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(truncate(\"Al\", 5));\n    }\n}",
    "solution": "public class Main {\n    static String truncate(String name, int len) {\n        return name.substring(0, Math.min(name.length(), len));\n    }\n\n    public static void main(String[] args) {\n        System.out.println(truncate(\"Al\", 5));\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "Math\\.min\\(name\\.length\\(\\),\\s*len\\)",
        "message": "Exception in thread \"main\" java.lang.StringIndexOutOfBoundsException",
        "line": 3
      }
    ]
  },
  {
    "slug": "c5-c-buffer-off-by-one-null",
    "title": "Buffer Off By One Null",
    "lang": "C",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Copying a 5-character string into a 5-byte buffer corrupts adjacent memory.",
    "objective": "Understand that a C string needs room for a trailing null terminator beyond its visible characters.",
    "hints": [
      "A 5-character string needs a 6-byte buffer: 5 characters plus '\\0'.",
      "Size the buffer as strlen(source) + 1."
    ],
    "expectedOutput": "The buffer is large enough to hold the string plus its null terminator.",
    "fileName": "main.c",
    "buggyCode": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    const char* src = \"Hello\";\n    char buffer[5];\n    strcpy(buffer, src);\n    printf(\"%s\\n\", buffer);\n    return 0;\n}",
    "solution": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    const char* src = \"Hello\";\n    char buffer[6];\n    strcpy(buffer, src);\n    printf(\"%s\\n\", buffer);\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "char\\s+buffer\\[5\\]",
        "message": "*** buffer overflow detected ***: terminated — 5 bytes isn't enough for \"Hello\" plus its null terminator.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c5-go-slice-bounds-panic",
    "title": "Slice Bounds Panic",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Getting the last 3 elements of a short slice panics instead of returning what's available.",
    "objective": "Understand why slicing beyond a slice's length panics, and how to clamp the start index.",
    "hints": [
      "items[len(items)-3:] panics if len(items) is less than 3.",
      "Clamp the start index to 0 when the slice is shorter than requested."
    ],
    "expectedOutput": "lastN([]int{1,2}, 3) returns [1, 2] instead of panicking.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc lastN(items []int, n int) []int {\n\treturn items[len(items)-n:]\n}\n\nfunc main() {\n\tfmt.Println(lastN([]int{1, 2}, 3))\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc lastN(items []int, n int) []int {\n\tstart := len(items) - n\n\tif start < 0 {\n\t\tstart = 0\n\t}\n\treturn items[start:]\n}\n\nfunc main() {\n\tfmt.Println(lastN([]int{1, 2}, 3))\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "start\\s*<\\s*0",
        "message": "panic: runtime error: slice bounds out of range [-1:]",
        "line": 6
      }
    ]
  },
  {
    "slug": "c5-php-array-slice-count",
    "title": "Array Slice Count",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "getRecent($items, 3) returns 4 items instead of 3.",
    "objective": "Understand array_slice()'s length argument versus an off-by-one end index mistake.",
    "hints": [
      "array_slice($arr, 0, 4) explicitly asks for 4 elements — the length argument was miscalculated.",
      "Pass the exact count requested, not count + 1."
    ],
    "expectedOutput": "getRecent($items, 3) returns exactly 3 items.",
    "fileName": "recent.php",
    "buggyCode": "<?php\nfunction getRecent($items, $count) {\n    return array_slice($items, 0, $count + 1);\n}\n\nprint_r(getRecent([1,2,3,4,5], 3));",
    "solution": "<?php\nfunction getRecent($items, $count) {\n    return array_slice($items, 0, $count);\n}\n\nprint_r(getRecent([1,2,3,4,5], 3));",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "array_slice\\(\\$items,\\s*0,\\s*\\$count\\s*\\+\\s*1\\)",
        "message": "Returns 4 items instead of the requested 3.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c5-cpp-fencepost-matrix",
    "title": "Fencepost Matrix",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "Summing a 3x3 matrix's diagonal reads one element past the last row, crashing intermittently.",
    "objective": "Understand a fencepost error in nested loop bounds against a 2D array's actual dimensions.",
    "hints": [
      "The loop condition uses <= size instead of < size for the row index.",
      "Diagonal indices must stay strictly less than the matrix dimension."
    ],
    "expectedOutput": "Sums exactly the 3 diagonal elements of a 3x3 matrix.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int sum = 0;\n    for (int i = 0; i <= 3; i++) {\n        sum += m[i][i];\n    }\n    cout << sum << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        sum += m[i][i];\n    }\n    cout << sum << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "i\\s*<=\\s*3",
        "message": "Reads m[3][3], one row past the end of the array — undefined behavior.",
        "line": 7
      }
    ]
  },
  {
    "slug": "c5-py-binary-search-bounds",
    "title": "Binary Search Bounds",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "binary_search finds most values correctly but misses the very last element of the array.",
    "objective": "Understand a classic off-by-one in binary search's upper bound.",
    "hints": [
      "high = len(arr) - 1 sets the correct initial upper bound, but the loop condition low <= high must be used, not low < high, or the last element is skipped.",
      "Check the loop's continuation condition carefully against inclusive bounds."
    ],
    "expectedOutput": "binary_search([1,2,3,4,5], 5) returns index 4, not -1.",
    "fileName": "search.py",
    "buggyCode": "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([1,2,3,4,5], 5))",
    "solution": "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([1,2,3,4,5], 5))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "while\\s+low\\s*<\\s*high\\s*:",
        "message": "Returns -1 for a value that's actually in the array — the loop exits one comparison too early.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c6-js-fetch-no-status-check",
    "title": "Fetch No Status Check",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "A failed request (404/500) is silently treated as success — the UI shows old data with no error.",
    "objective": "Understand that fetch() only rejects on network failure, never on HTTP error status codes.",
    "hints": [
      "fetch() resolves even for a 404 or 500 response — it doesn't throw automatically.",
      "Check response.ok (or response.status) before treating the response as successful."
    ],
    "expectedOutput": "A 404/500 response is detected and handled as an error.",
    "fileName": "api.js",
    "buggyCode": "async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}",
    "solution": "async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) {\n    throw new Error(\"Failed to load user: \" + res.status);\n  }\n  return res.json();\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "if\\s*\\(!res\\.ok\\)",
        "message": "A 404 response is silently parsed as JSON — fetch() never rejects on HTTP error status.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c6-js-cors-hardcoded-origin",
    "title": "Cors Hardcoded Origin",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "The API works from the production domain but is blocked by CORS from the staging domain.",
    "objective": "Understand why hardcoding a single allowed origin breaks any other legitimate domain.",
    "hints": [
      "Access-Control-Allow-Origin set to one fixed domain rejects every other origin outright.",
      "Maintain a list of allowed origins and check the incoming request's origin against it."
    ],
    "expectedOutput": "Both production and staging origins are allowed.",
    "fileName": "server.js",
    "buggyCode": "app.use((req, res, next) => {\n  res.header(\"Access-Control-Allow-Origin\", \"https://app.example.com\");\n  next();\n});",
    "solution": "const allowedOrigins = [\"https://app.example.com\", \"https://staging.example.com\"];\n\napp.use((req, res, next) => {\n  if (allowedOrigins.includes(req.headers.origin)) {\n    res.header(\"Access-Control-Allow-Origin\", req.headers.origin);\n  }\n  next();\n});",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "allowedOrigins",
        "message": "Access to fetch at '.../api' from origin 'https://staging.example.com' has been blocked by CORS policy.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c6-js-form-default-submit",
    "title": "Form Default Submit",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Submitting the form reloads the whole page instead of running the JS submit handler.",
    "objective": "Understand why preventDefault() is required to stop a form's native submission behavior.",
    "hints": [
      "A form's default action is to reload/navigate on submit.",
      "Call event.preventDefault() at the start of the submit handler."
    ],
    "expectedOutput": "The page does not reload; only the JS handler runs.",
    "fileName": "form.js",
    "buggyCode": "form.addEventListener(\"submit\", (event) => {\n  console.log(\"submitting\", new FormData(form));\n});",
    "solution": "form.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  console.log(\"submitting\", new FormData(form));\n});",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "event\\.preventDefault\\(\\)",
        "message": "Page reloads immediately — the console.log never gets a chance to run before navigation.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c6-js-debounce-search-input",
    "title": "Debounce Search Input",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Typing a search query fires an API request on every single keystroke, overwhelming the backend.",
    "objective": "Understand why input handlers for expensive operations need debouncing.",
    "hints": [
      "Every keyup event triggers a new fetch, with no delay or cancellation.",
      "Debounce the handler so it only fires after typing pauses."
    ],
    "expectedOutput": "A search request only fires after ~300ms of no further typing.",
    "fileName": "search.js",
    "buggyCode": "input.addEventListener(\"keyup\", () => {\n  search(input.value);\n});",
    "solution": "let timer;\ninput.addEventListener(\"keyup\", () => {\n  clearTimeout(timer);\n  timer = setTimeout(() => search(input.value), 300);\n});",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "clearTimeout\\(timer\\)",
        "message": "5 requests fired for a 5-character search term typed quickly.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c6-js-xss-innerhtml",
    "title": "Xss Innerhtml",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "A security review flagged that user-submitted comments can execute arbitrary script on the page.",
    "objective": "Understand why setting innerHTML with unescaped user input is a stored XSS vulnerability.",
    "hints": [
      "innerHTML parses and executes any HTML/script tags inside the string.",
      "Use textContent to insert plain text safely, or properly sanitize/escape HTML."
    ],
    "expectedOutput": "A comment containing <script> tags is displayed as literal text, not executed.",
    "fileName": "comments.js",
    "buggyCode": "function renderComment(text) {\n  const div = document.createElement(\"div\");\n  div.innerHTML = text;\n  document.body.appendChild(div);\n}",
    "solution": "function renderComment(text) {\n  const div = document.createElement(\"div\");\n  div.textContent = text;\n  document.body.appendChild(div);\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "\\.innerHTML\\s*=\\s*text",
        "message": "Security scan: stored XSS — a comment containing <script>alert(1)</script> executes on page load.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c6-php-csrf-missing",
    "title": "Csrf Missing",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "A security audit found the money-transfer endpoint can be triggered from any external site the user happens to be logged into.",
    "objective": "Understand why state-changing POST endpoints need CSRF token validation.",
    "hints": [
      "Without a CSRF token, any site can submit a form to this endpoint using the victim's existing session cookie.",
      "Validate a per-session CSRF token before processing the transfer."
    ],
    "expectedOutput": "Requests without a valid CSRF token are rejected.",
    "fileName": "transfer.php",
    "buggyCode": "<?php\nfunction transfer($fromId, $toId, $amount) {\n    doTransfer($fromId, $toId, $amount);\n    echo \"Transfer complete\";\n}",
    "solution": "<?php\nfunction transfer($fromId, $toId, $amount, $csrfToken) {\n    if (!hash_equals($_SESSION['csrf_token'], $csrfToken)) {\n        http_response_code(403);\n        die(\"Invalid CSRF token\");\n    }\n    doTransfer($fromId, $toId, $amount);\n    echo \"Transfer complete\";\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "csrf_token",
        "message": "Security audit: CSRF — a malicious site can trigger a transfer using the victim's session, with no token check.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c6-js-memory-leak-listener",
    "title": "Memory Leak Listener",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "Opening and closing the modal repeatedly makes the page progressively slower and consumes more memory.",
    "objective": "Understand why event listeners attached without cleanup accumulate as a memory leak.",
    "hints": [
      "Every time the modal opens, a new resize listener is added, but the old ones are never removed.",
      "Remove the listener in a cleanup step when the modal closes."
    ],
    "expectedOutput": "Exactly one resize listener exists at a time, regardless of how many times the modal opens.",
    "fileName": "modal.js",
    "buggyCode": "function openModal() {\n  window.addEventListener(\"resize\", handleResize);\n  showModal();\n}\n\nfunction closeModal() {\n  hideModal();\n}",
    "solution": "function openModal() {\n  window.addEventListener(\"resize\", handleResize);\n  showModal();\n}\n\nfunction closeModal() {\n  window.removeEventListener(\"resize\", handleResize);\n  hideModal();\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "removeEventListener\\(\"resize\"",
        "message": "After opening/closing the modal 50 times, 50 resize listeners are still active.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c6-js-jwt-not-verified",
    "title": "Jwt Not Verified",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "A security review found that a tampered JWT with a modified payload is still accepted as valid.",
    "objective": "Understand the difference between decoding a JWT and actually verifying its signature.",
    "hints": [
      "jwt.decode() reads the payload without checking whether the signature is valid at all.",
      "Use jwt.verify() with the secret/key so a tampered token is rejected."
    ],
    "expectedOutput": "A token with a tampered payload and invalid signature is rejected.",
    "fileName": "auth.js",
    "buggyCode": "const jwt = require(\"jsonwebtoken\");\n\nfunction getUser(token) {\n  const payload = jwt.decode(token);\n  return payload;\n}",
    "solution": "const jwt = require(\"jsonwebtoken\");\n\nfunction getUser(token, secret) {\n  const payload = jwt.verify(token, secret);\n  return payload;\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "jwt\\.verify\\(",
        "message": "Security audit: a JWT with role changed from 'user' to 'admin' and no valid signature is accepted.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c7-js-parseint-radix",
    "title": "Parseint Radix",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "parseInt(\"08\") returns unexpected results in some older environments due to octal interpretation ambiguity, and the code relies on that guesswork.",
    "objective": "Understand why parseInt() should always be called with an explicit radix.",
    "hints": [
      "Without a radix, parseInt() can guess the base from the string's format, which is unreliable.",
      "Always pass 10 explicitly: parseInt(str, 10)."
    ],
    "expectedOutput": "parseInt(\"08\", 10) reliably returns 8.",
    "fileName": "parse.js",
    "buggyCode": "function toNumber(str) {\n  return parseInt(str);\n}\n\nconsole.log(toNumber(\"08\"));",
    "solution": "function toNumber(str) {\n  return parseInt(str, 10);\n}\n\nconsole.log(toNumber(\"08\"));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "parseInt\\(str,\\s*10\\)",
        "message": "Result depends on runtime-specific radix guessing rather than always parsing as base 10.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c7-js-nan-equality",
    "title": "Nan Equality",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "isInvalid(NaN) returns false — the exact case it's supposed to catch.",
    "objective": "Understand why NaN === NaN is always false, and how to detect NaN correctly.",
    "hints": [
      "NaN never equals anything, including itself, when compared with ===.",
      "Use Number.isNaN(value) to correctly detect NaN."
    ],
    "expectedOutput": "isInvalid(NaN) returns true.",
    "fileName": "validate.js",
    "buggyCode": "function isInvalid(value) {\n  return value === NaN;\n}\n\nconsole.log(isInvalid(NaN));",
    "solution": "function isInvalid(value) {\n  return Number.isNaN(value);\n}\n\nconsole.log(isInvalid(NaN));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "value\\s*===\\s*NaN",
        "message": "false — NaN === NaN is always false in JavaScript.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c7-py-type-string-int-concat",
    "title": "Type String Int Concat",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "Building an invoice line raises TypeError: can only concatenate str.",
    "objective": "Understand why Python requires explicit conversion when mixing str and numeric types.",
    "hints": [
      "\"Total: \" + 42 fails because Python won't implicitly convert an int to a string.",
      "Wrap the number in str() before concatenating."
    ],
    "expectedOutput": "Prints \"Total: 42\" with no error.",
    "fileName": "invoice.py",
    "buggyCode": "def invoice_line(total):\n    return \"Total: \" + total\n\nprint(invoice_line(42))",
    "solution": "def invoice_line(total):\n    return \"Total: \" + str(total)\n\nprint(invoice_line(42))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\+\\s*str\\(total\\)",
        "message": "TypeError: can only concatenate str (not \"int\") to str",
        "line": 2
      }
    ]
  },
  {
    "slug": "c7-ts-any-type-escape",
    "title": "Any Type Escape",
    "lang": "TypeScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "processAmount(\"100\") silently returns \"100100\" (string concatenation) instead of 200, with no compiler warning.",
    "objective": "Understand how the `any` type disables all of TypeScript's type checking for a value.",
    "hints": [
      "Typing amount as `any` means TypeScript won't catch that a string got passed where a number was expected.",
      "Use a proper `number` type, or validate/convert before using it."
    ],
    "expectedOutput": "processAmount(100) returns 200; passing a string is a compile-time error.",
    "fileName": "process.ts",
    "buggyCode": "function processAmount(amount: any): number {\n  return amount + amount;\n}\n\nconsole.log(processAmount(\"100\"));",
    "solution": "function processAmount(amount: number): number {\n  return amount + amount;\n}\n\nconsole.log(processAmount(100));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "amount:\\s*any",
        "message": "Returns \"100100\" (string concatenation) instead of 200 — `any` disabled all type checking.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c7-php-loose-in-array",
    "title": "Loose In Array",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "in_array(\"0\", $roles) incorrectly matches when $roles contains false or a non-matching falsy value.",
    "objective": "Understand why in_array() defaults to loose comparison, and when strict mode is needed.",
    "hints": [
      "Without the third argument, in_array() uses == comparisons, which allows surprising type coercion matches.",
      "Pass true as the third argument for strict, type-safe comparison."
    ],
    "expectedOutput": "in_array(\"0\", $roles, true) only matches an exact string \"0\".",
    "fileName": "roles.php",
    "buggyCode": "<?php\nfunction hasRole($roles, $role) {\n    return in_array($role, $roles);\n}\n\nvar_dump(hasRole([false, \"admin\"], \"0\"));",
    "solution": "<?php\nfunction hasRole($roles, $role) {\n    return in_array($role, $roles, true);\n}\n\nvar_dump(hasRole([false, \"admin\"], \"0\"));",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "in_array\\(\\$role,\\s*\\$roles,\\s*true\\)",
        "message": "bool(true) — \"0\" loosely equals false under PHP's default == comparison.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c7-java-autoboxing-npe",
    "title": "Autoboxing Npe",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Unboxing a null Integer throws NullPointerException during a simple comparison.",
    "objective": "Understand that auto-unboxing a null wrapper type throws NPE.",
    "hints": [
      "if (count > 0) auto-unboxes count from Integer to int — if count is null, this throws.",
      "Check for null explicitly before comparing, or use Optional."
    ],
    "expectedOutput": "Returns false for a null count instead of throwing.",
    "fileName": "Main.java",
    "buggyCode": "public class Main {\n    static boolean hasItems(Integer count) {\n        return count > 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(hasItems(null));\n    }\n}",
    "solution": "public class Main {\n    static boolean hasItems(Integer count) {\n        return count != null && count > 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(hasItems(null));\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "count\\s*!=\\s*null\\s*&&",
        "message": "Exception in thread \"main\" java.lang.NullPointerException — auto-unboxing null throws.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c7-cpp-implicit-narrowing",
    "title": "Implicit Narrowing",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "Storing a large calculated value into a smaller integer type silently truncates it to a wrong, wrapped number.",
    "objective": "Understand implicit narrowing conversions in C++ and why they don't produce a compiler error by default.",
    "hints": [
      "Assigning a long result into a short variable silently truncates bits with no warning.",
      "Use a properly-sized type (e.g. long or int64_t) to hold the full result."
    ],
    "expectedOutput": "Large computed values are stored correctly without truncation.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long bigValue = 1000000;\n    short stored = bigValue * 2;\n    cout << stored << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long bigValue = 1000000;\n    long stored = bigValue * 2;\n    cout << stored << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "short\\s+stored",
        "message": "Prints a small, wrapped-around number instead of 2000000 — short can't hold that value.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c7-go-interface-nil-check",
    "title": "Interface Nil Check",
    "lang": "Go",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Checking if an error interface is nil returns false even though the underlying concrete value is nil.",
    "objective": "Understand the classic Go gotcha: a non-nil interface can wrap a nil concrete value.",
    "hints": [
      "Returning a typed nil pointer as an `error` interface makes the interface itself non-nil.",
      "Return a literal nil directly when there's no error, rather than a nil-valued typed pointer."
    ],
    "expectedOutput": "err == nil correctly evaluates to true when there's genuinely no error.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string { return \"my error\" }\n\nfunc doWork() *MyError {\n\treturn nil\n}\n\nfunc run() error {\n\tvar err *MyError = doWork()\n\treturn err\n}\n\nfunc main() {\n\terr := run()\n\tfmt.Println(err == nil)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string { return \"my error\" }\n\nfunc doWork() *MyError {\n\treturn nil\n}\n\nfunc run() error {\n\tif err := doWork(); err != nil {\n\t\treturn err\n\t}\n\treturn nil\n}\n\nfunc main() {\n\terr := run()\n\tfmt.Println(err == nil)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "return\\s+nil\\s*\\n\\}\\s*\\n\\nfunc main",
        "message": "false — a non-nil interface value can wrap a nil concrete pointer.",
        "line": 15
      }
    ]
  },
  {
    "slug": "c8-php-plaintext-password",
    "title": "Plaintext Password",
    "lang": "PHP",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "A database leak would expose every user's password in plain, readable text.",
    "objective": "Understand why passwords must always be hashed before storage, never stored as-is.",
    "hints": [
      "Storing $password directly means anyone with DB access reads every password in plain text.",
      "Use password_hash() to store a proper one-way hash instead."
    ],
    "expectedOutput": "Only a hashed password is ever stored, never the raw value.",
    "fileName": "register.php",
    "buggyCode": "<?php\nfunction registerUser($pdo, $email, $password) {\n    $stmt = $pdo->prepare(\"INSERT INTO users (email, password) VALUES (?, ?)\");\n    $stmt->execute([$email, $password]);\n}",
    "solution": "<?php\nfunction registerUser($pdo, $email, $password) {\n    $hash = password_hash($password, PASSWORD_DEFAULT);\n    $stmt = $pdo->prepare(\"INSERT INTO users (email, password) VALUES (?, ?)\");\n    $stmt->execute([$email, $hash]);\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "password_hash\\(",
        "message": "Security audit: passwords column contains plain-text values.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c8-js-eval-user-input",
    "title": "Eval User Input",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "A user entering \"1); require('fs').rmSync('/', {recursive:true}); (\" into the calculator can execute arbitrary code.",
    "objective": "Understand why eval() on user input is a critical code-injection vulnerability.",
    "hints": [
      "eval() executes ANY JavaScript in the string, not just arithmetic.",
      "Use a safe expression parser/evaluator, never eval() on untrusted input."
    ],
    "expectedOutput": "User input is parsed as a restricted arithmetic expression only, never executed as code.",
    "fileName": "calc.js",
    "buggyCode": "function calculate(expr) {\n  return eval(expr);\n}",
    "solution": "function calculate(expr) {\n  if (!/^[\\d\\s+\\-*/().]+$/.test(expr)) {\n    throw new Error(\"Invalid expression\");\n  }\n  return Function('\"use strict\"; return (' + expr + \")\")();\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "return\\s+eval\\(expr\\)",
        "message": "Security audit: arbitrary code execution via eval() on unvalidated user input.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c8-sql-string-concat-injection",
    "title": "String Concat Injection",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "A username of ' OR '1'='1 logs in as the first user in the table, no password needed.",
    "objective": "Understand classic SQL injection via string concatenation in a login query.",
    "hints": [
      "Concatenating raw user input into a SQL string lets that input change the query's logic.",
      "Use a parameterized query with placeholders instead of string concatenation."
    ],
    "expectedOutput": "User input can never alter the query's structure, regardless of its content.",
    "fileName": "login.sql",
    "buggyCode": "-- application code builds and runs:\nSELECT * FROM users WHERE username = '${username}' AND password_hash = '${passwordHash}';",
    "solution": "-- parameterized query:\nSELECT * FROM users WHERE username = ? AND password_hash = ?;",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "users",
          "create": "CREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  username VARCHAR(255) NOT NULL,\n  password_hash VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "username",
            "password_hash"
          ],
          "rows": [
            [
              "1",
              "admin",
              "$2b$..."
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "username\\s*=\\s*'\\$\\{",
        "message": "Login bypassed with username: ' OR '1'='1 — string concatenation let input rewrite the query.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c8-js-open-redirect",
    "title": "Open Redirect",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "A link like /go?url=https://evil-phishing-site.com silently redirects users off the real site.",
    "objective": "Understand open redirect vulnerabilities and why redirect targets must be validated.",
    "hints": [
      "Redirecting to any URL provided in a query parameter lets attackers craft convincing phishing links using your trusted domain.",
      "Only allow redirects to a fixed allowlist of internal paths/domains."
    ],
    "expectedOutput": "Redirects to external, non-allowlisted domains are rejected.",
    "fileName": "redirect.js",
    "buggyCode": "app.get(\"/go\", (req, res) => {\n  res.redirect(req.query.url);\n});",
    "solution": "const ALLOWED = [\"/dashboard\", \"/profile\", \"/settings\"];\n\napp.get(\"/go\", (req, res) => {\n  if (!ALLOWED.includes(req.query.url)) {\n    return res.status(400).send(\"Invalid redirect target\");\n  }\n  res.redirect(req.query.url);\n});",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "ALLOWED\\.includes",
        "message": "Security audit: open redirect — /go?url=https://evil.example sends users to an attacker-controlled site.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c8-node-command-injection",
    "title": "Node Command Injection",
    "lang": "Node",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "A filename of \"a.jpg; rm -rf /\" executed an arbitrary shell command on the server.",
    "objective": "Understand command injection via unsanitized input passed to a shell command.",
    "hints": [
      "exec() runs its string through a shell, so ; and other shell metacharacters let an attacker chain commands.",
      "Use execFile() with arguments passed as an array, which bypasses the shell entirely."
    ],
    "expectedOutput": "A filename containing shell metacharacters is treated as a literal filename, not executed.",
    "fileName": "convert.js",
    "buggyCode": "const { exec } = require(\"child_process\");\n\nfunction convert(filename) {\n  exec(`convert ${filename} output.png`);\n}",
    "solution": "const { execFile } = require(\"child_process\");\n\nfunction convert(filename) {\n  execFile(\"convert\", [filename, \"output.png\"]);\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "exec\\(`convert",
        "message": "Security audit: command injection — a crafted filename executed an arbitrary shell command.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c8-php-file-upload-unrestricted",
    "title": "File Upload Unrestricted",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 130,
    "coins": 26,
    "bugReport": "An attacker uploaded a file named shell.php and then executed it directly by visiting its URL.",
    "objective": "Understand why file uploads must validate both file type and prevent execution in the upload directory.",
    "hints": [
      "Accepting any filename/extension lets an attacker upload executable server-side code disguised as a normal upload.",
      "Validate the file extension against an allowlist (e.g. jpg, png, pdf) before saving."
    ],
    "expectedOutput": "Only allowlisted file types (e.g. images) can be uploaded.",
    "fileName": "upload.php",
    "buggyCode": "<?php\nfunction handleUpload($file) {\n    move_uploaded_file($file[\"tmp_name\"], \"uploads/\" . $file[\"name\"]);\n}",
    "solution": "<?php\nfunction handleUpload($file) {\n    $allowed = [\"jpg\", \"jpeg\", \"png\", \"gif\"];\n    $ext = strtolower(pathinfo($file[\"name\"], PATHINFO_EXTENSION));\n    if (!in_array($ext, $allowed)) {\n        die(\"Invalid file type\");\n    }\n    move_uploaded_file($file[\"tmp_name\"], \"uploads/\" . uniqid() . \".\" . $ext);\n}",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\$allowed\\s*=",
        "message": "Security audit: shell.php was uploaded and executed directly from the uploads directory.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c8-node-jwt-secret-hardcoded",
    "title": "Node Jwt Secret Hardcoded",
    "lang": "Node",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "A security review found the JWT signing secret committed directly in source control, viewable by anyone with repo access.",
    "objective": "Understand why secrets must never be hardcoded, and should come from environment variables instead.",
    "hints": [
      "A hardcoded secret in source code is visible to anyone with repository access, past or present.",
      "Read the secret from process.env, and fail loudly if it's missing."
    ],
    "expectedOutput": "The JWT secret is loaded from an environment variable, never hardcoded.",
    "fileName": "auth.js",
    "buggyCode": "const jwt = require(\"jsonwebtoken\");\n\nfunction sign(payload) {\n  return jwt.sign(payload, \"super-secret-key-123\");\n}",
    "solution": "const jwt = require(\"jsonwebtoken\");\n\nfunction sign(payload) {\n  if (!process.env.JWT_SECRET) {\n    throw new Error(\"JWT_SECRET is not set\");\n  }\n  return jwt.sign(payload, process.env.JWT_SECRET);\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "jwt\\.sign\\(payload,\\s*\"super-secret-key-123\"\\)",
        "message": "Security audit: signing secret is committed in plain text in version control.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c8-py-pickle-untrusted",
    "title": "Pickle Untrusted",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "Loading a cached object from an untrusted source executed arbitrary code during deserialization.",
    "objective": "Understand why pickle.loads() on untrusted data is a remote code execution vulnerability.",
    "hints": [
      "pickle can execute arbitrary code as part of reconstructing an object — never unpickle untrusted data.",
      "Use a safe, restricted serialization format like JSON for untrusted data instead."
    ],
    "expectedOutput": "Untrusted cached data is loaded via a safe format (JSON) instead of pickle.",
    "fileName": "cache.py",
    "buggyCode": "import pickle\n\ndef load_cache(data):\n    return pickle.loads(data)",
    "solution": "import json\n\ndef load_cache(data):\n    return json.loads(data)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "pickle\\.loads\\(",
        "message": "Security audit: arbitrary code execution via pickle.loads() on untrusted cached data.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c9-js-foreach-no-break",
    "title": "Foreach No Break",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "findFirst() keeps checking every remaining item even after finding the match, wasting time on large arrays.",
    "objective": "Understand that forEach() cannot be stopped early — use a real for loop or find() when you need to exit early.",
    "hints": [
      "return inside a forEach callback only exits that single callback invocation, not the loop.",
      "Use Array.find() (or a for loop with break) so it stops as soon as a match is found."
    ],
    "expectedOutput": "The search stops as soon as the first match is found.",
    "fileName": "find.js",
    "buggyCode": "function findFirst(items, predicate) {\n  let result;\n  items.forEach(item => {\n    if (predicate(item)) {\n      result = item;\n      return;\n    }\n  });\n  return result;\n}",
    "solution": "function findFirst(items, predicate) {\n  return items.find(predicate);\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "items\\.find\\(predicate\\)",
        "message": "Checks all 10,000 items even though the match was at index 0 — forEach can't be short-circuited.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c9-py-infinite-while-no-update",
    "title": "Infinite While No Update",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "retry_until_success() never stops running, even after the operation succeeds.",
    "objective": "Understand why a while loop's condition variable must actually change inside the loop body.",
    "hints": [
      "attempts is never incremented, so the loop condition never becomes false.",
      "Increment attempts inside the loop."
    ],
    "expectedOutput": "The loop stops after at most max_attempts tries.",
    "fileName": "retry.py",
    "buggyCode": "def retry_until_success(operation, max_attempts):\n    attempts = 0\n    while attempts < max_attempts:\n        if operation():\n            return True\n    return False",
    "solution": "def retry_until_success(operation, max_attempts):\n    attempts = 0\n    while attempts < max_attempts:\n        if operation():\n            return True\n        attempts += 1\n    return False",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "attempts\\s*\\+=\\s*1",
        "message": "The loop never terminates — attempts stays at 0 forever.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c9-java-modify-list-foreach",
    "title": "Modify List Foreach",
    "lang": "Java",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Adding an item to a list while iterating over it with a for-each loop throws ConcurrentModificationException.",
    "objective": "Understand why structurally modifying a List during a for-each loop is unsafe.",
    "hints": [
      "Adding to the list mid-iteration invalidates the internal iterator.",
      "Collect new items separately, then add them all after the loop finishes."
    ],
    "expectedOutput": "Prints the final list with the new item added, with no exception.",
    "fileName": "Main.java",
    "buggyCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        for (String item : items) {\n            if (item.equals(\"a\")) {\n                items.add(\"c\");\n            }\n        }\n        System.out.println(items);\n    }\n}",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        List<String> toAdd = new ArrayList<>();\n        for (String item : items) {\n            if (item.equals(\"a\")) {\n                toAdd.add(\"c\");\n            }\n        }\n        items.addAll(toAdd);\n        System.out.println(items);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "toAdd\\.add\\(",
        "message": "Exception in thread \"main\" java.util.ConcurrentModificationException",
        "line": 8
      }
    ]
  },
  {
    "slug": "c9-go-for-range-value-copy",
    "title": "For Range Value Copy",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Doubling every item's score in a slice of structs via range has no effect — the original slice is unchanged.",
    "objective": "Understand that `for _, v := range slice` gives a COPY of each element, not a reference to it.",
    "hints": [
      "Modifying v inside the loop only changes the local copy, not the original struct in the slice.",
      "Index into the slice directly (slice[i].Score) to modify the actual element."
    ],
    "expectedOutput": "Every score in the original slice is doubled.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\ntype Player struct{ Score int }\n\nfunc main() {\n\tplayers := []Player{{Score: 10}, {Score: 20}}\n\tfor _, p := range players {\n\t\tp.Score *= 2\n\t}\n\tfmt.Println(players)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\ntype Player struct{ Score int }\n\nfunc main() {\n\tplayers := []Player{{Score: 10}, {Score: 20}}\n\tfor i := range players {\n\t\tplayers[i].Score *= 2\n\t}\n\tfmt.Println(players)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "players\\[i\\]\\.Score",
        "message": "[{10} {20}] — unchanged, since range gave a copy of each Player.",
        "line": 9
      }
    ]
  },
  {
    "slug": "c9-py-list-remove-while-iterating",
    "title": "List Remove While Iterating",
    "lang": "Python",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Removing odd numbers while iterating over the list skips every other odd number instead of removing them all.",
    "objective": "Understand why removing elements from a list while iterating over it by index shifts subsequent elements silently.",
    "hints": [
      "Removing an item shifts all later items down by one index, so the loop's next index skips one.",
      "Build a new filtered list instead of mutating the original while iterating."
    ],
    "expectedOutput": "filter_odds([1,2,3,4,5]) returns [2, 4] with every odd number removed.",
    "fileName": "filter_odds.py",
    "buggyCode": "def filter_odds(nums):\n    for n in nums:\n        if n % 2 != 0:\n            nums.remove(n)\n    return nums\n\nprint(filter_odds([1,2,3,4,5]))",
    "solution": "def filter_odds(nums):\n    return [n for n in nums if n % 2 == 0]\n\nprint(filter_odds([1,2,3,4,5]))",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\[n for n in nums if n % 2 == 0\\]",
        "message": "[2, 3, 4] — one odd number (3) survives because removal shifted the iteration index.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c9-js-array-length-cache",
    "title": "Array Length Cache",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Removing duplicates in-place with splice() leaves some duplicates behind.",
    "objective": "Understand why mutating an array's length while iterating forward over it by index skips elements.",
    "hints": [
      "splice() shifts every later element left by one — the loop's next index then skips the element that shifted into the current spot.",
      "Iterate backward, or build a new array instead of mutating in place."
    ],
    "expectedOutput": "dedupe([1,1,2,2,3]) returns [1, 2, 3] with no duplicates remaining.",
    "fileName": "dedupe.js",
    "buggyCode": "function dedupe(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] === arr[i + 1]) {\n      arr.splice(i, 1);\n    }\n  }\n  return arr;\n}\n\nconsole.log(dedupe([1,1,2,2,3]));",
    "solution": "function dedupe(arr) {\n  return [...new Set(arr)];\n}\n\nconsole.log(dedupe([1,1,2,2,3]));",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "new Set\\(arr\\)",
        "message": "[1, 2, 2, 3] — one duplicate pair survives because splice() shifted indices mid-loop.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c9-cpp-iterator-invalidation",
    "title": "Iterator Invalidation",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Erasing elements from a vector while iterating over it with an iterator crashes with undefined behavior.",
    "objective": "Understand iterator invalidation: erase() invalidates the iterator you just used, so incrementing it afterward is unsafe.",
    "hints": [
      "vec.erase(it) invalidates `it` — using it++ on the invalidated iterator is undefined behavior.",
      "Capture erase()'s return value (the next valid iterator) instead of incrementing manually."
    ],
    "expectedOutput": "Every even number is removed from the vector with no crash.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (auto it = v.begin(); it != v.end(); it++) {\n        if (*it % 2 == 0) {\n            v.erase(it);\n        }\n    }\n    for (int n : v) cout << n << \" \";\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    for (auto it = v.begin(); it != v.end(); ) {\n        if (*it % 2 == 0) {\n            it = v.erase(it);\n        } else {\n            ++it;\n        }\n    }\n    for (int n : v) cout << n << \" \";\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "it\\s*=\\s*v\\.erase\\(it\\)",
        "message": "Undefined behavior / crash — incrementing an iterator invalidated by erase().",
        "line": 8
      }
    ]
  },
  {
    "slug": "c9-go-infinite-loop-condition",
    "title": "Infinite Loop Condition",
    "lang": "Go",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "A retry loop with exponential backoff never terminates because the backoff calculation overflows back to zero.",
    "objective": "Understand integer overflow in a backoff calculation causing an infinite retry loop.",
    "hints": [
      "Repeatedly doubling delay eventually overflows int, wrapping to a negative or zero value, so the exit condition (delay > maxDelay) is never true again.",
      "Cap the delay explicitly before it can overflow."
    ],
    "expectedOutput": "The retry loop terminates once delay reaches the cap, with no overflow.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tdelay := 1\n\tmaxDelay := 1000000000\n\tattempts := 0\n\tfor delay < maxDelay {\n\t\tdelay *= 2\n\t\tattempts++\n\t\tif attempts > 1000000 {\n\t\t\tbreak\n\t\t}\n\t}\n\tfmt.Println(attempts)\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tdelay := 1\n\tmaxDelay := 1000000000\n\tattempts := 0\n\tfor delay < maxDelay {\n\t\tdelay *= 2\n\t\tif delay > maxDelay || delay <= 0 {\n\t\t\tdelay = maxDelay\n\t\t}\n\t\tattempts++\n\t}\n\tfmt.Println(attempts)\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "delay\\s*<=\\s*0",
        "message": "Loop runs far longer than expected — repeated doubling can overflow delay back toward zero/negative.",
        "line": 9
      }
    ]
  },
  {
    "slug": "c10-js-stale-closure-state",
    "title": "Stale Closure State",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "A click counter built with setInterval always reports 1, never incrementing past it.",
    "objective": "Understand how a closure captures the count variable's value at creation time, not live.",
    "hints": [
      "The interval callback closes over the initial value of count forever.",
      "Use a functional update / reference the latest value via a ref or by recomputing from state each tick."
    ],
    "expectedOutput": "The counter increments by 1 every tick, indefinitely.",
    "fileName": "counter.js",
    "buggyCode": "let count = 0;\n\nfunction startCounter() {\n  setInterval(() => {\n    console.log(count + 1);\n  }, 1000);\n}\n\nstartCounter();",
    "solution": "let count = 0;\n\nfunction startCounter() {\n  setInterval(() => {\n    count += 1;\n    console.log(count);\n  }, 1000);\n}\n\nstartCounter();",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "count\\s*\\+=\\s*1",
        "message": "Always prints 1 — count + 1 is recomputed from the same stale value every tick.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c10-js-array-mutate-render",
    "title": "Array Mutate Render",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Adding an item to the list doesn't trigger a re-render in the (simulated) view layer.",
    "objective": "Understand why mutating an array in place doesn't create a new reference for change detection.",
    "hints": [
      "push() mutates the existing array; a reference-equality check sees no change.",
      "Create a new array with [...items, newItem] instead of mutating in place."
    ],
    "expectedOutput": "Adding an item produces a new array reference, which the view layer detects as changed.",
    "fileName": "list.js",
    "buggyCode": "function addItem(items, item) {\n  items.push(item);\n  return items;\n}\n\nconst list = [\"a\"];\nconst updated = addItem(list, \"b\");\nconsole.log(updated === list);",
    "solution": "function addItem(items, item) {\n  return [...items, item];\n}\n\nconst list = [\"a\"];\nconst updated = addItem(list, \"b\");\nconsole.log(updated === list);",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\[\\.\\.\\.items,\\s*item\\]",
        "message": "true — the returned array is the exact same reference, so a reference-equality check won't detect the change.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c10-ts-event-target-cast",
    "title": "Event Target Cast",
    "lang": "TypeScript",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "Reading the input's value crashes at runtime with \"value is undefined\" for certain event target types.",
    "objective": "Understand why casting event.target broadly instead of checking its real type is unsafe.",
    "hints": [
      "event.target is typed as EventTarget, which doesn't have .value at all — the code force-casts it.",
      "Check instanceof HTMLInputElement before accessing .value."
    ],
    "expectedOutput": "Safely reads .value only when the target really is an input element.",
    "fileName": "form.ts",
    "buggyCode": "function handleChange(event: Event) {\n  const value = (event.target as any).value;\n  console.log(value.trim());\n}",
    "solution": "function handleChange(event: Event) {\n  if (event.target instanceof HTMLInputElement) {\n    console.log(event.target.value.trim());\n  }\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "instanceof\\s+HTMLInputElement",
        "message": "TypeError: Cannot read properties of undefined (reading 'trim') — the cast hid a real type mismatch.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c10-js-debounce-this-binding",
    "title": "Debounce This Binding",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Calling this.updateResults() inside a debounced callback throws \"Cannot read properties of undefined\".",
    "objective": "Understand how a regular function loses its `this` binding when passed as a callback.",
    "hints": [
      "A regular function() {} used as a callback doesn't retain the surrounding `this`.",
      "Use an arrow function, or .bind(this), to preserve the correct context."
    ],
    "expectedOutput": "this correctly refers to the Search instance inside the debounced callback.",
    "fileName": "search.js",
    "buggyCode": "class Search {\n  constructor() { this.results = []; }\n  updateResults() { this.results.push(\"done\"); }\n  onType() {\n    setTimeout(function () {\n      this.updateResults();\n    }, 300);\n  }\n}",
    "solution": "class Search {\n  constructor() { this.results = []; }\n  updateResults() { this.results.push(\"done\"); }\n  onType() {\n    setTimeout(() => {\n      this.updateResults();\n    }, 300);\n  }\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "setTimeout\\(\\s*\\(\\)\\s*=>",
        "message": "TypeError: Cannot read properties of undefined (reading 'updateResults') — a plain function() loses `this`.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c10-js-memory-leak-listener",
    "title": "Memory Leak Listener",
    "lang": "JavaScript",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "Repeatedly opening and closing this widget steadily increases memory usage and duplicate event firing.",
    "objective": "Understand why an event listener added on open must be removed on close, or it accumulates forever.",
    "hints": [
      "Every call to open() adds a brand-new listener, and none are ever removed.",
      "Store a reference to the handler and call removeEventListener in close()."
    ],
    "expectedOutput": "Only one resize listener is ever active at a time, regardless of how many times the widget opens and closes.",
    "fileName": "widget.js",
    "buggyCode": "function open(widget) {\n  window.addEventListener(\"resize\", () => widget.reflow());\n}\n\nfunction close(widget) {\n  widget.hide();\n}",
    "solution": "function open(widget) {\n  widget._resizeHandler = () => widget.reflow();\n  window.addEventListener(\"resize\", widget._resizeHandler);\n}\n\nfunction close(widget) {\n  window.removeEventListener(\"resize\", widget._resizeHandler);\n  widget.hide();\n}",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "removeEventListener\\(\"resize\"",
        "message": "Listener count climbs by one every time the widget opens — none are ever cleaned up.",
        "line": 6
      }
    ]
  },
  {
    "slug": "c10-ts-generic-constraint-missing",
    "title": "Generic Constraint Missing",
    "lang": "TypeScript",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "sortByKey(users, 'age') compiles fine but crashes at runtime for a key that isn't actually comparable, and TypeScript never warned about it.",
    "objective": "Understand how an unconstrained generic <T> lets any key name through, even ones that don't make sense to sort by.",
    "hints": [
      "function sortByKey<T>(items: T[], key: string) doesn't tie key to T's actual property names.",
      "Constrain key to `keyof T` so only real property names type-check."
    ],
    "expectedOutput": "Passing an invalid key name is now a compile-time error, not a runtime surprise.",
    "fileName": "sort.ts",
    "buggyCode": "function sortByKey<T>(items: T[], key: string): T[] {\n  return [...items].sort((a: any, b: any) => a[key] - b[key]);\n}\n\nconst users = [{ name: \"Ava\", age: 30 }];\nsortByKey(users, \"nonexistentKey\");",
    "solution": "function sortByKey<T>(items: T[], key: keyof T): T[] {\n  return [...items].sort((a: any, b: any) => a[key] - b[key]);\n}\n\nconst users = [{ name: \"Ava\", age: 30 }];\nsortByKey(users, \"age\");",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "key:\\s*keyof\\s+T",
        "message": "NaN comparisons happen silently at runtime — 'nonexistentKey' type-checked as a plain string.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c10-js-recursive-dom-no-base",
    "title": "Recursive Dom No Base",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Rendering a deeply nested (but finite) comment tree causes \"Maximum call stack size exceeded\".",
    "objective": "Understand why a recursive tree-walk needs a correct base case for nodes with no children.",
    "hints": [
      "The recursive call happens unconditionally, even when node.children is empty or undefined.",
      "Return early when there are no children left to recurse into."
    ],
    "expectedOutput": "Renders a deeply nested tree without any stack overflow.",
    "fileName": "tree.js",
    "buggyCode": "function renderNode(node) {\n  const children = node.children.map(renderNode);\n  return { ...node, rendered: true, children };\n}\n\nconst leaf = { id: 1 };\nrenderNode(leaf);",
    "solution": "function renderNode(node) {\n  const children = (node.children || []).map(renderNode);\n  return { ...node, rendered: true, children };\n}\n\nconst leaf = { id: 1 };\nrenderNode(leaf);",
    "terminalKind": "browser-console",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\(node\\.children\\s*\\|\\|\\s*\\[\\]\\)",
        "message": "TypeError: Cannot read properties of undefined (reading 'map') — leaf nodes have no children array at all.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c10-ts-async-race-in-effect",
    "title": "Async Race In Effect",
    "lang": "TypeScript",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "Typing quickly in the search box sometimes shows stale results from an earlier, slower request that resolved after a newer one.",
    "objective": "Understand the race condition where an older async request can resolve after a newer one and overwrite its result.",
    "hints": [
      "Nothing tracks which request was the most recently issued.",
      "Track a request id/token and ignore the result if a newer request has since been started."
    ],
    "expectedOutput": "Only the result of the most recently issued search request is ever applied.",
    "fileName": "search.ts",
    "buggyCode": "let latestResults: string[] = [];\n\nasync function search(query: string) {\n  const results = await fakeApiCall(query);\n  latestResults = results;\n}\n\nasync function fakeApiCall(query: string): Promise<string[]> {\n  return [query];\n}",
    "solution": "let latestResults: string[] = [];\nlet latestRequestId = 0;\n\nasync function search(query: string) {\n  const requestId = ++latestRequestId;\n  const results = await fakeApiCall(query);\n  if (requestId === latestRequestId) {\n    latestResults = results;\n  }\n}\n\nasync function fakeApiCall(query: string): Promise<string[]> {\n  return [query];\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "requestId\\s*===\\s*latestRequestId",
        "message": "A slow first keystroke's results overwrite a fast, more recent keystroke's results.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c11-bash-unset-env-default",
    "title": "Unset Env Default",
    "lang": "Bash",
    "difficulty": "Easy",
    "xp": 80,
    "coins": 15,
    "bugReport": "The app crashes on startup with \"port: unbound variable\" whenever PORT isn't explicitly set.",
    "objective": "Understand how to supply a default value for a possibly-unset environment variable.",
    "hints": [
      "$PORT is empty/unset in this environment, and the script uses set -u (nounset).",
      "Use ${PORT:-3000} to fall back to a default when PORT is unset."
    ],
    "expectedOutput": "Starts on port 3000 by default when PORT isn't set.",
    "fileName": "start.sh",
    "buggyCode": "#!/bin/bash\nset -u\necho \"Starting on port $PORT\"",
    "solution": "#!/bin/bash\nset -u\necho \"Starting on port ${PORT:-3000}\"",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\$\\{PORT:-3000\\}",
        "message": "start.sh: line 3: PORT: unbound variable",
        "line": 3
      }
    ]
  },
  {
    "slug": "c11-docker-hardcoded-secret",
    "title": "Hardcoded Secret",
    "lang": "Docker",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "A security scan flags this Dockerfile — the database password is baked directly into the image layer history, visible to anyone with the image.",
    "objective": "Understand why secrets shouldn't be hardcoded in a Dockerfile, even via ENV.",
    "hints": [
      "ENV DB_PASSWORD=... bakes the secret into every layer of the image, extractable with `docker history`.",
      "Pass secrets at runtime (--env-file, secrets manager, or docker secrets) instead of baking them in."
    ],
    "expectedOutput": "No secret value appears anywhere in the built image's layers.",
    "fileName": "Dockerfile",
    "buggyCode": "FROM node:20-slim\nWORKDIR /app\nENV DB_PASSWORD=SuperSecret123\nCOPY . .\nCMD [\"node\", \"server.js\"]",
    "solution": "FROM node:20-slim\nWORKDIR /app\nCOPY . .\nCMD [\"node\", \"server.js\"]\n# DB_PASSWORD is now supplied at runtime via --env-file or a secrets manager",
    "terminalKind": "docker",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "ENV\\s+DB_PASSWORD\\s*=",
        "message": "Security scan: secret found baked into image layer — extractable via `docker history`.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c11-git-committed-env-file",
    "title": "Committed Env File",
    "lang": "Git",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "A .env file containing real API keys was accidentally committed and pushed to a public repository.",
    "objective": "Understand how to purge a sensitive file from git history, not just delete it going forward.",
    "hints": [
      "A plain `git rm .env` + commit only removes it from future commits — it's still in history.",
      "Use `git filter-repo` (or BFG) to strip it from every historical commit, then force-push and rotate the leaked keys."
    ],
    "expectedOutput": "The .env file no longer appears in any commit in the repository's history.",
    "fileName": "terminal",
    "buggyCode": "git rm .env\ngit commit -m \"Remove .env\"\ngit push",
    "solution": "git filter-repo --path .env --invert-paths\ngit push --force",
    "terminalKind": "git",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "filter-repo|bfg",
        "flags": "i",
        "message": "The .env file (and its leaked keys) is still fully recoverable from earlier commits in history.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c11-yaml-indentation-bug",
    "title": "Yaml Indentation Bug",
    "lang": "Bash",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "A deployment config value that should be nested under `database` is instead being read as a top-level, unrelated key due to indentation.",
    "objective": "Understand how YAML's meaning entirely depends on exact indentation — a one-space error changes the structure.",
    "hints": [
      "`port:` at the same indentation as `database:` makes it a sibling, not a child.",
      "Indent port so it's nested one level under database."
    ],
    "expectedOutput": "port is correctly read as database.port, not a top-level key.",
    "fileName": "deploy.sh",
    "buggyCode": "database:\n  host: localhost\nport: 5432",
    "solution": "database:\n  host: localhost\n  port: 5432",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "^port:\\s*5432",
        "flags": "m",
        "message": "Config reads port as a top-level key instead of database.port — one space of indentation changed the whole structure.",
        "line": 3
      }
    ]
  },
  {
    "slug": "c11-docker-compose-network",
    "title": "Compose Network",
    "lang": "Docker",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "The app container can't reach the database container, even though both are running — connection refused.",
    "objective": "Understand why services need to be on the same Docker network to resolve each other by service name.",
    "hints": [
      "Without a shared custom network, Compose still creates a default one — but here the services are defined without any way to resolve each other by name because the app is pointed at 'localhost' instead of the service name.",
      "Use the service name (e.g. 'db') as the hostname, since Compose's internal DNS resolves it automatically."
    ],
    "expectedOutput": "The app connects to the database using the service name as the hostname.",
    "fileName": "docker-compose.yml",
    "buggyCode": "services:\n  app:\n    build: .\n    environment:\n      DB_HOST: localhost\n  db:\n    image: postgres:16",
    "solution": "services:\n  app:\n    build: .\n    environment:\n      DB_HOST: db\n  db:\n    image: postgres:16",
    "terminalKind": "docker",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "DB_HOST:\\s*localhost",
        "message": "Connection refused — 'localhost' inside the app container refers to itself, not the db container.",
        "line": 4
      }
    ]
  },
  {
    "slug": "c11-php-display-errors-prod",
    "title": "Display Errors Prod",
    "lang": "PHP",
    "difficulty": "Medium",
    "xp": 115,
    "coins": 23,
    "bugReport": "A security scan flags the production site — full stack traces including file paths and database credentials appear in error pages visible to any visitor.",
    "objective": "Understand why display_errors must be off in production, with errors logged instead of shown.",
    "hints": [
      "display_errors = On leaks internal paths, queries, and sometimes credentials to any visitor who triggers an error.",
      "Set display_errors = Off and log_errors = On instead, in production."
    ],
    "expectedOutput": "Errors are logged server-side but never shown to visitors.",
    "fileName": "php.ini",
    "buggyCode": "display_errors = On\nlog_errors = Off",
    "solution": "display_errors = Off\nlog_errors = On",
    "terminalKind": "php",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "display_errors\\s*=\\s*On",
        "message": "Security scan: stack traces with file paths and query details are visible to any site visitor.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c11-git-merge-wrong-branch",
    "title": "Merge Wrong Branch",
    "lang": "Git",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "A hotfix branch was accidentally merged into main before it was reviewed, and now main is broken in production.",
    "objective": "Understand how to safely undo a merge commit that's already been pushed, without rewriting shared history destructively.",
    "hints": [
      "`git reset --hard` on a shared, already-pushed branch rewrites history other people have already pulled — dangerous.",
      "Use `git revert -m 1 <merge-commit-hash>` to create a new commit that safely undoes the merge without rewriting history."
    ],
    "expectedOutput": "main is restored to its pre-merge state via a new revert commit, with history intact for everyone else.",
    "fileName": "terminal",
    "buggyCode": "git reset --hard HEAD~1\ngit push --force",
    "solution": "git revert -m 1 <merge-commit-hash>\ngit push",
    "terminalKind": "git",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "git revert -m 1",
        "message": "Force-pushing a hard reset rewrites history — anyone else who already pulled main now has a broken, diverged branch.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c11-bash-cron-relative-path",
    "title": "Cron Relative Path",
    "lang": "Bash",
    "difficulty": "Hard",
    "xp": 175,
    "coins": 34,
    "bugReport": "This backup script works perfectly when run manually, but silently fails every night when triggered by cron.",
    "objective": "Understand why cron runs scripts with a minimal environment and an unpredictable working directory, breaking relative paths.",
    "hints": [
      "Relative paths like ./data assume a working directory that cron doesn't guarantee.",
      "cd to an absolute, known directory (or use absolute paths throughout) at the top of the script."
    ],
    "expectedOutput": "The script behaves identically whether run manually or via cron.",
    "fileName": "backup.sh",
    "buggyCode": "#!/bin/bash\ntar -czf backup.tar.gz ./data\ncp backup.tar.gz ./backups/",
    "solution": "#!/bin/bash\ncd /opt/myapp || exit 1\ntar -czf backup.tar.gz ./data\ncp backup.tar.gz ./backups/",
    "terminalKind": "bash",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "cd\\s+/opt/myapp",
        "message": "Cron job fails silently — relative paths resolved against cron's default working directory, not the app's.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c12-js-array-sort-mutates",
    "title": "Array Sort Mutates",
    "lang": "JavaScript",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "Displaying a sorted copy of the leaderboard also silently reorders the original, unsorted source data.",
    "objective": "Understand that Array.sort() mutates the array in place, rather than returning a new one.",
    "hints": [
      "scores.sort() sorts scores itself, not a copy.",
      "Spread into a new array before sorting: [...scores].sort(...)."
    ],
    "expectedOutput": "The original scores array keeps its original order after displaySorted() runs.",
    "fileName": "leaderboard.js",
    "buggyCode": "function displaySorted(scores) {\n  return scores.sort((a, b) => b - a);\n}\n\nconst scores = [10, 30, 20];\ndisplaySorted(scores);\nconsole.log(scores);",
    "solution": "function displaySorted(scores) {\n  return [...scores].sort((a, b) => b - a);\n}\n\nconst scores = [10, 30, 20];\ndisplaySorted(scores);\nconsole.log(scores);",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "\\[\\.\\.\\.scores\\]\\.sort",
        "message": "Prints [30, 20, 10] — the original array order was silently mutated by sort().",
        "line": 2
      }
    ]
  },
  {
    "slug": "c12-py-except-bare-swallow",
    "title": "Except Bare Swallow",
    "lang": "Python",
    "difficulty": "Easy",
    "xp": 85,
    "coins": 16,
    "bugReport": "A completely unrelated bug (a typo in a variable name) gets silently swallowed instead of surfacing as an error.",
    "objective": "Understand why a bare except: hides every kind of error, including ones that have nothing to do with the intended failure case.",
    "hints": [
      "except: (with nothing after it) catches literally everything, including NameError, KeyboardInterrupt, etc.",
      "Catch the specific exception type you actually expect, e.g. except FileNotFoundError:."
    ],
    "expectedOutput": "Only the specifically expected error is silenced; anything else still surfaces.",
    "fileName": "loader.py",
    "buggyCode": "def load_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except:\n        return default_confg  # typo — should be default_config",
    "solution": "def load_config(path):\n    try:\n        with open(path) as f:\n            return f.read()\n    except FileNotFoundError:\n        return default_config",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "except\\s+FileNotFoundError\\s*:",
        "message": "NameError: name 'default_confg' is not defined — silently swallowed by the bare except.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c12-sql-null-in-not-in",
    "title": "Null In Not In",
    "lang": "SQL",
    "difficulty": "Easy",
    "xp": 90,
    "coins": 17,
    "bugReport": "A NOT IN filter that should exclude a handful of banned user ids returns zero rows entirely, for every user.",
    "objective": "Understand the classic NOT IN + NULL trap: if the subquery/list contains any NULL, the whole NOT IN evaluates to unknown for every row.",
    "hints": [
      "If banned_ids contains even one NULL, `x NOT IN (list_with_null)` is never true for any x.",
      "Filter out NULLs from the list first, or use NOT EXISTS instead of NOT IN."
    ],
    "expectedOutput": "Correctly excludes only the actually-banned user ids, regardless of any NULLs in the banned list.",
    "fileName": "exclude.sql",
    "buggyCode": "SELECT * FROM users WHERE id NOT IN (SELECT banned_id FROM bans);",
    "solution": "SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM bans b WHERE b.banned_id = u.id);",
    "terminalKind": "sql",
    "schemaJson": {
      "dialect": "MySQL",
      "tables": [
        {
          "name": "users",
          "create": "CREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);",
          "columns": [
            "id",
            "name"
          ],
          "rows": [
            [
              "1",
              "Ava"
            ],
            [
              "2",
              "Ben"
            ]
          ]
        }
      ]
    },
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "NOT\\s+IN\\s*\\(SELECT",
        "flags": "i",
        "message": "Returns zero rows for every user — a single NULL in the banned_id subquery poisons the entire NOT IN.",
        "line": 1
      }
    ]
  },
  {
    "slug": "c12-java-immutable-list-modify",
    "title": "Immutable List Modify",
    "lang": "Java",
    "difficulty": "Medium",
    "xp": 120,
    "coins": 24,
    "bugReport": "Adding an item to a list returned from List.of() throws UnsupportedOperationException.",
    "objective": "Understand that List.of() returns an immutable list, not a regular mutable ArrayList.",
    "hints": [
      "List.of(...) is explicitly documented as immutable — any mutating call throws.",
      "Wrap it in `new ArrayList<>(List.of(...))` if you need a mutable copy."
    ],
    "expectedOutput": "Items can be added freely to the returned list.",
    "fileName": "Main.java",
    "buggyCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = List.of(\"a\", \"b\");\n        items.add(\"c\");\n        System.out.println(items);\n    }\n}",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>(List.of(\"a\", \"b\"));\n        items.add(\"c\");\n        System.out.println(items);\n    }\n}",
    "terminalKind": "java",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "new\\s+ArrayList<>\\(List\\.of",
        "message": "Exception in thread \"main\" java.lang.UnsupportedOperationException",
        "line": 6
      }
    ]
  },
  {
    "slug": "c12-go-defer-loop-resource",
    "title": "Defer Loop Resource",
    "lang": "Go",
    "difficulty": "Medium",
    "xp": 125,
    "coins": 25,
    "bugReport": "Processing 10,000 files runs out of file descriptors partway through, even though each file is supposedly closed.",
    "objective": "Understand why defer inside a loop doesn't run until the enclosing FUNCTION returns, not each loop iteration.",
    "hints": [
      "defer f.Close() inside a for-loop stacks up thousands of deferred closes that all run only at the end of the function.",
      "Wrap the per-file work in its own function (or explicitly call Close() at the end of each iteration) so each file closes immediately."
    ],
    "expectedOutput": "Each file is closed immediately after it's processed, not all at the very end.",
    "fileName": "main.go",
    "buggyCode": "package main\n\nimport \"os\"\n\nfunc processAll(paths []string) {\n\tfor _, p := range paths {\n\t\tf, _ := os.Open(p)\n\t\tdefer f.Close()\n\t\t// process f...\n\t}\n}",
    "solution": "package main\n\nimport \"os\"\n\nfunc processOne(path string) {\n\tf, _ := os.Open(path)\n\tdefer f.Close()\n\t// process f...\n}\n\nfunc processAll(paths []string) {\n\tfor _, p := range paths {\n\t\tprocessOne(p)\n\t}\n}",
    "terminalKind": "go",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "func\\s+processOne",
        "message": "too many open files — every defer in the loop waits until processAll fully returns before any file closes.",
        "line": 5
      }
    ]
  },
  {
    "slug": "c12-cpp-vector-reference-invalidation",
    "title": "Vector Reference Invalidation",
    "lang": "C++",
    "difficulty": "Hard",
    "xp": 185,
    "coins": 37,
    "bugReport": "A reference to a vector element becomes garbage after pushing a new element onto the same vector.",
    "objective": "Understand why push_back can reallocate the vector's entire backing storage, invalidating existing references.",
    "hints": [
      "Holding a reference to v[0] and then calling push_back can trigger a reallocation, making that reference dangle.",
      "Re-fetch the reference (or use an index) after any operation that might reallocate the vector."
    ],
    "expectedOutput": "Accesses the element by index after the push_back, avoiding any dangling reference.",
    "fileName": "main.cpp",
    "buggyCode": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    int& first = v[0];\n    for (int i = 0; i < 100; i++) v.push_back(i);\n    cout << first << endl;\n    return 0;\n}",
    "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    for (int i = 0; i < 100; i++) v.push_back(i);\n    cout << v[0] << endl;\n    return 0;\n}",
    "terminalKind": "cpp",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "forbidMatch",
        "pattern": "int&\\s+first\\s*=\\s*v\\[0\\]",
        "message": "Prints an unpredictable garbage value — the vector reallocated during push_back, invalidating the earlier reference.",
        "line": 7
      }
    ]
  },
  {
    "slug": "c12-py-mutable-class-attribute",
    "title": "Mutable Class Attribute",
    "lang": "Python",
    "difficulty": "Hard",
    "xp": 180,
    "coins": 36,
    "bugReport": "Creating two separate ShoppingCart instances and adding an item to one also adds it to the other.",
    "objective": "Understand why a mutable default defined at the CLASS level (not per-instance) is shared by every instance.",
    "hints": [
      "items = [] as a class attribute is a single list shared by all instances, not a fresh one per object.",
      "Initialize items inside __init__ so each instance gets its own list."
    ],
    "expectedOutput": "Each ShoppingCart instance has its own independent items list.",
    "fileName": "cart.py",
    "buggyCode": "class ShoppingCart:\n    items = []\n\n    def add(self, item):\n        self.items.append(item)\n\ncart1 = ShoppingCart()\ncart2 = ShoppingCart()\ncart1.add(\"apple\")\nprint(cart2.items)",
    "solution": "class ShoppingCart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, item):\n        self.items.append(item)\n\ncart1 = ShoppingCart()\ncart2 = ShoppingCart()\ncart1.add(\"apple\")\nprint(cart2.items)",
    "terminalKind": "python",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "def\\s+__init__\\(self\\):\\s*\\n\\s*self\\.items\\s*=\\s*\\[\\]",
        "message": "['apple'] — cart2 shows cart1's item, because items is one list shared by the whole class.",
        "line": 2
      }
    ]
  },
  {
    "slug": "c12-js-prototype-pollution",
    "title": "Prototype Pollution",
    "lang": "JavaScript",
    "difficulty": "Hard",
    "xp": 190,
    "coins": 38,
    "bugReport": "A security audit found that a crafted input with a \"__proto__\" key can inject properties onto every object in the entire application.",
    "objective": "Understand prototype pollution — recursively merging untrusted keys can reach and corrupt Object.prototype.",
    "hints": [
      "A naive deep-merge that copies any key, including '__proto__', can walk up into the shared prototype chain.",
      "Explicitly skip '__proto__', 'constructor', and 'prototype' keys during merge."
    ],
    "expectedOutput": "A malicious __proto__ key in the input is ignored, and Object.prototype stays clean.",
    "fileName": "merge.js",
    "buggyCode": "function merge(target, source) {\n  for (const key in source) {\n    if (typeof source[key] === \"object\") {\n      target[key] = merge(target[key] || {}, source[key]);\n    } else {\n      target[key] = source[key];\n    }\n  }\n  return target;\n}",
    "solution": "function merge(target, source) {\n  for (const key in source) {\n    if (key === \"__proto__\" || key === \"constructor\" || key === \"prototype\") continue;\n    if (typeof source[key] === \"object\") {\n      target[key] = merge(target[key] || {}, source[key]);\n    } else {\n      target[key] = source[key];\n    }\n  }\n  return target;\n}",
    "terminalKind": "node",
    "schemaJson": null,
    "checkRules": [
      {
        "type": "requireMatch",
        "pattern": "key\\s*===\\s*\"__proto__\"",
        "message": "Security audit: prototype pollution — merge({}, JSON.parse('{\"__proto__\":{\"isAdmin\":true}}')) corrupts every object in the app.",
        "line": 2
      }
    ]
  }
];

module.exports = { CHALLENGES };

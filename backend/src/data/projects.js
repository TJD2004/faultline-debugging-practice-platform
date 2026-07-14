const PROJECTS = [
  {
    "slug": "blog-comments-not-saving",
    "title": "Comments never actually save",
    "lang": "Full Stack",
    "difficulty": "Hard",
    "xp": 220,
    "coins": 45,
    "bugReport": "Users click \"Post Comment\" and the UI shows no error — but refreshing the page never shows the new comment, and nothing shows up in the server logs either.",
    "objective": "Practice tracing a bug across the network boundary — from a frontend request, through server routing, to environment configuration — instead of a single-file fix.",
    "hints": [
      "Open the Network tab: what HTTP method is actually being sent, and what status code comes back?",
      "If the frontend's request method and the backend route's registered method don't match, Express returns 404 with nothing logged server-side.",
      "Double-check every environment variable name character by character — a single missing letter silently breaks configuration."
    ],
    "checkRules": [
      {
        "type": "requireMatch",
        "file": "client/src/api.js",
        "pattern": "method:\\s*[\"']POST[\"']",
        "message": "POST /api/posts/1/comments 404 (Not Found)",
        "line": 3
      },
      {
        "type": "forbidMatch",
        "file": "server/routes/comments.js",
        "pattern": "router\\.get\\(\\s*[\"']\\/posts\\/:postId\\/comments[\"']",
        "message": "Cannot POST /api/posts/1/comments",
        "line": 4
      },
      {
        "type": "forbidMatch",
        "file": "server/.env",
        "pattern": "^POR=",
        "flags": "m",
        "message": "Error: connect ECONNREFUSED 127.0.0.1:undefined — process.env.PORT is undefined",
        "line": 1
      }
    ],
    "files": [
      {
        "filePath": "client/src/api.js",
        "buggyContent": "export async function postComment(postId, text) {\n  const res = await fetch(`/api/posts/${postId}/comments`, {\n    body: JSON.stringify({ text }),\n  });\n  return res.json();\n}",
        "solutionContent": "export async function postComment(postId, text) {\n  const res = await fetch(`/api/posts/${postId}/comments`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ text }),\n  });\n  return res.json();\n}",
        "isEntryPoint": true,
        "position": 1
      },
      {
        "filePath": "server/routes/comments.js",
        "buggyContent": "const express = require(\"express\");\nconst router = express.Router();\n\nrouter.get(\"/posts/:postId/comments\", (req, res) => {\n  const { text } = req.body;\n  const comment = saveComment(req.params.postId, text);\n  res.status(201).json(comment);\n});\n\nmodule.exports = router;",
        "solutionContent": "const express = require(\"express\");\nconst router = express.Router();\n\nrouter.post(\"/posts/:postId/comments\", (req, res) => {\n  const { text } = req.body;\n  const comment = saveComment(req.params.postId, text);\n  res.status(201).json(comment);\n});\n\nmodule.exports = router;",
        "isEntryPoint": false,
        "position": 2
      },
      {
        "filePath": "server/.env",
        "buggyContent": "POR=4000\nDB_URL=postgres://localhost/blog",
        "solutionContent": "PORT=4000\nDB_URL=postgres://localhost/blog",
        "isEntryPoint": false,
        "position": 3
      }
    ]
  }
];

module.exports = { PROJECTS };

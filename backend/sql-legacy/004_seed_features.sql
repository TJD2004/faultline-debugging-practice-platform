-- Faultline — seed data for Daily Challenge, Contest, Achievements, Project Mode
-- Run AFTER 003_daily_contest_achievements_projects.sql (and after 001/002, since
-- this references existing challenge slugs).
--
-- HOW TO RUN: MySQL Workbench > File > Open SQL Script > this file > execute.

USE faultline;

-- ============================= DAILY CHALLENGES =============================
-- Today + next 6 days, cycling through 7 existing challenges. Re-run this
-- block periodically (or set up a scheduled event) to keep the week full.
INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 0 DAY), 1.50 FROM challenges WHERE slug = 'js-array-off-by-one'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1.50 FROM challenges WHERE slug = 'py-mutable-default-arg'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1.50 FROM challenges WHERE slug = 'java-array-bounds'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1.50 FROM challenges WHERE slug = 'c-uninitialized-variable'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 4 DAY), 1.50 FROM challenges WHERE slug = 'cpp-vector-off-by-one'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 1.50 FROM challenges WHERE slug = 'go-slice-off-by-one'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

INSERT INTO daily_challenges (challenge_id, active_date, bonus_multiplier)
SELECT id, DATE_ADD(CURDATE(), INTERVAL 6 DAY), 1.50 FROM challenges WHERE slug = 'sql-null-comparison'
ON DUPLICATE KEY UPDATE challenge_id = VALUES(challenge_id), bonus_multiplier = VALUES(bonus_multiplier);

-- ============================= CONTEST =============================
INSERT INTO contests (slug, title, description, start_time, end_time)
VALUES (
  'weekend-debug-sprint',
  'Weekend Debug Sprint',
  'Four hand-picked bugs across four languages. Fastest accurate fixes win — the leaderboard ranks by total XP earned during the contest window.',
  NOW(),
  DATE_ADD(NOW(), INTERVAL 2 DAY)
)
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);

INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'weekend-debug-sprint'), id, 1
FROM challenges WHERE slug = 'react-infinite-fetch'
ON DUPLICATE KEY UPDATE position = VALUES(position);

INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'weekend-debug-sprint'), id, 2
FROM challenges WHERE slug = 'python-off-by-one'
ON DUPLICATE KEY UPDATE position = VALUES(position);

INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'weekend-debug-sprint'), id, 3
FROM challenges WHERE slug = 'java-hashcode-missing'
ON DUPLICATE KEY UPDATE position = VALUES(position);

INSERT INTO contest_challenges (contest_id, challenge_id, position)
SELECT (SELECT id FROM contests WHERE slug = 'weekend-debug-sprint'), id, 4
FROM challenges WHERE slug = 'sql-subquery-multiple-rows'
ON DUPLICATE KEY UPDATE position = VALUES(position);

-- ============================= ACHIEVEMENTS =============================
INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('first-blood', 'Bug Hunter', 'Fix your first bug.', 'total_solves', 1, 'bug')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('ten-solves', 'Debugger', 'Fix 10 bugs.', 'total_solves', 10, 'wrench')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('fifty-solves', 'Error Detective', 'Fix 50 bugs.', 'total_solves', 50, 'search')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('polyglot-5', 'Polyglot', 'Solve challenges in 5 different languages.', 'language_count', 5, 'languages')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('polyglot-9', 'Code Surgeon', 'Solve challenges in 9 different languages.', 'language_count', 9, 'stethoscope')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('hard-5', 'Senior Debugger', 'Solve 5 Hard-difficulty challenges.', 'hard_solves', 5, 'flame')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('streak-7', 'Consistent', 'Maintain a 7-day streak.', 'streak', 7, 'calendar')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

INSERT INTO achievements (slug, title, description, criterion_type, threshold, icon)
VALUES ('xp-5000', 'Elite Engineer', 'Earn 5,000 total XP.', 'xp_total', 5000, 'crown')
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), threshold = VALUES(threshold), icon = VALUES(icon);

-- ============================= PROJECT: Comments never actually save =============================
INSERT INTO projects (slug, title, lang, difficulty, xp, coins, bug_report, objective, hints, check_rules)
VALUES (
  'blog-comments-not-saving',
  'Comments never actually save',
  'Full Stack',
  'Hard',
  220,
  45,
  'Users click \"Post Comment\" and the UI shows no error — but refreshing the page never shows the new comment, and nothing shows up in the server logs either.',
  'Practice tracing a bug across the network boundary — from a frontend request, through server routing, to environment configuration — instead of a single-file fix.',
  '[\"Open the Network tab: what HTTP method is actually being sent, and what status code comes back?\",\"If the frontend\'s request method and the backend route\'s registered method don\'t match, Express returns 404 with nothing logged server-side.\",\"Double-check every environment variable name character by character — a single missing letter silently breaks configuration.\"]',
  '[{\"type\":\"requireMatch\",\"file\":\"client/src/api.js\",\"pattern\":\"method:\\\\s*[\\\"\']POST[\\\"\']\",\"message\":\"POST /api/posts/1/comments 404 (Not Found)\",\"line\":3},{\"type\":\"forbidMatch\",\"file\":\"server/routes/comments.js\",\"pattern\":\"router\\\\.get\\\\(\\\\s*[\\\"\']\\\\/posts\\\\/:postId\\\\/comments[\\\"\']\",\"message\":\"Cannot POST /api/posts/1/comments\",\"line\":4},{\"type\":\"forbidMatch\",\"file\":\"server/.env\",\"pattern\":\"^POR=\",\"flags\":\"m\",\"message\":\"Error: connect ECONNREFUSED 127.0.0.1:undefined — process.env.PORT is undefined\",\"line\":1}]'
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title), lang = VALUES(lang), difficulty = VALUES(difficulty), xp = VALUES(xp),
  coins = VALUES(coins), bug_report = VALUES(bug_report), objective = VALUES(objective),
  hints = VALUES(hints), check_rules = VALUES(check_rules);

INSERT INTO project_files (project_id, file_path, buggy_content, solution_content, is_entry_point, position)
SELECT (SELECT id FROM projects WHERE slug = 'blog-comments-not-saving'), 'client/src/api.js', 'export async function postComment(postId, text) {\n  const res = await fetch(`/api/posts/${postId}/comments`, {\n    body: JSON.stringify({ text }),\n  });\n  return res.json();\n}', 'export async function postComment(postId, text) {\n  const res = await fetch(`/api/posts/${postId}/comments`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ text }),\n  });\n  return res.json();\n}', TRUE, 1
ON DUPLICATE KEY UPDATE buggy_content = VALUES(buggy_content), solution_content = VALUES(solution_content), is_entry_point = VALUES(is_entry_point), position = VALUES(position);

INSERT INTO project_files (project_id, file_path, buggy_content, solution_content, is_entry_point, position)
SELECT (SELECT id FROM projects WHERE slug = 'blog-comments-not-saving'), 'server/routes/comments.js', 'const express = require(\"express\");\nconst router = express.Router();\n\nrouter.get(\"/posts/:postId/comments\", (req, res) => {\n  const { text } = req.body;\n  const comment = saveComment(req.params.postId, text);\n  res.status(201).json(comment);\n});\n\nmodule.exports = router;', 'const express = require(\"express\");\nconst router = express.Router();\n\nrouter.post(\"/posts/:postId/comments\", (req, res) => {\n  const { text } = req.body;\n  const comment = saveComment(req.params.postId, text);\n  res.status(201).json(comment);\n});\n\nmodule.exports = router;', FALSE, 2
ON DUPLICATE KEY UPDATE buggy_content = VALUES(buggy_content), solution_content = VALUES(solution_content), is_entry_point = VALUES(is_entry_point), position = VALUES(position);

INSERT INTO project_files (project_id, file_path, buggy_content, solution_content, is_entry_point, position)
SELECT (SELECT id FROM projects WHERE slug = 'blog-comments-not-saving'), 'server/.env', 'POR=4000\nDB_URL=postgres://localhost/blog', 'PORT=4000\nDB_URL=postgres://localhost/blog', FALSE, 3
ON DUPLICATE KEY UPDATE buggy_content = VALUES(buggy_content), solution_content = VALUES(solution_content), is_entry_point = VALUES(is_entry_point), position = VALUES(position);

-- Done. Sanity checks:
SELECT * FROM daily_challenges ORDER BY active_date;
SELECT * FROM contests;
SELECT slug, title, threshold FROM achievements ORDER BY threshold;
SELECT p.title, f.file_path FROM projects p JOIN project_files f ON f.project_id = p.id;

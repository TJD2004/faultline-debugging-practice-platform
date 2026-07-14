-- Faultline MySQL schema
-- Run: mysql -u root -p < sql/schema.sql

CREATE DATABASE IF NOT EXISTS faultline CHARACTER SET utf8mb4;
USE faultline;

CREATE TABLE IF NOT EXISTS users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(120) NOT NULL,
  email          VARCHAR(255) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NULL,          -- NULL for OAuth-only accounts
  google_id      VARCHAR(255) NULL UNIQUE,
  avatar_url     VARCHAR(500) NULL,
  xp             INT NOT NULL DEFAULT 0,
  coins          INT NOT NULL DEFAULT 0,
  streak         INT NOT NULL DEFAULT 0,
  title          VARCHAR(60) NOT NULL DEFAULT 'Bug Hunter',
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenges (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  slug            VARCHAR(120) NOT NULL UNIQUE,
  title           VARCHAR(255) NOT NULL,
  lang            VARCHAR(40) NOT NULL,
  difficulty      ENUM('Easy','Medium','Hard','Expert') NOT NULL,
  xp              INT NOT NULL DEFAULT 50,
  coins           INT NOT NULL DEFAULT 10,
  bug_report      TEXT NOT NULL,
  objective       TEXT NOT NULL,
  hints           JSON NOT NULL,
  expected_output TEXT NOT NULL,
  file_name       VARCHAR(120) NOT NULL,
  buggy_code      MEDIUMTEXT NOT NULL,
  solution_code   MEDIUMTEXT NOT NULL,
  terminal_kind   VARCHAR(40) NOT NULL DEFAULT 'node',
  schema_json     JSON NULL,                 -- table definitions, only used by SQL challenges
  check_rules     JSON NOT NULL,             -- [{type:'requireMatch'|'forbidMatch', pattern, flags, line, message}]
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- If you already created the table before this column existed, run:
-- ALTER TABLE challenges ADD COLUMN solution_code MEDIUMTEXT NOT NULL AFTER buggy_code;
-- ALTER TABLE challenges ADD COLUMN check_rules JSON NOT NULL AFTER schema_json;

CREATE TABLE IF NOT EXISTS submissions (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  challenge_id   INT NOT NULL,
  status         ENUM('Passed','Failed') NOT NULL DEFAULT 'Passed',
  attempts       INT NOT NULL DEFAULT 1,
  used_solution  BOOLEAN NOT NULL DEFAULT FALSE,
  xp_earned      INT NOT NULL DEFAULT 0,
  coins_earned   INT NOT NULL DEFAULT 0,
  submitted_code MEDIUMTEXT NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_challenge ON submissions(challenge_id);

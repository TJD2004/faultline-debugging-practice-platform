-- Faultline — schema additions for Daily Challenge, Contest, Achievements, Project Mode
-- Run this in MySQL Workbench against the faultline schema (after schema.sql + 002_more_challenges.sql).

USE faultline;

-- ============================= DAILY CHALLENGE =============================
-- One row per calendar date, pointing at an existing challenge. Submitting
-- that specific challenge on that date earns a bonus multiplier.
CREATE TABLE IF NOT EXISTS daily_challenges (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id      INT NOT NULL,
  active_date       DATE NOT NULL UNIQUE,
  bonus_multiplier  DECIMAL(3,2) NOT NULL DEFAULT 1.50,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- ============================= CONTESTS =============================
-- A time-boxed event made of a fixed set of challenges. The contest
-- leaderboard is computed on the fly from submissions made within the
-- [start_time, end_time] window — no separate scoring table needed.
CREATE TABLE IF NOT EXISTS contests (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(120) NOT NULL UNIQUE,
  title         VARCHAR(255) NOT NULL,
  description   TEXT NOT NULL,
  start_time    DATETIME NOT NULL,
  end_time      DATETIME NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contest_challenges (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  contest_id    INT NOT NULL,
  challenge_id  INT NOT NULL,
  position      INT NOT NULL DEFAULT 0,
  FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_contest_challenge (contest_id, challenge_id)
);

-- ============================= ACHIEVEMENTS =============================
-- Fully computed, not tracked — no per-user "unlocked" table to maintain.
-- Adding a new achievement is just one INSERT; the backend already knows
-- how to compute progress for each of these fixed criterion_types.
CREATE TABLE IF NOT EXISTS achievements (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  slug            VARCHAR(120) NOT NULL UNIQUE,
  title           VARCHAR(255) NOT NULL,
  description     TEXT NOT NULL,
  criterion_type  ENUM('total_solves','xp_total','streak','language_count','hard_solves','coins_total') NOT NULL,
  threshold       INT NOT NULL,
  icon            VARCHAR(60) NOT NULL DEFAULT 'award',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================= PROJECT MODE =============================
-- A project is a small multi-file codebase. check_rules works like a
-- challenge's, but each rule may include an optional "file" key to target
-- one specific file; rules with no "file" key test against all files
-- concatenated together.
CREATE TABLE IF NOT EXISTS projects (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(120) NOT NULL UNIQUE,
  title         VARCHAR(255) NOT NULL,
  lang          VARCHAR(60) NOT NULL,
  difficulty    ENUM('Easy','Medium','Hard','Expert') NOT NULL,
  xp            INT NOT NULL DEFAULT 150,
  coins         INT NOT NULL DEFAULT 30,
  bug_report    TEXT NOT NULL,
  objective     TEXT NOT NULL,
  hints         JSON NOT NULL,
  check_rules   JSON NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_files (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  project_id        INT NOT NULL,
  file_path         VARCHAR(255) NOT NULL,
  buggy_content     MEDIUMTEXT NOT NULL,
  solution_content  MEDIUMTEXT NOT NULL,
  is_entry_point    BOOLEAN NOT NULL DEFAULT FALSE,
  position          INT NOT NULL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_project_file (project_id, file_path)
);

CREATE TABLE IF NOT EXISTS project_submissions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  project_id    INT NOT NULL,
  status        ENUM('Passed','Failed') NOT NULL DEFAULT 'Passed',
  attempts      INT NOT NULL DEFAULT 1,
  xp_earned     INT NOT NULL DEFAULT 0,
  coins_earned  INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

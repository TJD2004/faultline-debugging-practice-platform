-- Faultline — Bookmarks feature
-- Run in MySQL Workbench after the previous migrations.

USE faultline;

CREATE TABLE IF NOT EXISTS bookmarks (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  challenge_id  INT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_user_challenge (user_id, challenge_id)
);

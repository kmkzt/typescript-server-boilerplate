CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY,
  username VARCHAR(16),
  email TEXT NOT NULL
);

INSERT INTO users (
  id,
  username,
  email
)
VALUES (
  1,
  'aaa',
  'aaa@aaa.com'
);

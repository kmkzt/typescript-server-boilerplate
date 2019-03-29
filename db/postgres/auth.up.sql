CREATE TABLE IF NOT EXISTS account (
  id INT NOT NULL PRIMARY KEY,
  email VARCHAR(64),
  password VARCHAR(64)
);

INSERT INTO users (
  id,
  email,
  password
)
VALUES (
  1,
  'aaa@aaa.com',
  'aaa'
);
INSERT INTO users (
  id,
  email,
  password
)
VALUES (
  2,
  'bbb@bbb.com',
  'bbb'
);

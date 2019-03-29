CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL PRIMARY KEY,
  username CHAR(40) NOT NULL,
  color CHAR(7),
  profile TEXT,
  picture CHAR(255)
);

INSERT INTO users (
  id,
  username,
  color,
  profile,
  picture
) VALUES (
  1,
  'AAA',
  '#FF0',
  'AAAのプロフィール',
  'https://avatars3.githubusercontent.com/u/30266990?s=460&v=4'
);

INSERT INTO users (
  id,
  username,
  color,
  profile,
  picture
) VALUES (
  2,
  'BBB',
  '#0aa',
  'BBBのプロフィール',
  ''
);

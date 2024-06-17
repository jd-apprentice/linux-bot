CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    is_authorized INTEGER NOT NULL DEFAULT 0,
    allowed_commands VARCHAR NOT NULL DEFAULT 'whoami',
    allowed_channels VARCHAR NOT NULL DEFAULT '1234'
);
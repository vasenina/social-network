DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      image_url VARCHAR(255),
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE reset_codes(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE REFERENCES users(email),
      code VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE friendships( 
  id SERIAL PRIMARY KEY, 
  sender_id INT REFERENCES users(id) NOT NULL,
  recipient_id INT REFERENCES users(id) NOT NULL,
  accepted BOOLEAN DEFAULT false);


CREATE TABLE chat_messages(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);




INSERT INTO chat_messages (user_id, message) VALUES ('145', 'Hey everyone, nice to meet you...');
INSERT INTO chat_messages (user_id, message) VALUES ('101', 'Hello there!');
INSERT INTO chat_messages (user_id, message) VALUES ('10', 'Hi hi hi!');


CREATE TABLE wall_messages(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      sender_id INT REFERENCES users(id) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- SELECT  COUNT(*)
-- FROM friendships 
-- JOIN users 
-- ON (sender_id =1 OR recipient_id = 1 ) 
-- WHERE accepted = true AND NOT(users.id = 1);

`SELECT wall_messages.id, user_id, sender_id, users.image_url, users.first, users.last, message, wall_messages.created_at
                FROM chat_messages
                JOIN users ON (sender_id = users.id)
                ORDER BY wall_messages.created_at ASC;`


UPDATE users SET password = '$2a$10$p/vgVMTzhftbGtoPygXbIumkU8vuqfiGH61WVUqdcRgkWKJEvJco6';

-- SELECT users.id, first, last, image_url, accepted, sender_id
--   FROM friendships
--   JOIN users ON (accepted = FALSE AND recipient_id = 1 AND sender_id = users.id) OR
--                   (accepted = FALSE AND sender_id = 1 AND recipient_id = users.id) OR
--                 (accepted = TRUE AND recipient_id = 1 AND sender_id = users.id) OR
--                 (accepted = TRUE AND sender_id = 1 AND recipient_id = users.id)

-- SELECT users.id, first, last, image_url, accepted, sender_id
--   FROM friendships
--   JOIN users ON
--                 (accepted = TRUE AND recipient_id = 1 AND sender_id = users.id) OR
--                 (accepted = TRUE AND sender_id = 1 AND recipient_id = users.id)
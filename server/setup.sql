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

SELECT  COUNT(*)
FROM friendships 
JOIN users 
ON (sender_id =1 OR recipient_id = 1 ) 
WHERE accepted = true AND NOT(users.id = 1);




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
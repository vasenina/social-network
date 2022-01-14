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



SELECT id, first, last, image_url FROM users
                WHERE last ILIKE 'h%' OR first ILIKE 'h';

SELECT id, first, last, image_url FROM users
                WHERE last ILIKE 'h%' ;
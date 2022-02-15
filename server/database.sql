CREATE DATABASE pokidex_favorites;

CREATE TABLE favorites(
    favorites_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);
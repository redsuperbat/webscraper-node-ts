CREATE DATABASE IF NOT EXISTS main;
USE main;
CREATE TABLE IF NOT EXISTS wines (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  category VARCHAR(64),
  sub_category VARCHAR(64),
  image_url VARCHAR(64),
  country VARCHAR(64),
  volume SMALLINT,
  price SMALLINT,
  vintage SMALLINT,
  wine_type VARCHAR(64),
  short_desc VARCHAR(128),
  taste_desc VARCHAR(256),
  taste_usage_desc VARCHAR(256),
  product_url VARCHAR(64)
)
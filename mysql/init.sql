CREATE DATABASE IF NOT EXISTS bolaget;
USE bolaget;
CREATE TABLE IF NOT EXISTS wines (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  category VARCHAR(256),
  sub_category VARCHAR(256),
  image_url VARCHAR(256),
  country VARCHAR(256),
  volume SMALLINT,
  price SMALLINT,
  vintage SMALLINT,
  wine_type VARCHAR(256),
  short_desc VARCHAR(256),
  taste_desc VARCHAR(256),
  taste_usage_desc VARCHAR(256),
  product_url VARCHAR(256)
)
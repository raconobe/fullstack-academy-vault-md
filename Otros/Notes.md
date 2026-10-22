

# Create a database


mariadb -u root -p -h localhost
create database misc;
GRANT ALL ON misc.* TO 'db_admin'@'localhost' IDENTIFIED BY '123';
GRANT ALL ON misc.* TO 'db_admin'@'127.0.0.1' IDENTIFIED BY '123';


USE misc;
CREATE TABLE autos (
   auto_id INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
   make VARCHAR(128),
   year INTEGER,
   mileage INTEGER
);
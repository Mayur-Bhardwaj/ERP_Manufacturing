CREATE DATABASE IF NOT EXISTS erp_db;
USE erp_db;

CREATE TABLE users(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role ENUM('admin', 'user') DEFAULT 'user',
status ENUM('active', 'inactive') DEFAULT 'active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT DEFAULT ADMIN USER
INSERT INTO users VALUES(name,email,password, role,status)
VALUES(
	'Administrator',
    'admin@example.com',
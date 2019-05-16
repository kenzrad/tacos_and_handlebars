### Schema

##localhost
CREATE DATABASE taco_db;
USE taco_db;

CREATE TABLE tacos
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);


##JAWS DB
USE `dth635cpfz5ykc8k`;

CREATE TABLE tacos
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

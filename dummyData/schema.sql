DROP TABLE `cases`;
DROP TABLE `images`;
DROP TABLE `users`;
DROP TABLE `animals`;

CREATE TABLE `users` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` varchar(60) NOT NULL,
	`email` varchar(30) NOT NULL,
	`phone` varchar(15) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `animals` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`breed` varchar(25) NOT NULL,
	`color` varchar(15) NOT NULL,
	`name` varchar(15) NOT NULL,
    `size` varchar(15) NOT NULL,
	`animalType` varchar(15) NOT NULL,
	`gender` varchar(8) NOT NULL,
	`description` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `images` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`imgURL` varchar(40) NOT NULL,
	`animalID` BIGINT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `cases` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`caseType` varchar(5) NOT NULL,
    `city` varchar(15) NOT NULL,
	`street` varchar(30) NOT NULL,
    `latitude` float NOT NULL,
    `longitude` float NOT NULL,
	`coverImg` varchar(30) NOT NULL,
	`animalID` BIGINT NOT NULL,
	`description` TEXT NOT NULL,
	`userID` BIGINT NOT NULL,
	`date` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `cases` ADD CONSTRAINT `cases_fk1` FOREIGN KEY (`animalID`) REFERENCES `animals`(`id`);

ALTER TABLE `cases` ADD CONSTRAINT `cases_fk2` FOREIGN KEY (`userID`) REFERENCES `users`(`id`);

ALTER TABLE `images` ADD CONSTRAINT `images_fk0` FOREIGN KEY (`animalID`) REFERENCES `animals`(`id`);


-- MySQL database export

START TRANSACTION;

CREATE TABLE IF NOT EXISTS `Contributor` (
    `id` BIGINT NOT NULL,
    `User_id` BIGINT NOT NULL,
    `Garden_id` BIGINT NOT NULL,
    `Created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Follower` (
    `id` BIGINT NOT NULL,
    `Follower_id` BIGINT NOT NULL,
    `User_id` BIGINT,
    `Garden_id` BIGINT,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `User` (
    `id` BIGINT NOT NULL,
    `Username` TEXT NOT NULL,
    `Password` TEXT NOT NULL,
    `Salt` TEXT NOT NULL,
    `Is_admin` TINYINT(1) NOT NULL,
    `Firstname` TEXT NOT NULL,
    `Lastname` TEXT NOT NULL,
    `Email` TEXT NOT NULL,
    `Postal_code` TEXT NOT NULL,
    `Country` TEXT NOT NULL,
    `Sexe` TEXT NOT NULL,
    `Birthday` DATE NOT NULL,
    `Profile_image` TEXT NOT NULL,
    `Bio` TEXT NOT NULL,
    `Level` BIGINT NOT NULL,
    `Xp` BIGINT NOT NULL,
    `Created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Garden` (
    `id` BIGINT NOT NULL,
    `Admin_id` BIGINT NOT NULL,
    `Name` TEXT NOT NULL,
    `Description` TEXT NOT NULL,
    `Latitude` BIGINT NOT NULL,
    `Longitude` BIGINT NOT NULL,
    `Length` BIGINT NOT NULL,
    `Width` BIGINT NOT NULL,
    `Update_at` DATETIME NOT NULL,
    `Created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Parcel` (
    `id` BIGINT NOT NULL,
    `Garden_id` BIGINT,
    `Length` BIGINT,
    `Width` BIGINT,
    `N_line` BIGINT,
    `Created_at` DATETIME,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Line` (
    `id` BIGINT NOT NULL,
    `Parcel_id` BIGINT,
    `Length` BIGINT,
    `Created_at` DATETIME,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Logs` (
    `id` BIGINT NOT NULL,
    `Author_id` BIGINT,
    `Garden_id` BIGINT,
    `Parcel_id` BIGINT,
    `Line_id` BIGINT,
    `Crop_id` BIGINT,
    `Action` TEXT,
    `Comment` TEXT,
    `Status` VARCHAR(50) NOT NULL,
    `Created_at` BIGINT,
    PRIMARY KEY (`id`),
    INDEX `idx_Crop_id` (`Crop_id`)  -- Ajout d'un index pour la colonne Crop_id
);

CREATE TABLE IF NOT EXISTS `Crops` (
    `id` BIGINT NOT NULL,
    `Line_id` BIGINT,
    `Vegetable` TEXT NOT NULL,
    `Variety` TEXT,
    `Icon` BIGINT,
    `Sowing` DATE,
    `Planting` DATE,
    `Harvesting` DATE,
    `Created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Tags_interest` (
    `id` BIGINT NOT NULL,
    `User_id` BIGINT,
    `Garden_id` BIGINT,
    `Hashtag` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

-- Foreign key constraints
-- Ajout des contraintes dans le bon ordre (tables parentes d'abord)

-- ALTER TABLE `Garden`
-- ADD CONSTRAINT `fk_Garden_Admin_id` FOREIGN KEY(`Admin_id`) REFERENCES `User`(`id`)
-- ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Parcel`
ADD CONSTRAINT `fk_Parcel_Garden_id` FOREIGN KEY(`Garden_id`) REFERENCES `Garden`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Line`
ADD CONSTRAINT `fk_Line_Parcel_id` FOREIGN KEY(`Parcel_id`) REFERENCES `Parcel`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Contributor`
ADD CONSTRAINT `fk_Contributor_Garden_id` FOREIGN KEY(`Garden_id`) REFERENCES `Garden`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Contributor`
ADD CONSTRAINT `fk_Contributor_User_id` FOREIGN KEY(`User_id`) REFERENCES `User`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

-- Attention: Voici la problématique de relation circulaire
-- Inversion de la relation entre Crops et Logs pour éviter la référence circulaire
ALTER TABLE `Logs`
ADD CONSTRAINT `fk_Logs_Crop_id` FOREIGN KEY(`Crop_id`) REFERENCES `Crops`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Crops`
ADD CONSTRAINT `fk_Crops_Line_id` FOREIGN KEY(`Line_id`) REFERENCES `Line`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Follower`
ADD CONSTRAINT `fk_Follower_Follower_id` FOREIGN KEY(`Follower_id`) REFERENCES `User`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Follower`
ADD CONSTRAINT `fk_Follower_Garden_id` FOREIGN KEY(`Garden_id`) REFERENCES `Garden`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Follower`
ADD CONSTRAINT `fk_Follower_User_id` FOREIGN KEY(`User_id`) REFERENCES `User`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Tags_interest`
ADD CONSTRAINT `fk_Tags_Garden_id` FOREIGN KEY(`Garden_id`) REFERENCES `Garden`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Tags_interest`
ADD CONSTRAINT `fk_Tags_User_id` FOREIGN KEY(`User_id`) REFERENCES `User`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Logs`
ADD CONSTRAINT `fk_Logs_Author_id` FOREIGN KEY(`Author_id`) REFERENCES `User`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Logs`
ADD CONSTRAINT `fk_Logs_Garden_id` FOREIGN KEY(`Garden_id`) REFERENCES `Garden`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Logs`
ADD CONSTRAINT `fk_Logs_Line_id` FOREIGN KEY(`Line_id`) REFERENCES `Line`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Logs`
ADD CONSTRAINT `fk_Logs_Parcel_id` FOREIGN KEY(`Parcel_id`) REFERENCES `Parcel`(`id`)
ON UPDATE CASCADE ON DELETE RESTRICT;

COMMIT;
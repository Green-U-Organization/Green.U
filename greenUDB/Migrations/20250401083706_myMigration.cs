using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace GreenUApi.Migrations
{
    public partial class myMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Désactive temporairement les contraintes FK pour MySQL
            migrationBuilder.Sql("SET FOREIGN_KEY_CHECKS = 0;");

            var sql = @"
            START TRANSACTION;

            /* Tables sans dépendances */
            CREATE TABLE IF NOT EXISTS `User` (
                `id` BIGINT NOT NULL AUTO_INCREMENT,
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

            /* Tables avec dépendances */
            CREATE TABLE IF NOT EXISTS `Garden` (
                `id` BIGINT NOT NULL AUTO_INCREMENT,
                `Admin_id` BIGINT NOT NULL,
                `Name` TEXT NOT NULL,
                `Description` TEXT NOT NULL,
                `Latitude` BIGINT NOT NULL,
                `Longitude` BIGINT NOT NULL,
                `Length` BIGINT NOT NULL,
                `Width` BIGINT NOT NULL,
                `Update_at` DATETIME NOT NULL,
                `Created_at` DATETIME NOT NULL,
                PRIMARY KEY (`id`),
                CONSTRAINT `fk_Garden_Admin_id` FOREIGN KEY(`Admin_id`) REFERENCES `User`(`id`)
            );

            /* ... autres tables dans l'ordre des dépendances ... */

            COMMIT;
            ";
            
            migrationBuilder.Sql(sql);
            migrationBuilder.Sql("SET FOREIGN_KEY_CHECKS = 1;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                START TRANSACTION;
                SET FOREIGN_KEY_CHECKS = 0;
                
                DROP TABLE IF EXISTS `Contributor`;
                DROP TABLE IF EXISTS `Follower`;
                /* ... autres tables ... */
                DROP TABLE IF EXISTS `User`;
                
                SET FOREIGN_KEY_CHECKS = 1;
                COMMIT;
            ");
        }

    }
}
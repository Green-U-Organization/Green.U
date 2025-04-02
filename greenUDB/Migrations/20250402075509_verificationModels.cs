using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreenUApi.Migrations
{
    /// <inheritdoc />
    public partial class verificationModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "PlantNurseryId",
                table: "Logs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PlantNurseryId",
                table: "Crops",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Admin",
                table: "Contributor",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PlantNursery",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    gardenId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantNursery", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlantNursery");

            migrationBuilder.DropColumn(
                name: "PlantNurseryId",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "PlantNurseryId",
                table: "Crops");

            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Contributor");

        }
    }
}

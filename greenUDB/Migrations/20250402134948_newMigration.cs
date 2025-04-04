using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreenUApi.Migrations
{
    /// <inheritdoc />
    public partial class newMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PlantNursery",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GardenId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantNursery", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Salt = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Is_admin = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Firstname = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Lastname = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Postal_code = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Gender = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    Profile_image = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Bio = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Level = table.Column<long>(type: "bigint", nullable: false),
                    Xp = table.Column<long>(type: "bigint", nullable: false),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Garden",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Admin_id = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Latitude = table.Column<long>(type: "bigint", nullable: false),
                    Longitude = table.Column<long>(type: "bigint", nullable: false),
                    Length = table.Column<long>(type: "bigint", nullable: false),
                    Width = table.Column<long>(type: "bigint", nullable: false),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: false),
                    privacy = table.Column<int>(type: "int", nullable: false),
                    type = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "FK_Garden_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Contributor",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    User_id = table.Column<long>(type: "bigint", nullable: false),
                    Garden_id = table.Column<long>(type: "bigint", nullable: false),
                    Admin = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Contributor_Garden_id",
                        column: x => x.Garden_id,
                        principalTable: "Garden",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Contributor_User_id",
                        column: x => x.User_id,
                        principalTable: "User",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Follower",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Follower_id = table.Column<long>(type: "bigint", nullable: false),
                    User_id = table.Column<long>(type: "bigint", nullable: true),
                    Garden_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Follower_Follower_id",
                        column: x => x.Follower_id,
                        principalTable: "User",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Follower_Garden_id",
                        column: x => x.Garden_id,
                        principalTable: "Garden",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Follower_User_id",
                        column: x => x.User_id,
                        principalTable: "User",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Parcel",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Garden_id = table.Column<long>(type: "bigint", nullable: true),
                    Length = table.Column<double>(type: "double", nullable: true),
                    Width = table.Column<long>(type: "bigint", nullable: true),
                    N_line = table.Column<long>(type: "bigint", nullable: true),
                    ParcelAngle = table.Column<double>(type: "double", nullable: true),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Parcel_Garden_id",
                        column: x => x.Garden_id,
                        principalTable: "Garden",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Tags_interest",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    User_id = table.Column<long>(type: "bigint", nullable: true),
                    Garden_id = table.Column<long>(type: "bigint", nullable: true),
                    Hashtag = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Tags_Garden_id",
                        column: x => x.Garden_id,
                        principalTable: "Garden",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Tags_User_id",
                        column: x => x.User_id,
                        principalTable: "User",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Line",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Parcel_id = table.Column<long>(type: "bigint", nullable: true),
                    Length = table.Column<long>(type: "bigint", nullable: true),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Line_Parcel_id",
                        column: x => x.Parcel_id,
                        principalTable: "Parcel",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Crops",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Line_id = table.Column<long>(type: "bigint", nullable: true),
                    PlantNurseryId = table.Column<long>(type: "bigint", nullable: true),
                    Vegetable = table.Column<string>(type: "text", nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Variety = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Icon = table.Column<long>(type: "bigint", nullable: true),
                    Sowing = table.Column<DateOnly>(type: "date", nullable: true),
                    Planting = table.Column<DateOnly>(type: "date", nullable: true),
                    Harvesting = table.Column<DateOnly>(type: "date", nullable: true),
                    Created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Crops_Line_id",
                        column: x => x.Line_id,
                        principalTable: "Line",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    Author_id = table.Column<long>(type: "bigint", nullable: true),
                    Garden_id = table.Column<long>(type: "bigint", nullable: true),
                    Parcel_id = table.Column<long>(type: "bigint", nullable: true),
                    Line_id = table.Column<long>(type: "bigint", nullable: true),
                    Crop_id = table.Column<long>(type: "bigint", nullable: true),
                    PlantNurseryId = table.Column<long>(type: "bigint", nullable: true),
                    Action = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comment = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created_at = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "fk_Logs_Author_id",
                        column: x => x.Author_id,
                        principalTable: "User",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Logs_Crop_id",
                        column: x => x.Crop_id,
                        principalTable: "Crops",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Logs_Garden_id",
                        column: x => x.Garden_id,
                        principalTable: "Garden",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Logs_Line_id",
                        column: x => x.Line_id,
                        principalTable: "Line",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_Logs_Parcel_id",
                        column: x => x.Parcel_id,
                        principalTable: "Parcel",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "fk_Contributor_Garden_id",
                table: "Contributor",
                column: "Garden_id");

            migrationBuilder.CreateIndex(
                name: "fk_Contributor_User_id",
                table: "Contributor",
                column: "User_id");

            migrationBuilder.CreateIndex(
                name: "fk_Crops_Line_id",
                table: "Crops",
                column: "Line_id");

            migrationBuilder.CreateIndex(
                name: "fk_Follower_Follower_id",
                table: "Follower",
                column: "Follower_id");

            migrationBuilder.CreateIndex(
                name: "fk_Follower_Garden_id",
                table: "Follower",
                column: "Garden_id");

            migrationBuilder.CreateIndex(
                name: "fk_Follower_User_id",
                table: "Follower",
                column: "User_id");

            migrationBuilder.CreateIndex(
                name: "fk_Garden_Admin_id",
                table: "Garden",
                column: "Admin_id");

            migrationBuilder.CreateIndex(
                name: "IX_Garden_UserId",
                table: "Garden",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "fk_Line_Parcel_id",
                table: "Line",
                column: "Parcel_id");

            migrationBuilder.CreateIndex(
                name: "fk_Logs_Author_id",
                table: "Logs",
                column: "Author_id");

            migrationBuilder.CreateIndex(
                name: "fk_Logs_Crop_id",
                table: "Logs",
                column: "Crop_id");

            migrationBuilder.CreateIndex(
                name: "fk_Logs_Garden_id",
                table: "Logs",
                column: "Garden_id");

            migrationBuilder.CreateIndex(
                name: "fk_Logs_Line_id",
                table: "Logs",
                column: "Line_id");

            migrationBuilder.CreateIndex(
                name: "fk_Logs_Parcel_id",
                table: "Logs",
                column: "Parcel_id");

            migrationBuilder.CreateIndex(
                name: "fk_Parcel_Garden_id",
                table: "Parcel",
                column: "Garden_id");

            migrationBuilder.CreateIndex(
                name: "fk_Tags_Garden_id",
                table: "Tags_interest",
                column: "Garden_id");

            migrationBuilder.CreateIndex(
                name: "fk_Tags_User_id",
                table: "Tags_interest",
                column: "User_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contributor");

            migrationBuilder.DropTable(
                name: "Follower");

            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "PlantNursery");

            migrationBuilder.DropTable(
                name: "Tags_interest");

            migrationBuilder.DropTable(
                name: "Crops");

            migrationBuilder.DropTable(
                name: "Line");

            migrationBuilder.DropTable(
                name: "Parcel");

            migrationBuilder.DropTable(
                name: "Garden");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}

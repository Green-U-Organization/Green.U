using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreenUApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Exécuter le script SQL complet
            migrationBuilder.Sql(File.ReadAllText("./data.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Script pour annuler la migration si nécessaire
            migrationBuilder.Sql("DROP TABLE Garden, User, Parcel, Line, Crops;");
        }
    }
}

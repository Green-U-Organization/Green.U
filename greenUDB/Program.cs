using Microsoft.EntityFrameworkCore;
using GreenUApi.Controllers;
using GreenUApi.Models;
using DotNetEnv;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Charger la chaîne de connexion depuis les variables d'environnement
var connectionString = $"server={Environment.GetEnvironmentVariable("SERVEUR")};" +
                       $"port={Environment.GetEnvironmentVariable("PORT")};" +
                       $"database={Environment.GetEnvironmentVariable("DATABASE")};" +
                       $"user={Environment.GetEnvironmentVariable("USER")};" +
                       $"password={Environment.GetEnvironmentVariable("PASSWORD")};" +
                       $"SslMode={Environment.GetEnvironmentVariable("MODE")};";

// Enregistrement de DbContext avec la chaîne de connexion chargée dynamiquement
builder.Services.AddDbContext<GreenUDB>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Ajouter CORS (en utilisant la variable d'environnement pour l'URL)
var allowedOrigin = Environment.GetEnvironmentVariable("API") ?? "http://localhost:3000";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    policy => policy.WithOrigins(allowedOrigin)
                    .AllowAnyHeader()
                    .AllowAnyMethod());
});

// Ajouter d'autres services
builder.Services.AddControllers();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "GreenUAPI";
    config.Title = "GreenUAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

// Utiliser CORS
app.UseCors("AllowSpecificOrigin");

// Middleware
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "GreenUAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}


app.Run();

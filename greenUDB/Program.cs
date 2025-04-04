using Microsoft.EntityFrameworkCore;
using GreenUApi.Controllers;
using GreenUApi.Models;
using DotNetEnv;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

var connectionString = $"server={Environment.GetEnvironmentVariable("SERVEUR")};" +
                       $"port={Environment.GetEnvironmentVariable("PORT")};" +
                       $"database={Environment.GetEnvironmentVariable("DATABASE")};" +
                       $"user={Environment.GetEnvironmentVariable("USER")};" +
                       $"password={Environment.GetEnvironmentVariable("PASSWORD")};" +
                       $"SslMode={Environment.GetEnvironmentVariable("MODE")};";

builder.Services.AddDbContext<GreenUDB>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

var allowedOrigin = Environment.GetEnvironmentVariable("API") ?? "http://localhost:3000";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    policy => policy.WithOrigins(allowedOrigin)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
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

app.UseCors("AllowSpecificOrigin");

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

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

// Add cors services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000", $"api = {Environment.GetEnvironmentVariable("API")}")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Add other services
builder.Services.AddControllers();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "GrennUAPI";
    config.Title = "GrennUAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

// Use cors policy
app.UseCors("AllowSpecificOrigin");

// Other middlewares
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "GrennUAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

var UserItems = app.MapGroup("/Users");

UserItems.MapGet("/{id}", UserController.GetUser);
UserItems.MapPut("/{id}", UserController.UpdateUser);
UserItems.MapDelete("/{id}", UserController.DeleteUser);

app.Run();
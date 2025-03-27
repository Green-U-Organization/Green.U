using Microsoft.EntityFrameworkCore;
using GreenUApi.controller;
using DotNetEnv;
using GreenUApi.authentification;

Env.Load();
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var connectionString = $"server={Environment.GetEnvironmentVariable("SERVEUR")};" +
                       $"port={Environment.GetEnvironmentVariable("PORT")};" +
                       $"database={Environment.GetEnvironmentVariable("DATABASE")};" +
                       $"user={Environment.GetEnvironmentVariable("USER")};" +
                       $"password={Environment.GetEnvironmentVariable("PASSWORD")};" +
                       $"SslMode={Environment.GetEnvironmentVariable("MODE")};";

builder.Services.AddDbContext<greenUDB>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "GrennUAPI";
    config.Title = "GrennUAPI v1";
    config.Version = "v1";
});


var app = builder.Build();

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

var Auth = app.MapGroup("/");

Auth.MapGet("/login", Authentification.Login);
Auth.MapPost("/register", UserController.CreateUser);

var UserItems = app.MapGroup("/Users");

UserItems.MapGet("/", UserController.GetAllUser);
//UserItems.MapGet("/login", UserController.GetUserForLogin);
UserItems.MapGet("/{id}", UserController.GetUser);
UserItems.MapPut("/{id}", UserController.UpdateUser);
UserItems.MapDelete("/{id}", UserController.DeleteUser);

var TodoItems = app.MapGroup("/Todos");

app.Run();


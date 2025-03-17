using Microsoft.EntityFrameworkCore;
using GreenUApi.controller;
using DotNetEnv;


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

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

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

UserItems.MapGet("/", UserController.GetAllUser);
UserItems.MapGet("/{id}", UserController.GetUser);
UserItems.MapPost("/", UserController.CreateUser);
UserItems.MapPut("/{id}", UserController.UpdateUser);
UserItems.MapDelete("/{id}", UserController.DeleteUser);

var TodoItems = app.MapGroup("/Todos");

TodoItems.MapGet("/", TodoController.GetAllTodo);
TodoItems.MapGet("/{id}", TodoController.GetTodo);
TodoItems.MapPost("/", TodoController.CreateTodo);
TodoItems.MapPut("/{id}", TodoController.UpdateTodo);
TodoItems.MapDelete("/{id}", TodoController.DeleteTodo);

var GardenItems = app.MapGroup("/Gardens");

GardenItems.MapGet("/", GardenController.GetAllGarden);
GardenItems.MapGet("/{id}", GardenController.GetGarden);
GardenItems.MapPost("/", GardenController.CreateGarden);
GardenItems.MapPut("/{id}", GardenController.UpdateGarden);
GardenItems.MapDelete("/{id}", GardenController.DeleteGarden);

var LineItems = app.MapGroup("/Lines");

LineItems.MapGet("/", LineController.GetAllLine);
LineItems.MapGet("/{id}", LineController.GetLine);
LineItems.MapPost("/", LineController.CreateLine);
LineItems.MapPut("/{id}", LineController.UpdateLine);
LineItems.MapDelete("/{id}", LineController.DeleteLine);

var LogItems = app.MapGroup("/Logs");

LogItems.MapGet("/", LogController.GetAllLog);
LogItems.MapGet("/{id}", LogController.GetLog);
LogItems.MapPost("/", LogController.CreateLog);
LogItems.MapPut("/{id}", LogController.UpdateLog);
LogItems.MapDelete("/{id}", LogController.DeleteLog);

var AccountItems = app.MapGroup("/Accounts");

AccountItems.MapGet("/", AccountController.GetAllAccount);
AccountItems.MapGet("/{id}", AccountController.GetAccount);
AccountItems.MapPost("/", AccountController.CreateAccount);
AccountItems.MapPut("/{id}", AccountController.UpdateAccount);
AccountItems.MapDelete("/{id}", AccountController.DeleteAccount);


app.Run();


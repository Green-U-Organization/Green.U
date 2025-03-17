using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.controller;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var connectionString = "server=;port=;database=;user=;password=;SslMode=Preferred;";
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


app.Run();


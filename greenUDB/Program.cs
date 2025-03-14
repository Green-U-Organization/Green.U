using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var connectionString = "server=;port=;database=;user=;password=;SslMode=Preferred;";
builder.Services.AddDbContext<greenUDB>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "UserAPI";
    config.Title = "UserAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "UserAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

var UserItems = app.MapGroup("/Users");

UserItems.MapGet("/", GreenUApi.controller.UserController.GetAllUser);
UserItems.MapGet("/{id}", GreenUApi.controller.UserController.GetUser);
UserItems.MapPost("/", GreenUApi.controller.UserController.CreateUser);
UserItems.MapPut("/{id}", GreenUApi.controller.UserController.UpdateUser);
UserItems.MapDelete("/{id}", GreenUApi.controller.UserController.DeleteUser);

var accountItems = app.MapGroup("/Account");

accountItems.MapGet("/", GreenUApi.controller.UserController.GetAllUser);
accountItems.MapGet("/{id}", GreenUApi.controller.UserController.GetUser);
accountItems.MapPost("/", GreenUApi.controller.UserController.CreateUser);
accountItems.MapPut("/{id}", GreenUApi.controller.UserController.UpdateUser);
accountItems.MapDelete("/{id}", GreenUApi.controller.UserController.DeleteUser);


app.Run();


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var connectionString = "server=localhost;port=3306;database=backend;user=root;password=Cl20051998*;SslMode=Preferred;";
builder.Services.AddDbContext<backend>(options =>
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

UserItems.MapGet("/", UserController.UserController.GetAllUser);
UserItems.MapGet("/{id}", UserController.UserController.GetUser);
UserItems.MapPost("/", UserController.UserController.CreateUser);
UserItems.MapPut("/{id}", UserController.UserController.UpdateUser);
UserItems.MapDelete("/{id}", UserController.UserController.DeleteUser);

var accountItems = app.MapGroup("/Account");

accountItems.MapGet("/", UserController.UserController.GetAllUser);
accountItems.MapGet("/{id}", UserController.UserController.GetUser);
accountItems.MapPost("/", UserController.UserController.CreateUser);
accountItems.MapPut("/{id}", UserController.UserController.UpdateUser);
accountItems.MapDelete("/{id}", UserController.UserController.DeleteUser);


app.Run();


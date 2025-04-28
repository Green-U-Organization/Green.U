using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("SECRET_JWT") ?? "")),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

//Autres services

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
    options.JsonSerializerOptions.MaxDepth = 64;
});

builder.Services.AddControllers();
builder.Services.AddDbContext<GreenUDB>();

// Db connection
var connectionString = $"server={Environment.GetEnvironmentVariable("SERVEUR")};" +
                       $"port={Environment.GetEnvironmentVariable("PORT")};" +
                       $"database={Environment.GetEnvironmentVariable("DATABASE")};" +
                       $"user={Environment.GetEnvironmentVariable("USER")};" +
                       $"password={Environment.GetEnvironmentVariable("PASSWORD")};" +
                       $"SslMode={Environment.GetEnvironmentVariable("MODE")};";

// Load the DB context 
builder.Services.AddDbContext<GreenUDB>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Use Cors with .env
var allowedOriginsWithNull = new string?[] { 
    Environment.GetEnvironmentVariable("ALLOWED_HOST1"),
    Environment.GetEnvironmentVariable("ALLOWED_HOST2"),
    Environment.GetEnvironmentVariable("ALLOWED_HOST3")
};

var allowedOrigins = allowedOriginsWithNull.Where(origin => origin != null).ToArray();

Console.WriteLine("Allowed Origins:");
foreach (var origin in allowedOrigins)
{
    Console.WriteLine(origin);
}
    builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
    policy => policy.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
});

// Add other services
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;  // Ignore les boucles de référence
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;  // Ignore les valeurs null
    });
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
//app.UseAuthorization();

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
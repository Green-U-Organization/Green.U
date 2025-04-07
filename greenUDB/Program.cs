using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using GreenUApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Charger les variables d'environnement
Env.Load();

// Ajouter l'authentification JWT
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

// Autres services
builder.Services.AddControllers();
builder.Services.AddDbContext<GreenUDB>();

var app = builder.Build();

// Configurer le pipeline HTTP
app.UseHttpsRedirection();

// Ces deux middlewares sont ESSENTIELS pour l'authentification
app.UseAuthentication(); // Doit être avant UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
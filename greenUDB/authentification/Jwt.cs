using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using DotNetEnv;
using GreenUApi.model;

namespace Token;
public class Jwt
{
    public static string GenerateJwtToken(User user)
    {
        Env.Load();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Convert.FromBase64String(Environment.GetEnvironmentVariable("SECRET_JWT"));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public bool VerifyJwtToken(string token)
    {
        Env.Load();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Convert.FromBase64String($"key={Environment.GetEnvironmentVariable("SECRET_JWT")};");

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        SecurityToken validatedToken;
        var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

        return true;
    }
}
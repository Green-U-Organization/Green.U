using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using DotNetEnv;
using GreenUApi.Models;
using System.Text;


namespace JwtController;
public class JwtResponse<T>
{
    
    public required bool isEmpty { get; set; }
    public string? message { get; set; }
    public string? token {  get; set; }
    public T? content { get; set; }
}

public class UserDTO
{
    public long? Id { get; set; }
    public string? Username { get; set; }
}

public class JwtController
{
    public static JwtResponse<UserDTO> GenerateJwtToken(User user)
    {

        if (string.IsNullOrEmpty(user.Username) || user.Id == null || user.Id == 0)
        {
            return new JwtResponse<UserDTO> { isEmpty = true };

        }

        Env.Load();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("SECRET_JWT") ?? "");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", user.Id.ToString() ?? string.Empty)
            }),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var createToken = tokenHandler.CreateToken(tokenDescriptor);
        var theToken = tokenHandler.WriteToken(createToken);
        return new JwtResponse<UserDTO> { isEmpty = false, message = "Your token are created !" ,token = theToken, content = new UserDTO { Id = user.Id, Username = user.Username } };
    }

    public static bool VerifyJwtToken(string token)
    {
        Env.Load();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("SECRET_JWT") ?? "");

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };

        var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

        if (principal == null) return false;

        return true;
    }
}

using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GreenUApi.Controllers
{
    public class LoginModel
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    [ApiController]
    [Route("/")]
    public class AuthController : ControllerBase
    {
        private readonly GreenUDB _db;

        public AuthController(GreenUDB db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel cred)
        {
            
            UserDTO userData = await Authentification.VerifyCredentials(cred.Email, cred.Password, _db);

            if (userData.Error == null)
            {
                var token = GenerateJwtToken(cred.Email);
                return Ok(new { isEmpty = false, message = "Token are created !", token = token, content = userData});
            }
            return Unauthorized();
        }

        private static string GenerateJwtToken(string email)
        {
            var claims = new[]
            {
               new Claim(JwtRegisteredClaimNames.Sub, email),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
           };

            string? secret = Environment.GetEnvironmentVariable("SECRET_JWT");
            string? apiLink = Environment.GetEnvironmentVariable("ISSUER");
            string? prodLink = Environment.GetEnvironmentVariable("AUDIENCE");  
            if (string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(apiLink) || string.IsNullOrEmpty(prodLink))
            {
                throw new InvalidOperationException("Environment variable 'SECRET' is not set.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
            issuer: apiLink,
            audience: prodLink,
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

}
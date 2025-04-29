using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using JwtController;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

public class LoginModel
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class TokenVerfyModel
{
    public required string Token { get; set; }
}

namespace GreenUApi.Controllers
{
    [ApiController]
    [Route("/")]
    public class AuthController : ControllerBase
    {
        private readonly GreenUDB _db;

        public AuthController(GreenUDB db)
        {
            _db = db;
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginModel model)
        //{
        //    var jwt = await Authentification.Login(model.Email, model.Password, _db);
            
        //    if (!jwt.isEmpty) return Ok(jwt);

        //    else return Unauthorized(jwt);
        //}

        [HttpPost("verifyjwt")]
        public IActionResult VerifyJwt([FromBody] TokenVerfyModel Token)
        {
            Console.WriteLine(Token.Token);
            bool isValid = JwtController.JwtController.VerifyJwtToken(Token.Token);
            
            if (!isValid) return Unauthorized();

            return Ok(new { isEmpty = false, message = "token is valid !", Token});
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel cred)
        {
            

            if (cred.Email == "admin" && cred.Password == "password")
            {
                var token = GenerateJwtToken(cred.Email);
                return Ok(new { token });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken(string email)
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
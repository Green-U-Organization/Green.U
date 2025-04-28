using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using JwtController;

public class LoginModel
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var jwt = await Authentification.Login(model.Email, model.Password, _db);
            
            if (!jwt.isEmpty) return Ok(jwt);

            else return Unauthorized(jwt);
        }

        [HttpPost("verifyjwt")]
        public IActionResult VerifyJwt([FromBody] string token)
        {
            bool isValid = Jwt.VerifyJwtToken(token);
            
            if (!isValid) return Unauthorized();

            return Ok(new { isEmpty = false, message = "token is valid !", token = token});
        }

    }

}
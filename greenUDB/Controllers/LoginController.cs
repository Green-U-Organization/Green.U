using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var (success, token, message) = await Authentification.Login(model.Email, model.Password, _db);
            
            if (success)
            {
                return Ok(new { message, token });
            }
            else
            {
                return Unauthorized(new { message });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var userDbData = await _db.Users
            .Where(u => u.Username == user.Username)
            .Select(u => new User { Username = u.Username })
            .ToArrayAsync();

            if (userDbData.Length != 0)
            {
                return Conflict(new { message = "This username already exists" });
            }


            if (user.Password == null)
            {
                return BadRequest(new { message = "Password is missing" });
            }

            string[] hashSalt = Authentification.Hasher(user.Password, null);
            user.Password = hashSalt[0];
            user.Salt = hashSalt[1];

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { message = "User created !" });
        }
    }

    public class LoginModel
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
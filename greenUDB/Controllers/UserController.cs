using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
namespace GreenUApi.Controllers
{

    public class UserResult<T>
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string? ErrorMessage { get; set; }
    }

    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GreenUDB _db;

        public UserController(GreenUDB db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var users = await _db.Users.ToArrayAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var existingUser = await _db.Users
                .Where(u => u.Username == user.Username)
                .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                return Conflict(new { message = "This username already exists" });
            }

            string[] hashSalt = Authentification.Hasher(user.Password, null);
            user.Password = hashSalt[0];
            user.Salt = hashSalt[1];

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User inputUser)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.Firstname = inputUser.Firstname;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}

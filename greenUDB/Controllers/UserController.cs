using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using Microsoft.AspNetCore.Mvc;
using GreenUApi.Models;

namespace GreenUApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly GreenUDB _db;

    public UserController(GreenUDB db)
    {
        _db = db;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost]
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

        string[] hashSalt = Authentification.Hasher(user.Password, null);
        user.Password = hashSalt[0];
        user.Salt = hashSalt[1];

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(int id, User inputUser)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        user.Firstname = inputUser.Firstname;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}

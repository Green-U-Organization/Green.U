using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using Microsoft.AspNetCore.Mvc;
using GreenUApi.Models;

namespace GreenUApi.Controllers;

public class UserModification
{

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Salt { get; set; }

    public bool? IsAdmin { get; set; }

    public string? Firstname { get; set; } 

    public string? Lastname { get; set; } 

    public string? Email { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; } 

    public string? Gender { get; set; }

    public DateOnly Birthday { get; set; }

    public string? ProfileImage { get; set; }

    public string?   Bio { get; set; }
}

[Route("api/user")]
[ApiController]
public class UserController(GreenUDB db) : ControllerBase
{
    private readonly GreenUDB _db = db;

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(long id)
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

        return Ok("User are created !");
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(long id, UserModification modification)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(modification.Username))
        {
            user.Username = modification.Username;
        }

        if (!string.IsNullOrEmpty(modification.Password))
        {
            user.Password = modification.Password;
        }

        if (!string.IsNullOrEmpty(modification.Salt))
        {
            user.Salt = modification.Salt;
        }

        if (modification.IsAdmin.HasValue)
        {
            user.IsAdmin = modification.IsAdmin.Value;
        }

        if (!string.IsNullOrEmpty(modification.Firstname))
        {
            user.Firstname = modification.Firstname;
        }

        if (!string.IsNullOrEmpty(modification.Lastname))
        {
            user.Lastname = modification.Lastname;
        }

        if (!string.IsNullOrEmpty(modification.Email))
        {
            user.Email = modification.Email;
        }

        if (!string.IsNullOrEmpty(modification.PostalCode))
        {
            user.PostalCode = modification.PostalCode;
        }

        if (!string.IsNullOrEmpty(modification.Country))
        {
            user.Country = modification.Country;
        }

        if (!string.IsNullOrEmpty(modification.Gender))
        {
            user.Gender = modification.Gender;
        }

        if (modification.Birthday != null)
        {
            user.Birthday = modification.Birthday;
        }

        if (!string.IsNullOrEmpty(modification.ProfileImage))
        {
            user.ProfileImage = modification.ProfileImage;
        }

        if (!string.IsNullOrEmpty(modification.Bio))
        {
            user.Bio = modification.Bio;
        }

        _db.Users.Update(user);
        await _db.SaveChangesAsync();

        return Ok("User is modified");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long id)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound("Incorrect ID");
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();

        return Ok("DELETE SUCCES");
    }
}

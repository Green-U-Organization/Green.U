using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using Microsoft.AspNetCore.Mvc;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

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

    public string? Bio { get; set; }

    public long? Xp { get; set; }
}

[Route("user")]
[ApiController]
// [Authorize]
public class UserController(GreenUDB db) : ControllerBase
{
    private readonly GreenUDB _db = db;

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        var user = await _db.Users
            .Where(u => u.Id == id)
            .Select(u => new
            {
                u.Id,
                u.Username,
                u.Firstname,
                u.Lastname,
                u.Email,
                u.Country,
                u.Gender,
                u.Birthday,
                u.Bio,
                tagsinterest = _db.TagsInterests.Where(t => t.UserId == u.Id).ToArray(),
                u.Skill_level,
                u.Xp,
                u.Newsletter,
                u.Tou,
                u.Deleted,
                u.CreatedAt
               
            })
            .FirstOrDefaultAsync();

        if (user == null)
            return NotFound(new { isEmpty = true, message = "User not found" });

        return Ok(new
        {
            isEmpty = false,
            message = "This is the user data",
            content = user
        });
    }


    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        bool mailExist = await _db.Users
            .Where(u => u.Email == user.Email)
            .AnyAsync();

        if (mailExist) return Conflict(new { isEmpty = true, message = "This email is already exists" });

        bool userExist = await _db.Users
           .Where(u => u.Username == user.Username)
           .AnyAsync();

        if (userExist) return Conflict(new { isEmpty = true, message = "This username is already exists" });

        if (user.Password == null) return BadRequest(new { isEmpty = true, message = "Password is missing" });

        string[] hashSalt = Authentification.Hasher(user.Password, null);
        user.Password = hashSalt[0];
        user.Salt = hashSalt[1];

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new { isEmpty = true, message = "User created !" });
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(long id, UserModification modification)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null) return NotFound(new { isEmpty = true, message = "This user no longer exists" });

        if (user.Deleted == true) return BadRequest(new { isEmpty = true, message = "The user is deleted" });

        if (!string.IsNullOrEmpty(modification.Username)) user.Username = modification.Username;

        if (!string.IsNullOrEmpty(modification.Salt)) return BadRequest(new { isEmpty = true, message = "You can't modify SALT !! Modify password ! La bise fieux" });

        if (!string.IsNullOrEmpty(modification.Password))
        {
            string[] hashSalt = Authentification.Hasher(modification.Password, null);
            modification.Password = hashSalt[0];
            modification.Salt = hashSalt[1];
            user.Password = modification.Password;
            user.Salt = hashSalt[1];
        }

        if (modification.IsAdmin.HasValue) user.IsAdmin = modification.IsAdmin.Value;

        if (!string.IsNullOrEmpty(modification.Firstname)) user.Firstname = modification.Firstname;

        if (!string.IsNullOrEmpty(modification.Lastname)) user.Lastname = modification.Lastname;

        if (!string.IsNullOrEmpty(modification.Email)) user.Email = modification.Email;

        if (!string.IsNullOrEmpty(modification.PostalCode)) user.PostalCode = modification.PostalCode;

        if (!string.IsNullOrEmpty(modification.Country)) user.Country = modification.Country;

        if (!string.IsNullOrEmpty(modification.Gender)) user.Gender = modification.Gender;

        if (modification.Birthday != default) user.Birthday = modification.Birthday;

        if (!string.IsNullOrEmpty(modification.ProfileImage)) user.ProfileImage = modification.ProfileImage;

        if (!string.IsNullOrEmpty(modification.Bio)) user.Bio = modification.Bio;

        if (modification.Xp.HasValue) user.Xp = modification.Xp.Value;

        _db.Users.Update(user);
        await _db.SaveChangesAsync();

        return Ok(new { isEmpty = true, message = "User is modified" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long id)
    {
        var user = await _db.Users.FindAsync(id);

        if (user == null) return NotFound(new { isEmpty = true, message = "Incorrect ID" });

        if (user.Deleted == true) return BadRequest(new { isEmpty = true, message = "The user it's already deleted" });

        user.Username = null;
        user.Password = null;
        user.Salt = null;
        user.IsAdmin = null;
        user.Firstname = null;
        user.Lastname = null;
        user.Email = null;
        user.PostalCode = null;
        user.Country = null;
        user.Gender = null;
        user.Birthday = null;
        user.ProfileImage = null;
        user.Bio = null;
        user.Deleted = true;

        _db.Users.Update(user);
        await _db.SaveChangesAsync();

        return Ok(new { isEmpty = true, message = "DELETE SUCCES" });
    }
}

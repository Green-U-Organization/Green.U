using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GreenUApi.Controllers;

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

    [HttpGet]
    public async Task<IResult> GetUser(long Id, [FromServices] GreenUDB db)
    {
        return await db.Users.FindAsync(Id)
            is User User
                ? TypedResults.Ok(User)
                : TypedResults.NotFound();
    }
   
    [HttpPost]
    public async Task<IResult> CreateUser(User User, GreenUDB db)
    { 
        var UserDbData = await db.Users
           .Where(u => u.Username == User.Username)
           .Select(u => new User
           {
               Username = u.Username
           })
           .ToArrayAsync();
        if (UserDbData.Length != 0)
        {
            return TypedResults.Conflict(new { message = "This username is already exist" });
        }
        string[] hashSalt = Authentification.Hasher(User.Password, null);
        User.Password = hashSalt[0];
        User.Salt = hashSalt[1];
        db.Users.Add(User);
        await db.SaveChangesAsync();
        return TypedResults.Created($"/Useritems/{User.Id}", User);
    }

    [HttpPatch]
    public async Task<IResult> UpdateUser(int Id, User inputUser, GreenUDB db)
    {
        // Ask the team what needs to be changed
        var User = await db.Users.FindAsync(Id);

        if (User is null) return TypedResults.NotFound();

        User.Firstname = inputUser.Firstname;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    [HttpDelete]
    public async Task<IResult> DeleteUser(int id, GreenUDB db)
    {
        if (await db.Users.FindAsync(id) is User User)
        {
            db.Users.Remove(User);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }
    }
}

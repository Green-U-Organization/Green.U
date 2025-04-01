using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using GreenUApi.Models;

namespace GreenUApi.Controllers;

public class UserResult<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public string? ErrorMessage { get; set; }
}

public class UserController
{
    public static async Task<IResult> GetAllUser(greenUDB db)
    {
        return TypedResults.Ok(await db.Users.ToArrayAsync());
    }

    public static async Task<IResult> GetUser(int id, greenUDB db)
    {
        return await db.Users.FindAsync(id)
            is User User
                ? TypedResults.Ok(User)
                : TypedResults.NotFound();
    }
   
    public static async Task<IResult> CreateUser(User User, greenUDB db)
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

    public static async Task<IResult> UpdateUser(int Id, User inputUser, greenUDB db)
    {
        // Ask the team what needs to be changed
        var User = await db.Users.FindAsync(Id);

        if (User is null) return TypedResults.NotFound();

        User.Firstname = inputUser.Firstname;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteUser(int id, greenUDB db)
    {
        if (await db.Users.FindAsync(id) is User User)
        {
            db.Users.Remove(User);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using GreenUApi.model;
using GreenUApi.authentification;

namespace GreenUApi.controller;

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
        return TypedResults.Ok(await db.User.ToArrayAsync());
    }

    // public static async Task<UserResult<IResult>> GetUserForLogin(string Username, string password, greenUDB db)
    // {
    //     try
    //     {
    //     var User = await db.User
    //         .Where(u => u.Username == Username)
    //         .Select(u => new User
    //         {
    //             Id = u.Id,
    //             Username = u.Username,
    //             Password = u.Password,
    //             Salt = u.Salt
    //         })
    //         .ToArrayAsync();

    //         IResult response = await Authentification.Login(User[0], password);

    //         return new UserResult<IResult> { IsSuccess = true, Data = response};

    //     }catch (Exception ex)
    //     {
    //         return new UserResult<IResult> { IsSuccess = false, ErrorMessage = ex.Message  };
    //     }
    // }

    public static async Task<IResult> GetUser(int id, greenUDB db)
    {
        return await db.User.FindAsync(id)
            is User User
                ? TypedResults.Ok(User)
                : TypedResults.NotFound();
    }
   
    public static async Task<IResult> CreateUser(User User, greenUDB db)
    { 
        var UserDbData = await db.User
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
        db.User.Add(User);
        await db.SaveChangesAsync();
        return TypedResults.Created($"/Useritems/{User.Id}", User);
    }

    public static async Task<IResult> UpdateUser(int Id, User inputUser, greenUDB db)
    {
        // Ask the team what needs to be changed
        var User = await db.User.FindAsync(Id);

        if (User is null) return TypedResults.NotFound();

        User.Firstname = inputUser.Firstname;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteUser(int id, greenUDB db)
    {
        if (await db.User.FindAsync(id) is User User)
        {
            db.User.Remove(User);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
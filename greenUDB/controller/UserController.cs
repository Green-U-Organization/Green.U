using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;

namespace GreenUApi.controller;

public class Result<T>
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

    public static async Task<Result<User[]>> GetUserForLogin(string username, greenUDB db)
    {
        try
        {
        var user = await db.User
            .Where(u => u.Username == username)
            .Select(u => new User
            {
                Id = u.Id,
                Username = u.Username,
                Password = u.Password,
                Salt = u.Salt
            })
            .ToArrayAsync();

            return new Result<User[]> { IsSuccess = true, Data = user };

        }catch (Exception ex)
        {
            return new Result<User[]> { IsSuccess = false, ErrorMessage = ex.Message };
        }
    }

    public static async Task<IResult> GetUser(int id, greenUDB db)
    {
        return await db.User.FindAsync(id)
            is User User
                ? TypedResults.Ok(User)
                : TypedResults.NotFound();
    }
   
    public static async Task<IResult> CreateUser(User User, greenUDB db)
    {
        string[] hashSalt = Authentification.hasher(User.Password, null);
        User.Password = hashSalt[0];
        User.Salt = hashSalt[1];
        db.User.Add(User);
        await db.SaveChangesAsync();
        return TypedResults.Created($"/Useritems/{User.Id}", User);
    }

    public static async Task<IResult> UpdateUser(int id, User inputUser, greenUDB db)
    {
        var User = await db.User.FindAsync(id);

        if (User is null) return TypedResults.NotFound();

        User.Surname = inputUser.Surname;

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
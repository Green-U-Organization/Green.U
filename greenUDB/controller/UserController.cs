using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;

namespace GreenUApi.controller;
public class UserController
{
    public static async Task<IResult> GetAllUser(greenUDB db)
    {
        return TypedResults.Ok(await db.User.ToArrayAsync());
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
        db.User.Add(User);
        await db.SaveChangesAsync();
        passwordHasher.hasher(User.password);
        return TypedResults.Created($"/Useritems/{User.Id}", User);
    }

    public static async Task<IResult> UpdateUser(int id, User inputUser, greenUDB db)
    {
        var User = await db.User.FindAsync(id);

        if (User is null) return TypedResults.NotFound();

        User.surname = inputUser.surname;

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
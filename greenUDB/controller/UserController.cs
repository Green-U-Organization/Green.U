using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;

namespace GreenUApi.controller;
public class UserController
{
    public static async Task<IResult> GetAllUser(greenUDB db)
    {
        return TypedResults.Ok(await db.User.ToArrayAsync());
    }

    public static async Task<User?> GetUser(string login, greenUDB db)
    {
        return await db.User.FirstOrDefaultAsync(u => u.username == login);
    }
    public static async Task<IResult> CreateUser(User User, greenUDB db)
    {
        string[] hashSalt = Authentification.hasher(User.password, Convert.FromBase64String(User.salt));
        User.password = hashSalt[0];
        User.salt = hashSalt[1];
        db.User.Add(User);
        await db.SaveChangesAsync();
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
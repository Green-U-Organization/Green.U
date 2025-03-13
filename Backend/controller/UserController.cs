using Microsoft.EntityFrameworkCore;

namespace UserController;
public class UserController{
    public static async Task<IResult> GetAllUser(backend db)
    {
        return TypedResults.Ok(await db.User.ToArrayAsync());
    }

    public static async Task<IResult> GetUser(int id, backend db)
    {
        return await db.User.FindAsync(id)
            is User User
                ? TypedResults.Ok(User)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateUser(User User, backend db)
    {
        db.User.Add(User);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Useritems/{User.Id}", User);
    }

    public static async Task<IResult> UpdateUser(int id, User inputUser, backend db)
    {
        var User = await db.User.FindAsync(id);

        if (User is null) return TypedResults.NotFound();

        User.surname = inputUser.surname;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteUser(int id, backend db)
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
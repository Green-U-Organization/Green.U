using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using GreenUApi.model;


namespace GreenUApi.controller;
public class AccountController
{
    public static async Task<IResult> GetAllAccount(greenUDB db)
    {
        return TypedResults.Ok(await db.Account.ToArrayAsync());

    }

    public static async Task<IResult> GetAccount(int id, greenUDB db)
    {
        return await db.Account.FindAsync(id)
            is Account Account
                ? TypedResults.Ok(Account)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateAccount(Account Account, greenUDB db)
    {
        db.Account.Add(Account);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Accountitems/{Account.Id}", Account);
    }

    public static async Task<IResult> UpdateAccount(int id, Account inputAccount, greenUDB db)
    {
        var Account = await db.Account.FindAsync(id);

        if (Account is null) return TypedResults.NotFound();

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteAccount(int id, greenUDB db)
    {
        if (await db.Account.FindAsync(id) is Account Account)
        {
            db.Account.Remove(Account);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
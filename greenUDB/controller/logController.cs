using Microsoft.EntityFrameworkCore;
using GreenUApi.model;

namespace GreenUApi.controller;
public class LogController
{
    public static async Task<IResult> GetAllLog(greenUDB db)
    {
        return TypedResults.Ok(await db.Log.ToArrayAsync());
    }

    public static async Task<IResult> GetLog(int id, greenUDB db)
    {
        return await db.Log.FindAsync(id)
            is Log Log
                ? TypedResults.Ok(Log)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateLog(Log Log, greenUDB db)
    {
        db.Log.Add(Log);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Logitems/{Log.Id}", Log);
    }

    public static async Task<IResult> UpdateLog(int id, Log inputLog, greenUDB db)
    {
        var Log = await db.Log.FindAsync(id);

        if (Log is null) return TypedResults.NotFound();

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteLog(int id, greenUDB db)
    {
        if (await db.Log.FindAsync(id) is Log Log)
        {
            db.Log.Remove(Log);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
using Microsoft.EntityFrameworkCore;
using GreenUApi.model;

namespace GreenUApi.controller;
public class LineController
{
    public static async Task<IResult> GetAllLine(greenUDB db)
    {
        return TypedResults.Ok(await db.Line.ToArrayAsync());
    }

    public static async Task<IResult> GetLine(int id, greenUDB db)
    {
        return await db.Line.FindAsync(id)
            is Line Line
                ? TypedResults.Ok(Line)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateLine(Line Line, greenUDB db)
    {
        db.Line.Add(Line);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Lineitems/{Line.Id}", Line);
    }

    public static async Task<IResult> UpdateLine(int id, Line inputLine, greenUDB db)
    {
        var Line = await db.Line.FindAsync(id);

        if (Line is null) return TypedResults.NotFound();

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteLine(int id, greenUDB db)
    {
        if (await db.Line.FindAsync(id) is Line Line)
        {
            db.Line.Remove(Line);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
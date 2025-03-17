using Microsoft.EntityFrameworkCore;

namespace GreenUApi.controller;
public class GardenController
{
    public static async Task<IResult> GetAllGarden(greenUDB db)
    {
        return TypedResults.Ok(await db.Garden.ToArrayAsync());
    }

    public static async Task<IResult> GetGarden(int id, greenUDB db)
    {
        return await db.Garden.FindAsync(id)
            is Garden Garden
                ? TypedResults.Ok(Garden)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateGarden(Garden Garden, greenUDB db)
    {
        db.Garden.Add(Garden);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Gardenitems/{Garden.Id}", Garden);
    }

    public static async Task<IResult> UpdateGarden(int id, Garden inputGarden, greenUDB db)
    {
        var Garden = await db.Garden.FindAsync(id);

        if (Garden is null) return TypedResults.NotFound();

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteGarden(int id, greenUDB db)
    {
        if (await db.Garden.FindAsync(id) is Garden Garden)
        {
            db.Garden.Remove(Garden);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
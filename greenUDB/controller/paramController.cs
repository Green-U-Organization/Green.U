using Microsoft.EntityFrameworkCore;

namespace GreenUApi.controller;

public class ParamController{
    
    public static async Task<IResult> GetAllParam(greenUDB db)
    {
        return TypedResults.Ok(await db.User.ToArrayAsync());
    }

}
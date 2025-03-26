using Microsoft.EntityFrameworkCore;
using GreenUApi.model;

namespace GreenUApi.controller;

public class TodoController
{
    public static async Task<IResult> GetTodo(greenUDB db)
    {
        return TypedResults.Ok(await db.Todo.ToArrayAsync());
    }

}
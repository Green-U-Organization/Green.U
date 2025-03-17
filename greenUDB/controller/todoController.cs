using Microsoft.EntityFrameworkCore;

namespace GreenUApi.controller;
public class TodoController
{
    public static async Task<IResult> GetAllTodo(greenUDB db)
    {
        return TypedResults.Ok(await db.Todo.ToArrayAsync());
    }

    public static async Task<IResult> GetTodo(int id, greenUDB db)
    {
        return await db.Todo.FindAsync(id)
            is Todo Todo
                ? TypedResults.Ok(Todo)
                : TypedResults.NotFound();
    }

    public static async Task<IResult> CreateTodo(Todo Todo, greenUDB db)
    {
        db.Todo.Add(Todo);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/Todoitems/{Todo.id}", Todo);
    }

    public static async Task<IResult> UpdateTodo(int id, Todo inputTodo, greenUDB db)
    {
        var Todo = await db.Todo.FindAsync(id);

        if (Todo is null) return TypedResults.NotFound();

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    public static async Task<IResult> DeleteTodo(int id, greenUDB db)
    {
        if (await db.Todo.FindAsync(id) is Todo Todo)
        {
            db.Todo.Remove(Todo);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}
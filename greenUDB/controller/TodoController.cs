using Microsoft.EntityFrameworkCore;
using GreenUApi.model;

namespace GreenUApi.controller;

public class TodoResult<T>
{
    public bool IsSuccess { get; set; }
    public T[] Data { get; set; } = [];
    public string ErrorMessage { get; set; } = string.Empty;
}

public class TodoController
{
    public static async Task<TodoResult<Todo>> GetGardenTodo(int GardenId, greenUDB db)
    {
        try
        {
            var response = await db.Todo
                .Where(t => t.Garden_id == GardenId)
                .ToArrayAsync();
            
            return new TodoResult<Todo> { IsSuccess = true, Data = response};
        }
        catch (Exception ex)
        {
            return new TodoResult<Todo> { IsSuccess = false, ErrorMessage = ex.Message };
        }
    }

}
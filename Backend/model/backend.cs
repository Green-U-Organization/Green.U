using Microsoft.EntityFrameworkCore;

public class backend : DbContext
{
    public DbSet<User> User {get; set;}
    public backend(DbContextOptions options): base(options) 
    { 
            
    }
}
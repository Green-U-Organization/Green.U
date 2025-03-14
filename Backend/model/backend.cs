using Microsoft.EntityFrameworkCore;

public class backend : DbContext
{
    public DbSet<User> User {get; set;}

    public DbSet<Garden> Garden {get; set;}
    
    public DbSet<Log> Log {get; set;}

    public DbSet<Session> Sessions {get; set;}
    
    public DbSet<User> Account {get; set;}

    // public DbSet<User> Vérification {get; set;}

    // public DbSet<User> Domain {get; set;}

    // public DbSet<User> Param {get; set;}

    // public DbSet<User> Parcel {get; set;}

    // public DbSet<User> Vegetable {get; set;}
    
    // public DbSet<User> Todo {get; set;}

    public DbSet<User> Line {get; set;}



    public backend(DbContextOptions options): base(options) 
    { 
            
    }
}
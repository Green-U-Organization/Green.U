using Microsoft.EntityFrameworkCore;
using GreenUApi.model;

public class greenUDB : DbContext
{
    public DbSet<User> User {get; set;}

    public DbSet<Garden> Garden {get; set;}
    
    public DbSet<Log> Log {get; set;}

    public DbSet<Session> Sessions {get; set;}
    
    public DbSet<Account> Account {get; set;}

    public DbSet<Verification> Vérification {get; set;}

    public DbSet<Domain> Domain {get; set;}

    public DbSet<Param> Param {get; set;}

    public DbSet<Parcel> Parcel {get; set;}

    public DbSet<Vegetable> Vegetable {get; set;}
    
    public DbSet<Todo> Todo {get; set;}

    public DbSet<Line> Line {get; set;}



    public greenUDB(DbContextOptions options): base(options) 
    { 

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Log>()
            .HasOne(l => l.User)
            .WithMany(u => u.Logs)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Param>()
            .Property(p => p.NotActive)
            .HasColumnType("smallint");     
        modelBuilder.Entity<Log>()
            .HasOne(l => l.User)
            .WithMany(u => u.Logs)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
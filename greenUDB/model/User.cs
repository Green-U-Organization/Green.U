using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.model;

[Table("Users")]
public class User
{
    public int Id { get; set; }
    
    public string Username { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public string? Salt { get; set; }
    
    public int Is_admin { get; set; }
    
    public string Firstname { get; set; } = null!;
    
    public string Lastname { get; set; } = null!;
    
    public string? Email { get; set; }
    
    public string? Postal_code { get; set; }

    public string Country { get; set; } = null!;
    
    public string Sexe { get; set; } = string.Empty;
    
    public DateOnly Birthdate { get; set; }
    
    public int Level { get; set; }
    
    public int Xp { get; set; }
    
    public DateTime Created_at { get; set; }

    public User()
    {
        Created_at = DateTime.Now;
    }
    

    //Clés étrangères.
    public List<Log> Logs { get; set; } = new();

    public List<Garden> Gardens { get; set; } = new();

    public List<Session> Session { get; set; } = new();

    public List<Account> Account { get; set; } = new();
    
    public List<Verification> Verification { get; set; } = new();
}
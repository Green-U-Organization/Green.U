using System.ComponentModel.DataAnnotations.Schema;

[Table("Users")]
public class User
{
    public int Id { get; set; }
    
    public string username { get; set; } = null!;
    
    public string password { get; set; } = null!;

    public string salt { get; set; } = null!;
    
    public int is_admin { get; set; }
    
    public string surname { get; set; } = null!;
    
    public string lastname { get; set; } = null!;
    
    public string? email { get; set; }
    
    public string? postal_code { get; set; }
    
    public string sexe { get; set; } = string.Empty;
    
    public DateTime? birthdate { get; set; }
    
    public int level { get; set; }
    
    public int xp { get; set; }
    
    public DateTime created_at { get; set; }
    

    //Clés étrangères.
    public List<Log> Logs { get; set; } = new();

    public List<Garden> Gardens { get; set; } = new();

    public List<Session> Session { get; set; } = new();

    public List<Account> Account { get; set; } = new();
    
    public List<Verification> Verification { get; set; } = new();
}
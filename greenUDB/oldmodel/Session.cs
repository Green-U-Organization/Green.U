using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

public class Session{
    public int Id { get; set; }
    
    public string? Token{ get; set; }
    
    public string? eventType { get; set; }
    
    public string? ip_adress { get; set; }

    public string? user_agent {get; set;}

    public string? impersonateBy {get; set;}

    public DateTime create_at { get; set; }
    
    public DateTime expire_at { get; set; }
    
    public DateTime update_at { get; set; }
    
    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; } = null!;
}
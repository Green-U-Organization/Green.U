using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;
public class Account{
    public int Id { get; set; }
    
    public int providerId{ get; set; }
    
    public int accountId { get; set; }
    
    public string? accesToken { get; set; }

    public string? refreshToken {get; set;}

    public string? scope {get; set;}

    public string? password {get; set;}

    public string? impersonateBy {get; set;}
    
    public DateTime accesToken_expire_at { get; set; }
    
    public DateTime refreshToken_expire_at { get; set; }

    public DateTime create_at { get; set; }
    
    public DateTime update_at { get; set; }
    
    
    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; } = null!;
}
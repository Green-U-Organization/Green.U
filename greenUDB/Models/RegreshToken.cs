namespace GreenUApi.Models;
public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; } = "";
    public DateTime Expires { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime? Revoked { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }

    public bool IsExpired => DateTime.UtcNow >= Expires;
    public bool IsActive => Revoked == null && !IsExpired;
}

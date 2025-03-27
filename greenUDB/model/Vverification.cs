using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;
public class Verification{
    public int Id { get; set; }

    public int value { get; set; }
    
    public DateTime create_at { get; set; }
    
    public DateTime expire_at { get; set; }
    
    public DateTime update_at { get; set; }
    
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
}
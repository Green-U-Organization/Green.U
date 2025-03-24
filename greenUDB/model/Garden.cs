using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

public class Garden
{
    public int Id { get; set; }
    
    public string? name{ get; set; }
    
    public float latitude { get; set; }
    
    public float longitude { get; set; }

    public float length {set; get;}

    public float width{get; set;}
    
    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; } = null!;

    public DateTime update_at { get; set; }

    public List<Parcel> parcels { get; set; } = new();

    public List<Todo> todos{ get; set; } = new();
}
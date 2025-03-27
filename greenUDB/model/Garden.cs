using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

namespace GreenUApi.model;

public class Garden
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = string.Empty;
    
    public float Latitude { get; set; } required
    
    public float Longitude { get; set; } required

    public float Length {set; get;} 

    public float Width {get; set;} 

    public string Tags { get; set; } = string.Empty;

    public DateTime Update_at { get; set; }

    public DateTime Created_at { get; set; }

    public Garden()
    {
        Created_at = DateTime.Now;
    }

    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; } = null!;

}
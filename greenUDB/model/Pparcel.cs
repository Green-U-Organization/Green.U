using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

public class Parcel{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public float width { get; set; }

    public float height { get; set; }
    
    public int nbLignes { get; set; }

    public DateTime create_at { get; set; }

    public int garden_id { get; set; }

    [ForeignKey("Garden")] public Garden garden{ get; set; } = null!;

    public List<Line> lines { get; set; } = new();

    public List<Todo> todos { get; set; } = new();
}
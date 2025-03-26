
using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

public class Line{
    public int id { get; set; }

    public float width { get; set; }

    public short status { get; set; }

    public DateTime update_at { get; set; }

    public int parcelId { get; set; }
    [ForeignKey("parcelId")] public Parcel parcel { get; set; } = new();

    public int vegetableId { get; set; }
    [ForeignKey("vegetableId")] public Vegetable vegetable{ get; set; } = new();

    public List<Todo> todos { get; set; } = new();

}
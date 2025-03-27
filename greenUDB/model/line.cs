
using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

namespace GreenUApi.model;

public class Line{
    public int Id { get; set; }

    public float Length { get; set; }

    public short Status { get; set; }

    public DateTime Update_at { get; set; }

    public DateTime Created_at { get; set; }

    public Line()
    {
        Created_at = DateTime.Now;
    }

    public int ParcelId { get; set; }
    [ForeignKey("ParcelId")] public Parcel Parcel { get; set; } = new();

    public int VegetableId { get; set; }
    [ForeignKey("VegetableId")] public Vegetable Vegetable{ get; set; } = new();

}
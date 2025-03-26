using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace GreenUApi.model;

public class Todo{

    public int Id { get; set; }

    public string Author { get; set; } = null!;

    public string Description { get; set; } = null!;

    public byte Status { get; set; } = 3;

    public byte PreviousStatus { get; set; }

    public DateTime Update_at { get; set; }

    public DateTime Created_at { get; set; }

    public Todo()
    {
        Created_at = DateTime.Now;
    }

    public int Garden_id { get; set; }
    [ForeignKey("Garden_id")] public Garden Garden{ get; set; } = null!;

    public int Parcel_id { get; set; }
    [ForeignKey("Parcel_id")] public Parcel Parcel{ get; set; } = null!;

    public int Line_id { get; set; }
    [ForeignKey("Line_id")] public Line Line{ get; set; } = null!;
}

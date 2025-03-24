using System.ComponentModel.DataAnnotations.Schema;

public class Todo{
    public int id { get; set; }
    public short done { get; set; }
    public DateTime update_at { get; set; }

    public int garden_id { get; set; }
    [ForeignKey("garden_id")] public Garden garden{ get; set; } = null!;

    public int parcel_id { get; set; }
    [ForeignKey("parcel_id")] public Parcel parcel{ get; set; } = null!;

    public int line_id { get; set; }
    [ForeignKey("lien_id")] public Line line{ get; set; } = null!;
}
using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public partial class Parcel
{
    public long Id { get; set; }

    public long? GardenId { get; set; }

    public Double? Length { get; set; }

    public long? Width { get; set; }

    public long? NLine { get; set; }

    public Double? parcel_angle { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Garden? Garden { get; set; }

    public virtual ICollection<Line> Lines { get; set; } = new List<Line>();

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();
}

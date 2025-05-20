using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class Parcel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long GardenId { get; set; }

    public double? Length { get; set; }

    public double? Width { get; set; }

    public short? NLine { get; set; }

    public double? ParcelAngle { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual Garden? Garden { get; set; }

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual ICollection<Line> Lines { get; set; } = new List<Line>();
}

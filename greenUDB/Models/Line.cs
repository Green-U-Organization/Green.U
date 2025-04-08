using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class Line
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long? ParcelId { get; set; }

    public double? Length { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Crop> Crops { get; set; } = new List<Crop>();

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual Parcel? Parcel { get; set; }
}

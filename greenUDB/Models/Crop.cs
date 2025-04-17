using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class Crop
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long? LineId { get; set; }

    public long? PlantNurseryId { get; set; }

    public string Vegetable { get; set; } = null!;

    public string? Variety { get; set; }

    public long? Icon { get; set; }

    public DateOnly? Sowing { get; set; }

    public DateOnly? Planting { get; set; }

    public DateOnly? Harvesting { get; set; }
    public double? Distance_plantation { get; set; }
    public string? Comments { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual Line? Line { get; set; }

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual PlantNursery? PlantNursery { get; set; }
}

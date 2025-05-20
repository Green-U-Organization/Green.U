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

    public long? GardenId { get; set; }

    public long? ParcelId { get; set; }

    public long? LineId { get; set; }

    public long? PlantNurseryId { get; set; }

    public string Vegetable { get; set; } = null!;

    public string? Variety { get; set; }
    
    public string? Description { get; set; }

    public short? NPot { get; set; }

    public float? PotSize { get; set; }

    public string? Icon { get; set; }

    public DateOnly? Sowing { get; set; }

    public DateOnly? Planting { get; set; }

    public DateOnly? Harvesting { get; set; }
    public int? Distance_plantation { get; set; }
    public string? Comments { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual Line? Line { get; set; }

    public virtual PlantNursery? PlantNursery { get; set; }
}

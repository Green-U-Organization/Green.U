using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;


public partial class Log
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long? AuthorId { get; set; }

    public string? Username { get; set; }

    public long? GardenId { get; set; }

    public long? ParcelId { get; set; }

    public long? LineId { get; set; }

    public long? CropId { get; set; }

    public long? PlantNurseryId { get; set; }

    public string? Action { get; set; }

    public string? Comment { get; set; }

    public string Type { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class PlantNursery
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }
    public long? GardenId { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public DateTime Created_at { get; set; } = DateTime.Now;
    public virtual ICollection<Line> Lines { get; set; } = new List<Line>();
    public virtual Garden? Garden { get; set; }
    public virtual ICollection<Crop> Crops { get; set; } = new List<Crop>();
}

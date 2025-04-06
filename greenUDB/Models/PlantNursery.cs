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
    public long? gardenId { get; set; }
    public virtual ICollection<Line> Lines { get; set; } = new List<Line>();
    public virtual ICollection<Crop> Crops { get; set; } = new List<Crop>();
}

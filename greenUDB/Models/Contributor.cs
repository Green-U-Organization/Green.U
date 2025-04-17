using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class Contributor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long UserId { get; set; }

    public long GardenId { get; set; }

    public bool Admin { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual Garden Garden { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}

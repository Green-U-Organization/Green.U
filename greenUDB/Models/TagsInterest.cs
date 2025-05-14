using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class TagsInterest
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }
    
    public long? UserId { get; set; }

    public long? GardenId { get; set; }

    public string Hashtag { get; set; } = null!;
    public DateTime Created_at { get; set; } = DateTime.Now;

    public virtual Garden? Garden { get; set; }

    public virtual User? User { get; set; }
}

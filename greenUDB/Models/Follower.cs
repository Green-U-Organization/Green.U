using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class Follower
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long FollowerId { get; set; }

    public long? UserId { get; set; }

    public long? GardenId { get; set; }

    public virtual Garden? Garden { get; set; }

    public virtual User? User { get; set; }
}

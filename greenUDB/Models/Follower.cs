using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public partial class Follower
{
    public long Id { get; set; }

    public long FollowerId { get; set; }

    public long? UserId { get; set; }

    public long? GardenId { get; set; }

    public virtual User FollowerNavigation { get; set; } = null!;

    public virtual Garden? Garden { get; set; }

    public virtual User? User { get; set; }
}

using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public partial class Contributor
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long GardenId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Garden Garden { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public partial class TagsInterest
{
    public long Id { get; set; }

    public long? UserId { get; set; }

    public long? GardenId { get; set; }

    public string Hashtag { get; set; } = null!;

    public virtual Garden? Garden { get; set; }

    public virtual User? User { get; set; }
}

using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public enum GardenPrivacy{
    Public,
    Private
}

public enum GardenType{
    Personnal,
    Professionnal
}

public partial class Garden
{
    public long Id { get; set; }

    public long AuthorId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public long Latitude { get; set; }

    public long Longitude { get; set; }

    public long Length { get; set; }

    public long Width { get; set; }

    public DateTime CreatedAt { get; set; }

    public GardenPrivacy Privacy { get; set; } = GardenPrivacy.Public;

<<<<<<< HEAD
=======
    public GardenPrivacy Privacy { get; set; } = GardenPrivacy.Public;

>>>>>>> backend-dev
    public GardenType Type { get; set; } = GardenType.Personnal;

    public virtual ICollection<Contributor> Contributors { get; set; } = new List<Contributor>();

    public virtual ICollection<Follower> Followers { get; set; } = new List<Follower>();

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();

    public virtual ICollection<TagsInterest> TagsInterests { get; set; } = new List<TagsInterest>();
}

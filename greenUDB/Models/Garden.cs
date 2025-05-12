using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public enum GardenPrivacy{
    Private,
    SemiPrivate,
    Public
}

public enum GardenType{
    Personnal,
    Professionnal
}

public partial class Garden
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public long AuthorId { get; set; }

    public string Name { get; set; } = null!;

    public bool Deleted { get; set; } = false;

    public string Description { get; set; } = null!;

    public string? GardenColor { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public double Length { get; set; }

    public double Width { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public GardenPrivacy Privacy { get; set; } = GardenPrivacy.Public;

    public GardenType Type { get; set; } = GardenType.Personnal;

    public virtual ICollection<Contributor> Contributors { get; set; } = new List<Contributor>();

    public virtual ICollection<Follower> Followers { get; set; } = new List<Follower>();

    public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();

    public virtual ICollection<Line> Lines { get; set; } = new List<Line>();

    public virtual ICollection<PlantNursery> PlantNurseries { get; set; }

    public virtual ICollection<TagsInterest> TagsInterests { get; set; } = new List<TagsInterest>();
}

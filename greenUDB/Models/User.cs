using System;
using System.Collections.Generic;

namespace GreenUApi.Models;

public partial class User
{
    public long Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string Sexe { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public string ProfileImage { get; set; } = null!;

    public string Bio { get; set; } = null!;

    public long Level { get; set; }

    public long Xp { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Contributor> Contributors { get; set; } = new List<Contributor>();

    public virtual ICollection<Follower> FollowerFollowerNavigations { get; set; } = new List<Follower>();

    public virtual ICollection<Follower> FollowerUsers { get; set; } = new List<Follower>();

    public virtual ICollection<Garden> Gardens { get; set; } = new List<Garden>();

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual ICollection<TagsInterest> TagsInterests { get; set; } = new List<TagsInterest>();
}

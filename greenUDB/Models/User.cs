using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;

public partial class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Salt { get; set; } 

    public bool? IsAdmin { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Email { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public string? Gender { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? ProfileImage { get; set; }

    public string? Bio { get; set; }

    public long Level { get; set; } = 0!;

    public long Xp { get; set; } = 0!;

    public bool Newsletter { get; set; } = false;

    public bool Tou { get; set; } = false;

    public bool Deleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public virtual ICollection<Contributor> Contributors { get; set; } = new List<Contributor>();

    public virtual ICollection<Follower> FollowerFollowerNavigations { get; set; } = new List<Follower>();

    public virtual ICollection<Follower> FollowerUsers { get; set; } = new List<Follower>();

    public virtual ICollection<Garden> Gardens { get; set; } = new List<Garden>();

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();

    public virtual ICollection<TagsInterest> TagsInterests { get; set; } = new List<TagsInterest>();
}

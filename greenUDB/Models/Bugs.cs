using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models;


public partial class Bugs
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public long Id { get; set; }

  public long AuthorId { get; set; }

  [Required]
  public string Message { get; set; } = string.Empty;

  [Required]
  public string Category { get; set; } = string.Empty;



}
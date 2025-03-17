using System.ComponentModel.DataAnnotations.Schema;

public class Param
{
    public int Id { get; set; }

    public bool NotActive { get; set; } = false;

    public string Name { get; set; } = null!;

    public int domain_id { get; set; }

    [ForeignKey("domain_id")] public Domain Domain { get; set; } = null!;
}


using System.ComponentModel.DataAnnotations.Schema;

public class Param{
    public int Id {get; set;}
    public string name {get; set;}

    public int domainId {get; set;}

    [ForeignKey("domainId")] public Domain domain{get; set;} = null!;
}
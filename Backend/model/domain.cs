using System.ComponentModel.DataAnnotations.Schema;

public class Domain
{
    public int Id { get; set; }
    
    public string? name{ get; set; }
    
    public string? description {get; set;}
    
    public List<Param> param { get; set;} = new();

}
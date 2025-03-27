
using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;
public class Vegetable{
    public int id { get; set; }

    public string vegetable { get; set; } = null!;

    public string variety { get; set;} = null!;

    public DateTime start_of_sowing { get; set; }

    public DateTime end_of_sowing { get;}

    public DateTime start_of_plenting { get; set; }

    public DateTime end_of_plenting { get; set; }

    public short cultivationUnderShader { get; set; }

    public short directSeeding { get; set; }

    public string comments { get; set; } = null!;

    public char familyId { get; set; }

    public List<Line> lines { get; set; } = new();

}
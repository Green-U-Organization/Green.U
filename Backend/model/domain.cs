public class Domain
{
    public int Id { get; set; }

    public string name { get; set; } = null!;

    public string? description { get; set; }

    public List<Param> Params { get; set; } = new();
}

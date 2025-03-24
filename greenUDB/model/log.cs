using System.ComponentModel.DataAnnotations.Schema;
using GreenUApi.model;

public class Log
{
    public int Id { get; set; }
    public string? Description{ get; set; }
    public string? eventType { get; set; }
    public string? ip_adress { get; set; }
    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; } = null!;

}
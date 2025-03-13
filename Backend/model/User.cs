public class User
{
    public int Id { get; set; }
    public string? login { get; set; }
    public string? password { get; set; }
    public int is_admin { get; set; }
    public string? surname { get; set; }
    public string? lastname { get; set; }
    public string? email { get; set; }
    public string? postal_code { get; set; }
    public char sexe { get; set; }
    public DateTime? birthdate { get; set; }
    public int level { get; set; }
    public int xp { get; set; }
    public DateTime created_at { get; set; }
}
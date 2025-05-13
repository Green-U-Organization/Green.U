using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreenUApi.Models
{
    public partial class BugReport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }

        public long AuthorId { get; set; }

        public string? Title { get; set; }

        public string? Comment { get; set; }

        public string? Where { get; set; }

        public string Type { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

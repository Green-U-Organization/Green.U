using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GreenUApi.Models
{
    public partial class Harvest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public long? Id { get; set; }

        public long? GardenId { get; set; }

        public long? CropId { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}

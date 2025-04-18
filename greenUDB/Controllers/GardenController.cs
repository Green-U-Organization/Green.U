using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GreenUApi.Controllers
{
    [Route("garden")]
    [ApiController]
    // [Authorize]
    public class GardenController : ControllerBase
    {

        public class GardenModification{

            public string? Name { get; set; } = null!;

            public string? Description { get; set; } = null!;

            public double? Latitude { get; set; }

            public double? Longitude { get; set; }

            public double? Length { get; set; }

            public double? Width { get; set; }

            public GardenPrivacy? Privacy { get; set; } = GardenPrivacy.Public;

            public GardenType? Type { get; set; } = GardenType.Personnal;

        }
        private readonly GreenUDB _db   ;

        public GardenController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Garden>> GetGarden(long id)
        {
            var garden = await _db.Gardens.FindAsync(id);

            if (garden == null)
            {
                return NotFound(new { isEmpty = true, message = "The id is incorrect" });
            }

            return Ok(new { isEmpty = false, message = "The garden", content = garden });
        }

        [HttpGet]
        public async Task<ActionResult<GardenDto>> GetAllGardens()
        {
            var gardens = await _db.Gardens
                .ToListAsync();

            return Ok(new { isEmpty = false, message = "All garden", content = gardens });
        }

       [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<GardenDto>>> GetGardensByUser(long id)
        {
            var gardens = await _db.Gardens
                                        .Where(g => g.AuthorId == id)
                                        .ToListAsync();

            if (gardens == null || gardens.Count == 0)
            {
                return NotFound(new { isEmpty = true, message = "This user didn't have garden or user doesn't exist" });
            }

            return Ok(new { isEmpty = false, message = "All garden by user ID", content = gardens});
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchGarden(long id, GardenModification modification)
        {
            var garden = await _db.Gardens
                .FindAsync(id);

            if (garden == null)
            {
                return NotFound(new { isEmpty = true, message = "The garden id is incorrect" });
            }

            if (garden.Deleted)
            {
                return BadRequest(new { isEmpty = true, message = "This garden is deleted" });
            }

            if (!string.IsNullOrEmpty(modification.Name))
            {
                garden.Name = modification.Name;
            }

            if (!string.IsNullOrEmpty(modification.Description))
            {
                garden.Description = modification.Description;
            }

            if (modification.Latitude.HasValue)
            {
                garden.Latitude = modification.Latitude.Value;
            }

            if (modification.Longitude.HasValue)
            {
                garden.Longitude = modification.Longitude.Value;
            }

            if (modification.Length.HasValue)
            {
                garden.Length = modification.Length.Value;
            }

            if (modification.Width.HasValue)
            {
                garden.Width = modification.Width.Value;
            }

            if (modification.Privacy.HasValue)
            {
                garden.Privacy = modification.Privacy.Value;
            }

            if (modification.Type.HasValue)
            {
                garden.Type = modification.Type.Value;
            }

            _db.Update(garden);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "The garden is modified !", content = garden}); 
        }

        [HttpPost]
        public async Task<ActionResult<Garden>> PostGarden([FromBody] Garden garden)
        {
            if (garden == null)
            {
                return BadRequest(new { isEmpty = true, message = "No body..." });
            }

            var ExsistingGarden = await _db.Gardens
                .Where(g => g.Name == garden.Name)
                .FirstOrDefaultAsync();

            if (garden.AuthorId == 0)
            {
                return BadRequest(new { isEmpty = true, message = "Need Author ID !" });
            }

            if (ExsistingGarden != null)
            {
                return Conflict(new { isEmpty = true, message = "This garden name is taken..." });
            }

            if (string.IsNullOrWhiteSpace(garden.Name))
            {
                return BadRequest(new { isEmpty = true, message = "Need garden Name" });
            }

            if (string.IsNullOrWhiteSpace(garden.Description))
            {
                return BadRequest(new { isEmpty = true, message = "Description garden is required" });
            }

            if (garden.Latitude < -90 || garden.Latitude > 90)
            {
                return BadRequest(new { isEmpty = true, message = "The latitude need a double in this range -90 or 90" });
            }

            if (garden.Longitude < -180 || garden.Longitude > 180)
            {
                return BadRequest(new { isEmpty = true, message = "The longitude need a double in this range -180 or 180" });
            }

            if (garden.Length <= 0)
            {
                return BadRequest(new { isEmpty = true, message = "The garden length need to be above 0" });
            }

            if (garden.Width <= 0)
            {
                return BadRequest(new { isEmpty = true, message = "The garden width need to be above 0" });
            }

            _db.Gardens.Add(garden);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your garden are created !", content = garden});

        }

            [HttpPatch("delete/{id}")]
        public async Task<IActionResult> DeleteGarden(long id)
        {
            try
            {
                var garden = await _db.Gardens.FindAsync(id);
                if (garden == null)
                {
                    return NotFound();
                }

                garden.Deleted = true;
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return NoContent();
        }
    }

    public class GardenDto
    {
    }
}

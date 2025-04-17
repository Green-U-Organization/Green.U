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

        public class GardenDto{
            public long? Id { get; set; }
            public long AuthorId { get; set; }

            public string Name { get; set; } = null!;

            public string Description { get; set; } = null!;

            public double Latitude { get; set; }

            public double Longitude { get; set; }

            public double Length { get; set; }

            public double Width { get; set; }

            public GardenPrivacy Privacy { get; set; } = GardenPrivacy.Public;

            public GardenType Type { get; set; } = GardenType.Personnal;

        }
        private readonly GreenUDB _context;

        public GardenController(GreenUDB context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Garden>> GetGarden(long id)
        {
            var garden = await _context.Gardens.FindAsync(id);

            if (garden == null)
            {
                return NotFound();
            }

            return garden;
        }

        [HttpGet]
        public async Task<ActionResult<GardenDto>> GetAllGardens()
        {
            var gardens = await _context.Gardens.Select(g => new{
                g.Id,
                g.AuthorId,
                g.Name,
                g.Description,
                g.Latitude,
                g.Longitude,
                g.Length,
                g.Width,
                g.Privacy,
                g.Type
            }).ToListAsync();

            return Ok(gardens);
        }

        [HttpGet("username/{author}")]
        public async Task<ActionResult<IEnumerable<Garden>>> GetGardensByName(string author)
        {
            var user = await _context.Users.Where(u => u.Username == author).ToListAsync();

            if(user == null){
                return NotFound();
            }

            var gardens = await _context.Gardens
                                        .Where(g => g.AuthorId == user[0].Id)
                                        .ToListAsync();

            if (gardens == null)
            {
                return NotFound();
            }

            return gardens;
        }

       [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<GardenDto>>> GetGardensByUser(long userId)
        {
            var gardens = await _context.Gardens
                                        .Where(g => g.AuthorId == userId)
                                        .Select(g => new GardenDto
                                        {
                                            Id = g.Id,
                                            AuthorId = g.AuthorId,
                                            Name = g.Name,
                                            Description = g.Description,
                                            Latitude = g.Latitude,
                                            Longitude = g.Longitude,
                                            Length = g.Length,
                                            Width = g.Width,
                                            Privacy = g.Privacy,
                                            Type = g.Type
                                        })
                                        .ToListAsync();

            if (gardens == null || gardens.Count == 0)
            {
                return NotFound();
            }

            return Ok(gardens);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchGarden(long id, Garden garden)
        {
            garden.Id = id;
            _context.Entry(garden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GardenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Garden>> PostGarden([FromBody] GardenDto garden)
        {

            var newGarden = new Garden {
                AuthorId = garden.AuthorId,
                Name = garden.Name,
                Description = garden.Description,
                Latitude = garden.Latitude,
                Longitude = garden.Longitude,
                Length = garden.Length,
                Width = garden.Width,
                Privacy = garden.Privacy,
                Type = garden.Type
            };

            if (newGarden == null)
            {
                return BadRequest("Invalid garden data.");
            }

            var userExists = await _context.Users.AnyAsync(u => u.Id == garden.AuthorId);
            if (!userExists)
            {
                return BadRequest("The specified authorId does not exist.");
            }

            _context.Gardens.Add(newGarden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGarden), new { id = newGarden.Id }, newGarden);
        }

        [HttpPatch("delete/{id}")]
        public async Task<IActionResult> DeleteGarden(long id)
        {
            try
            {
                var garden = await _context.Gardens.FindAsync(id);
                if (garden == null)
                {
                    return NotFound();
                }

                garden.Deleted = true;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return NoContent();
        }

        private bool GardenExists(long id)
        {
            return _context.Gardens.Any(e => e.Id == id);
        }
    }

    public class GardenDto
    {
    }
}

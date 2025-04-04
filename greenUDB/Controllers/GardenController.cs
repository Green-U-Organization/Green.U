using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{
    [Route("garden")]
    [ApiController]
    public class GardenController : ControllerBase
    {
        private readonly GreenUDB _context;

        public GardenController(GreenUDB context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        /// <summary>
        /// Permet de récupérer un garden.
        ///</summary>
        public async Task<ActionResult<Garden>> GetGarden(long id)
        {
            var garden = await _context.Gardens.FindAsync(id);

            if (garden == null)
            {
                return NotFound();
            }

            return garden;
        }

        // GET: api/Garden/user
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Garden>>> GetGardensByUser(long userId)
        {
            var gardens = await _context.Gardens
                                        .Where(g => g.AuthorId == userId)
                                        .ToListAsync();

            if (gardens == null)
            {
                return NotFound();
            }

            return gardens;
        }

        // PUT: api/Garden/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutGarden(long id, Garden garden)
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

        /// <summary>
        /// Structure acceptée par la route :
        /// {
        ///   "name": "string",
        ///   "email": "string",
        ///   "password": "string"
        /// }
        /// </summary>
        /// <param name="garden"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Garden>> PostGarden([FromBody] Garden garden)
        {
            if (garden == null)
            {
                return BadRequest("Invalid garden data.");
            }

            garden.CreatedAt = DateTime.UtcNow;

            _context.Gardens.Add(garden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGarden), new { id = garden.Id }, garden);
        }


        // DELETE: api/Garden/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarden(long id)
        {
            var garden = await _context.Gardens.FindAsync(id);
            if (garden == null)
            {
                return NotFound();
            }

            _context.Gardens.Remove(garden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GardenExists(long id)
        {
            return _context.Gardens.Any(e => e.Id == id);
        }
    }
}

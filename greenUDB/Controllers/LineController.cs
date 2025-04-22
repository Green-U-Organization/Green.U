using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GreenUApi.Controllers
{

    public class LineDto
    {
        public long? Id { get; set; }
        public long? ParcelId { get; set; }
        public long? PlantNurseryId { get; set; }
        public double? Length { get; set; }
    }

    [Route("/garden/parcel/line")]
    [ApiController]
    // [Authorize]
    public class LineController : ControllerBase
    {
        private readonly GreenUDB _db;

        public LineController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<LineDto>>> GetLine(long id)
        {
            var lines = await _db.Lines
                .Where(l => l.ParcelId == id)
                .Select(l => new LineDto
                {
                    Id = l.Id,
                    ParcelId = l.ParcelId,
                    PlantNurseryId = l.PLantNurseryId,
                    Length = l.Length
                })
                .ToListAsync();

            if (lines == null || !lines.Any())
            {
                return NotFound();
            }

            return lines;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchLine(long id, Line line)
        {
            if (id != line.Id)
            {
                return BadRequest();
            }

            _db.Entry(line).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
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
        public async Task<ActionResult<Line>> PostLine(LineDto line)
        {
            var newLine = new Line{
                Id = line.Id,
                ParcelId = line.ParcelId,
                PLantNurseryId = line.PlantNurseryId,
                Length = line.Length
            };
            

            _db.Lines.Add(newLine);
            await _db.SaveChangesAsync();

            // Retourner la réponse avec l'URL de la ressource créée
            return Ok(newLine);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(long id)
        {
            var line = await _db.Lines.FindAsync(id);

            if (line == null)
            {
                return BadRequest(new { isEmpty = true, message = "The id of line is incorrect" });
            }

            var crop = await _db.Crops
                .Where(c => c.LineId == id)
                .FirstOrDefaultAsync();

            if (crop != null)
            {
                crop.LineId = null;
            }

            _db.Lines.Remove(line);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This line is deleted", content = line });
        }
        
        private bool LineExists(long id)
        {
            return _db.Lines.Any(e => e.Id == id);
        }
    }
}

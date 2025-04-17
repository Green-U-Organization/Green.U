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
        private readonly GreenUDB _context;

        public LineController(GreenUDB context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<LineDto>>> GetLine(long id)
        {
            var lines = await _context.Lines
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

            _context.Entry(line).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            

            _context.Lines.Add(newLine);
            await _context.SaveChangesAsync();

            // Retourner la réponse avec l'URL de la ressource créée
            return Ok(newLine);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(long id)
        {
            var line = await _context.Lines.FindAsync(id);
            if (line == null)
            {
                return NotFound();
            }

            _context.Lines.Remove(line);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool LineExists(long id)
        {
            return _context.Lines.Any(e => e.Id == id);
        }
    }
}

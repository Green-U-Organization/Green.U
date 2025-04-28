
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

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
        public async Task<ActionResult<Line>> GetLines(long id)
        {

            bool ParcelExist = await _db.Parcels
                .Where(p => p.Id == id)
                .AnyAsync();

            if (!ParcelExist) return BadRequest(new { isEmpty = true, message = "The parcel Id is incorrect" });

            var lines = await _db.Lines
                .Where(l => l.ParcelId == id)
                .ToListAsync();

            if (lines.Count == 0) return Ok(new { isEmpty = true, message = "No line in this parcel", content = lines });

            return Ok(new { isEmpty = false, message = "Every lines from the parcel id", content = lines});
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Line>> PatchLine(long id, Line modifiedLine)
        {
            var line = await _db.Lines
                .FindAsync(id);

            if (line == null) return BadRequest(new { isEmpty = true, message = "The id is incorrect" });

            if (modifiedLine.Length != null) line.Length = modifiedLine.Length;

            _db.Update(line);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This line is modified", content = line});

        }

       [HttpPost]
        public async Task<ActionResult<Line>> PostLine(Line line)
        {
            var parcel = await _db.Parcels
                .FindAsync(line.ParcelId);

            if (parcel == null) return BadRequest(new { isEmpty = true, message = "Parcel id is incorrect" });

            if (line.Length == null) return BadRequest(new { isEmpty = false, message = "The lenght is requierd" });

            _db.Add(line);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "The line is created !", content = line});

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(long id)
        {
            var line = await _db.Lines.FindAsync(id);

            if (line == null) return BadRequest(new { isEmpty = true, message = "The id of line is incorrect" });

            var crop = await _db.Crops
                .Where(c => c.LineId == id)
                .FirstOrDefaultAsync();

            if (crop != null)
            {
                crop.LineId = null;
            }

<<<<<<< HEAD
            var crops = await _context.Crops.Where(c => c.LineId == line.Id).ToListAsync();

            foreach(var crop in crops){
                crop.LineId = null;
            }

            _context.Lines.Remove(line);
            await _context.SaveChangesAsync();
=======
            _db.Lines.Remove(line);
            await _db.SaveChangesAsync();
>>>>>>> backend-dev

            return Ok(new { isEmpty = false, message = "This line is deleted", content = line });
        }
    }
}

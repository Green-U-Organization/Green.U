
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

            if (modifiedLine.Length != null)
            {

            Log log = new()
            {
                GardenId = line.GardenId,
                LineId = line.Id,
                ParcelId = line.ParcelId,
                PlantNurseryId = line.PLantNurseryId,
                Action = "Edit line",
                Comment = $"Edit the length {line.Length} to {modifiedLine.Length}",
                Type = "Automatic",
            };

            _db.Add(log);

                line.Length = modifiedLine.Length;
            }

            _db.Update(line);



            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This line is modified", content = line});

        }

       [HttpPost]
        public async Task<ActionResult<Line>> PostLine(Line request)
        {
            var parcel = await _db.Parcels
                .AnyAsync(p => p.Id == request.ParcelId);

            if (!parcel) return BadRequest(new { isEmpty = true, message = "Parcel id is incorrect" });

            if (request.Length == null) return BadRequest(new { isEmpty = false, message = "The lenght is requierd" });


            _db.Add(request);

            Log log = new() 
            {
                GardenId = request.GardenId,
                ParcelId = request.ParcelId,
                PlantNurseryId = request.PLantNurseryId,
                Action = "Create a new line",
                Comment = $"length : {request.Length}",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();



            return Ok(new { isEmpty = false, message = "The line is created !", content = request});

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

            Log log = new()
            {
                GardenId = line.GardenId,
                LineId = line.Id,
                ParcelId = line.ParcelId,
                PlantNurseryId = line.PLantNurseryId,
                Action = "Delete a line",
                Comment = $"Length : {line.Length}",
                Type = "Automatic",
            };
            _db.Add(log);
            _db.Lines.Remove(line);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This line is deleted", content = line });
        }
    }
}

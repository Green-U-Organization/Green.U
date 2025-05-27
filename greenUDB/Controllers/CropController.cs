using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{
    public class CropDto
    {
        public long? LineId { get; set; }

        public long? PlantNurseryId { get; set; }

        public string Vegetable { get; set; } = "no Vege";

        public string? Variety { get; set; }

        public string? Description { get; set; }

        public short? NPot { get; set; }

        public float? PotSize { get; set; }

        public string? Icon { get; set; }

        public DateOnly? Sowing { get; set; }

        public DateOnly? Planting { get; set; }

        public DateOnly? Harvesting { get; set; }
    }

    [Route("crops")]
    // [ApiController]
    public class CropController : ControllerBase
    {
        private readonly GreenUDB _db;

        public CropController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("line/{id}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByline(long id)
        {

            var crops = await _db.Crops
                .Where(c => c.LineId == id)
                .ToListAsync();

            if (crops.Count == 0) return BadRequest(new { isEmpty = true, message = "No crop here..." });

            return Ok(new { isEmpty = false, message = "All crops with line id", content = crops });
        }

        [HttpGet("plantNursery/{id}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByPlantNursery(long id)
        {

            var crops = await _db.Crops
                .Where(c => c.PlantNurseryId == id)
                .ToListAsync();

            if (crops.Count == 0) return BadRequest(new { isEmpty = true, message = "No crops..."});

            return Ok(new { isEmpty = false, message = "All crops with plant nursery id", content = crops });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchCrop(long id, [FromBody] CropDto crop)
        {
            var existingCrop = await _db.Crops.FindAsync(id);

            if (existingCrop == null) return BadRequest(new { isEmpty = true, message = "The crop id is incorrect" });

            string modificationLog = "";

            if (crop.Vegetable != null)
            {
                modificationLog += $"Edit the Vegetable: {existingCrop.Vegetable} => {crop.Vegetable} \n";
                existingCrop.Vegetable = crop.Vegetable;
            }

            if (crop.Variety != null)
            {
                modificationLog += $"Edit the Variety: {existingCrop.Variety} => {crop.Variety} \n";
                existingCrop.Variety = crop.Variety;
            }

            if (crop.LineId != null)
            {
                modificationLog += $"Edit the LineId: {existingCrop.LineId} => {crop.LineId} \n";
                existingCrop.LineId = crop.LineId;
            }

            if (crop.Icon != null)
            {
                modificationLog += $"Edit the Icon: {existingCrop.Icon} => {crop.Icon} \n";
                existingCrop.Icon = crop.Icon;
            }

            if (crop.Sowing != null)
            {
                modificationLog += $"Edit the Sowing: {existingCrop.Sowing} => {crop.Sowing} \n";
                existingCrop.Sowing = crop.Sowing;
            }

            if (crop.Planting != null)
            {
                modificationLog += $"Edit the Planting: {existingCrop.Planting} => {crop.Planting} \n";
                existingCrop.Planting = crop.Planting;
            }

            if (crop.Harvesting != null)
            {
                modificationLog += $"Edit the Harvesting: {existingCrop.Harvesting} => {crop.Harvesting} \n";
                existingCrop.Harvesting = crop.Harvesting;
            }

            if (crop.NPot != null)
            {
                modificationLog += $"Edit the NPot: {existingCrop.NPot} => {crop.NPot} \n";
                existingCrop.NPot = crop.NPot;
            }

            if (crop.PotSize != null)
            {
                modificationLog += $"Edit the PotSize: {existingCrop.PotSize} => {crop.PotSize} \n";
                existingCrop.PotSize = crop.PotSize;
            }

            if (crop.PlantNurseryId == 0)
            {
                existingCrop.PlantNurseryId = null;
                crop.PlantNurseryId = null;
                modificationLog += $"Make plant nursery Null";
            }

            if (crop.PlantNurseryId != null)
            {
                bool existingPlantNursery = await _db.PlantNursery
                    .Where(p => p.Id == crop.PlantNurseryId)
                    .AnyAsync();
                if (!existingPlantNursery) return BadRequest(new { isEmpty = true, message = "The plantnurseryId is incorrect" });
                modificationLog += $"Edit the PlantNurseryId: {existingCrop.PlantNurseryId} => {crop.PlantNurseryId} ";
                existingCrop.PlantNurseryId = crop.PlantNurseryId;
            }

            Log log = new()
            {
                CropId = existingCrop.Id,
                Action = "Edit Crop",
                Comment = modificationLog,
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();
            return Ok(new { isEmpty = false, message = "This crop is edited", content = existingCrop });

        }

        [HttpPost("line/{id}")]
        public async Task<ActionResult<Crop>> PostCropLine(long id, [FromBody] Crop request)
        {
            if (request == null) return BadRequest(new { isEmpty = true, message = "The body does not look like the model..." });

            request.LineId = id;

            if (!request.LineId.HasValue)
            {
                return BadRequest(new { isEmpty = true, message = "No id for line" });
            }


            var ExistingLine = await _db.Lines
                .AnyAsync(line => line.Id  == request.LineId);

            if (!ExistingLine) return BadRequest(new { isEmpty = true, message = "Line id is incorrect" });

            var ExistingCropLine = await _db.Crops
                .Where(c => c.LineId == request.LineId)
                .ToListAsync();

            if (ExistingCropLine.Count != 0) return Conflict(new { isEmpty = true, message = "This line have a crop..." });

            _db.Crops.Add(request);

            Log log = new()
            {
                GardenId = request.GardenId,
                ParcelId = request.ParcelId,
                LineId = id,
                Action = "Plant a crop",
                Comment = $"{request.Vegetable} {request.Variety}",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your crop are created !", content = request, log = log });

        }

        [HttpPost("plantnursery/{id}")]
        public async Task<ActionResult<Crop>> PostCropPlantnursery(long id, [FromBody] Crop request)
        {
            if (request == null) return BadRequest(new { isEmpty = true, message = "The body is incorrect" });

            request.PlantNurseryId = id;

            if (!request.PlantNurseryId.HasValue)
            {
                return BadRequest(new { isEmpty = true, message = "No id for plantNursery" });
            }

            if (request.PlantNurseryId.HasValue)
            {
                var ExistingPlantNursery = await _db.PlantNursery
                    .AnyAsync(PlantNursery => PlantNursery.Id == request.PlantNurseryId);

                if (!ExistingPlantNursery) return BadRequest(new { isEmpty = true, message = "PlantNursery id is bad" });


            }

            _db.Crops.Add(request);

            Log log = new()
            {
                PlantNurseryId = request.PlantNurseryId,
                Action = "Plant a crop in plant nursery",
                Comment = $"{request.Vegetable} {request.Variety} ",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your crop are created !", content = request });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrop(long id)
        {
            var crop = await _db.Crops.FindAsync(id);
            if (crop == null)
            {
                return NotFound(new { isEmpty = true, message = "No crop with this id..." });
            }

            Log log = new()
            {
                CropId = id,
                PlantNurseryId = crop.PlantNurseryId,
                LineId = crop.LineId,
                Action = "Delete a crop",
                Comment = $"{crop.Vegetable} {crop.Variety}",
                Type = "Automatic",
            };

            _db.Crops.Remove(crop);
            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This crop is now deleted", content = crop });
        }
    }
}

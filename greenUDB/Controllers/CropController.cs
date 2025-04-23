using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using YamlDotNet.Core.Tokens;

namespace GreenUApi.Controllers
{
    public class CropDto{
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

        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByline(long lineId){
            var crops = await _db.Crops.Where(c => c.LineId == lineId).ToListAsync();
            if(!crops.Any())
            {
                return BadRequest(new { isEmpty = true, message = "No crop here..." });
            }

            return Ok(new { isEmpty = false, message = "All crops with line id", content = crops});
        }

        [HttpGet("plantNursery/{plantNursery}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByPlantNursery(long line){
            var crops = await _db.Crops.Where(c => c.PlantNurseryId == line).ToListAsync();
            if(!crops.Any())
            {
                return BadRequest(new { isEmpty = true, message = "No crops..." });
            }

            return Ok(new { isEmpty = false, message = "All crops with plant nursery id", content = crops });
        }
          
       [HttpPatch("{id}")]
        public async Task<IActionResult> PatchCrop(long id, [FromBody] CropDto crop)
        {
            var existingCrop = await _db.Crops.FindAsync(id);

            if (existingCrop == null) return BadRequest(new { isEmpty = true, message = "The crop id is incorrect" });

            if (crop.Vegetable != null) existingCrop.Vegetable = crop.Vegetable;

            if (crop.Variety != null) existingCrop.Variety = crop.Variety;

            if (crop.LineId != 0) existingCrop.LineId = crop.LineId;

            if (crop.Icon != null) existingCrop.Icon = crop.Icon;

            if (crop.Sowing != null) existingCrop.Sowing = crop.Sowing;

            if (crop.Planting != null) existingCrop.Planting = crop.Planting;

            if (crop.Harvesting != null) existingCrop.Harvesting = crop.Harvesting;

            await _db.SaveChangesAsync();
            return Ok(new { isEmpty = false, message = "This crop is edited", content = existingCrop});
  
        }
        
        [HttpPost("line/{id}")]
        public async Task<ActionResult<Crop>> PostCropLine(long id, [FromBody] Crop crop)
        {
            if (crop == null) return BadRequest(new { isEmpty = true, message = "The body does not look like the model..." });
             
            crop.LineId = id;

            if (!crop.LineId.HasValue)
            {
                return BadRequest(new {isEmpty = true, message = "No id for line"});
            }
                
            if (crop.LineId.HasValue)
            {
                var ExistingLine = await _db.Lines
                    .FindAsync(crop.LineId);

                if (ExistingLine == null) return BadRequest(new {isEmpty = true, message = "Line id is incorrect" });

                var ExistingCropLine = await _db.Crops
                    .Where(c => c.LineId == crop.LineId)
                    .FirstOrDefaultAsync();

                if (ExistingCropLine != null) return Conflict(new { isEmpty = true, message = "This line have a crop..." });
            }

            _db.Crops.Add(crop);
                await _db.SaveChangesAsync();

                return Ok(new {isEmpty = false, message = "Your crop are created !", content = crop});

        }

        [HttpPost("plantnursery/{id}")]
        public async Task<ActionResult<Crop>> PostCropPlantnursery(long id, [FromBody] Crop crop)
        {
            if (crop == null) return BadRequest(new { isEmpty = true, message = "The body is incorrect" });

            crop.PlantNurseryId = id;

            if (!crop.PlantNurseryId.HasValue)
            {
                return BadRequest(new { isEmpty = true, message = "No id for plantNursery" });
            }

            if (crop.PlantNurseryId.HasValue)
            {
                var ExistingPlantNursery = await _db.PlantNursery
                    .FindAsync(crop.PlantNurseryId);

                if (ExistingPlantNursery == null) return BadRequest(new { isEmpty = true, message = "PlantNursery id is bad" });


            }

            _db.Crops.Add(crop);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your crop are created !", content = crop });

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrop(long id)
        {
            var crop = await _db.Crops.FindAsync(id);
            if (crop == null)
            {
                return NotFound(new {isEmpty = true, message = "No crop with this id..."});
            }

            _db.Crops.Remove(crop);
            await _db.SaveChangesAsync();

            return Ok(new {isEmpty = false, message = "This crop is now deleted" , content = crop});
        }
    }
}

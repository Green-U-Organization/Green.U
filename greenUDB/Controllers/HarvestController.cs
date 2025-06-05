using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

// TODO
// POST Create a Harvest V
// GET GardenId V
// GET VegetableName V
// GET CropId V
// GET Vegetable + Variety Name X

namespace GreenUApi.Controllers
{

    [Route("harvest")]
    [ApiController]
    public class HarvestController : ControllerBase
    {

        private readonly GreenUDB _db;

        public HarvestController(GreenUDB db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> CreateHarvest([FromBody] Harvest harvest)
        {
            var Crop = await _db.Crops
                .Where(c => c.Id == harvest.CropId)
                .Select(c => new
                {
                    c.Id,
                    c.GardenId
                })
                .FirstOrDefaultAsync();

            if (Crop == null) return NotFound(new { isEmpty = true, message = "CropId is wrong..." });

            harvest.GardenId = Crop.GardenId;

            _db.Add(harvest);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Harvest is created !", content = harvest });

        }

        [HttpGet("garden/{id}")]
        public async Task<IActionResult> GetAllHarvestByGardenId([FromRoute] long id)
        {
            var GardenExist = await _db.Gardens
                .Where(g => g.Id == id)
                .AnyAsync();

            if (!GardenExist) return NotFound(new { isEmpty = true, message = "Garden not found..." });

            var Harvest = await _db.Harvests
                .Where(h => h.GardenId == id)
                .ToListAsync();

            return Ok(new { isEmpty = false, message = "All harvest in this garden !", content = Harvest });
        }

        [HttpGet("crop/{id}")]
        public async Task<IActionResult> GetAllHarvestByCropId([FromRoute] long id)
        {
            var CropExist = await _db.Crops
                .Where(c => c.Id == id)
                .AnyAsync();

            if (!CropExist) return NotFound(new { isEmpty = true, message = "Crop id is incorrect" });

            var Harvest = await _db.Harvests
                .Where(h => h.CropId == id)
                .ToListAsync();

            return Ok(new { isEmpty = false, message = "All harvest with crop ", content = Harvest });
        }

        [HttpGet("vegetableName={vegetable}")]
        public async Task<IActionResult> GetAllHarvestByVegetableName([FromRoute] string vegetable)
        {
            var Harvest = await _db.Harvests
                .Join(
                _db.Crops,
                harvest => harvest.CropId,
                crops => crops.Id,
                (harvest, crops) => new
                {
                    harvest.Id,
                    harvest.GardenId,
                    harvest.CropId,
                    crops.Vegetable,
                    harvest.CreatedAt
                }
                )
                .ToListAsync();

            if (Harvest.Count == 0) return Ok(new { isEmpty = true, message = "No result...", content = Array.Empty<Object>() });

            return Ok(new { isEmpty = false, message = "All harvest with vegetable name", content = Harvest });
        }
    }
}

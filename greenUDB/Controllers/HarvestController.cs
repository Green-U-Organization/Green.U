using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

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

            if (Crop == null) return NotFound(new {isEmpty = true, message = "CropId is wrong..."});

            harvest.GardenId = Crop.GardenId;

            _db.Add(harvest);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Harvest is created !", content = harvest });

        }
    }
}

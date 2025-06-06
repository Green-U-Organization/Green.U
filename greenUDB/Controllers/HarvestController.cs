using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

// TODO
// POST Create a Harvest V
// GET GardenId V
// GET VegetableName V
// GET CropId V
// GET Vegetable + Variety Name V
// GET All harvest by userId X ( Need to talk about that with Pierre )

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

        // CREATE NEW HARVEST
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

        // GET BY GARDEN ID
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

        // GET BY CROP ID
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

        // SEARCH BAR BY VEGETABLE NAME
        [HttpGet("search/vegetableName={vegetable}")]
        public async Task<IActionResult> GetAllHarvestByVegetableName([FromRoute] string vegetable, [FromQuery] int pageNumber)
        {
            if (vegetable == null)
                return BadRequest(new { isEmpty = true, message = "Vegetable is needed" });

            if (vegetable.Any(char.IsDigit))
                return BadRequest(new { isEmpty = true, message = "No digit vegetable name" });

            vegetable = vegetable.Trim();
            
            // Create a query to be use in pagination
            var harvestQuery = _db.Crops
                .Where(c => c.Vegetable.Contains(vegetable))
                .Join(
                    _db.Harvests,
                    crops => crops.Id,
                    harvest => harvest.CropId,
                    (crops, harvest) => new
                    {
                        harvest.Id,
                        harvest.GardenId,
                        harvest.CropId,
                        crops.Vegetable,
                        crops.Variety,
                        harvest.Quantity,
                        harvestCreatedAt = harvest.CreatedAt,
                        cropCreatedAt = crops.CreatedAt
                    }
                ).OrderBy(c => c.Vegetable);

            int pageSize = 10;

            if (pageNumber == 0) pageNumber = 1;

            // Create a pagination and use the query
            var paginateHarvest = await PaginatedList<dynamic>.CreateAsync(
                harvestQuery, pageNumber, pageSize);  

            if (paginateHarvest == null)
                return Ok(new { 
                    isEmpty = true, 
                    message = "No harvest with this research", 
                    content = Array.Empty<Object>(),
                    pagination = new
                    {
                        currentPage = pageNumber,
                        totalPage = 0,
                        totalItem = 0,
                        pageSize
                    }   
                });

            return Ok(new { 
                isEmpty = false, 
                message = "Harvest by vegetable", 
                content = paginateHarvest,
                pagination = new
                {
                    currentPage = pageNumber,
                    totalPage = paginateHarvest.TotalPages,
                    totaItems = await harvestQuery.CountAsync(),
                    pageSize,
                    hasNextPage = paginateHarvest.HasNextPage,
                    hasPreviousPage = paginateHarvest.HasPreviousPage
                }
            });
        }

        // GET AN HARVEST AND CROP DATA BY VARIETY NAME AND VEGETABLE NAME
        [HttpGet("search/varietyName={variety}/vegetableName={vegetable}")]
        public async Task<IActionResult> GetHarvestByVegetableNameAndVarietyName([FromRoute] string vegetable, [FromRoute] string variety)
        {
            if (vegetable == null || variety == null)
                return BadRequest(new { isEmpty = true, message = "Vegetable and variety is needed" });

            if (variety.Any(char.IsDigit) || vegetable.Any(char.IsDigit))
                return BadRequest(new { isEmpty = true, message = "No digit on variety name or vegetable name" });

            vegetable = vegetable.Trim();
            variety = variety.Trim();

            var Harvest = await _db.Crops
                .Where(c => c.Vegetable == vegetable && c.Variety == variety)
                .Join(
                    _db.Harvests,
                    crops => crops.Id,
                    harvest => harvest.CropId,
                    (crops, harvest) => new
                    {
                        harvest.Id,
                        harvest.GardenId,
                        harvest.CropId,
                        crops.Vegetable,
                        crops.Variety,
                        harvest.Quantity,
                        harvestCreatedAt = harvest.CreatedAt,
                        cropCreatedAt = crops.CreatedAt
                    }
                ).FirstOrDefaultAsync();

            if (Harvest == null)
                return Ok(new { isEmpty = true, message = "No harvest with this research", content = Array.Empty<Object>() });

            return Ok(new { isEmpty = false, message = "Harvest by vegetable and variety", content = Harvest });
        }
    }
}

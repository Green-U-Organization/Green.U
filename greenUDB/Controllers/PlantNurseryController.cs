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
    [Route("plantnursery")]
    [ApiController]
    // [Authorize]
    public class PlantNurseryController : ControllerBase
    {
        private readonly GreenUDB _db;

        public PlantNurseryController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlantNursery>>> GetPlantNursery()
        {
            var plantNursery = await _db.PlantNursery
                .ToListAsync();

            if (plantNursery == null)
            {
                return BadRequest(new { isEmpty = true, message = "No plantNursery..."});
            }

            return Ok(new { isEmpty = false, message = "All plant nursery", content = plantNursery});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlantNursery>> GetPlantNurseryById(long id)
        {
            var plantNursery = await _db.PlantNursery.FindAsync(id);

            if (plantNursery == null)
            {
                return BadRequest(new { isEmpty = true, message = "The id is incorrect"});
            }

            return Ok(new { isEmpty = false, message = "The nursery", content = plantNursery});
        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<PlantNursery>> GetPlantNurseryByGardenId(long id)
        {
            var plantNursery = await _db.PlantNursery
                .Where(p => p.GardenId == id)
                .ToListAsync();

            if (plantNursery.Count == 0)
            {
                return BadRequest(new { isEmpty = true, message = "The id is incorrect" });
            }

            return Ok(new { isEmpty = false, message = "The nursery", content = plantNursery });

        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<PlantNursery>> PatchPlantNursery(long id, PlantNursery modifiedPlantNursery)
        {
            var plantNursery = await _db.PlantNursery
                .FirstOrDefaultAsync();

            if (plantNursery == null) return BadRequest(new { isEmpty = true, message = "The id is incorrect" });

            if (modifiedPlantNursery.Name != null) plantNursery.Name = modifiedPlantNursery.Name;

            if (modifiedPlantNursery.Type != null) plantNursery.Type = modifiedPlantNursery.Type;

            _db.Update(plantNursery);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Plant Nursery is modified", content = plantNursery });
        }

        [HttpPost]
        public async Task<ActionResult<PlantNursery>> PostPlantNursery(PlantNursery plantNursery)
        {
            if (plantNursery.GardenId == null) return BadRequest(new { isEmpty = true, message = "The gardenId is required" });

            bool gardenExist = await _db.Gardens
                .AnyAsync(g => g.Id == plantNursery.GardenId);

            if (!gardenExist) return BadRequest(new { isEmpty = true, message = "The specified garden does not exist" });

            _db.PlantNursery.Add(plantNursery);

            Log log = new()
            {
                GardenId = plantNursery.GardenId,
                Action = $"Create the {plantNursery.Name} plant nursery with type {plantNursery.Type}",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "A new nursery is created!", content = plantNursery });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlantNursery(long? id)
        {
            var plantNursery = await _db.PlantNursery.FindAsync(id);

            if (plantNursery == null) return BadRequest(new { isEmpty = true, message = "The id is incorrect !"});

            var crops = _db.Crops
                .Where(c => c.PlantNurseryId == id)
                .ToList();

            int cropCount = 0; 

            foreach (var crop in crops)
            {
                cropCount++;
                crop.PlantNurseryId = null;
            };


            _db.PlantNursery.Remove(plantNursery);

            Log log = new()
            {
                GardenId = plantNursery.GardenId,
                Action = $"Delete the {plantNursery.Name} plant nursery with type {plantNursery.Type} and delete {cropCount} crops.",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This plant nursery are deleted", content = plantNursery});
        }
    }
}

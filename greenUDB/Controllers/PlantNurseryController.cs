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
            return await _db.PlantNursery.ToListAsync();
        }

        [HttpGet("{id}", Name = "GetPlantNursery")]
        public async Task<ActionResult<PlantNursery>> GetPlantNursery(long? id)
        {
            var plantNursery = await _db.PlantNursery.FindAsync(id);

            if (plantNursery == null)
            {
                return NotFound();
            }

            return plantNursery;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PutPlantNursery(long? id, PlantNursery plantNursery)
        {
            if (id != plantNursery.Id)
            {
                return BadRequest();
            }

            _db.Entry(plantNursery).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlantNurseryExists(id))
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
        public async Task<ActionResult<PlantNursery>> PostPlantNursery(PlantNursery plantNursery)
        {
            _db.PlantNursery.Add(plantNursery);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetPlantNursery", new { id = plantNursery.Id }, plantNursery);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlantNursery(long? id)
        {
            var plantNursery = await _db.PlantNursery.FindAsync(id);
            if (plantNursery == null)
            {
                return NotFound();
            }

            _db.PlantNursery.Remove(plantNursery);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool PlantNurseryExists(long? id)
        {
            return _db.PlantNursery.Any(e => e.Id == id);
        }
    }
}

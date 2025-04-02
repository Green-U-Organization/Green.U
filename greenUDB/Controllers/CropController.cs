using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{
    [Route("crops")]
    [ApiController]
    public class CropController : ControllerBase
    {
        private readonly GreenUDB _context;

        public CropController(GreenUDB context)
        {
            _context = context;
        }

        // GET: api/Crop
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCrops()
        {
            return await _context.Crops.ToListAsync();
        }

        // PUT: api/Crop/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch]
        public async Task<IActionResult> PatchCrop(long id, Crop crop)
        {
            if (id != crop.Id)
            {
                return BadRequest();
            }

            _context.Entry(crop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CropExists(id))
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

        // POST: api/Crop
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Crop>> PostCrop(Crop crop)
        {
            _context.Crops.Add(crop);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CropExists(crop.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCrop", new { id = crop.Id }, crop);
        }

        // DELETE: api/Crop/5
        [HttpDelete]
        public async Task<IActionResult> DeleteCrop(long id)
        {
            var crop = await _context.Crops.FindAsync(id);
            if (crop == null)
            {
                return NotFound();
            }

            _context.Crops.Remove(crop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CropExists(long id)
        {
            return _context.Crops.Any(e => e.Id == id);
        }
    }
}

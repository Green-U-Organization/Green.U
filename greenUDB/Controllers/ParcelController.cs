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
    [Route("garden/parcel")]
    [ApiController]
    // [Authorize]
    public class ParcelController : ControllerBase
    {
        private readonly GreenUDB _context;

        public ParcelController(GreenUDB context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcel(long id)
        {
            var parcel = await _context.Parcels.Where(g => g.GardenId == id)
                                        .ToListAsync();;

            if (parcel == null)
            {
                return NotFound();
            }

            return parcel;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PutParcel(long id, Parcel parcel)
        {
            if (id != parcel.Id)
            {
                return BadRequest();
            }

            _context.Entry(parcel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParcelExists(id))
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
        public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        {
            var GardenExist = await _context.Gardens
                .FirstOrDefaultAsync(garden => garden.Id == parcel.GardenId);

            if (GardenExist == null)
            {
                return BadRequest(new { message = "Garden id is incorrect..."});
            }

            _context.Parcels.Add(parcel);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetParcel", new { id = parcel.Id }, parcel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcel(long id)
        {
            try
            {
                var parcel = await _context.Parcels.FindAsync(id);
                if (parcel == null)
                {
                    return NotFound();
                }

                var lines = await _context.Lines.Where(l => l.ParcelId == parcel.Id).ToListAsync();

                foreach(var line in lines)
                {
                    var crops = await _context.Crops.Where(c => c.LineId == line.Id).ToListAsync();
                    foreach (var crop in crops)
                    {
                        _context.Crops.Remove(crop); 
                    }
                    _context.Lines.Remove(line);
                }

                _context.Parcels.Remove(parcel);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                // Log l'exception pour obtenir plus d'informations
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        private bool ParcelExists(long id)
        {
            return _context.Parcels.Any(e => e.Id == id);
        }
    }
}

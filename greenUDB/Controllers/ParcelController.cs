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
        private readonly GreenUDB _db;

        public ParcelController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcelWithGardenId(long id)
        {
            var parcel = await _db.Parcels
                .Where(g => g.GardenId == id)
                .ToListAsync();

            if (parcel.Count == 0)
            {
                return BadRequest(new { isEmpty = true, message = "The id is incorrect"});
            }

            return Ok(new { isEmpty = false, message = "All parcel for this garden", content = parcel});
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchParcel(long id, Parcel modifiedParcel)
        {
            var parcel = await _db.Parcels
                .FindAsync(id);

            if (parcel == null)
            {
                return BadRequest(new { isEmpty = true, message = "The id is incorrect" });
            }

            if (modifiedParcel.Length != null)
            {
                parcel.Length = modifiedParcel.Length;
            }

            if (modifiedParcel.Width != null)
            {
                parcel.Width =  modifiedParcel.Width;
            }

            if (modifiedParcel.NLine != null)
            {
                parcel.NLine = modifiedParcel.NLine;
            }

            if (modifiedParcel.ParcelAngle != null)
            {
                parcel.ParcelAngle = modifiedParcel.ParcelAngle;
            }
            
            _db.Update(parcel);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your parcel is modified", content = parcel });
        }

        [HttpPost]
        public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        {
            var GardenExist = await _db.Gardens
                .FirstOrDefaultAsync(garden => garden.Id == parcel.GardenId);

            if (GardenExist == null)
            {
                return BadRequest(new { message = "Garden id is incorrect..."});
            }

            _db.Parcels.Add(parcel);
            await _db.SaveChangesAsync();
            
            return CreatedAtAction("GetParcel", new { id = parcel.Id }, parcel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcel(long id)
        {
            try
            {
                var parcel = await _db.Parcels.FindAsync(id);
                if (parcel == null)
                {
                    return NotFound();
                }

                var lines = await _db.Lines.Where(l => l.ParcelId == parcel.Id).ToListAsync();

                foreach(var line in lines)
                {
                    var crops = await _db.Crops.Where(c => c.LineId == line.Id).ToListAsync();
                    foreach (var crop in crops)
                    {
                        crop.LineId = null; 
                    }
                    _db.Lines.Remove(line);
                }

                _db.Parcels.Remove(parcel);
                await _db.SaveChangesAsync();

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
            return _db.Parcels.Any(e => e.Id == id);
        }
    }
}

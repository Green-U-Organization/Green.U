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
    [Route("garden/parcel")]
    [ApiController]
    public class ParcelController : ControllerBase
    {
        private readonly GreenUDB _context;

        public ParcelController(GreenUDB context)
        {
            _context = context;
        }

        // GET: api/Parcel/5
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

        // PUT: api/Parcel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Parcel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        {
            _context.Parcels.Add(parcel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ParcelExists(parcel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetParcel", new { id = parcel.Id }, parcel);
        }

        // DELETE: api/Parcel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcel(long id)
        {
            var parcel = await _context.Parcels.FindAsync(id);
            if (parcel == null)
            {
                return NotFound();
            }

            _context.Parcels.Remove(parcel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParcelExists(long id)
        {
            return _context.Parcels.Any(e => e.Id == id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;
using Docker.DotNet.Models;

namespace GreenUApi.Controllers
{
    [Route("garden/parcel")]
    [ApiController]
    // [Authorize]
    public class ParcelController(GreenUDB _db) : ControllerBase
    {
        private readonly GreenUDB _db = _db;

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

            if (parcel == null) return BadRequest(new { isEmpty = true, message = "The id is incorrect" });

            string modificationLog = "";

            if (modifiedParcel.Length != null)
            {
                modificationLog += $"Edit the length : {parcel.Length} => {modifiedParcel.Length}; ";
                parcel.Length = modifiedParcel.Length;
            }

            if (modifiedParcel.Width != null)
            {
                modificationLog += $"Edit the width : {parcel.Width} => {modifiedParcel.Width}; ";
                parcel.Width = modifiedParcel.Width;
            }

            if (modifiedParcel.NLine != null)
            {
                modificationLog += $"Edit number of line : {parcel.NLine} => {modifiedParcel.NLine}; ";
                parcel.NLine = modifiedParcel.NLine;
            }

            if (modifiedParcel.ParcelAngle != null)
            {
                modificationLog += $"Edit angle : {parcel.ParcelAngle} => {modifiedParcel.ParcelAngle}; ";
                parcel.ParcelAngle = modifiedParcel.ParcelAngle;
            }

            _db.Update(parcel);

            Log log = new()
            {
                GardenId = parcel.GardenId,
                ParcelId = parcel.Id,
                Action = "Edit parcel",
                Comment = modificationLog,
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your parcel is modified", content = parcel });
        }

        [HttpPost]
        public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        {
            var GardenExist = await _db.Gardens
                .FirstOrDefaultAsync(garden => garden.Id == parcel.GardenId);

            if (GardenExist == null) return BadRequest(new { isEmpty = true, message = "Garden id is incorrect..."});

            _db.Parcels.Add(parcel);

            Log log = new()
            {
                GardenId = parcel.GardenId,
                ParcelId = parcel.Id,
                Action = "Create parcel",
                Comment = $"Length : {parcel.Length}. Width : {parcel.Width}",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();
            
            return Ok(new { isEmpty = false, message = "The parcel is created !", content = parcel});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcel(long id)
        {
            var parcel = await _db.Parcels
                .FindAsync(id);

            if (parcel == null) return BadRequest(new { isEmpty = true, message = "The id is incorrect" });

            var lines = await _db.Lines
                .Where(l => l.ParcelId == id)
                .ToListAsync();

            foreach (var line in lines)
            {
                var crops = await _db.Crops
                    .Where(c => c.LineId == line.Id)
                    .ToListAsync();
                foreach (var crop in crops)
                {
                    crop.LineId = null;
                }
                _db.Lines.Remove(line);
            }

            Log log = new()
            {
                GardenId = parcel.GardenId,
                ParcelId = parcel.Id,
                Action = "Delete parcel",
                Comment = $"Length : {parcel.Length}. Width : {parcel.Width}",
                Type = "Automatic",
            };
            _db.Add(log);

            _db.Remove(parcel);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, messsage = "This parcel is deleted", content = parcel });

        }

    }
}

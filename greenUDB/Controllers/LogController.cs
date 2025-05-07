// User can make post to create log
// If you make modification in line parcel or garden log is written automaticly

// Log is present in
// LineController POST PATCH DELETE
// ParcelController POST PATCH DELETE

using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GreenUApi.Controllers
{
    [Route("/log")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly GreenUDB _db;

        public LogController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<Garden>> GetGardenLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.GardenId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(Log);
        }

        [HttpGet("parcel/{id}")]
        public async Task<ActionResult<Garden>> GetParcelLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.ParcelId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(Log);
        }
    }
}

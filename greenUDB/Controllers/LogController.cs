// User can make post to create log
// If you make modification in line parcel or garden log is written automaticly

// Log is present in
// LineController POST PATCH DELETE
// ParcelController POST PATCH DELETE

using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GreenUApi.Controllers
{

    public partial class LogDTO
    {
    
        public long? Id { get; set; }

        public long? AuthorId { get; set; }

        public string? Username { get; set; }

        public long? GardenId { get; set; }

        public long? ParcelId { get; set; }

        public long? LineId { get; set; }

        public long? CropId { get; set; }

        public long? PlantNurseryId { get; set; }

        public string? Action { get; set; }

        public string? Comment { get; set; }

        public string? Type { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    [Route("/log")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly GreenUDB _db;

        public LogController(GreenUDB context)
        {
            _db = context;
        }

        [HttpPost("user/{id}")]
        public async Task<ActionResult<Log>> CreateUserLog(long id, LogDTO logDTO)
        {

            if (logDTO.Action == null || logDTO.Comment == null) return BadRequest(new { isEmpty = true, message = "Action or comment is empty" });

            var user = await _db.Users
                .Where(u => u.Id == id)
                .Select(u => u.Username)
                .FirstOrDefaultAsync();

            if (user == null) return BadRequest(new { isEmpty = true, message = "User id is incorrect" });

            logDTO.Type = "user";
            logDTO.AuthorId = id;

            Log log = new Log {
                AuthorId = logDTO.AuthorId,
                Username = user,
                GardenId = logDTO.GardenId,
                ParcelId = logDTO.ParcelId,
                LineId = logDTO.LineId,
                CropId = logDTO.CropId,
                Action = logDTO.Action,
                Comment = logDTO.Comment,
                Type = logDTO.Type
            };

            _db.Add(log);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your log is created !", content = log });

        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<Garden>> GetGardenLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.GardenId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(new { isEmpty = false, message = "All garden log with id", content = Log });
        }

        [HttpGet("parcel/{id}")]
        public async Task<ActionResult<Garden>> GetParcelLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.ParcelId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(new { isEmpty = false, message = "All parcel log with id", content = Log });
        }

        [HttpGet("line/{id}")]
        public async Task<ActionResult<Garden>> GetLinelLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.LineId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(new { isEmpty = false, message = "All Line log with id", content = Log });
        }

        [HttpGet("crop/{id}")]
        public async Task<ActionResult<Garden>> GetCroplLog(long id)
        {
            var Log = await _db.Logs
                .Where(l => l.CropId == id)
                .ToListAsync();

            if (Log.Count == 0) return BadRequest(new { isEmpty = true, message = "no log or id is incorrect" });

            return Ok(new { isEmpty = false, message = "All crops log with id", content = Log});
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GreenUApi.Controllers
{
    [Route("garden")]
    [ApiController]
    // [Authorize]
    public class GardenController : ControllerBase
    {

        public class GardenModification{

            public string? Name { get; set; } = null!;

            public string? Description { get; set; } = null!;

            public double? Latitude { get; set; }

            public double? Longitude { get; set; }

            public double? Length { get; set; }

            public double? Width { get; set; }

            public GardenPrivacy? Privacy { get; set; } = GardenPrivacy.Public;

            public GardenType? Type { get; set; } = GardenType.Personnal;

        }
        private readonly GreenUDB _db   ;

        public GardenController(GreenUDB context)
        {
            _db = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Garden>> GetGarden(long id)
        {
            var garden = await _db.Gardens.FindAsync(id);

            if (garden == null) return NotFound(new { isEmpty = true, message = "The id is incorrect" });

            if (garden.Deleted) return Conflict(new { isEmpty = true, message = "The garden is deleted " });

            return Ok(new { isEmpty = false, message = "The garden", content = garden });
        }

        [HttpGet]
        public async Task<ActionResult<Garden>> GetAllGardens()
        {
            var gardens = await _db.Gardens
                .Where(g => !g.Deleted)
                .ToListAsync();

            return Ok(new { isEmpty = false, message = "All garden", content = gardens });
        }

       [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Garden>>> GetGardensByUser(long id)
        {
            var gardens = await _db.Gardens
                                        .Where(g => g.AuthorId == id && !g.Deleted)
                                        .ToListAsync();

            if (gardens == null || gardens.Count == 0) return NotFound(new { isEmpty = true, message = "This user didn't have garden or user doesn't exist" });

            return Ok(new { isEmpty = false, message = "All garden by user ID", content = gardens});
        }

        [HttpGet("search")]
        public async Task<ActionResult<User>> SearchGardens([FromQuery] string inputuser)
        {
            if (inputuser == null)
                return BadRequest(new { isEmpty = true, message = "inputuser cannot be null or empty" });

            var garden = await _db.Gardens
                .Where(g => g.Name != null && g.Name.Contains(inputuser))
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Description,
                    g.Type,
                    g.Privacy,
                    g.TagsInterests
                })
                .ToArrayAsync();

            if (garden.Length == 0) return BadRequest(new { isEmpty = true, message = "Garden doesn't exist" });

            return Ok(new { isEmpty = false, message = "Garden list", content = garden });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchGarden(long id, GardenModification modifiedUser)
        {
            var garden = await _db.Gardens
                .FindAsync(id);

            if (garden == null) return NotFound(new { isEmpty = true, message = "The garden id is incorrect" });

            if (garden.Deleted) return BadRequest(new { isEmpty = true, message = "This garden is deleted" });

            string modificationLog = "";

            if (!string.IsNullOrEmpty(modifiedUser.Name))
            {
                modificationLog += $"Edit the name: {garden.Name} => {modifiedUser.Name}; ";
                garden.Name = modifiedUser.Name;
            }

            if (!string.IsNullOrEmpty(modifiedUser.Description))
            {
                modificationLog += $"Edit the description: {garden.Description} => {modifiedUser.Description}; ";
                garden.Description = modifiedUser.Description;
            }

            if (modifiedUser.Latitude.HasValue)
            {
                modificationLog += $"Edit latitude: {garden.Latitude} => {modifiedUser.Latitude.Value}; ";
                garden.Latitude = modifiedUser.Latitude.Value;
            }

            if (modifiedUser.Longitude.HasValue)
            {
                modificationLog += $"Edit longitude: {garden.Longitude} => {modifiedUser.Longitude.Value}; ";
                garden.Longitude = modifiedUser.Longitude.Value;
            }

            if (modifiedUser.Length.HasValue)
            {
                modificationLog += $"Edit the length: {garden.Length} => {modifiedUser.Length.Value}; ";
                garden.Length = modifiedUser.Length.Value;
            }

            if (modifiedUser.Width.HasValue)
            {
                modificationLog += $"Edit the width: {garden.Width} => {modifiedUser.Width.Value}; ";
                garden.Width = modifiedUser.Width.Value;
            }

            if (modifiedUser.Privacy.HasValue)
            {
                modificationLog += $"Edit privacy: {garden.Privacy} => {modifiedUser.Privacy.Value}; ";
                garden.Privacy = modifiedUser.Privacy.Value;
            }

            if (modifiedUser.Type.HasValue)
            {
                modificationLog += $"Edit type: {garden.Type} => {modifiedUser.Type.Value}; ";
                garden.Type = modifiedUser.Type.Value;
            }

            _db.Update(garden);

            Log log = new()
            {
                GardenId = garden.Id,
                Action = "Edit garden",
                Comment = modificationLog,
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "The garden is modified !", content = garden}); 
        }

        [HttpPost]
        public async Task<ActionResult<Garden>> PostGarden([FromBody] Garden garden)
        {
            if (garden == null)
            {
                return BadRequest(new { isEmpty = true, message = "No body..." });
            }

            var ExsistingGarden = await _db.Gardens
                .Where(g => g.Name == garden.Name)
                .FirstOrDefaultAsync();

            if (garden.AuthorId == 0) return BadRequest(new { isEmpty = true, message = "Need Author ID !" });

            if (ExsistingGarden != null) return Conflict(new { isEmpty = true, message = "This garden name is taken..." });

            if (string.IsNullOrWhiteSpace(garden.Name)) return BadRequest(new { isEmpty = true, message = "Need garden Name" });

            if (string.IsNullOrWhiteSpace(garden.Description)) return BadRequest(new { isEmpty = true, message = "Description garden is required" });

            if (garden.Latitude < -90 || garden.Latitude > 90) return BadRequest(new { isEmpty = true, message = "The latitude need a double in this range -90 or 90" });

            if (garden.Longitude < -180 || garden.Longitude > 180) return BadRequest(new { isEmpty = true, message = "The longitude need a double in this range -180 or 180" });

            if (garden.Length <= 0) return BadRequest(new { isEmpty = true, message = "The garden length need to be above 0" });

            if (garden.Width <= 0) return BadRequest(new { isEmpty = true, message = "The garden width need to be above 0" });

            _db.Gardens.Add(garden);

            Log log = new()
            {
                GardenId = garden.Id,
                Action = "Create garden",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Your garden are created !", content = garden});

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarden(long id)
        {
            var garden = await _db.Gardens.FindAsync(id);

            if (garden == null) return BadRequest(new { isEmpty = true, message = "The id is bad."});

            if (garden.Deleted) return Conflict(new { isEmpty = true, message = "The garden is already deleted " });

            var allParcel = await _db.Parcels
                .Where(p => p.GardenId == id)
                .ToListAsync();

            // Need to check that if is a good practice i'm not sure... ^^"
            foreach(var parcel in allParcel)
            {
                var parcelId = parcel.Id;

                var lines = await _db.Lines
                .Where(l => l.ParcelId == parcelId)
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
                _db.Parcels.Remove(parcel);
            }

            var plantNurserys = await _db.PlantNursery
                .Where(p => p.GardenId == id)
                .ToListAsync();

            if (plantNurserys.Count > 0)
            {
                foreach (var plantnursery in  plantNurserys)
                {
                    _db.Remove(plantnursery);
                }
            }

            garden.Deleted = true;
            _db.Gardens.Update(garden);

            Log log = new()
            {
                GardenId = garden.Id,
                Action = "Delete garden",
                Type = "Automatic",
            };

            _db.Add(log);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "This garden are deleted", content = garden });
        }
    }
}

using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GreenUApi.Controllers
{
    [Route("tags")]
    [ApiController]
    // [Authorize]
    public class TagsInterestController(GreenUDB db)  : ControllerBase
    {
        private readonly GreenUDB _db = db;

        [HttpPost("user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTags(long id, [FromBody] TagsInterest Tag)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound("User not found");
            }

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.UserId == id && t.Hashtag == Tag.Hashtag);

            if (!tagExists)
            {

                Tag.UserId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Tag created !"});
            }
            else
            {
                return BadRequest(new { message = "The tag with this user is already exist" });
            }
          
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<TagsInterest>> GetUserTag(long id)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound("User not found");
            }

            var UserTags = await _db.TagsInterests
           .Where(t => t.UserId == id)
           .Select(t => t.Hashtag)
           .ToArrayAsync();

            if (UserTags.Length == 0)
            {
                return NotFound(new { message = "This user doesn't have tags" });
            }

            return Ok(UserTags);
        }

        [HttpPost("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTag(long id, [FromBody] TagsInterest Tag)
        {
            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound("Garden not found");
            }

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.UserId == id && t.Hashtag == Tag.Hashtag);

            if (!tagExists)
            {

                Tag.UserId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Tag created !" });
            }
            else
            {
                return BadRequest(new { message = "The tag with this garden is already exist" });
            }

        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> GetGardenTag(long id)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound("Garden not found");
            }

            var UserTags = await _db.TagsInterests
           .Where(t => t.UserId == id)
           .Select(t => t.Hashtag)
           .ToArrayAsync();

            if (UserTags.Length == 0)
            {
                return NotFound(new { message = "This garden doesn't have tags" });
            }

            return Ok(UserTags);
        }
    }
}

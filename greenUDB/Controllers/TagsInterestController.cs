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

                return Ok(new { message = "User tag created !"});
            }
            else
            {
                return BadRequest(new { message = "The tag with this user is already exist" });
            }
          
        }

        [HttpPost("list/user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTagWithList(long id, [FromBody] string[] tagList)
        {

            return Ok(new { message = "Prout" });
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

        [HttpDelete("user/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteUserTag(long id, TagsInterest Tag)
        {

            try
            {
                TagsInterest tagExists = await _db.TagsInterests
                    .Where(t => t.UserId == id && t.Hashtag == Tag.Hashtag)
                    .FirstAsync();

                if (tagExists == null)
                {
                    return NotFound(new { message = "User tag not found" });
                }

                _db.TagsInterests.Remove(tagExists);
                await _db.SaveChangesAsync();

                return Ok(new {message = "Tag Deleted !", content = tagExists});

            }
            catch (Exception)
            {
                return BadRequest(new { message = "Tag not found"});
            }

        }



        [HttpPost("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTag(long id, [FromBody] TagsInterest Tag)
        {
            var Garden = await _db.Gardens.FindAsync(id);

            if (Garden == null)
            {
                return NotFound("Garden not found");
            }

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.GardenId == id && t.Hashtag == Tag.Hashtag);

            if (!tagExists)
            {

                Tag.GardenId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Garden tag created !" });
            }
            else
            {
                return BadRequest(new { message = "The tag with this garden is already exist" });
            }

        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> GetGardenTag(long id)
        {

            var User = await _db.Gardens.FindAsync(id);

            if (User == null)
            {
                return NotFound("Garden not found");
            }

            var UserTags = await _db.TagsInterests
           .Where(t => t.GardenId == id)
           .Select(t => t.Hashtag)
           .ToArrayAsync();

            if (UserTags.Length == 0)
            {
                return NotFound(new { message = "This garden doesn't have tags" });
            }

            return Ok(UserTags);
        }

        [HttpDelete("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteGardenTag(long id, TagsInterest Tag)
        {

            try
            {
                TagsInterest tagExists = await _db.TagsInterests
                    .Where(t => t.GardenId == id && t.Hashtag == Tag.Hashtag)
                    .FirstAsync();

                if (tagExists == null)
                {
                    return NotFound(new { message = "Garden tag not found" });
                }

                _db.TagsInterests.Remove(tagExists);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Tag Deleted !" });

            }
            catch (Exception)
            {
                return BadRequest(new { message = "Tag not found" });
            }

        }
    }
}

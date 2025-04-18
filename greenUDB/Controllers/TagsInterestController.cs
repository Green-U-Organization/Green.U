﻿    using GreenUApi.Models;
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

        public class HashtagContainer
        {
            public required List<string> Hashtags { get; set;}
        }

        [HttpPost("user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTags(long id, [FromBody] TagsInterest Tag)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound(new { isEmpty = true, message = "User not found" });
            }

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.UserId == id && t.Hashtag == Tag.Hashtag);

            if (!tagExists)
            {

                Tag.UserId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { isEmpty = true, message = "User tag created !"});
            }
            else
            {
                return Conflict(new { isEmpty = false, message = "The tag with this user is already exist", content = tagExists });
            }
          
        }

        [HttpPost("list/user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTagWithList(long id, [FromBody] HashtagContainer container)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { isEmpty = true, message = "User not found" });
            }

            // Create all entities with Select and add all tags with AddRange()
            // https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic.list-1.addrange?view=net-8.0
            var newTags = container.Hashtags.Select(tag => new TagsInterest
            {
                Hashtag = tag,
                UserId = id 
            }).ToList();

            _db.TagsInterests.AddRange(newTags);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "User tag list created !", content = newTags });
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<TagsInterest>> GetUserTag(long id)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return NotFound(new { isEmpty = true, message = "User not found" });
            }

            var UserTags = await _db.TagsInterests
           .Where(t => t.UserId == id)
           .Select(t => t.Hashtag)
           .ToArrayAsync();

            if (UserTags.Length == 0)
            {
                return NotFound(new { message = "This user doesn't have tags" });
            }

            return Ok(new { isEmpty = false, message = "User Tag", content = UserTags});
        }

        [HttpDelete("user/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteUserTag(long id, TagsInterest Tag)
        {

                var tagExists = await _db.TagsInterests
                    .Where(t => t.UserId == id && t.Hashtag == Tag.Hashtag)
                    .FirstOrDefaultAsync();

                if (tagExists == null)
                {
                    return NotFound(new { isEmpty = true, message = "User tag not found" });
                }

                _db.TagsInterests.Remove(tagExists);
                await _db.SaveChangesAsync();

                return Ok(new { isEmpty = false, message = "Tag Deleted !", content = tagExists});

        }



        [HttpPost("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTag(long id, [FromBody] TagsInterest Tag)
        {
            var Garden = await _db.Gardens.FindAsync(id);

            if (Garden == null)
            {
                return NotFound(new { isEmpty = true, message = "Garden not found" });
            }

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.GardenId == id && t.Hashtag == Tag.Hashtag);

            if (!tagExists)
            {

                Tag.GardenId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { isEmpty = false, message = "Garden tag created !", content = Tag });
            }
            else
            {
                return Conflict(new { isEmpty = true, message = "The tag with this garden is already exist" });
            }

        }

        [HttpPost("list/garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTagWithList(long id, [FromBody] HashtagContainer container)
        {
            var Garden = await _db.Gardens.FindAsync(id);
            if (Garden == null)
            {
                return NotFound(new { isEmpty = true, message = "Garden not found" });
            }

            // Create all entities with Select and add all tags with AddRange()
            // https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic.list-1.addrange?view=net-8.0
            var newTags = container.Hashtags.Select(tag => new TagsInterest
            {
                Hashtag = tag,
                GardenId = id
            }).ToList();

            _db.TagsInterests.AddRange(newTags);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false,  message = "User tag list created !", content = newTags});
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

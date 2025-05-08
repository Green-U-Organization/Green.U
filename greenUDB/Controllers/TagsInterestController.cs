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

        public class TagsInterestDTO
        {
            public required List<string> Hashtags { get; set;}
        }

        [HttpPost("user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTags(long id, [FromBody] TagsInterest Tag)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null) return NotFound(new { isEmpty = true, message = "User not found" });

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.UserId == id && t.Hashtag == Tag.Hashtag);

            if (tagExists) return Conflict(new { isEmpty = false, message = "The tag with this user is already exist", content = tagExists });

            Tag.UserId = id;

            _db.TagsInterests.Add(Tag);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = true, message = "User tag created !"});
          
        }

        [HttpPost("list/user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateUserTagWithList(long id, [FromBody] TagsInterestDTO container)
        {
            var user = await _db.Users
                .Where(u => u.Id == id)
                .AnyAsync();

            if (!user) return NotFound(new { isEmpty = true, message = "User not found" });

            // Create all entities with Select and add all tags with AddRange()
            // https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic.list-1.addrange?view=net-8.0
            var newTags = container.Hashtags
                .Select(tag => new TagsInterest
                {
                    Hashtag = tag,
                    UserId = id 
                })
                .ToList();

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

            if (UserTags.Length == 0) return NotFound(new { message = "This user doesn't have tags" });

            return Ok(new { isEmpty = false, message = "User Tag", content = UserTags});
        }

        [HttpGet("allusers")]
        public async Task<ActionResult<TagsInterest>> GetAllUserByTag([FromBody] TagsInterest tag)
        {
            if (tag.Hashtag == null) return BadRequest(new { isEmpty = true, message = "Hashtag is needed." });

            var user = await _db.TagsInterests
                .Where(t => t.Hashtag == tag.Hashtag)
                .Select(t => 
                    _db.Users.Where(u => u.Id == t.UserId).Select(u => new
                    {
                        u.Id,
                        u.Username,
                        u.Xp,
                        u.Country,
                        u.Bio,
                        u.TagsInterests
                    }).FirstOrDefault()
                    )
                    .ToArrayAsync();

            if (user.Length == 0) return BadRequest(new { isEmpty = true, message = "This tag is doesn't exist" });

            return Ok(new { isEmpty = false, message = "All user with tag", content = user });
        }

        [HttpDelete("user/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteUserTag(long id, TagsInterest Tag)
        {

                var tagExists = await _db.TagsInterests
                    .Where(t => t.UserId == id && t.Hashtag == Tag.Hashtag)
                    .FirstOrDefaultAsync();

                if (tagExists == null) return NotFound(new { isEmpty = true, message = "User tag not found" });

                _db.TagsInterests.Remove(tagExists);
                await _db.SaveChangesAsync();

                return Ok(new { isEmpty = false, message = "Tag Deleted !", content = tagExists});

        }

        [HttpDelete("list/user/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteUserTagWithList(long id, [FromBody] TagsInterestDTO tags)
        {
            var user = await _db.Users
                .Where(u => u.Id == id)
                .AnyAsync();

            if (!user) return NotFound(new { isEmpty = true, message = "User not found" });

            // Delete all entities with RemoveRange();
            // https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.removerange?view=net-9.0
            var Tags = await _db.TagsInterests
                .Where(t => t.UserId == id && tags.Hashtags.Contains(t.Hashtag))
                .ToArrayAsync();

            if (Tags.Length != tags.Hashtags.Count) return BadRequest(new { isEmpty = false, message = "A tag is incorrect..." });

            _db.TagsInterests.RemoveRange(Tags);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "User tag list Deleted !", content = Tags });
        }



        [HttpPost("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTag(long id, [FromBody] TagsInterest Tag)
        {
            var Garden = await _db.Gardens.FindAsync(id);

            if (Garden == null) return NotFound(new { isEmpty = true, message = "Garden not found" });

            bool tagExists = await _db.TagsInterests
                .AnyAsync(t => t.GardenId == id && t.Hashtag == Tag.Hashtag);

            if (tagExists) return Conflict(new { isEmpty = true, message = "The tag with this garden is already exist" });

                Tag.GardenId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok(new { isEmpty = false, message = "Garden tag created !", content = Tag });

        }

        [HttpPost("list/garden/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateGardenTagWithList(long id, [FromBody] TagsInterestDTO container)
        {
            var Garden = await _db.Gardens.FindAsync(id);
            if (Garden == null) return NotFound(new { isEmpty = true, message = "Garden not found" });

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

            if (User == null) return NotFound("Garden not found");

            var GardenTag = await _db.TagsInterests
           .Where(t => t.GardenId == id)
           .Select(t => t.Hashtag)
           .ToArrayAsync();

            if (GardenTag.Length == 0) return NotFound(new { message = "This garden doesn't have tags" });

            return Ok(new { isEmpty = false, message = "Your garden tag", content = GardenTag});
        }

        [HttpGet("allgarden")]
        public async Task<ActionResult<TagsInterest>> GetAllGardenByTag([FromBody] TagsInterest tag)
        {
            if (tag.Hashtag == null) return BadRequest(new { isEmpty = true, message = "Hashtag is needed." });

            var garden = await _db.TagsInterests
                .Where(t => t.Hashtag == tag.Hashtag)
                .Select(t =>
                    _db.Gardens.Where(g => g.Id == t.GardenId).Select(g => new
                    {
                        g.Id,
                        g.Name,
                        g.Description,
                        g.Type,
                        g.TagsInterests
                    }).FirstOrDefault()
                    )
                    .ToArrayAsync();

            if (garden.Length == 0) return BadRequest(new { isEmpty = true, message = "This tag is doesn't exist" });

            return Ok(new { isEmpty = false, message = "All user with tag", content = garden });
        }

        [HttpDelete("garden/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteGardenTag(long id, TagsInterest Tag)
        {
                var tagExists = await _db.TagsInterests
                    .Where(t => t.GardenId == id && t.Hashtag == Tag.Hashtag)
                    .FirstOrDefaultAsync();

                if (tagExists == null) return NotFound(new { message = "Garden tag not found" });

                _db.TagsInterests.Remove(tagExists);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Tag Deleted !" });
        }

        [HttpDelete("list/garden/{id}")]
        public async Task<ActionResult<TagsInterest>> DeleteGardenTagWithList(long id, [FromBody] TagsInterestDTO tags)
        {
            var user = await _db.Users
                .Where(u => u.Id == id)
                .AnyAsync();

            if (!user) return NotFound(new { isEmpty = true, message = "User not found" });

            // Delete all entities with RemoveRange();
            // https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.removerange?view=net-9.0
            var Tags = await _db.TagsInterests
                .Where(t => t.GardenId == id && tags.Hashtags.Contains(t.Hashtag))
                .ToArrayAsync();

            if (Tags.Length != tags.Hashtags.Count) return BadRequest(new { isEmpty = false, message = "A tag is incorrect..." });

            _db.TagsInterests.RemoveRange(Tags);

            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "User tag list Deleted !", content = Tags });
        }
    }
}

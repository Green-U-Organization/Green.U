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

        public class HashtagListRequest
        {
            public required string[] Hashtags { get; set;}
        }

        [HttpGet("popular")]
        public async Task<ActionResult<TagsInterest>> GetPopularTags()
        {

            var PopularTags = await _db.TagsInterests
                .GroupBy(t => t.Hashtag)
                .Select(g => new
                {
                    Tag = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(t => t.Count)
                .ToArrayAsync();

            if (PopularTags.Length == 0) return BadRequest(new { isEmpty = true, message = "No tag..." });

            return Ok(new { isEmpty = false, message = "All popular tag", content = PopularTags });
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

        [HttpPost("allusers")]
        public async Task<ActionResult<TagsInterest>> GetAllUserByTags([FromBody] HashtagListRequest request)
        {
            if (request.Hashtags == null || !request.Hashtags.Any())
                return BadRequest(new { isEmpty = true, message = "Hashtag is needed." });

            // check user and count match tag
            var usersWithMatchingTags = await _db.TagsInterests
                .Where(t => request.Hashtags.Contains(t.Hashtag))
                .GroupBy(t => t.UserId)
                .Select(group => new
                {
                    UserId = group.Key,
                    MatchingTagsCount = group.Count()
                })
                .ToListAsync();

            if (!usersWithMatchingTags.Any())
                return BadRequest(new { isEmpty = true, message = "No users found with these tags" });

            // get users data
            var userIds = usersWithMatchingTags.Select(u => u.UserId).ToList();
            var usersWithDetails = await _db.Users
                .Where(u => userIds.Contains(u.Id) && !u.Deleted)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Bio,
                    u.Skill_level,
                    TagsInterests = u.TagsInterests.Select(t => t.Hashtag).ToList(),
                })
                .ToListAsync();

            var result = usersWithDetails.Select(user => {
                var matchingInfo = usersWithMatchingTags.First(ut => ut.UserId == user.Id);
                return new
                {
                    user.Id,
                    user.Username,
                    user.Bio,
                    user.Skill_level,
                    TagsInterests = user.TagsInterests,
                    MatchingTagsCount = matchingInfo.MatchingTagsCount
                };
            })
                .OrderByDescending(u => u.MatchingTagsCount)
                .ToList();

            if (result.Count == 0) return BadRequest(new { isEmpty = true, message = "This tag exist for garden but no in user" });

            return Ok(new
            {
                isEmpty = false,
                message = "Users with matching tags",
                content = result,
                searchedTags = request.Hashtags
            });
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
            // https://learn.microsoft.com/fr-fr/dotnet/api/microsoft.entityframeworkcore.dbset-1.removerange?view=efcore-9.0   
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

        [HttpPost("allgardens")]
        public async Task<ActionResult<TagsInterest>> GetAllGardensByTags([FromBody] HashtagListRequest request)
        {
            if (request.Hashtags == null || !request.Hashtags.Any())
                return BadRequest(new { isEmpty = true, message = "Hashtag is needed." });

            // check garden and count match tag
            var gardensWithMatchingTags = await _db.TagsInterests
                .Where(t => request.Hashtags.Contains(t.Hashtag))
                .GroupBy(t => t.GardenId)
                .Select(group => new
                {
                    GardenId = group.Key,
                    MatchingTagsCount = group.Count()
                })
                .ToListAsync();

            if (!gardensWithMatchingTags.Any())
                return BadRequest(new { isEmpty = true, message = "No gardens found with these tags" });

            // get gardens data
            var gardenIds = gardensWithMatchingTags.Select(g => g.GardenId).ToList();
            var gardensWithDetails = await _db.Gardens
                .Where(g => gardenIds.Contains(g.Id) && !g.Deleted)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Description,
                    g.Type,
                    TagsInterests = g.TagsInterests.Select(t => t.Hashtag).ToList(),
                })
                .ToListAsync();

            var result = gardensWithDetails.Select(garden => {
                var matchingInfo = gardensWithMatchingTags.First(g => g.GardenId == garden.Id);
                return new
                {
                    garden.Id,
                    garden.Name,
                    garden.Description,
                    garden.Type,
                    TagsInterests = garden.TagsInterests,
                    MatchingTagsCount = matchingInfo.MatchingTagsCount
                };
            })
                .OrderByDescending(u => u.MatchingTagsCount)
                .ToList();

            if (result.Count == 0) return BadRequest(new { isEmpty = true, message = "This tag exist for user but no in garden" });

            return Ok(new
            {
                isEmpty = false,
                message = "Garden with matching tags",
                content = result,
                searchedTags = request.Hashtags
            });
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
            // https://learn.microsoft.com/fr-fr/dotnet/api/microsoft.entityframeworkcore.dbset-1.removerange?view=efcore-9.0
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

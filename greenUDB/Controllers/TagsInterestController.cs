using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GreenUApi.Controllers
{
    [Route("tags")]
    [ApiController]
    public class TagsInterestController(GreenUDB db)  : ControllerBase
    {
        private readonly GreenUDB _db = db;

        [HttpPost("user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateTags(long id, [FromBody] TagsInterest Tag)
        {
            var User = await _db.Users.FindAsync(id);

            var TagDb = await _db.TagsInterests
                .Where(t => t.UserId == id && t.Hashtag == Tag.Hashtag)
                .ToArrayAsync();

            if (User == null)
            {
                return NotFound("User not found");
            }

            Console.WriteLine(TagDb[0]?.Hashtag + Tag.Hashtag);

            
            if (TagDb[0]?.Hashtag != Tag.Hashtag)
            {

                Tag.UserId = id;

                _db.TagsInterests.Add(Tag);
                await _db.SaveChangesAsync();

                return Ok("Tag created !");
            }
            else
            {
                return BadRequest("The tag with this user is already exist");
            }
          
        }
    }
}

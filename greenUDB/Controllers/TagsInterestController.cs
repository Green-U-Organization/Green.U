using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GreenUApi.Controllers
{
    [Route("tags")]
    [ApiController]
    public class TagsInterestController(GreenUDB db)  : ControllerBase
    {
        private readonly GreenUDB _db = db;

        [HttpPost("user/{id}")]
        public async Task<ActionResult<TagsInterest>> CreateTags(long id, [FromBody] string Hashtag)
        {

            var Tags = await _db.TagsInterests.FindAsync(id);

            return NotFound();
          
        }
    }
}

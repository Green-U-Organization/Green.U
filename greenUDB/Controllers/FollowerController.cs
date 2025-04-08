using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GreenUApi.Controllers
{

    [Route("follower")]
    [ApiController]
    public class FollowerController : ControllerBase
    {
        private readonly GreenUDB _db;

        public FollowerController(GreenUDB db)
        {
            _db = db;
        }

        [HttpPost("user/{id}")]
        public IActionResult FollowAnUser(long id, Follower follower)
        {

            if (follower.FollowerId == 0)
            {
                return NotFound(new { message = "Follower id is missed"});
            }

            

            return Ok();
        }
    }
}

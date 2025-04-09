using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YamlDotNet.Core.Tokens;

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
        public async Task<ActionResult<Follower>> FollowAnUser(long id, Follower followerData)
        {

            if (followerData.FollowerId == 0)
            {
                return NotFound(new { message = "Follower id is missed"});
            }

            var User = await _db.Users.FindAsync(id);
            var CheckFollowerId = await _db.Users.FindAsync(followerData.FollowerId);

            if (User == null)
            {
                return NotFound("User not found");
            }

            if (CheckFollowerId == null)
            {
                return NotFound("Follower Id not found");
            }
            
            bool followExists = await _db.Followers
                .AnyAsync(f => f.UserId == id && f.FollowerId == followerData.FollowerId);

            if (followExists)
            {
                return BadRequest(new { message = "The follow is already exist"});
            }

            followerData.UserId = id;

            _db.Followers.Add(followerData);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Follow complete !"});
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<Follower>> GetFollowerUser(long id)
        {
           var Follow = await _db.Followers
                .Where(f => f.UserId == id)
                .Join(
               _db.Users,
               follower => follower.FollowerId,
               user => user.Id,
               (follower, user) => new
               {
                   FollowerId = follower.FollowerId,
                   UserId = user.Username,
               }
               )
                .ToListAsync();

            //var followsWithUsernames = await _db.Followers
            //    .Where(f => f.UserId == id)
            //    .Join(
            //    _db.Users,                  // La table avec laquelle vous voulez faire la jointure
            //    follower => follower.FollowerId,  // La clé de la première table
            //    user => user.Id,                  // La clé de la deuxième table
            //    (follower, user) => new {         // Le résultat projeté
            //    FollowerId = follower.FollowerId,
            //    Username = user.Username      // En supposant que la propriété s'appelle Username
            //    })
            //    .ToListAsync();

            return Ok(new { message = "The list of follower", content =  Follow });
        }

    }
}

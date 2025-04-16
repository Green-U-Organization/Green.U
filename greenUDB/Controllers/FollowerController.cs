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
                return NotFound(new { message = "Follower id is missed" });
            }

            var User = await _db.Users.FindAsync(id);
            var CheckFollowerId = await _db.Users.FindAsync(followerData.FollowerId);

            if (User == null)
            {
                return NotFound(new { message = "User not found" });
            }

            if (CheckFollowerId == null)
            {
                return NotFound(new { message = "Follow id user not found" });
            }

            bool followExists = await _db.Followers
                .AnyAsync(f => f.UserId == id && f.FollowerId == followerData.FollowerId);

            if (followExists)
            {
                return BadRequest(new { message = "This follow row is already exist" });
            }

            followerData.UserId = id;

            _db.Followers.Add(followerData);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Follow complete !" });
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<Follower>> GetFollowerUser(long id)
        {

            var User = await _db.Users.FindAsync(id);

            if (User == null)
            {
                return BadRequest(new { message = "The user id doesn't exist" });
            }

            var Follow = await _db.Followers
                   .Where(f => f.UserId == id)
                   .Join(
               _db.Users,
               follower => follower.FollowerId,
               user => user.Id,
               (follower, user) => new
               {
                   follower.FollowerId,
                   user.Username,
               }
               )
                   .ToListAsync();

            if (Follow.Count == 0)
            {
                return NotFound(new { message = "This user didn't have follower" });
            }



            return Ok(new { message = "The list of follower", content = Follow });
        }

        [HttpDelete("user/{id}")]
        public async Task<ActionResult<Follower>> DeleteUserFollow(long id, Follower follower)
        {

            // I use FirstOrDefaultAsync because if id is incorrect this method return Null 
            // https://learn.microsoft.com/en-us/dotnet/api/system.data.entity.queryableextensions.firstordefaultasync?view=entity-framework-6.2.0
            var followExist = await _db.Followers
                .FirstOrDefaultAsync(f => f.UserId == id && f.FollowerId == follower.FollowerId);

            if (followExist == null)
            {
                return BadRequest(new { message = "We have an inccorect id" });
            }

            _db.Followers.Remove(followExist);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Unfollow complete !"});
        }


        [HttpPost("garden/{id}")]
        public async Task<ActionResult<Follower>> FollowAGarden(long id, Follower followerData)
        {

            if (followerData.FollowerId == 0)
            {
                return NotFound(new { message = "Follower id is missed" });
            }

            var Garden = await _db.Gardens.FindAsync(id);
            var CheckFollowerId = await _db.Users.FindAsync(followerData.FollowerId);

            if (Garden == null)
            {
                return NotFound(new { message = "Garden not found" });
            }

            if (CheckFollowerId == null)
            {
                return NotFound(new { message = "Follow id user not found" });
            }

            bool followExists = await _db.Followers
                .AnyAsync(f => f.GardenId == id && f.FollowerId == followerData.FollowerId);

            if (followExists)
            {
                return BadRequest(new { message = "This follow row is already exist" });
            }

            followerData.GardenId = id;

            _db.Followers.Add(followerData);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Garden Follow complete !" });
        }

        [HttpGet("garden/{id}")]
        public async Task<ActionResult<Follower>> GetFollowerGarden(long id)
        {

            var Garden = await _db.Gardens.FindAsync(id);

            if (Garden == null)
            {
                return BadRequest(new { message = "The garden id doesn't exist" });
            }

            var Follow = await _db.Followers
                   .Where(f => f.GardenId == id)
                   .Join(
               _db.Users,
               follower => follower.FollowerId,
               user => user.Id,
               (follower, user) => new
               {
                   follower.FollowerId,
                   user.Username,
               }
               )
                   .ToListAsync();

            if (Follow.Count == 0)
            {
                return NotFound(new { message = "This garden didn't have follower" });
            }



            return Ok(new { message = "The list of garden follower", content = Follow });
        }

        [HttpDelete("garden/{id}")]
        public async Task<ActionResult<Follower>> DeleteGardenFollow(long id, Follower follower)
        {

            // I use FirstOrDefaultAsync because if id is incorrect this method return Null 
            // https://learn.microsoft.com/en-us/dotnet/api/system.data.entity.queryableextensions.firstordefaultasync?view=entity-framework-6.2.0
            var followExist = await _db.Followers
                .FirstOrDefaultAsync(f => f.GardenId == id && f.FollowerId == follower.FollowerId);

            if (followExist == null)
            {
                return BadRequest(new { message = "We have an inccorect id" });
            }

            _db.Followers.Remove(followExist);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Garden Unfollow complete !" });
        }

    }
}

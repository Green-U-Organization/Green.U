using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{
    [Route("contributor")]
    [ApiController]
    public class ContributorController : ControllerBase
    {
        private readonly GreenUDB _db;

        public ContributorController(GreenUDB context)
        {
            _db = context;
        }

        [HttpPost()]
        public async Task<ActionResult<Contributor>> AddANewContributor(Contributor contributor)
        {

            if (contributor == null) return BadRequest(new { isEmpty = true, message = "The body is incorrect..." });

            bool ContributorExist = await _db.Contributors
                .Where(c => c.GardenId == contributor.GardenId && c.UserId == contributor.UserId)
                .AnyAsync();

            if (ContributorExist) return BadRequest(new { isEmpty = true, message = "This contributor is already exist" });
            
            bool UserExist = await _db.Users
                .Where(u => u.Id == contributor.UserId)
                .AnyAsync();

            if (!UserExist) return BadRequest(new { isEmpty = true, message = "The user id is incorrect" });

            bool GardenExist = await _db.Gardens
                .Where(g => g.Id == contributor.GardenId)
                .AnyAsync();

            if (!GardenExist) return BadRequest(new { isEmpty = true, message = "The garden id is incorrect" });

            _db.Add(contributor);
            await _db.SaveChangesAsync();
            return Ok(new { isEmpty = false, message = "New contributor is created !", content = contributor});

        }

    }
}

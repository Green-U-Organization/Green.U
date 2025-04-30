using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{
    public class ContributorDTO
    {
        public bool Admin { get; set; }
    }

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
            return Ok(new { isEmpty = false, message = "New contributor is created !", content = contributor });

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Contributor>> DeleteContributor(long id)
        {

            var contributorExist = await _db.Contributors
                .FirstOrDefaultAsync(c => c.UserId == id);

            if (contributorExist == null) return BadRequest(new { isEmpty = true, message = "We have an inccorect id" });

            _db.Contributors.Remove(contributorExist);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = true, message = "Contribuor deleted !" });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchContributors(long id, ContributorDTO modification)
        {
            var contributor = await _db.Contributors
                .FindAsync(id);

            if (contributor == null) return NotFound(new { isEmpty = true, message = "The id is incorrect" });


            contributor.Admin = modification.Admin;


            _db.Update(contributor);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "The contributor is modified !", content = contributor });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Follower>> GetContributor(long id)
        {

            var contributor = await _db.Contributors.FindAsync(id);

            if (contributor == null) return BadRequest(new { isEmpty = true, message = "The Contributor id doesn't exist" });

            var Contributor = await _db.Contributors
                   .FirstOrDefaultAsync(c => c.Id == id);

            return Ok(new { isEmpty = false, message = "The contributor", content = contributor });
        }

        [HttpGet("/garden/{id}")]
        public async Task<IActionResult> GetContributorsGarden(long id)
        {
            var garden = await _db.Gardens.FindAsync(id);

            if (garden == null)
                return BadRequest(new { isEmpty = true, message = "The garden id doesn't exist" });

            var contributors = await _db.Contributors
                .Where(c => c.GardenId == id)
                .Join(
                    _db.Users,
                    contributor => contributor.UserId,
                    user => user.Id,
                    (contributor, user) => new
                    {
                        user.Id,
                        user.Username
                    })
                .ToListAsync();

            if (contributors.Count == 0)
                return NotFound(new { isEmpty = true, message = "This garden doesn't have any contributors" });

            return Ok(new { isEmpty = false, message = "List of garden contributors", content = contributors });
        }


        [HttpGet("/user/{id}")]
        public async Task<IActionResult> GetGardensByContributor(long id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null)
                return BadRequest(new { isEmpty = true, message = "The user id doesn't exist" });

            var gardens = await _db.Contributors
                .Where(c => c.UserId == id)
                .Join(
                    _db.Gardens,
                    contributor => contributor.GardenId,
                    garden => garden.Id,
                    (contributor, garden) => new
                    {
                        garden.Id,
                        garden.Name,
                        garden.Description
                    })
                .ToListAsync();

            if (gardens.Count == 0)
                return NotFound(new { isEmpty = true, message = "This user doesn't contribute to any garden" });

            return Ok(new { isEmpty = false, message = "List of gardens where user contributes", content = gardens });
        }


    }
}

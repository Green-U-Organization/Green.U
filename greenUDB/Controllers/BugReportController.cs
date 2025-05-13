using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GreenUApi.Controllers
{
    [Route("bug")]
    [ApiController]
    // [Authorize]
    public class BugReportController : ControllerBase
    {
        private readonly GreenUDB _db;

        public BugReportController(GreenUDB context)
        {
            _db = context;
        }

        [HttpPost()]
        public async Task<ActionResult<BugReport>> createABugReport([FromBody] BugReport bugReport)
        {
            if (bugReport == null) return BadRequest(new { isEmpty = true, message = "Problem with your body..." });

            if (bugReport.AuthorId == 0) return BadRequest(new { isEmpty = true, message = "Author id is needed !" });

            if (bugReport.Comment == null) return BadRequest(new { isEmpty = true, message = "Comment is required !" });

            bool userExist = await _db.Users
                .Where(u => u.Id == bugReport.AuthorId)
                .AnyAsync();

            if (!userExist) return NotFound(new { isEmpty = true, message = "User id is incorrect..."}); 

            _db.Add(bugReport);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "Bug report is created !", content = bugReport});
        }
    }
}

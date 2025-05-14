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

        [HttpGet()]
        public async Task<ActionResult<BugReport>> allBugReport()
        {
            var allBug = await _db.BugReports
                .ToArrayAsync();

            if (allBug == null) return NotFound(new { isEmpty = true, message = "No BugReport" });

            return Ok(new { isEmpty = false, message = "All bugs", content = allBug });
        }

        [HttpGet("open")]
        public async Task<ActionResult<BugReport>> allOpenBugReport()
        {
            var allBug = await _db.BugReports
                .Where(b => b.Status == "Open")
                .ToArrayAsync();

            if (allBug == null) return NotFound(new { isEmpty = true, message = "No open bug report" });

            return Ok(new { isEmpty = false, message = "All open bug report", content = allBug });
        }

        [HttpGet("closed")]
        public async Task<ActionResult<BugReport>> allClosedBugReport()
        {
            var allBug = await _db.BugReports
                .Where(b => b.Status == "Closed")
                .ToArrayAsync();

            if (allBug == null) return NotFound(new { isEmpty = true, message = "No open bug report" });

            return Ok(new { isEmpty = false, message = "All open bug report", content = allBug });
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<BugReport>> closeABug(long id)
        {
            if (id == 0) return BadRequest(new { isEmpty = true, message = "The id is needed !" });

            var bug = await _db.BugReports
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();

            if (bug == null || bug.Status == null) return NotFound(new { isEmpty = true, message = "The id is incorrect... " });

            if (bug.Status == "Closed") return Conflict(new { isEmpty = true, message = "This bug report is already closed !" });

            bug.Status = "Closed";

            _db.Update(bug);
            await _db.SaveChangesAsync();

            return Ok(new { isEmpty = false, message = "The bug is closed !", content = bug});
        }
    }
}

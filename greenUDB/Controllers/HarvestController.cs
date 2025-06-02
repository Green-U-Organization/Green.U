using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{

    [Route("harvest")]
    [ApiController]
    public class HarvestController : ControllerBase
    {

        private readonly GreenUDB _db;

        [HttpPost]
        public async Task<IActionResult> CreateHarvest([FromBody] Harvest harvest)
        {

        }
    }
}

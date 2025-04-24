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

    }
}

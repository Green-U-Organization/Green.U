using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GreenUApi.Controllers
{
    [Route("/tags")]
    [ApiController]
    public class TagsInterestController(GreenUDB db)
    {
        private readonly GreenUDB _db = db;
    }
}

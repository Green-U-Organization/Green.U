using Microsoft.EntityFrameworkCore;
using GreenUApi.authentification;
using Microsoft.AspNetCore.Mvc;
using GreenUApi.Models;

namespace GreenUApi.Controllers
{

    [Route("test")]
    [ApiController]
    public class TestController : ControllerBase
    {

        [HttpGet]
        public OkObjectResult Test()
        {
            return Ok(new { isEmpty = true, message = "The api work well !" });
        }
    }
}

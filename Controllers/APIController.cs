using Microsoft.AspNetCore.Mvc;
using ApiCreation.Models;
using ApiCreation.Services.contract;
using ApiCreation.utilities;

namespace ApiCreation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIController : ControllerBase
    {
        private readonly iLogin _loginService;

        public APIController(iLogin loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("register")]
        public IActionResult Register( LoginRequest loginRequest)
        {
            try
            {
                var result = _loginService.AddData(loginRequest);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public IActionResult Login( LoginRequest loginRequest)
        {
            try
            {
                var result = _loginService.Verify(loginRequest);
                if (result == "wrong" || result == "Wrong Password")
                {
                    return Unauthorized(result);
                }

                return Ok(new { token = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}

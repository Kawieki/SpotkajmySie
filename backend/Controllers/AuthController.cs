using Backend.DTOs.Users;
using Backend.Services.Users;
using Backend.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly IValidator<CreateUserDto> _createValidator;

    public AuthController(
        IConfiguration configuration,
        IUserService userService,
        IValidator<CreateUserDto> createValidator
        )
    {
        _configuration = configuration;
        _userService = userService;
        _createValidator = createValidator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            var problemDetails = new HttpValidationProblemDetails(validationResult.ToDictionary())
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Błąd walidacji",
                Detail = "Wystąpił jeden lub więcej błędów walidacji"
            };

            return BadRequest(problemDetails);
        }

        await _userService.RegisterAsync(dto);
        return Ok("Zarejestrowano pomyślnie");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userService.AuthenticateAsync(dto);
        var token = JwtHelper.GenerateJwtToken(user, _configuration);

        return Ok(new { AccessToken = token });
    }
}
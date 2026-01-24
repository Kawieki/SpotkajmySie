using Backend.DTOs.Registrations;
using Backend.Services.Registrations;
using Backend.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class RegistrationsController : ControllerBase
{
    private readonly IRegistrationService _registrationService;
    private readonly IValidator<CreateRegistrationDto> _createValidator;

    public RegistrationsController(IRegistrationService registrationService, IValidator<CreateRegistrationDto> createValidator)
    {
        _registrationService = registrationService;
        _createValidator = createValidator;
    }


    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllRegistrations(
        [FromQuery] int page, [FromQuery] int pageSize
    )
    {
        var registrations = await _registrationService.GetAll(page, pageSize);
        return Ok(registrations);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetRegistrationById([FromRoute] int id)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = User.IsInRole("Admin");
        
        var registration = await _registrationService.GetById(id);

        if (!isAdmin && currentUserId != registration.OrganizerId && currentUserId != registration.UserId)
        {
            return Forbid();
        }

        return Ok(registration);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteRegistration(int id)
    {
        var isAdmin = User.IsInRole("Admin");
        var currentUserId = User.GetUserId();
        var registration = await _registrationService.GetById(id);

        if (!isAdmin && currentUserId != registration.UserId)
        {
            return Forbid();
        }

        await _registrationService.Delete(id);
        return Ok("Successfully deleted registration");
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateRegistration([FromRoute] int id, [FromBody] UpdateRegistrationDto dto)
    {
        var registration = await _registrationService.GetById(id);

        var currentUser = User.GetUserId();
        var isEventOrganizer = registration.OrganizerId == currentUser;

        if (!User.CanModifyResource(registration.UserId, isEventOrganizer))
        {
            return Forbid();
        }

        var updatedRegistration = await _registrationService.Update(id, dto);

        return Ok(updatedRegistration);
    }


    [HttpPost]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> CreateRegistration([FromBody] CreateRegistrationDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            var problemDetails = new HttpValidationProblemDetails(validationResult.ToDictionary())
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Validation Failed",
                Detail = "One or more validation errors occured"
            };

            return BadRequest(problemDetails);
        }

        var currentUserId = User.GetUserId();
        var isAdmin = User.IsInRole("Admin");

        if (!isAdmin && currentUserId != dto.UserId)
        {
            return Forbid();
        }

        var registration = await _registrationService.Create(dto);

        return CreatedAtAction(
            nameof(GetRegistrationById),
            new { id = registration.Id },
            registration
            );
    }

    [HttpGet("my")]
    public async Task<IActionResult> GetMyRegistrations(
        [FromQuery] int page,
        [FromQuery] int pageSize
    )
    {
        var currentUserId = User.GetUserId();
        var registrations = await _registrationService
            .GetMyRegistrations(currentUserId, page, pageSize);

        return Ok(registrations);
    }

    [HttpGet("organizer")]
    [Authorize(Roles = "Organizer,Admin")]
    public async Task<IActionResult> GetOrganizerRegistrations(
        [FromQuery] int page,
        [FromQuery] int pageSize
        )
    {
        var currentUserId = User.GetUserId();
        var registrations = await _registrationService
            .GetOrganizerRegistrations(currentUserId, page, pageSize);

        return Ok(registrations);
    }

}


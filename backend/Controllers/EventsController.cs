using Backend.DTOs.Events;
using Backend.Models.Enums;
using Backend.Services.Events;
using Backend.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;
    private readonly IValidator<CreateEventDto> _createValidator;
    private readonly IValidator<CreateEventDto> _adminCreateValidator;
    private readonly IValidator<UpdateEventDto> _updateValidator;



    public EventsController(
        IEventService eventService,
        IValidator<CreateEventDto> createValidator,
        IValidator<UpdateEventDto> updateValidator, IValidator<CreateEventDto> adminCreateValidator)
    {
        _eventService = eventService;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
        _adminCreateValidator = adminCreateValidator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEvents(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
        )
    {
        var currentUserId = User.GetUserIdOrNull();
        var role = User.GetUserRoleOrNull() ?? UserRole.User;
        var events = await _eventService.GetAll(page, pageSize, currentUserId, role);
        return Ok(events);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetEventDetails([FromRoute] int id)
    {
        var currentUserId = User.GetUserIdOrNull();
        var role = User.GetUserRoleOrNull() ?? UserRole.User;

        var eventDetails = await _eventService.GetDetails(id, currentUserId, role);
        return Ok(eventDetails);
    }

    [Authorize(Roles = "Admin,Organizer")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var currentUserId = User.GetUserId();
        var isAdmin = User.IsInRole("Admin");
        var result = await _eventService.GetById(id); ;

        if (!isAdmin && result.Organizer.Id != currentUserId)
        {
            return Forbid();
        }

        await _eventService.Delete(id);
        return Ok();
    }

    [Authorize(Roles = "Admin,Organizer")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateEvent([FromRoute] int id, [FromBody] UpdateEventDto dto)
    {
        var validatorResult = _updateValidator.Validate(dto);

        if (!validatorResult.IsValid)
        {
            var problemDetails = new HttpValidationProblemDetails(validatorResult.ToDictionary())
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Validation Failed",
                Detail = "One or more validation errors occured"
            };

            return BadRequest(problemDetails);
        }

        var eventModified = await _eventService.GetById(id);
        var isAdmin = User.IsInRole("Admin");
        var currentUserId = User.GetUserId();

        if (!isAdmin && eventModified.Organizer.Id != currentUserId)
        {
            return Forbid();
        }

        var result = await _eventService.Update(id, dto);

        return Ok(result);
    }

    [Authorize(Roles = "Admin, Organizer")]
    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
    {
        var userRole = User.GetUserRole();
        var validationResult = userRole is UserRole.Admin ?
            _adminCreateValidator.Validate(dto) :
            _createValidator.Validate(dto);

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

        var organizerId = userRole is UserRole.Admin
            ? dto.OrganizerId!.Value
            : User.GetUserId();

        var result = await _eventService.Create(dto, organizerId);

        return CreatedAtAction(nameof(GetEventDetails), new { id = result.Id }, result);
    }
}
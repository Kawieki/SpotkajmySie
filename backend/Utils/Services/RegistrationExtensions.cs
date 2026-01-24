using Backend.DTOs.Registrations;
using Backend.Models;

namespace Backend.Utils.Services;

public static class RegistrationExtensions
{
    public static RegistrationDetailsDto MapToDetailsDto(this Registration registration)
    {
        return new RegistrationDetailsDto
        {
            Id = registration.Id,
            RegistrationDate = registration.RegistrationDate,
            Status = registration.Status,
            UserId = registration.UserId,
            UserName = $"{registration.User.FirstName} {registration.User.LastName}",
            Email = registration.User.Email,
            Role = registration.User.Role,
            EventId = registration.EventId,
            EventTitle = registration.Event.Title,
            EventStartDate = registration.Event.StartDate,
            EventEndDate = registration.Event.EndDate,
            EventLocation = registration.Event.Location,
            EventDescription = registration.Event.Description,
            OrganizerId = registration.Event.OrganizerId
        };
    }
}
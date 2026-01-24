using Backend.DTOs.Events;
using Backend.DTOs.Registrations;
using Backend.DTOs.Users;
using Backend.Models;
using Backend.Models.Enums;

namespace Backend.Utils.Services;

public static class UserExtensions
{
    public static UserDto ToUserDto(this Registration registration)
    {
        return new UserDto
        {
            Id = registration.User.Id,
            FirstName = registration.User.FirstName,
            LastName = registration.User.LastName,
            Email = registration.User.Email,
            Role = registration.User.Role,
            Description = registration.User.Description
        };
    }

    public static UserDto ToUserDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role,
            Description = user.Description,
        };
    }

    public static UserDetailsDto ToUserDetailsDto(
        this User user,
        UserRole callerRole,
        bool isSelf,
        List<EventPreviewDto> organizedEvents,
        int totalAttendees)
    {
        var participatedEventsCount = user.Registrations
            .Count(r => r.Status == RegistrationStatus.Confirmed);
        
        var dto = new UserDetailsDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Description = user.Description,
            Role = user.Role,
            ParticipatedEventsCount = participatedEventsCount,
            Email = user.Email
        };

        if (organizedEvents.Count != 0)
        {
            dto.OrganizedEvents = organizedEvents;
            dto.OrganizedEventsCount = organizedEvents.Count;
            dto.TotalAttendeesCount = totalAttendees;
        }

        if (callerRole == UserRole.Admin || isSelf)
        {
            dto.Registrations = user.Registrations
                .Select(r => new RegistrationPreviewDto
                {
                    Title = r.Event.Title,
                    Start = r.Event.StartDate,
                    Status = r.Status,
                    Id = r.Id
                })
                .ToList();
        }

        return dto;
    }
}
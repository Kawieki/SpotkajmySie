using Backend.DTOs.Events;
using Backend.DTOs.Users;
using Backend.Models;
using Backend.Models.Enums;

namespace Backend.Utils;

public static class EventExtensions
{
    public static EventDto MapToDto(this Event eventEntity)
    {
        return new EventDto
        {
            Id = eventEntity.Id,
            Title = eventEntity.Title,
            Description = eventEntity.Description,
            StartDate = eventEntity.StartDate,
            EndDate = eventEntity.EndDate,
            Location = eventEntity.Location,
            MaxPeople = eventEntity.MaxPeople,
            Price = eventEntity.Price,
            Website = eventEntity.Website,
            IsOnline = eventEntity.IsOnline,
            Organizer = new UserDto
            {
                Id = eventEntity.Organizer.Id,
                FirstName = eventEntity.Organizer.FirstName,
                LastName = eventEntity.Organizer.LastName,
                Email = eventEntity.Organizer.Email,
                Description = eventEntity.Organizer.Description,
                Role = eventEntity.Organizer.Role
            }
        };
    }

    public static Event CreateFromDto(this CreateEventDto eventDto, int ownerId)
    {
        return new Event
        {
            Title = eventDto.Title,
            Description = eventDto.Description,
            StartDate = eventDto.StartDate,
            EndDate = eventDto.EndDate,
            Location = eventDto.Location,
            MaxPeople = eventDto.MaxPeople,
            Price = eventDto.Price,
            Website = eventDto.Website,
            IsOnline = eventDto.IsOnline,
            OrganizerId = ownerId
        };
    }

    public static EventDetailsDto MapToDetailsDto(
        this Event eventEntity,
        int? currentUserId,
        List<UserDto> participants,
        UserRole role
        )
    {
        var eventDetailsDto = new EventDetailsDto
        {
            Id = eventEntity.Id,
            Title = eventEntity.Title,
            Description = eventEntity.Description,
            StartDate = eventEntity.StartDate,
            EndDate = eventEntity.EndDate,
            Location = eventEntity.Location,
            MaxPeople = eventEntity.MaxPeople,
            Price = eventEntity.Price,
            Website = eventEntity.Website,
            IsOnline = eventEntity.IsOnline,
            Organizer = new UserDto
            {
                Id = eventEntity.Organizer.Id,
                FirstName = eventEntity.Organizer.FirstName,
                LastName = eventEntity.Organizer.LastName,
                Email = eventEntity.Organizer.Email,
                Description = eventEntity.Organizer.Description,
                Role = eventEntity.Organizer.Role
            },
            ParticipantsCount = eventEntity.Registrations.
                Count(r => r.Status == RegistrationStatus.Confirmed),
            IsCurrentUserRegistered = eventEntity.Registrations
                .Any(r => r.UserId == currentUserId && r.Status != RegistrationStatus.Cancelled),
            IsCurrentUserOrganizer = eventEntity.OrganizerId == currentUserId
        };

        if ((role == UserRole.Organizer && currentUserId == eventEntity.OrganizerId) || role == UserRole.Admin)
            eventDetailsDto.Participants = participants;

        return eventDetailsDto;
    }
    
}
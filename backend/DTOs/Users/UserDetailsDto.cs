using Backend.DTOs.Events;
using Backend.DTOs.Registrations;

namespace Backend.DTOs.Users;

public class UserDetailsDto : UserDto
{
    public List<EventPreviewDto>? OrganizedEvents { get; set; }
    public List<RegistrationPreviewDto>? Registrations { get; set; }
    public int? OrganizedEventsCount { get; set; }
    public int? TotalAttendeesCount { get; set; }
    public int ParticipatedEventsCount { get; set; }
}
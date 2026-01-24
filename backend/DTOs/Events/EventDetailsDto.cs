using Backend.DTOs.Users;

namespace Backend.DTOs.Events;

public class EventDetailsDto : EventDto
{
    public List<UserDto>? Participants { get; set; }
    public int ParticipantsCount { get; set; }
    public int SpotsLeft => (MaxPeople ?? 0) - ParticipantsCount;
    public bool IsCurrentUserRegistered { get; set; }
    public bool IsCurrentUserOrganizer { get; set; }
}

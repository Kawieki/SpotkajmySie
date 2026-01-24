using Backend.DTOs.Users;

namespace Backend.DTOs.Events;

public class EventDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Location { get; set; } = null!;
    public int? MaxPeople { get; set; }
    public decimal? Price { get; set; }
    public string? Website { get; set; }
    public bool IsOnline { get; set; }
    public UserDto Organizer { get; set; } = null!;
}
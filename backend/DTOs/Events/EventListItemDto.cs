namespace Backend.DTOs.Events;

public class EventListItemDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public string Location { get; set; } = null!;
    public bool IsOnline { get; set; }
    public string Organizer { get; set; } = null!;
    public int OrganizerId { get; set; }
    public bool IsCurrentUserRegistered { get; set; }
}
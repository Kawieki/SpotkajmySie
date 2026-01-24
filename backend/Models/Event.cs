namespace Backend.Models;


public class Event
{
    public int Id { get; init; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Location { get; set; } = null!;
    public int? MaxPeople { get; set; }
    public decimal? Price { get; set; }
    public string? Website { get; set; }
    public bool IsOnline { get; set; }
    public int OrganizerId { get; set; }
    public User Organizer { get; set; } = null!;
    public ICollection<Registration> Registrations { get; set; } = new List<Registration>();
}
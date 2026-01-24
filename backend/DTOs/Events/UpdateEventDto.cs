namespace Backend.DTOs.Events;

public class UpdateEventDto
{
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
}
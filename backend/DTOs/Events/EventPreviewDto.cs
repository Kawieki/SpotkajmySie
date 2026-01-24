namespace Backend.DTOs.Events;

public class EventPreviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public string Location { get; set; } = null!;
}
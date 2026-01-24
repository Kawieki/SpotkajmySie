using Backend.Models.Enums;

namespace Backend.Models;

public class Registration
{
    public int Id { get; init; }
    public int EventId { get; set; }
    public Event Event { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime RegistrationDate { get; set; }
    public RegistrationStatus Status { get; set; }
}

using Backend.Models.Enums;

namespace Backend.DTOs.Registrations;

public class CreateRegistrationDto
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public RegistrationStatus Status { get; set; }
}
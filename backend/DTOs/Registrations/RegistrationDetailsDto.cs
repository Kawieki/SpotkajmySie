using System.Text.Json.Serialization;
using Backend.Models.Enums;

namespace Backend.DTOs.Registrations;

public class RegistrationDetailsDto
{
    public int Id { get; set; }
    
    public DateTime RegistrationDate { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RegistrationStatus Status { get; set; }
    
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public string? Email { get; set; }
    public UserRole Role { get; set; }
    
    public int EventId { get; set; }
    public string EventTitle { get; set; } = null!;
    public DateTime EventStartDate { get; set; }
    public DateTime EventEndDate { get; set; }
    public int OrganizerId { get; set; }
    public string EventLocation { get; set; } = null!;
    public string? EventDescription { get; set; }
}
using System.Text.Json.Serialization;
using Backend.Models.Enums;

namespace Backend.DTOs.Registrations;

public class RegistrationListItemDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = null!;
    public int EventId { get; set; }
    public string EventTitle { get; set; } = null!;
    public DateTime RegistrationDate { get; set; }
    public int OrganizerId { get; set; }
    public string Email { get; set; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RegistrationStatus Status { get; set; }
}
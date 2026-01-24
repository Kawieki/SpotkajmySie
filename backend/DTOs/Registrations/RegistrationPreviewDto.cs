using System.Text.Json.Serialization;
using Backend.Models.Enums;

namespace Backend.DTOs.Registrations;

public class RegistrationPreviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime Start { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RegistrationStatus Status { get; set; }
}
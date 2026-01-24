using System.Text.Json.Serialization;
using Backend.Models.Enums;

namespace Backend.DTOs.Users;

public class UserItemDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserRole Role { get; set; } = UserRole.User;
    public string DisplayName => $"{UserName} ({Email})";
}
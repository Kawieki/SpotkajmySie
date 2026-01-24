using Backend.Models.Enums;

namespace Backend.DTOs.Users;

public class UpdateUserDto
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Description { get; set; }
    public string Email { get; set; } = null!;
    public UserRole Role { get; set; }
}


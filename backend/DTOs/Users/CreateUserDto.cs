using Backend.Models.Enums;

namespace Backend.DTOs.Users;

public class CreateUserDto
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public UserRole Role { get; set; } = UserRole.User;
    public string Password { get; set; } = null!;
    public string? Description { get; set; }
}
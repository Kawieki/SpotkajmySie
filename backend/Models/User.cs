using Backend.Models.Enums;

namespace Backend.Models;

public class User
{
    public int Id { get; init; } 
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; init; } = null!;
    public UserRole Role { get; set; } = UserRole.User;
    public string? Description { get; set; }
    public ICollection<Registration> Registrations { get; set; } = new List<Registration>();
}
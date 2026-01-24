using Backend.Models.Enums;

namespace Backend.DTOs.Users;

public class ChangeRoleDto
{
    public UserRole NewRole { get; set; }
}
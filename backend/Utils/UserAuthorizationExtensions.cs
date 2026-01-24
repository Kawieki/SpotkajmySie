using System.Security.Claims;
using Backend.Models.Enums;

namespace Backend.Utils;

public static class UserAuthorizationExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(
            user.FindFirstValue(ClaimTypes.NameIdentifier)!
        );
    }
    
    public static int? GetUserIdOrNull(this ClaimsPrincipal user)
    {
        var claimValue = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(claimValue))
            return null;
        return int.Parse(claimValue);
    }

    public static UserRole? GetUserRoleOrNull(this ClaimsPrincipal user)
    {
        var roleClaim = user.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(roleClaim))
            return null;
        return Enum.Parse<UserRole>(roleClaim);
    }

    private static bool IsAdminOrOrganizer(this ClaimsPrincipal user)
    {
        return user.IsInRole("Admin") || user.IsInRole("Organizer");
    }
    
    public static bool CanModifyResource(
        this ClaimsPrincipal user,
        int ownerId)
    {
        return user.IsAdminOrOrganizer() || user.GetUserId() == ownerId;
    }
    
    public static bool CanModifyResource(
        this ClaimsPrincipal user,
        int userId,
        bool isEventOrganizer)
    {
        if (isEventOrganizer || user.IsInRole("Admin"))
            return true;
        
        return user.GetUserId() == userId;
    }
    
    public static UserRole GetUserRole(this ClaimsPrincipal user)
    {
        var roleClaim = user.FindFirst(ClaimTypes.Role)!.Value;
        return Enum.Parse<UserRole>(roleClaim);
    }
}

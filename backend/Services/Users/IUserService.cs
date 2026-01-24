using Backend.DTOs.Users;
using Backend.Models;
using Backend.Models.Enums;
using Backend.Utils.Services;

namespace Backend.Services.Users;

public interface IUserService
{
    Task<PagedList<UserItemDto>> GetAll(int page, int pageSize);
    Task<UserDetailsDto> GetById(int id, int currentUserId, UserRole callerRole);
    Task<bool> Delete(int id);
    Task<UserDto> Update(int id, UpdateUserDto userDto);
    Task<UserDto> Create(CreateUserDto dto);
    Task RegisterAsync(CreateUserDto dto);
    Task<User> AuthenticateAsync(LoginDto dto);
    Task<ChangeRoleDto> ChangeRole(int userId, ChangeRoleDto dto);
}
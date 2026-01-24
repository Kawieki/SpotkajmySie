using System;
using System.Security.Authentication;
using Backend.Data;
using Backend.DTOs.Events;
using Backend.DTOs.Users;
using Backend.Exceptions;
using Backend.Models;
using Backend.Models.Enums;
using Backend.Utils.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Users;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }


    public async Task<PagedList<UserItemDto>> GetAll(int page, int pageSize)
    {
        var query = _context.Users.AsQueryable();

        var usersQuery = query
            .Select(u => new UserItemDto
            {
                Id = u.Id,
                UserName = $"{u.FirstName} {u.LastName}",
                Email = u.Email,
                Role = u.Role,
            }
            );

        var users = await PagedList<UserItemDto>.CreateAsync(
            usersQuery,
            page,
            pageSize
        );

        return users;
    }

    public async Task<UserDetailsDto> GetById(int id, int currentUserId, UserRole callerRole)
    {

        var user = await _context.Users
            .Include(u => u.Registrations)
            .ThenInclude(r => r.Event)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
            throw new NotFoundException("User does not exist");

        var isSelf = user.Id == currentUserId;
        var isAdminOrOrganizer =
           callerRole is UserRole.Admin or UserRole.Organizer;
        var targetIsAdminOrOrganizer =
            user.Role is UserRole.Admin or UserRole.Organizer;

        if (!isSelf && !isAdminOrOrganizer && !targetIsAdminOrOrganizer)
        {
            throw new ForbiddenException(
                "Nie masz uprawnień do przeglądania tego profilu."
            );
        }


        if (user.Role != UserRole.Admin && user.Role != UserRole.Organizer)
            return user.ToUserDetailsDto(callerRole, isSelf, [], 0);

        var organizedEvents = await _context.Events
            .Where(e => e.OrganizerId == user.Id)
            .Select(e => new EventPreviewDto
            {
                Id = e.Id,
                Title = e.Title,
                StartDate = e.StartDate,
                Location = e.Location
            })
            .ToListAsync();

        var totalAttendees = await _context.Events
             .Where(e => e.OrganizerId == user.Id)
             .SelectMany(e => e.Registrations)
             .CountAsync(r => r.Status == RegistrationStatus.Confirmed);

        return user.ToUserDetailsDto(callerRole, isSelf, organizedEvents, totalAttendees);
    }


    public async Task<bool> Delete(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user is null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<UserDto> Update(int id, UpdateUserDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
            throw new NotFoundException("Użytkownik nie istnieje");

        if (!string.Equals(user.Email, dto.Email, StringComparison.OrdinalIgnoreCase))
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (exists) throw new Exception("Email jest już używany przez innego użytkownika");
            user.Email = dto.Email;
        }

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Description = dto.Description;
        user.Role = dto.Role;

        await _context.SaveChangesAsync();

        return user.ToUserDto();
    }

    public async Task<UserDto> Create(CreateUserDto dto)
    {
        var newUser = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Role = dto.Role,
            Description = dto.Description,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Id = newUser.Id,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            Role = newUser.Role,
            Description = newUser.Description,
        };
    }

    public async Task RegisterAsync(CreateUserDto dto)
    {
        var isExisting = await _context.Users
            .AnyAsync(u => u.Email == dto.Email);

        if (isExisting)
        {
            throw new AlreadyExistsException("Email jest już używany");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Description = dto.Description,
            PasswordHash = passwordHash
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User> AuthenticateAsync(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null)
            throw new AuthenticationException("Nieprawidłowy email lub hasło");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            throw new AuthenticationException("Nieprawidłowy email lub hasło");
        }

        return user;
    }

    public async Task<ChangeRoleDto> ChangeRole(int userId, ChangeRoleDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new NotFoundException("Użytkownik nie istnieje");
        }

        user.Role = dto.NewRole;
        await _context.SaveChangesAsync();

        return dto;
    }
}

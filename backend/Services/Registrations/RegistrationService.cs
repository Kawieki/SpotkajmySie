using Backend.Data;
using Backend.DTOs.Registrations;
using Backend.Exceptions;
using Backend.Models;
using Backend.Models.Enums;
using Backend.Utils.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Registrations;

public class RegistrationService : IRegistrationService
{
    private readonly AppDbContext _context;

    public RegistrationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedList<RegistrationListItemDto>> GetAll(int page, int pageSize)
    {
        var registrationsQuery = RegistrationListQuery();
        var registrations = await PagedList<RegistrationListItemDto>
            .CreateAsync(registrationsQuery, page, pageSize);

        return registrations;
    }

    public async Task<RegistrationDetailsDto> GetById(int id)
    {
        var registration = await _context.Registrations
            .Include(r => r.User)
            .Include(r => r.Event)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (registration is null)
            throw new NotFoundException("Rejestracja nie istnieje");

        return registration.MapToDetailsDto();
    }

    public async Task<bool> Delete(int id)
    {
        var registration = await _context.Registrations
            .FirstOrDefaultAsync(r => r.Id == id);

        if (registration is null)
            return false;

        _context.Registrations.Remove(registration);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<RegistrationDetailsDto> Update(int id, UpdateRegistrationDto dto)
    {
        var registration = await _context.Registrations
            .Include(r => r.User)
            .Include(r => r.Event)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (registration == null)
            throw new NotFoundException("Rejestracja nie istnieje");

        registration.Status = dto.Status;
        await _context.SaveChangesAsync();

        return registration.MapToDetailsDto();
    }

    public async Task<RegistrationDetailsDto> Create(CreateRegistrationDto dto)
    {
        var registration = await _context.Registrations
            .FirstOrDefaultAsync(r => r.UserId == dto.UserId && r.EventId == dto.EventId);

        if (registration != null)
            throw new AlreadyExistsException("Rejestracja już istnieje");

        registration = new Registration
        {
            UserId = dto.UserId,
            EventId = dto.EventId,
            RegistrationDate = DateTime.UtcNow,
            Status = dto.Status
        };

        _context.Registrations.Add(registration);
        await _context.SaveChangesAsync();
        await _context.Entry(registration).Reference(r => r.User).LoadAsync();
        await _context.Entry(registration).Reference(r => r.Event).LoadAsync();

        return registration.MapToDetailsDto();
    }

    public async Task<PagedList<RegistrationListItemDto>> GetMyRegistrations(int userId, int page, int pageSize)
    {
        var query = RegistrationListQuery()
            .Where(r => r.UserId == userId);

        var registrations = await PagedList<RegistrationListItemDto>
            .CreateAsync(query, page, pageSize);

        return registrations;
    }

    public async Task<PagedList<RegistrationListItemDto>> GetOrganizerRegistrations(int userId, int page, int pageSize)
    {
        var query = RegistrationListQuery()
            .Where(r => r.OrganizerId == userId);

        var registrations = await PagedList<RegistrationListItemDto>
            .CreateAsync(query, page, pageSize);

        return registrations;
    }

    private IQueryable<RegistrationListItemDto> RegistrationListQuery()
    {
        return _context.Registrations
            .Select(registration => new RegistrationListItemDto
            {
                Id = registration.Id,
                UserId = registration.UserId,
                UserName = registration.User.FirstName + " " + registration.User.LastName,
                EventId = registration.EventId,
                EventTitle = registration.Event.Title,
                Email = registration.User.Email,
                RegistrationDate = registration.RegistrationDate,
                Status = registration.Status,
                OrganizerId = registration.Event.OrganizerId
            });
    }
}
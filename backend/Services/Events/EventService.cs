using Backend.Data;
using Backend.DTOs.Events;
using Backend.Exceptions;
using Backend.Models.Enums;
using Backend.Utils;
using Backend.Utils.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Events;

public class EventService : IEventService
{
    private readonly AppDbContext _context;

    public EventService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedList<EventListItemDto>> GetAll(int page, int pageSize, int? currentUserId = null, UserRole role = UserRole.User)
    {
        var query = _context.Events
            .Include(e => e.Registrations)
            .AsQueryable();
        
        if (role == UserRole.Organizer && currentUserId.HasValue)
        {
            query = query.Where(e => e.OrganizerId == currentUserId.Value);
        }

        var eventsQuery = query
            .Select(e => new EventListItemDto
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                StartDate = e.StartDate,
                Location = e.Location,
                IsOnline = e.IsOnline,
                Organizer = $"{e.Organizer.FirstName} {e.Organizer.LastName}",
                OrganizerId = e.OrganizerId,
                IsCurrentUserRegistered = currentUserId.HasValue &&
                    e.Registrations.Any(r => r.UserId == currentUserId.Value && r.Status != RegistrationStatus.Cancelled)
            })
            .OrderBy(e => e.StartDate);

        var events = await
            PagedList<EventListItemDto>.CreateAsync(eventsQuery, page, pageSize);

        return events;
    }

    public async Task<EventDto> GetById(int id)
    {
        var eventEntity = await _context.Events
            .Include(e => e.Organizer)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity is null)
            throw new NotFoundException("Wydarzenie nie istnieje");

        return eventEntity.MapToDto();
    }

    public async Task<EventDetailsDto?> GetDetails(int id, int? currentUserId, UserRole role)
    {
        var eventEntity = await _context.Events
            .Include(e => e.Organizer)
            .Include(e => e.Registrations)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity == null)
            throw new NotFoundException("Wydarzenie nie istnieje");

        var participants = eventEntity.Registrations
            .Where(r => r.Status == RegistrationStatus.Confirmed)
            .OrderByDescending(r => r.RegistrationDate)
            .Select(r => r.ToUserDto())
            .ToList();

        return eventEntity.MapToDetailsDto(currentUserId, participants, role);
    }

    public async Task<bool> Delete(int id)
    {
        var eventEntity = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity == null) return false;

        _context.Events.Remove(eventEntity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<EventDto> Update(int id, UpdateEventDto eventDto)
    {
        var eventEntity = await _context.Events
            .Include(e => e.Organizer)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity == null)
            throw new NotFoundException("Wydarzenie nie istnieje");

        eventEntity.Title = eventDto.Title;
        eventEntity.Description = eventDto.Description;
        eventEntity.StartDate = eventDto.StartDate;
        eventEntity.EndDate = eventDto.EndDate;
        eventEntity.Location = eventDto.Location;
        eventEntity.MaxPeople = eventDto.MaxPeople;
        eventEntity.Price = eventDto.Price;
        eventEntity.Website = eventDto.Website;
        eventEntity.IsOnline = eventDto.IsOnline;

        if (eventEntity.OrganizerId != eventDto.OrganizerId)
        {
            eventEntity.OrganizerId = eventDto.OrganizerId;
        }

        await _context.SaveChangesAsync();
        await _context.Entry(eventEntity)
            .Reference(e => e.Organizer)
            .LoadAsync();

        return eventEntity.MapToDto();
    }

    public async Task<EventDto> Create(CreateEventDto eventDto, int ownerId)
    {
        var eventEntity = eventDto.CreateFromDto(ownerId);

        await _context.Events.AddAsync(eventEntity);
        await _context.SaveChangesAsync();
        await _context.Entry(eventEntity)
            .Reference(e => e.Organizer)
            .LoadAsync();

        return eventEntity.MapToDto();
    }
}
using Backend.DTOs.Events;
using Backend.Models.Enums;
using Backend.Utils.Services;

namespace Backend.Services.Events;

public interface IEventService
{
    Task<PagedList<EventListItemDto>> GetAll(int page, int pageSize, int? currentUserId = null, UserRole role = UserRole.User);
    Task<EventDto> GetById(int id);
    Task<EventDetailsDto?> GetDetails(int id, int? currentUserId, UserRole role);
    Task<bool> Delete(int id);
    Task<EventDto> Update(int id, UpdateEventDto eventDto);
    Task<EventDto> Create(CreateEventDto dto, int ownerId);
}
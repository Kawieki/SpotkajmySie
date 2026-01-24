using Backend.DTOs.Registrations;
using Backend.Utils;
using Backend.Utils.Services;

namespace Backend.Services.Registrations;

public interface IRegistrationService
{
    Task<PagedList<RegistrationListItemDto>> GetAll(int page, int pageSize);
    Task<PagedList<RegistrationListItemDto>> GetMyRegistrations(int userId, int page, int pageSize);
    Task<PagedList<RegistrationListItemDto>> GetOrganizerRegistrations(int userId, int page, int pageSize);
    Task<RegistrationDetailsDto> GetById(int id);
    Task<bool> Delete(int id);
    Task<RegistrationDetailsDto> Update(int id, UpdateRegistrationDto dto);
    Task<RegistrationDetailsDto> Create(CreateRegistrationDto dto);
}
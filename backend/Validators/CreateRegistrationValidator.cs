using Backend.Data;
using Backend.DTOs.Registrations;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Backend.Validators;

public class CreateRegistrationValidator : AbstractValidator<CreateRegistrationDto>
{
    public CreateRegistrationValidator(AppDbContext context)
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .MustAsync(async (id, cancellationToken) =>
                await context.Users.AnyAsync(u => u.Id == id, cancellationToken))
            .WithMessage("Żaden użytkownik o podanym id nie istnieje");

        RuleFor(x => x.EventId)
            .NotEmpty()
            .MustAsync(async (id, cancellationToken) =>
                await context.Events.AnyAsync(e => e.Id == id, cancellationToken))
            .WithMessage("Wydarzenie o podanym id nie istnieje");

        RuleFor(x => x)
            .CustomAsync(async (dto, validationContext, cancellationToken) =>
                {
                    var already = await context.Registrations.AnyAsync(r => r.UserId == dto.UserId && r.EventId == dto.EventId, cancellationToken);
                    if (already)
                    {
                        validationContext.AddFailure("AlreadyExists", "Użytkownik jest już zarejestrowany na to wydarzenie");
                    }

                    var eventEntity = await context.Events
                        .Include(e => e.Registrations)
                        .FirstOrDefaultAsync(e => e.Id == dto.EventId, cancellationToken);

                    if (eventEntity?.MaxPeople != null)
                    {
                        var currentParticipants = eventEntity.Registrations.Count;
                        if (currentParticipants >= eventEntity.MaxPeople)
                        {
                            validationContext.AddFailure("MaxPeopleExceeded", "Wydarzenie osiągnęło maksymalną liczbę uczestników");
                        }
                    }
                }
            );

        RuleFor(x => x.Status)
            .IsInEnum()
            .When(x => x.Status != null)
            .WithMessage("Nieprawidłowy status rejestracji");
    }
}

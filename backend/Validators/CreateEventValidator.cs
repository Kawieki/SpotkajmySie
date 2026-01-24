using Backend.DTOs.Events;
using FluentValidation;

namespace Backend.Validators;

public class CreateEventValidator : AbstractValidator<CreateEventDto>
{
    public CreateEventValidator()
    {
        RuleFor(e => e.Title)
            .NotEmpty()
                .WithMessage("Tytuł jest wymagany")
            .MinimumLength(2)
                .WithMessage("Tytuł musi mieć minimum 2 znaków")
            .MaximumLength(200)
                .WithMessage("Tytuł może mieć maksymalnie 200 znaków");

        RuleFor(e => e.Description)
            .NotEmpty()
                .WithMessage("Opis jest wymagany")
            .MinimumLength(20)
                .WithMessage("Opis musi mieć minimum 20 znaków")
            .MaximumLength(5000)
                .WithMessage("Opis może mieć maksymalnie 5000 znaków");

        RuleFor(e => e.StartDate)
            .NotEmpty()
                .WithMessage("Data rozpoczęcia jest wymagana")
            .Must((e, _) => e.StartDate >= DateTime.Now)
                .WithMessage("Data rozpoczęcia nie może być z przeszłości");

        RuleFor(e => e.EndDate)
            .NotEmpty()
                .WithMessage("Data zakończenia jest wymagana")
            .Must((e, _) => e.EndDate >= DateTime.Now)
                .WithMessage("Data zakończenia nie może być z przeszłości")
            .Must((e, _) => e.EndDate >= e.StartDate)
                .WithMessage("Data zakończenia nie może być wcześniejsza niż data rozpoczęcia");

        RuleFor(e => e.Location)
            .NotEmpty()
                .WithMessage("Lokalizacja jest wymagana")
            .MinimumLength(5)
                .WithMessage("Lokalizacja musi mieć minimum 5 znaków")
            .MaximumLength(200)
                .WithMessage("Lokalizacja może mieć maksymalnie 200 znaków");

        RuleFor(e => e.Website)
            .MaximumLength(500)
                .WithMessage("Strona internetowa może mieć maksymalnie 500 znaków");
        
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0)
                .When(x => x.Price.HasValue)
                    .WithMessage("Cena nie może być ujemna");
    }
}

public class CreateEventAdminValidator : AbstractValidator<CreateEventDto>
{
    public CreateEventAdminValidator()
    {
        Include(new CreateEventValidator());

        RuleFor(e => e.OrganizerId)
            .NotEmpty()
                .WithMessage("ID organizatora jest wymagane dla administratora");
    }
}

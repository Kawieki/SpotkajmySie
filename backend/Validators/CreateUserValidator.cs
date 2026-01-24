using Backend.Data;
using Backend.DTOs.Users;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Backend.Validators;

public class CreateUserValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserValidator(AppDbContext context)
    {
        RuleFor(u => u.FirstName)
            .NotEmpty()
                .WithMessage("Imię jest wymagane")
            .MinimumLength(2)
                .WithMessage("Imie musi zawierac conajmniej 2 znaki")
            .MaximumLength(100)
                .WithMessage("Imię może mieć maksymalnie 100 znaków");

        RuleFor(u => u.LastName)
            .NotEmpty()
                .WithMessage("Nazwisko jest wymagane")
            .MinimumLength(2)
                .WithMessage("Nazwisko musi zawierac conajmniej 2 znaki")
            .MaximumLength(100)
                .WithMessage("Nazwisko może mieć maksymalnie 100 znaków");

        RuleFor(x => x.Email)
            .NotEmpty()
                .WithMessage("Email jest wymagany")
            .EmailAddress()
                .WithMessage("Email jest nieprawidłowy")
            .MaximumLength(100)
                .WithMessage("Email może mieć maksymalnie 100 znaków")
            .MustAsync(async (email, _) =>
                !await context.Users.AnyAsync(u => u.Email == email))
                .WithMessage("Email jest już zarejestrowany");

        RuleFor(x => x.Password)
            .NotEmpty()
                .WithMessage("Hasło jest wymagane")
            .MinimumLength(8)
                .WithMessage("Hasło musi mieć co najmniej 8 znaków");

        RuleFor(u => u.Description)
            .MaximumLength(1000)
            .WithMessage("Opis może mieć maksymalnie 1000 znaków");
    }
}
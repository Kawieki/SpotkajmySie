using Backend.Data;
using Backend.DTOs.Users;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Backend.Validators
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator(AppDbContext context)
        {
            RuleFor(u => u.FirstName)
                .NotEmpty()
                .WithMessage("Imię jest wymagane")
                .MaximumLength(100)
                .WithMessage("Imię może mieć maksymalnie 100 znaków");

            RuleFor(u => u.LastName)
                .NotEmpty()
                .WithMessage("Nazwisko jest wymagane")
                .MaximumLength(100)
                .WithMessage("Nazwisko może mieć maksymalnie 100 znaków");

            RuleFor(u => u.Email)
                .NotEmpty()
                .WithMessage("Email jest wymagany")
                .EmailAddress()
                .WithMessage("Email musi być prawidłowym adresem email");

            RuleFor(u => u.Role)
                .IsInEnum()
                .WithMessage("Rola jest nieprawidłowa");

            RuleFor(u => u.Description)
                .MaximumLength(1000)
                .WithMessage("Opis może mieć maksymalnie 1000 znaków");
        }
    }
}
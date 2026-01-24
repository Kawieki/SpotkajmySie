using System.ComponentModel.DataAnnotations;
using Backend.Models.Enums;

namespace Backend.DTOs.Registrations;


public class UpdateRegistrationDto
{
    [Required]
    public RegistrationStatus Status { get; set; }
}
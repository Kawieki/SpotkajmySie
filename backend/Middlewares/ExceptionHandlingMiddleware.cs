using System.Security.Authentication;
using Backend.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Middlewares;

public class ExceptionHandlingMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = ex switch
            {
                NotFoundException => StatusCodes.Status404NotFound,
                AuthenticationException => StatusCodes.Status401Unauthorized,
                ForbiddenException => StatusCodes.Status403Forbidden,
                ValidationException => StatusCodes.Status400BadRequest,
                AlreadyExistsException => StatusCodes.Status409Conflict,
                InvalidCredentialsException => StatusCodes.Status401Unauthorized,
                _ => StatusCodes.Status500InternalServerError
            };

            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Type = ex.GetType().Name,
                Title = "Wystąpił błąd",
                Detail = ex.Message,
            });
        }
    }
}
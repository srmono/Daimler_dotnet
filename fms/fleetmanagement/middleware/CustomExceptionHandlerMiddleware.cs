using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;
using fleetmanagement.dtos;

public class CustomExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public CustomExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context); // Let the next middleware process the request
        }
        catch (Exception ex)
        {
            // Catch any unhandled exception and return a 500 response
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // You can log the exception here if needed (use a logger)

        // Return a generic error message to the client
        var response = new ValidationFailure(
            "Internal server error occurred.",  // Pass the message
            exception.Message  // Include exception details as the details
        );

        var jsonResponse = JsonSerializer.Serialize(response);
        return context.Response.WriteAsync(jsonResponse);
    }
}

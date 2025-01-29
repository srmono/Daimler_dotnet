using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using fleetmanagement.config;
using fleetmanagement.repositories;
using fleetmanagement.middleware;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<TruckDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 25))));

builder.Services.AddScoped<ITruckRepository, TruckRepository>();
builder.Services.AddFastEndpoints();  // Register FastEndpoints

var app = builder.Build();

// Ensure the database and tables are created automatically (for development environment)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TruckDbContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated(); // This will create the database and tables if they don't exist
}

// Use global exception handler middleware and FastEndpoints
// app.UseMiddleware<CustomExceptionHandlerMiddleware>()  // Custom exception handler
//    .UseFastEndpoints();  // Use FastEndpoints once to handle routes
app.UseMiddleware<CustomExceptionHandlerMiddleware>();

//app.UseDefaultExceptionHandler();
app.UseFastEndpoints();

// Run the application
app.Run();

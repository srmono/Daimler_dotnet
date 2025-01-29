using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using fleetmanagement.config;
using fleetmanagement.repositories;
using fleetmanagement.middleware;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// ✅ Read connection string from environment variable (for Docker support)
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

// ✅ Add database context with retry logic
builder.Services.AddDbContext<TruckDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure() // ✅ Enables retries if MySQL isn't ready
    )
);

builder.Services.AddScoped<ITruckRepository, TruckRepository>();
builder.Services.AddFastEndpoints();  // Register FastEndpoints

var app = builder.Build();

// ✅ Ensure database exists (without deleting it!)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TruckDbContext>();
    dbContext.Database.Migrate();  // ✅ Apply migrations instead of EnsureCreated()
}

// ✅ Middleware for Exception Handling
app.UseMiddleware<CustomExceptionHandlerMiddleware>();
app.UseFastEndpoints();

// ✅ Run the application
app.Run();

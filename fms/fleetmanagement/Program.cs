var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/trucks", () => "Hello User Find trucks here!");

app.Run();

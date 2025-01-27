Program.cs entry file explaination

---

### **1. `var builder = WebApplication.CreateBuilder(args);`**
- This initializes a **WebApplicationBuilder**, which is part of the **ASP.NET Core minimal hosting model** introduced in .NET 6.
- The `args` are typically command-line arguments passed to the application.
- The `builder` object is used to configure **services**, **middleware**, and the **application pipeline**.

---

### **2. Dependency Injection Container Configuration**

#### **Adding the DbContext**
```csharp
builder.Services.AddDbContext<TruckDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 25))));
```
- **`AddDbContext`**: Registers `TruckDbContext` in the dependency injection (DI) container.
  - This allows it to be injected wherever needed, such as in repositories.
- **`UseMySql`**: Configures the app to use MySQL as the database provider.
  - `builder.Configuration.GetConnectionString("DefaultConnection")` fetches the connection string for the database from the configuration file (e.g., `appsettings.json`).
  - `new MySqlServerVersion(new Version(8, 0, 25))`: Specifies the version of the MySQL server being used to ensure compatibility.

---

#### **Adding the Repository**
```csharp
builder.Services.AddScoped<ITruckRepository, TruckRepository>();
```
- **`AddScoped`**: Registers the `ITruckRepository` and its implementation `TruckRepository` in the DI container with **scoped lifetime**.
  - **Scoped Lifetime**: The instance is created once per request. Every request gets its own instance.

---

#### **Adding FastEndpoints**
```csharp
builder.Services.AddFastEndpoints();
```
- Registers **FastEndpoints** services in the DI container.
- This automatically detects and configures all the FastEndpoints in your project.

---

### **3. `var app = builder.Build();`**
- Builds the application, combining all the services and middleware configured in the `builder` object.

---

### **4. Ensuring the Database Exists**
```csharp
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TruckDbContext>();
    dbContext.Database.EnsureCreated(); // This will create the database and tables if they don't exist
}
```
- **`CreateScope()`**: Creates a new dependency injection scope. This is necessary because the `DbContext` is registered as scoped and cannot be resolved outside a scope.
- **`GetRequiredService<TruckDbContext>()`**: Resolves the `TruckDbContext` from the DI container.
- **`EnsureCreated()`**: Checks if the database exists, and if not, it creates it along with the tables.
  - This is useful during development to avoid manually creating the database and tables.

---

### **5. Configuring Middleware**

#### **FastEndpoints Middleware**
```csharp
app.UseFastEndpoints();
```
- Registers FastEndpoints in the request pipeline. This middleware:
  - Maps HTTP requests to the endpoints defined in your project.
  - Handles requests and sends responses.

---

### **6. Starting the Application**
```csharp
app.Run();
```
- Starts the web server and listens for incoming HTTP requests.
- This is the entry point of the application.

---

### **7. Minimal API Example**
```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/trucks", () => "Hello User Find trucks here!");

app.Run();
```
This is a minimalistic API implementation:
- **`MapGet("/")`**:
  - Maps an HTTP GET request to the root URL (`/`).
  - When the user accesses `/`, they get the response: `Hello World!`.
- **`MapGet("/trucks")`**:
  - Maps an HTTP GET request to `/trucks`.
  - Returns the response: `Hello User Find trucks here!`.
- **Minimal APIs**: This is a very simple way to define routes directly in the `Program.cs` file without using controllers or classes.

---

### **Summary of Key Methods**

| **Method**                        | **Purpose**                                                                                                                                  |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `WebApplication.CreateBuilder()`  | Initializes the application builder to configure services and middleware.                                                                    |
| `AddDbContext<T>()`               | Registers a DbContext with a specified database provider (e.g., MySQL, SQL Server).                                                         |
| `AddScoped<TInterface, TImpl>()`  | Registers a service with a scoped lifetime, linking an interface to its implementation.                                                     |
| `AddFastEndpoints()`              | Registers FastEndpoints services to handle requests and responses in a convention-based way.                                                |
| `EnsureCreated()`                 | Ensures the database and tables are created if they don't exist (useful for development).                                                   |
| `app.UseFastEndpoints()`          | Adds FastEndpoints middleware to handle requests.                                                                                           |
| `app.MapGet()`                    | Defines a route that responds to HTTP GET requests (Minimal API approach).                                                                  |
| `app.Run()`                       | Starts the application and begins listening for incoming requests.                                                                          |
| `CreateScope()`                   | Creates a new DI scope for resolving scoped services like `DbContext`.                                                                      |
| `GetRequiredService<T>()`         | Resolves a service from the DI container. If the service isn't found, it throws an exception.                                               |

---

### **Why Use These Approaches?**
- **Dependency Injection (DI)**:
  - Promotes modular and testable code.
  - You can swap out implementations (e.g., mock repositories during testing).
- **FastEndpoints**:
  - Simplifies creating APIs with a convention-driven approach.
  - Offers better performance than traditional MVC.
- **Minimal APIs**:
  - Great for small or lightweight applications.
  - Allows quick setup without controllers.


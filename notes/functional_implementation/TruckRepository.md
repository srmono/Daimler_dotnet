TruckRepository detailed breakdown of the code:

---

### **Using Statements**

1. **`using Microsoft.EntityFrameworkCore;`**  
   This provides access to EF Core functionalities like querying and saving data (`ToListAsync`, `FindAsync`, etc.).

2. **`using fleetmanagement.config;`**  
   Imports the namespace containing the `TruckDbContext` class.

3. **`using fleetmanagement.entities;`**  
   Imports the namespace containing the `Truck` entity.

---

### **Namespace**

```csharp
namespace fleetmanagement.repositories;
```

Groups this class logically as part of the repository layer of the `fleetmanagement` project.

---

### **Class Definition**

```csharp
public class TruckRepository : ITruckRepository
```

- **`TruckRepository`**: A concrete implementation of the `ITruckRepository` interface.  
- **Purpose**: Implements the data access logic for the `Truck` entity.

---

### **Field**

```csharp
private readonly TruckDbContext _context;
```

- **`TruckDbContext _context`**:  
  - Holds the database context injected via the constructor.
  - This is used to perform CRUD operations on the database.

- **`readonly`**: Ensures the `_context` reference cannot be reassigned after it is initialized.

---

### **Constructor**

```csharp
public TruckRepository(TruckDbContext context)
{
    _context = context;
}
```

- **Dependency Injection**: `TruckDbContext` is injected into the repository. This allows the repository to use the context for database interactions without manually creating or managing it.

---

### **Methods**

#### 1. **`GetAllTrucksAsync`**

```csharp
public async Task<IEnumerable<Truck>> GetAllTrucksAsync() => await _context.Trucks.ToListAsync();
```

- **Purpose**: Fetches all `Truck` entities from the database.
- **Implementation**: 
  - Queries the `Trucks` table using `_context.Trucks`.
  - Converts the result to a list asynchronously with `ToListAsync`.
- **Return Type**: `Task<IEnumerable<Truck>>`: A collection of all `Truck` objects.

---

#### 2. **`GetTruckByIdAsync`**

```csharp
public async Task<Truck?> GetTruckByIdAsync(int id) => await _context.Trucks.FindAsync(id);
```

- **Purpose**: Fetches a single `Truck` entity by its primary key (`id`).
- **Implementation**: Uses `FindAsync`, which is optimized for primary key lookups.
- **Return Type**: `Task<Truck?>`: The truck object if found, otherwise `null`.

---

#### 3. **`AddTruckAsync`**

```csharp
public async Task<Truck> AddTruckAsync(Truck truck)
{
    _context.Trucks.Add(truck);
    await _context.SaveChangesAsync();
    return truck;
}
```

- **Purpose**: Adds a new `Truck` entity to the database.
- **Implementation**:
  - Calls `Add` on `_context.Trucks` to mark the `Truck` for insertion.
  - Saves changes to the database using `SaveChangesAsync`.
  - Returns the added `Truck` object (usually with the generated primary key populated).
- **Return Type**: `Task<Truck>`: The added `Truck` object.

---

#### 4. **`UpdateTruckAsync`**

```csharp
public async Task<Truck?> UpdateTruckAsync(Truck truck)
{
    var existingTruck = await _context.Trucks.FindAsync(truck.Id);
    if (existingTruck == null) return null;

    existingTruck.Name = truck.Name;
    existingTruck.Model = truck.Model;
    existingTruck.Year = truck.Year;

    await _context.SaveChangesAsync();
    return existingTruck;
}
```

- **Purpose**: Updates an existing `Truck` entity in the database.
- **Implementation**:
  - Fetches the existing `Truck` from the database using `FindAsync`.
  - If not found, returns `null`.
  - Updates the properties of the fetched `Truck` object.
  - Calls `SaveChangesAsync` to persist changes to the database.
  - Returns the updated `Truck`.
- **Return Type**: `Task<Truck?>`: The updated `Truck` object, or `null` if the truck was not found.

---

#### 5. **`DeleteTruckAsync`**

```csharp
public async Task<bool> DeleteTruckAsync(int id)
{
    var truck = await _context.Trucks.FindAsync(id);
    if (truck == null) return false;

    _context.Trucks.Remove(truck);
    await _context.SaveChangesAsync();
    return true;
}
```

- **Purpose**: Deletes a `Truck` entity from the database by its ID.
- **Implementation**:
  - Fetches the `Truck` using `FindAsync`.
  - If not found, returns `false`.
  - Removes the `Truck` entity using `Remove`.
  - Calls `SaveChangesAsync` to commit the deletion.
  - Returns `true` if the deletion was successful.
- **Return Type**: `Task<bool>`: `true` if the truck was deleted, `false` otherwise.

---

### **Summary**

This class provides the concrete implementation of the methods defined in the `ITruckRepository` interface:
1. **GetAllTrucksAsync**: Fetches all trucks.
2. **GetTruckByIdAsync**: Fetches a truck by its ID.
3. **AddTruckAsync**: Adds a new truck.
4. **UpdateTruckAsync**: Updates an existing truck.
5. **DeleteTruckAsync**: Deletes a truck by its ID.

It uses EF Core (`TruckDbContext`) for all database interactions and follows asynchronous patterns to ensure scalability.


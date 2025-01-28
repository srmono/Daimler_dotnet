/fleetmanagement
    /Endpoints          // All API endpoint classes
        /Trucks         // Truck-specific endpoints
            GetAllTrucksEndpoint.cs
            GetTruckByIdEndpoint.cs
            CreateTruckEndpoint.cs
        /Drivers        // Driver-specific endpoints
            GetAllDriversEndpoint.cs
            CreateDriverEndpoint.cs
    /Repositories       // Data access logic
        ITruckRepository.cs
        TruckRepository.cs
        IDriverRepository.cs
        DriverRepository.cs
    /Dtos               // Data Transfer Objects
        TruckResponse.cs
        DriverResponse.cs
    /Models             // Domain models or entities
        Truck.cs
        Driver.cs
    /Extensions         // Extension methods for shared logic
        MappingExtensions.cs
    /Program.cs         // Application entry point

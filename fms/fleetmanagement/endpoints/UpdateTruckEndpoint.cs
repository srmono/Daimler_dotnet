using FastEndpoints;
using fleetmanagement.dtos;
using fleetmanagement.entities;
using fleetmanagement.repositories;

public class UpdateTruckEndpoint : Endpoint<TruckRequest, TruckResponse>
{
    private readonly ITruckRepository _truckRepository;

    public UpdateTruckEndpoint(ITruckRepository repository)
    {
        _truckRepository = repository;
    }

    public override void Configure()
    {
        Verbs(Http.PUT);
        Routes("/api/trucks/{id:int}");
        DontCatchExceptions(); // Exceptions will be passed to the middleware
        AllowAnonymous();
    }

    // public override async Task HandleAsync(TruckRequest req, CancellationToken ct)
    // {
    //     // Fetch the truck ID from the route
    //     var id = Route<int>("id");
    //     var existingTruck = await _truckRepository.GetTruckByIdAsync(id);

    //     if (existingTruck == null)
    //     {
    //         // Return a 404 if the truck is not found
    //         await SendNotFoundAsync();
    //         return;
    //     }

    //     // Validate the year (throw an exception if invalid)
    //     if (req.Year != 0 && (req.Year < 1900 || req.Year > DateTime.Now.Year))
    //     {
    //         throw new ValidationErrorFaulureException(new[]
    //         {
    //             new ValidationErrorDetail("Year", $"Year should be between 1900 and {DateTime.Now.Year}.")
    //         });
    //     }

    //     // Update the truck details
    //     existingTruck.Name = req.Name ?? existingTruck.Name;
    //     existingTruck.Model = req.Model ?? existingTruck.Model;
    //     existingTruck.Year = req.Year != 0 ? req.Year : existingTruck.Year;

    //     // Save the updated truck in the repository
    //     var updatedTruck = await _truckRepository.UpdateTruckAsync(existingTruck);

    //     // Return a successful response
    //     await SendAsync(new TruckResponse
    //     {
    //         Id = updatedTruck.Id,
    //         Name = updatedTruck.Name,
    //         Model = updatedTruck.Model,
    //         Year = updatedTruck.Year,
    //        // Message = "Truck updated successfully!"
    //     });
    // }
public override async Task HandleAsync(TruckRequest req, CancellationToken ct)
{
    var id = Route<int>("id");
    var existingTruck = await _truckRepository.GetTruckByIdAsync(id);

    if (existingTruck == null)
    {
        await SendNotFoundAsync();
        return;
    }

    if (req.Year != 0 && (req.Year < 1900 || req.Year > DateTime.Now.Year))
    {
        throw new ValidationErrorFaulureException(new[]
        {
            new ValidationErrorDetail("Year", $"Year should be between 1900 and {DateTime.Now.Year}.")
        });
    }

    existingTruck.Name = req.Name ?? existingTruck.Name;
    existingTruck.Model = req.Model ?? existingTruck.Model;
    existingTruck.Year = req.Year != 0 ? req.Year : existingTruck.Year;

    var updatedTruck = await _truckRepository.UpdateTruckAsync(existingTruck);

    await SendAsync(new TruckResponse
    {
        Id = updatedTruck.Id,
        Name = updatedTruck.Name,
        Model = updatedTruck.Model,
        Year = updatedTruck.Year
       // Message = "Truck updated successfully!"
    });
}


}




// using FastEndpoints;
// using fleetmanagement.dtos;
// using System.Net;
// using fleetmanagement.entities;
// using fleetmanagement.repositories;

// public class UpdateTruckEndpoint : Endpoint<TruckRequest, TruckResponse>
// {

//      private readonly ITruckRepository _truckRepository;

//     public UpdateTruckEndpoint(ITruckRepository repository){
//         _truckRepository = repository;
//     }

//     public override void Configure()
//     {
//         Verbs(Http.PUT);
//         Routes("/api/trucks/{id:int}");
//         DontCatchExceptions();
//         AllowAnonymous();
//     }

//     public override async Task HandleAsync(TruckRequest req, CancellationToken ct)
//     {
        
//         // Fetch the truck from the repository
//         var id = Route<int>("id");
//         var existingTruck = await _truckRepository.GetTruckByIdAsync(id);

//         if (existingTruck == null)
//         {
//             // Return a 404 if the truck is not found
//             await SendNotFoundAsync();
//             return;
//         }

//         // Update the truck details
//         existingTruck.Name = req.Name ?? existingTruck.Name;
//         existingTruck.Model = req.Model ?? existingTruck.Model;
//         existingTruck.Year = req.Year != 0 ? req.Year : existingTruck.Year;
        

//         // // Validation example: Check if Year is valid
//         // if (req.Year < 1900 || req.Year > DateTime.Now.Year)
//         // {
//         //     // Create validation failures
//         //     var failures = new[] {
//         //         new ValidationFailure("Invalid year provided.", $"Year should be between 1900 and {DateTime.Now.Year}.")
//         //     };

//         //     // Throw a ValidationFailureException with the validation failures
//         //     throw new ValidationFailureException(failures);
//         // }

//         // Proceed with your normal logic for handling the request
//          // Save the updated truck in the repository
//         var updatedTruck = await _truckRepository.UpdateTruckAsync(existingTruck);

//         // Return successful response
//         await SendAsync(new TruckResponse
//         {
//             Id = updatedTruck.Id,
//             Name = updatedTruck.Name,
//             Model = updatedTruck.Model,
//             Year = updatedTruck.Year
//         });
//     }
// }

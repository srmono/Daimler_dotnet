C# is a modern, object-oriented programming language developed by Microsoft. It's widely used for building a variety of applications, including web, desktop, and mobile apps, as well as games. Below is an overview of the key C# fundamentals:

---

### **1. Basic Syntax**
- **Namespace:** A way to organize code and avoid name collisions.
  ```csharp
  using System;

  namespace MyApplication
  {
      class Program
      {
          static void Main(string[] args)
          {
              Console.WriteLine("Hello, World!");
          }
      }
  }
  ```

- **Main Method:** The entry point of a C# application.

- **Statements and Semicolons:** Each statement ends with a semicolon (`;`).

---

### **2. Data Types**
C# is statically typed, meaning variable types are defined at compile time.

- **Value Types** (e.g., `int`, `float`, `char`, `bool`):
  ```csharp
  int age = 30;
  float pi = 3.14f;
  char letter = 'A';
  bool isAlive = true;
  ```

- **Reference Types** (e.g., `string`, `arrays`, `classes`):
  ```csharp
  string name = "John";
  int[] numbers = {1, 2, 3, 4};
  ```

- **Nullable Types:** Allow value types to accept `null`.
  ```csharp
  int? nullableInt = null;
  ```

---

### **3. Control Flow**
C# supports conditional and iterative constructs:
- **If-Else Statement:**
  ```csharp
  if (age >= 18)
  {
      Console.WriteLine("Adult");
  }
  else
  {
      Console.WriteLine("Minor");
  }
  ```

- **Switch Statement:**
  ```csharp
  switch (day)
  {
      case "Monday":
          Console.WriteLine("Start of the week");
          break;
      case "Friday":
          Console.WriteLine("Almost weekend!");
          break;
      default:
          Console.WriteLine("Another day");
          break;
  }
  ```

- **Loops:**
  ```csharp
  for (int i = 0; i < 5; i++)
  {
      Console.WriteLine(i);
  }

  while (condition)
  {
      // Execute while condition is true
  }
  ```

---

### **4. Object-Oriented Programming (OOP)**
C# is heavily based on OOP principles:
- **Classes and Objects:**
  ```csharp
  class Car
  {
      public string Brand { get; set; }
      public void Drive()
      {
          Console.WriteLine($"{Brand} is driving!");
      }
  }

  Car myCar = new Car { Brand = "Tesla" };
  myCar.Drive();
  ```

- **Inheritance:**
  ```csharp
  class Vehicle
  {
      public int Speed { get; set; }
  }

  class Car : Vehicle
  {
      public string Brand { get; set; }
  }
  ```

- **Encapsulation:** Using access modifiers (`public`, `private`, `protected`) to protect data.
  ```csharp
  private string secret;
  ```

- **Polymorphism:** Methods behaving differently based on the context (method overloading/overriding).

---

### **5. Error Handling**
Error handling is done using `try`, `catch`, `finally`, and `throw`.
```csharp
try
{
    int result = 10 / 0;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero.");
}
finally
{
    Console.WriteLine("Finished.");
}
```

---

### **6. LINQ (Language-Integrated Query)**
Simplifies data queries:
```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(n => n % 2 == 0);
```

---

### **7. Asynchronous Programming**
C# supports async operations using `async` and `await`.
```csharp
async Task DownloadFile()
{
    await Task.Delay(2000);
    Console.WriteLine("File downloaded");
}
```

---

### **8. Advanced Topics**
- **Delegates and Events:** Used for callback methods.
  ```csharp
  delegate void MyDelegate(string message);
  ```

- **Generics:** Create type-safe reusable code.
  ```csharp
  List<int> numbers = new List<int>();
  ```

- **Interfaces:** Define a contract for classes.
  ```csharp
  interface IVehicle
  {
      void Drive();
  }
  ```


# SonarQube Analysis for .NET 8 Project

This guide provides step-by-step instructions to scan a .NET 8 project using **SonarQube** and the **SonarScanner for .NET**.

## 📌 Prerequisites
Ensure you have the following installed:
- **.NET SDK 8.0**
- **SonarQube Server** running at `http://localhost:9000`

## 🚀 Step 1: Install SonarScanner for .NET
Install the SonarScanner tool globally on your system:

```sh
dotnet tool install --global dotnet-sonarscanner
```

This tool is required to analyze the .NET project and send the results to the SonarQube server.

## 🚀 Step 2: Initialize the Solution File
If your project does not already have a `.sln` file, create one and add the project to it:

```sh
dotnet new sln
```

Add the `.csproj` file to the solution:

```sh
dotnet sln add fleetmanagement.csproj
```

Build the solution to ensure everything is set up correctly:

```sh
dotnet build fleetmanagement.sln
```

## 🚀 Step 3: Begin SonarQube Analysis
Start the SonarQube scan by running the following command:

```sh
dotnet sonarscanner begin /k:"fleetmanagement" /d:sonar.host.url="http://localhost:9000" /d:sonar.login="f33394a52ac3a8964c953fc5aeac120224fa23b4"
```

### Explanation:
- `/k:"fleetmanagement"` → This is the **SonarQube project key**.
- `/d:sonar.host.url="http://localhost:9000"` → URL of the SonarQube server.
- `/d:sonar.login="f33394a52ac3a8964c953fc5aeac120224fa23b4"` → Authentication token for SonarQube.

## 🚀 Step 4: Clean and Build the Solution
Before analyzing, clean and rebuild the solution:

```sh
dotnet clean fleetmanagement.sln
dotnet build fleetmanagement.sln
```

## 🚀 Step 5: End SonarQube Analysis
Run the final command to complete the analysis and upload results to SonarQube:

```sh
dotnet sonarscanner end /d:sonar.login="f33394a52ac3a8964c953fc5aeac120224fa23b4"
```

### Expected Output
- If the scan is successful, you will see a message confirming that the analysis has been uploaded to SonarQube.
- Open `http://localhost:9000` in a browser to view the analysis results.

## 🛠 Troubleshooting
### 1️⃣ **SonarQube Server Not Running**
If `http://localhost:9000` is unreachable, start the SonarQube server:

```sh
StartSonar.bat  # Windows
```

### 2️⃣ **Missing Project GUID**
If you see an error about missing **ProjectGuid**, manually add it in the `.csproj` file:

```xml
<PropertyGroup>
  <ProjectGuid>{B5C66D8D-8A52-4DFE-9D2E-1234567890AB}</ProjectGuid>
</PropertyGroup>
```

## 🎉 Conclusion
Following these steps, you can successfully analyze your .NET 8 project with SonarQube and ensure **code quality, security, and maintainability**. 🚀


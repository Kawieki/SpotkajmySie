# SpotkajmySie

SpotkajmySie ("Let's Meet") is an event management platform built with .NET 9 and React 19. It allows users to browse events, sign up for them, and organizers to manage event details and registrations.

## Tech Stack

### Backend

- **Framework**: .NET 9 (ASP.NET Core Web API)
- **Database**: Entity Framework Core with SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: FluentValidation
- **Documentation**: OpenAPI with Scalar UI

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: RAW CSS / index.css
- **Utilities**: React Icons, jwt-decode

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Event Management**: Organizers can create, update, and manage events.
- **Registration System**: Users can register for events. The system handles statuses like Pending, Confirmed, or Cancelled.
- **Role-Based Access**: Different permissions for Users, Organizers, and Admins.

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (Project uses `npm`)

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. The project is configured to use SQLite (`app.db`). The database will be automatically created and seeded with initial data on the first run.
3. Run the application:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5001`.
   API Documentation (Scalar) is available at `/scalar/v1` (in Development mode).

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be served at `http://localhost:5173`.

## Configuration & Security

**Note for Deployment:**
The backend configuration currently uses a hardcoded JWT Secret in `appsettings.json`.

- **Action Required:** Before deploying or pushing to a public repository, execute the following:
  1. Remove the sensitive `SecretKey` from `appsettings.json`.
  2. Use [.NET User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) for local development or Environment Variables for production.

```json
// Example appsettings.json
"JwtSettings": {
  "SecretKey": "YOUR_STRONG_SECRET_KEY_HERE_USE_ENV_VAR",
  ...
}
```

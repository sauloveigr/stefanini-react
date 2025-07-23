# User Management System

A full-stack user management system with React frontend and NestJS backend, connected via axios for CRUD operations.

## Features

-   ✅ Create, Read, Update, Delete (CRUD) operations for users
-   ✅ Real-time data synchronization between frontend and backend
-   ✅ Form validation and error handling
-   ✅ Search and filter functionality
-   ✅ Responsive design with Tailwind CSS
-   ✅ Toast notifications for user feedback
-   ✅ PostgreSQL database with Prisma ORM

## Tech Stack

### Frontend

-   React 19 with TypeScript
-   Vite for build tooling
-   Tailwind CSS for styling
-   Axios for API communication
-   React Hook Form for form handling
-   Headless UI for accessible components

### Backend

-   NestJS with TypeScript
-   Prisma ORM
-   PostgreSQL database
-   Class-validator for DTO validation
-   CORS enabled for frontend communication

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   Docker and Docker Compose
-   Yarn or npm

### Running the Application

1. **Start PostgreSQL Database:**

    ```bash
    # Make sure you're in the root directory (/stefanini)
    cd stefanini

    # Start PostgreSQL in Docker
    docker-compose up postgres -d
    ```

2. **Start Backend (Terminal 1):**

    ```bash
    # Open a NEW terminal window
    # Navigate to backend directory
    cd backend/

    # Install dependencies (if not already done)
    yarn install

    # Start the backend
    yarn start:dev
    ```

    **Wait until you see:**

    ```
    🚀 Application is running on: http://localhost:3001
    ```

3. **Start Frontend (Terminal 2):**

    ```bash
    # Open ANOTHER NEW terminal window
    # Navigate to frontend directory
    cd frontend/

    # Install dependencies (if not already done)
    yarn install

    # Start the frontend
    yarn dev
    ```

    **Wait until you see:**

    ```
    VITE v7.0.5  ready in 2251 ms
    ➜  Local:   http://localhost:5173/
    ```

4. **Access the Application:**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3001
    - Health check: http://localhost:3001/health

### API Endpoints

The backend provides the following REST API endpoints:

-   `GET /users` - Get all users
-   `GET /users/:id` - Get a specific user
-   `POST /users` - Create a new user
-   `PATCH /users/:id` - Update an existing user
-   `DELETE /users/:id` - Delete a user

### Database Schema

The User model includes:

-   `id` (UUID, primary key)
-   `name` (required)
-   `gender` (optional)
-   `email` (optional, unique)
-   `birthDate` (required)
-   `placeOfBirth` (optional)
-   `nationality` (optional)
-   `cpf` (required, unique)
-   `createdAt` (auto-generated)
-   `updatedAt` (auto-generated)

## Development

### Frontend Development

-   The frontend uses the `useUsers` hook for all API operations
-   Toast notifications provide user feedback for all CRUD operations
-   Form validation ensures data integrity
-   Error handling with user-friendly messages

### Backend Development

-   NestJS modules for clean architecture
-   Prisma for database operations
-   DTO validation with class-validator
-   Proper error handling and HTTP status codes

## Troubleshooting

1. **Database connection issues:**

    - Ensure Docker is running
    - Check if PostgreSQL container is healthy: `docker-compose ps`
    - Wait for PostgreSQL to be ready: `docker-compose logs postgres`

2. **Frontend can't connect to backend:**

    - Verify backend is running on port 3001
    - Check CORS configuration in backend
    - Ensure API_BASE_URL in frontend matches backend URL

3. **Port conflicts:**

    - Backend runs on port 3001
    - Frontend runs on port 5173
    - PostgreSQL runs on port 5432

4. **Form validation errors:**
    - Check that all required fields are filled
    - Verify email format if provided
    - Ensure CPF has exactly 11 digits

## Project Structure

```
├── frontend/                 # React frontend (port 5173)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # NestJS backend (port 3001)
│   ├── src/
│   │   ├── user/           # User module
│   │   └── prisma/         # Database schema
│   └── package.json
└── docker-compose.yml      # PostgreSQL configuration (port 5432)
```

## Summary

-   ✅ **PostgreSQL**: Running in Docker on port 5432
-   ✅ **Backend**: Running locally on port 3001
-   ✅ **Frontend**: Running locally on port 5173
-   ✅ **Application**: Accessible at `http://localhost:5173`

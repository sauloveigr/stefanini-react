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

1. **Start the database and backend:**

    ```bash
    docker-compose up -d
    ```

2. **Install frontend dependencies:**

    ```bash
    cd frontend
    yarn install
    ```

3. **Start the frontend development server:**

    ```bash
    cd frontend
    yarn dev
    ```

4. **Access the application:**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:3000

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

2. **Frontend can't connect to backend:**

    - Verify backend is running on port 3000
    - Check CORS configuration in backend
    - Ensure API_BASE_URL in frontend matches backend URL

3. **Form validation errors:**
    - Check that all required fields are filled
    - Verify email format if provided
    - Ensure CPF has exactly 11 digits

## Project Structure

```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── user/           # User module
│   │   └── prisma/         # Database schema
│   └── package.json
└── docker-compose.yml      # Docker configuration
```

#!/bin/bash

echo "🚀 Starting development environment..."

# Check if we're in the correct directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: Please run this script from the project root directory (stefanini)"
    echo "   Current directory: $(pwd)"
    echo "   Expected files: docker-compose.yml, backend/, frontend/"
    exit 1
fi

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found!"
    echo "   Please create backend/.env with DATABASE_URL"
    echo "   You can copy from backend/.env.example"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Warning: frontend/.env not found!"
    echo "   Please create frontend/.env with VITE_API_URL"
    echo "   You can copy from frontend/.env.example"
fi

# Start PostgreSQL
echo "📦 Starting PostgreSQL..."
docker-compose up postgres -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec -T postgres pg_isready -U user -d db; do
  echo "⏳ PostgreSQL is not ready yet, waiting..."
  sleep 2
done

echo "✅ PostgreSQL is ready!"

# Run database migrations
echo "🗄️  Running database migrations..."
cd backend
yarn db:setup
cd ..

# Start backend
echo "🔧 Starting backend..."
echo "   Make sure you're in the backend directory: cd backend/"
echo "   Then run: yarn start:dev"
echo ""
echo "   In another terminal, start the frontend:"
echo "   cd frontend/"
echo "   yarn dev"
echo ""
echo "🎯 Application will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001" 
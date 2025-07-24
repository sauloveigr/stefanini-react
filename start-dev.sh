#!/bin/bash

echo "🚀 Starting development environment..."

# Check if we're in the correct directory (any project root with docker-compose.yml)
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected files: docker-compose.yml, backend/, frontend/"
    exit 1
fi

# Create backend .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env file..."
    cat > backend/.env << EOF
# Database connection string for PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/db"
EOF
    echo "✅ Created backend/.env"
else
    echo "✅ backend/.env already exists"
fi

# Create frontend .env if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend/.env file..."
    cat > frontend/.env << EOF
# API URL for backend communication
VITE_API_URL=http://localhost:3001
EOF
    echo "✅ Created frontend/.env"
else
    echo "✅ frontend/.env already exists"
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
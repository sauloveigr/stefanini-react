#!/bin/bash

echo "🚀 Starting development environment..."

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

# Start backend
echo "🔧 Starting backend..."
cd backend
yarn start:dev 
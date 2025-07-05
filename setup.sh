#!/bin/bash

echo "🚀 YugaYatra Payment Integration Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp env-template.txt .env
    echo "✅ .env file created from template"
else
    echo "✅ .env file already exists"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd YY
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Create logs directory if it doesn't exist
if [ ! -d "logs" ]; then
    echo "📁 Creating logs directory..."
    mkdir logs
    echo "✅ Logs directory created"
else
    echo "✅ Logs directory already exists"
fi

# Check if MongoDB is running (optional)
echo "🔍 Checking MongoDB connection..."
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. You may need to start it manually."
        echo "   On Ubuntu/Debian: sudo systemctl start mongod"
        echo "   On macOS: brew services start mongodb-community"
        echo "   On Windows: Start MongoDB service from Services"
    fi
else
    echo "⚠️  MongoDB is not installed. Please install MongoDB for full functionality."
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the servers: npm run dev"
echo "2. Start the frontend: cd YY && npm run dev"
echo "3. Test the integration: npm test"
echo "4. Access the application: http://localhost:5173"
echo "5. Check admin dashboard: http://localhost:3000/admin.html"
echo ""
echo "📚 For more information, see PAYMENT_INTEGRATION_FIX.md" 
@echo off
echo 🚀 YugaYatra Payment Integration Setup
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm is installed:
npm --version

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo 📝 Creating .env file...
    copy env-template.txt .env
    echo ✅ .env file created from template
) else (
    echo ✅ .env file already exists
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd YY
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

REM Create logs directory if it doesn't exist
if not exist "logs" (
    echo 📁 Creating logs directory...
    mkdir logs
    echo ✅ Logs directory created
) else (
    echo ✅ Logs directory already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Start the servers: npm run dev
echo 2. Start the frontend: cd YY ^&^& npm run dev
echo 3. Test the integration: npm test
echo 4. Access the application: http://localhost:5173
echo 5. Check admin dashboard: http://localhost:3000/admin.html
echo.
echo 📚 For more information, see PAYMENT_INTEGRATION_FIX.md
pause 
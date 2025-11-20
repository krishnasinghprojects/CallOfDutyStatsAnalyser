@echo off
REM CODM Stats Analyzer - Quick Start Script (Windows)

echo.
echo 🎮 CODM Stats Analyzer - Quick Start
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Installation failed!
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo.
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: You need to add your Gemini API key!
    echo.
    echo Steps:
    echo 1. Get your API key from: https://aistudio.google.com/app/apikey
    echo 2. Open .env file in Notepad
    echo 3. Replace 'your_api_key_here' with your actual API key
    echo 4. Save the file
    echo 5. Run this script again
    echo.
    notepad .env
    echo.
    echo Please save the .env file and run this script again.
    pause
    exit /b 1
)

REM Verify API key is set
findstr /C:"your_api_key_here" .env >nul
if %ERRORLEVEL% EQU 0 (
    echo ❌ API key not configured!
    echo Please edit .env file and add your Gemini API key.
    notepad .env
    pause
    exit /b 1
)

echo ✅ Environment configured!
echo.
echo 🚀 Starting development server...
echo.
echo The application will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
call npm run dev

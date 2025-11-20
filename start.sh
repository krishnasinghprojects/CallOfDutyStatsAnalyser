#!/bin/bash

# CODM Stats Analyzer - Quick Start Script (Mac/Linux)

echo "🎮 CODM Stats Analyzer - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Installation failed!"
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: You need to add your Gemini API key!"
    echo ""
    echo "Steps:"
    echo "1. Get your API key from: https://aistudio.google.com/app/apikey"
    echo "2. Open .env file in a text editor"
    echo "3. Replace 'your_api_key_here' with your actual API key"
    echo "4. Save the file"
    echo "5. Run this script again"
    echo ""
    
    # Try to open .env in default editor
    if command -v nano &> /dev/null; then
        read -p "Press Enter to edit .env file now (or Ctrl+C to exit)..."
        nano .env
    elif command -v vim &> /dev/null; then
        read -p "Press Enter to edit .env file now (or Ctrl+C to exit)..."
        vim .env
    else
        echo "Please edit .env file manually and run this script again."
        exit 1
    fi
fi

# Verify API key is set
if grep -q "your_api_key_here" .env; then
    echo "❌ API key not configured!"
    echo "Please edit .env file and add your Gemini API key."
    exit 1
fi

echo "✅ Environment configured!"
echo ""
echo "🚀 Starting development server..."
echo ""
echo "The application will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev

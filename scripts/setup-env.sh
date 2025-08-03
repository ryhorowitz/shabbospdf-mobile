#!/bin/bash

# Environment Setup Script for Shabbos Weather App
# This script helps set up environment variables for the app

set -e

echo "🔧 Shabbos Weather Environment Setup"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env already exists
if [ -f ".env" ]; then
    print_warning ".env file already exists"
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [[ ! $overwrite =~ ^[Yy]$ ]]; then
        print_status "Setup cancelled"
        exit 0
    fi
fi

# Copy template if it exists
if [ -f "env.example" ]; then
    cp env.example .env
    print_success "Created .env from template"
else
    print_error "env.example not found"
    exit 1
fi

print_status "Please update the following values in your .env file:"
echo ""
echo "Required values:"
echo "  APPLE_TEAM_ID=ZJU37VPMP6 (your Apple Team ID)"
echo "  APPLE_ID=admin@shabbosweather.com (your Apple ID)"
echo "  ASC_APP_ID=6749516433 (your App Store Connect App ID)"
echo ""
echo "Optional values (defaults provided):"
echo "  APP_BUNDLE_ID=com.shabbospdf.weather"
echo "  APP_VERSION=1.0.0"
echo "  APP_BUILD_NUMBER=1"
echo "  SUPPORT_EMAIL=admin@shabbosweather.com"
echo ""

# Open .env file in editor if possible
if command -v code &> /dev/null; then
    read -p "Open .env file in VS Code? (y/n): " open_vscode
    if [[ $open_vscode =~ ^[Yy]$ ]]; then
        code .env
    fi
elif command -v nano &> /dev/null; then
    read -p "Open .env file in nano editor? (y/n): " open_nano
    if [[ $open_nano =~ ^[Yy]$ ]]; then
        nano .env
    fi
elif command -v vim &> /dev/null; then
    read -p "Open .env file in vim editor? (y/n): " open_vim
    if [[ $open_vim =~ ^[Yy]$ ]]; then
        vim .env
    fi
fi

print_success "Environment setup completed!"
echo ""
echo "Next steps:"
echo "1. Update the values in .env file"
echo "2. Test your configuration: npm run testflight:setup"
echo "3. Build for TestFlight: npm run build:testflight"
echo ""
echo "Remember: .env file is gitignored and should not be committed to version control" 
#!/bin/bash

# TestFlight Setup Script for Shabbos Weather App
# This script helps automate the TestFlight setup process

set -e

echo "🚀 Shabbos Weather TestFlight Setup"
echo "=================================="

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

# Check if EAS CLI is installed
print_status "Checking EAS CLI installation..."
if ! command -v eas &> /dev/null; then
    print_error "EAS CLI is not installed. Please install it first:"
    echo "npm install -g @expo/eas-cli"
    exit 1
fi
print_success "EAS CLI is installed"

# Check if logged in to Expo
print_status "Checking Expo login status..."
if ! eas whoami &> /dev/null; then
    print_error "Not logged in to Expo. Please login first:"
    echo "eas login"
    exit 1
fi
print_success "Logged in to Expo"

# Check if eas.json exists
if [ ! -f "eas.json" ]; then
    print_error "eas.json not found. Please ensure you're in the project root directory."
    exit 1
fi

# Check if app.json exists
if [ ! -f "app.json" ]; then
    print_error "app.json not found. Please ensure you're in the project root directory."
    exit 1
fi

print_status "Configuration files found"

# Check if required fields are configured
print_status "Checking configuration..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found"
    echo "Please create a .env file based on env.example"
    echo "cp env.example .env"
    echo "Then update the values in .env with your actual configuration"
fi

# Check if required environment variables are set
if [ -f ".env" ]; then
    source .env
    
    if [ -z "$APPLE_TEAM_ID" ]; then
        print_warning "APPLE_TEAM_ID not set in .env"
    fi
    
    if [ -z "$ASC_APP_ID" ]; then
        print_warning "ASC_APP_ID not set in .env"
    fi
    
    if [ -z "$APPLE_ID" ]; then
        print_warning "APPLE_ID not set in .env"
    fi
else
    print_warning "Environment variables not configured"
    echo "Please create a .env file with your configuration"
fi

print_status "Configuration check complete"

# Function to build for TestFlight
build_testflight() {
    print_status "Building for TestFlight..."
    print_status "This may take 10-15 minutes..."
    
    if npm run build:testflight; then
        print_success "Build completed successfully!"
        print_status "You can monitor the build at: https://expo.dev/accounts/ryanhorowitz/projects/shabbospdf-mobile/builds"
    else
        print_error "Build failed. Please check the logs above."
        exit 1
    fi
}

# Function to submit to TestFlight
submit_testflight() {
    print_status "Submitting to TestFlight..."
    
    if npm run submit:testflight; then
        print_success "Submission completed successfully!"
        print_status "Check App Store Connect for processing status"
    else
        print_error "Submission failed. Please check the logs above."
        exit 1
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "What would you like to do?"
    echo "1) Build for TestFlight"
    echo "2) Submit to TestFlight"
    echo "3) Build and Submit (full process)"
    echo "4) Check build status"
    echo "5) View recent builds"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
}

# Process menu choice
process_choice() {
    case $choice in
        1)
            build_testflight
            ;;
        2)
            submit_testflight
            ;;
        3)
            build_testflight
            echo ""
            read -p "Build completed. Would you like to submit to TestFlight now? (y/n): " submit_choice
            if [[ $submit_choice =~ ^[Yy]$ ]]; then
                submit_testflight
            fi
            ;;
        4)
            print_status "Checking build status..."
            eas build:list --platform=ios --limit=5
            ;;
        5)
            print_status "Recent builds:"
            eas build:list --platform=ios --limit=10
            ;;
        6)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please try again."
            ;;
    esac
}

# Check if running in interactive mode
if [[ $- == *i* ]]; then
    # Interactive mode
    while true; do
        show_menu
        process_choice
        echo ""
        read -p "Press Enter to continue..."
    done
else
    # Non-interactive mode - run full process
    print_status "Running in non-interactive mode"
    build_testflight
    submit_testflight
fi

print_success "TestFlight setup process completed!"
echo ""
echo "Next steps:"
echo "1. Go to App Store Connect: https://appstoreconnect.apple.com"
echo "2. Navigate to your app → TestFlight"
echo "3. Add test information and testers"
echo "4. For external testers, submit for Beta App Review"
echo ""
echo "For detailed instructions, see: TESTFLIGHT_SETUP.md"
echo "For checklist, see: BETA_TESTING_CHECKLIST.md" 
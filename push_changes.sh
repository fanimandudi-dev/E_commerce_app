#!/bin/bash

# Script to push vendor UI modernization changes to GitHub
# Run this from the food-campus directory

echo "=========================================="
echo "Food Campus - Vendor UI Modernization"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the food-campus directory"
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "fix/vendor-ui" ]; then
    echo "⚠️  Warning: You're not on the fix/vendor-ui branch"
    read -p "Do you want to switch to fix/vendor-ui? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout fix/vendor-ui || exit 1
    fi
fi

echo ""
echo "Checking remote configuration..."
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    echo "⚠️  No 'origin' remote configured"
    read -p "Do you want to add origin remote? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter GitHub repository URL: " REPO_URL
        git remote add origin "$REPO_URL"
    fi
fi

echo ""
echo "Current remote:"
git remote -v

echo ""
echo "=========================================="
echo "Pushing changes to GitHub..."
echo "=========================================="
echo ""

# Try to push
if git push -u origin fix/vendor-ui; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to your GitHub repository"
    echo "2. You should see a prompt to create a Pull Request"
    echo "3. Create PR from fix/vendor-ui to main"
    echo ""
    echo "PR Template available at: PULL_REQUEST_TEMPLATE.md"
    echo "Instructions available at: GITHUB_PR_INSTRUCTIONS.md"
else
    echo ""
    echo "❌ Failed to push automatically"
    echo ""
    echo "This usually means authentication is required."
    echo ""
    echo "Manual Push Instructions:"
    echo "========================"
    echo ""
    echo "Option 1: Using GitHub Token"
    echo "  1. Create a Personal Access Token on GitHub"
    echo "     (Settings > Developer settings > Personal access tokens)"
    echo "  2. Run: git remote set-url origin https://YOUR_TOKEN@github.com/fanimandudi-dev/E_commerce_app.git"
    echo "  3. Run: git push -u origin fix/vendor-ui"
    echo ""
    echo "Option 2: Using SSH"
    echo "  1. Make sure SSH key is added to GitHub"
    echo "  2. Run: git remote set-url origin git@github.com:fanimandudi-dev/E_commerce_app.git"
    echo "  3. Run: git push -u origin fix/vendor-ui"
    echo ""
    echo "Option 3: Manual Upload"
    echo "  1. Create a new branch on GitHub from main"
    echo "  2. Upload all changed files manually"
    echo "  3. Create a Pull Request"
    echo ""
    echo "Changed files:"
    git status --short
fi

echo ""
echo "=========================================="

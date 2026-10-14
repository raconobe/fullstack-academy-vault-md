#!/bin/bash

# 1. Check if there are any changes (modified, new, or deleted files)
if [[ -z $(git status -s) ]]; then
    echo "✨ Everything is already up to date! No changes to push."
    echo ""
    read -p "Press [Enter] key to close this window..."
    exit 0
fi

# 2. Show status so you can see what changed
echo "📂 Changes detected:"
git status -s

# 3. Stage all changes
git add .

# 4. Commit with a message (uses today's date/time if you don't provide one)
if [ -z "$1" ]; then
    COMMIT_MSG="auto-sync: update files $(date +'%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

git commit -m "$COMMIT_MSG"

# 5. Push to GitHub using your configured SSH key
echo "🚀 Pushing to GitHub..."
git push

echo "✅ Sync complete!"
echo ""
read -p "Press [Enter] key to close this window..."   
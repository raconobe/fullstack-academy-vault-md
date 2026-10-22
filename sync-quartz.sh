#!/bin/bash

# Define base paths using the $HOME variable
VAULT_PATH="$HOME/Desktop/fullstack-academy-vault-md"
QUARTZ_CONTENT="$HOME/Desktop/fullstack-academy-site-quartz/quartz/content"
QUARTZ_DIR="$HOME/Desktop/fullstack-academy-site-quartz/quartz"

# 1. Sync Obsidian Vault to Quartz Content directory
echo "🔄 Syncing Obsidian notes to Quartz..."
rsync -av --delete \
  --exclude='.obsidian' \
  --exclude='.git' \
  --exclude='/*.*' \
  "$VAULT_PATH/" \
  "$QUARTZ_CONTENT/"

# 2. Move to Quartz directory and start server
echo "🚀 Starting Quartz server..."
cd "$QUARTZ_DIR" || exit
npx quartz build --serve
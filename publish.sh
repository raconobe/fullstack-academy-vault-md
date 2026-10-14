#!/bin/bash
# Usage: Run inside your new project directory

REPO_NAME="fullstack-academy-vault-md" # Change this

git init
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"
git remote add origin "git@github.com:raconobe/${REPO_NAME}.git"
git branch -M main
git add .
git commit -m "feat: initial commit"
git push -u origin main
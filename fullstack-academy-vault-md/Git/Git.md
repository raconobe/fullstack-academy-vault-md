Setting up local Git tracking with the `obsidian-git` plugin is a fantastic choice. It keeps your files 100% private, gives you full version history, and automatically backs up your vault to GitHub in the background without needing a paid subscription.

  

Since you mentioned having multiple SSH keys, let's get your local vault initialized and connected securely step-by-step.

  

### Step 1: Initialize Git in Your Vault Folder

First, open your terminal, navigate to your Obsidian vault directory (e.g., `Dev-Academy-Vault`), and initialize a local Git repository:

  

Bash

```
cd ~/Documents/Dev-Academy-Vault   # Replace with your actual vault path
git init
```

### Step 2: Create a `.gitignore` File

Obsidian and your OS generate temporary cache files that you don't want clogging up your GitHub repository. Create a `.gitignore` file inside your vault root:

  

Bash

```
nano .gitignore
```

Paste these lines inside, save, and exit (`Ctrl+O`, `Enter`, `Ctrl+X`):

  

Plaintext

```
.obsidian/workspace
.obsidian/workspace.json
.obsidian/cache
.DS_Store
```

### Step 3: Handle Your SSH Keys (Multiple Keys Setup)

Since you have two SSH keys, you need to tell Git which key to use for this specific repository.

  

1. List your keys to check their filenames (usually in `~/.ssh/`):
    
      
    
    Bash
    
    ```
    ls -la ~/.ssh/
    ```
    
2. Identify the specific SSH key you want to use for GitHub (for example, `id_rsa_github` or `id_ed25519_github`).
    
      
    
3. Set the local SSH command specifically for _this_ vault repository so it doesn't conflict with your other keys:
    
      
    
    Bash
    
    ```
    git config core.sshCommand "ssh -i ~/.ssh/YOUR_SPECIFIC_KEY -o IdentitiesOnly=yes"
    ```
    
    _(Replace `~/.ssh/YOUR_SPECIFIC_KEY` with the exact path to your GitHub-associated private key)._
    
      
    

### Step 4: Link to Your GitHub Repository

1. Create a new **Private** repository on GitHub (e.g., named `dev-academy-vault`).
    
      
    
2. Link your local vault to GitHub and push your initial setup:
    
      
    
    Bash
    
    ```
    git remote add origin git@github.com:YOUR_USERNAME/dev-academy-vault.git
    git branch -M main
    git add .
    git commit -m "feat: initial vault structure"
    git push -u origin main
    ```
    

### Step 5: Install and Configure the `obsidian-git` Plugin

Now that your local folder is a working Git repository linked to GitHub, automate it inside Obsidian:

  

1. Open Obsidian and open your vault.
    
      
    
2. Go to **Settings** $\rightarrow$ **Community plugins** $\rightarrow$ Enable community plugins.
    
      
    
3. Click **Browse**, search for **Obsidian Git**, and click **Install**, then **Enable**.
    
      
    
4. Open the **Obsidian Git Settings**:
    
      
    - **Vault backup interval:** Set your preferred automatic backup frequency (e.g., every 30 or 60 minutes).
        
          
        
    - **Commit message:** You can customize the auto-commit message (e.g., `backup: {{date}}`).
        
          
        
    - **Pull on startup:** Toggle **On** so your vault updates automatically whenever you open Obsidian on a new device.
        
          
        
    - **Push on save:** Toggle **On** if you want your changes synced to GitHub shortly after you finish typing.

 id_ed25519_raco


    git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"


```

# 1. Open your Quartz project folder
cd /home/rco/Desktop/fullstack-academy-site-quartz/quartz

# 2. Initialize Git if it isn't already a git repo
git init

# 3. Tell Git to use your specific SSH key for this repository
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"

# 4. Link your local Quartz site to your GitHub repository
# (Replace YOUR_GITHUB_USERNAME with your real GitHub account name)
git remote add origin git@github.com:raconobe/fullstack-academy-site-quartz.git

# 5. Set branch name and make initial commit 
git branch -M main
git add .
git commit -m "feat: initial quartz site setup"

# 6. Push to GitHub
git push -u origin main

```



----


The reason GitHub is asking for a **Username** is because your current `origin` remote URL is configured to use **HTTPS** (`[https://github.com/](https://github.com/)...`) instead of **SSH** (`git@github.com:...`).

  

When Git uses HTTPS, it bypasses your SSH key entirely and prompts for credentials.

  

Here is how to fix it in 2 simple commands:

  

### Step 1: Change the Remote URL to SSH

Run this command inside your `/home/rco/Desktop/fullstack-academy-site-quartz/quartz` directory:

  

Bash

```
git remote set-url origin git@github.com:raconobe/fullstack-academy-site-quartz.git
```

> **Why this fixes it:** `git remote add` failed earlier because `origin` already existed with an HTTPS URL. `git remote set-url` replaces that URL with your SSH address so Git uses your `id_ed25519_raco` key!
> 
>   

### Step 2: Push to GitHub

Now try pushing again:

  

Bash

```
git push -u origin main
```

Git will now authenticate silently using your `~/.ssh/id_ed25519_raco` key without asking for a username or password!

  

### How to verify your remote is set correctly

If you want to double-check that Git is pointing to the SSH URL, run:

  

Bash

```
git remote -v
```

It should display:

Plaintext

```
origin  git@github.com:raconobe/fullstack-academy-site-quartz.git (fetch)
origin  git@github.com:raconobe/fullstack-academy-site-quartz.git (push)
```






---

Yes, running **`git push`** will work!

  

Because you ran `git push -u origin main` during your setup, the **`-u`** flag (short for `--set-upstream`) permanently linked your local `main` branch to `origin/main`.

  

From now on, whenever you are on your `main` branch, you can simply type:

  

Bash

```
git push
```

Git will automatically know to send your commits to **`origin`** on the **`main`** branch using your SSH key (`id_ed25519_raco`).

  

### Quick Reference

- **`git push`**: Pushes your latest commits to `origin main` automatically.
    
      
    
- **`git push origin main`**: Explicitly states where to push (does the exact same thing).
    
      
    
- **`git status`**: Shows how many commits you are ahead of `origin` before you push.





---


Here are the exact steps to connect a **new local project folder** to a **new GitHub repository** using the same SSH key (`id_ed25519_raco`).

---

### Step-by-Step Guide for a New Repository

Replace **`NEW_REPO_NAME`** with the name of your new GitHub repository (and adjust your folder path accordingly).

#### Step 1: Open your new project folder in terminal

```bash
cd ~/Desktop/YOUR_NEW_PROJECT_FOLDER

```

#### Step 2: Initialize Git inside the folder

```bash
git init

```

#### Step 3: Tell Git to use your `id_ed25519_raco` SSH key

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"

```

#### Step 4: Link your local folder to your new GitHub repository

```bash
git remote add origin git@github.com:raconobe/NEW_REPO_NAME.git

```

#### Step 5: Rename main branch, stage, commit, and push

```bash
git branch -M main
git add .
git commit -m "feat: initial commit"
git push -u origin main

```

---

### Quick Cheat Sheet / Script Template

If you want to create a small helper script or copy-paste block whenever you create a new repository in the future:

```bash
#!/bin/bash
# Usage: Run inside your new project directory

REPO_NAME="NEW_REPO_NAME" # Change this

git init
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"
git remote add origin "git@github.com:raconobe/${REPO_NAME}.git"
git branch -M main
git add .
git commit -m "feat: initial commit"
git push -u origin main

```

Once the initial `git push -u origin main` completes for a project, you can simply type `git push` for all future updates in that repository!






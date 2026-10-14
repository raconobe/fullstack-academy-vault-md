

When building a **large library focused on many topics** (languages, frameworks, tools, software design, course notes), static site performance, internal linking speed (`[[wikilinks]]`), and navigation hierarchy become critical.
## 📊 Comparison Matrix for Large Topic Vaults

|**Feature / Criteria**|**🪴 Obsidian Digital Garden Plugin**|**⚡ Quartz (v4)**|**💐 Flowershow**|
|---|---|---|---|
|**Publishing Workflow**|**In-Obsidian Button** (Selective publishing with `dg-publish: true`)|**Git-Based** (Pushes vault folder to GitHub, site auto-builds)|**In-Obsidian Button / Cloud Dashboard**|
|**Large Vault Performance**|**High** (Only builds notes marked for publish)|**Extremely High** (Fast TS/Node build engine designed for thousands of notes)|**Moderate** (Can slow down with massive MDX syntax trees)|
|**Obsidian Features**|`[[Wikilinks]]`, Callouts, Backlinks, Local Graph View|`[[Wikilinks]]`, Callouts, Backlinks, Global & Local Interactive Graph, Popover previews|`[[Wikilinks]]`, MDX Components, Tailored Document/Catalog Views|
|**Topic Browsing & Nav**|Folder Tree + Tag Search|File Explorer + Interactive Graph + Explorer Component + Tags|Document Catalogs & Collection Cards|
|**Best Used For...**|Publishing selected notes on the fly without publishing the whole vault.|**Total Vault Publishing**. Feels like an interactive documentation hub.|Technical documentation with rich component layouts.|

## 🎯 How to Test All 3 Options (Step-by-Step)

### Option 1: Quartz v4 (Recommended for Broad Topic Libraries)

Quartz converts your Markdown folder structure into a fast, searchable site with interactive popups and graph views.

  

#### Quick Setup Steps:

1. Open terminal on your Debian system and make sure Node.js (v18+) and Git are installed:
    
      
    
    Bash
    
    ```
    node -v
    git --version
    ```
    
2. Initialize Quartz in a separate folder (outside your vault):
    
      
    
    Bash
    
    ```
    npx quartz create
    ```
    
3. When prompted, choose **"Empty Quartz"** or link it directly to your vault path (e.g., `~/Documents/FullStack-Academy-md`).
    
      
    
4. Run the local preview server:
    
      
    
    Bash
    
    ```
    npx quartz build --serve
    ```
    
5. Open `http://localhost:8080` in your browser. You will see your vault rendered with interactive page previews, graph views, and fast search!
    
      
    

### Option 2: Obsidian Digital Garden Plugin (Easiest / Selective Publishing)

If you have a 1,000-note vault but only want to publish 50 specific course notes without exposing raw drafts, this is the best tool.

  

#### Quick Setup Steps:

1. In Obsidian, go to **Settings** $\rightarrow$ **Community Plugins** $\rightarrow$ Search **Digital Garden** $\rightarrow$ **Install & Enable**.
    
      
    
2. Click **Deploy to Vercel** on the [Digital Garden GitHub Repository](https://github.com/oleeskild/obsidian-digital-garden). This creates a free copy on your GitHub account connected to Vercel.
    
      
    
3. Generate a GitHub Personal Access Token (PAT) with repository read/write permissions.
    
      
    
4. Paste your GitHub username, repo name, and token into the plugin settings inside Obsidian.
    
      
    
5. Add `dg-publish: true` to the frontmatter of any note you want public, then run the command `Digital Garden: Publish Single Note`.
    
      
    

### Option 3: Flowershow (For Book/Doc-Style Layouts)

Flowershow turns Markdown into clean digital docs using Next.js/MDX.

  

#### Quick Setup Steps:

1. In Obsidian, search and install the **Flowershow** community plugin.
    
      
    
2. Sign up at `cloud.flowershow.app` and generate a Personal Access Token.
    
      
    
3. Paste the token into the Flowershow plugin settings in Obsidian.
    
      
    
4. Use the ribbon icon to select notes or click **Publish All** to test hosting on Flowershow Cloud.
    
      
    

## 💡 Recommendation for Your Vault Structure

Since your vault covers **Frontend, Backend, Java, Go, Linux, and Software Design**:

  

- **Choose Quartz** if you want a complete, publicly viewable **"Tech Wiki"** where visitors can click on topic nodes and search across all course notes seamlessly.
    
      
    
- **Choose Digital Garden** if you want to keep parts of your vault strictly private while selectively sharing individual course modules.




---

# Quartz is a Git repository 
That contains its own internal CLI scripts (/quartz). Running npx quartz create inside an empty or un-cloned folder fails because npm cannot locate Quartz's binaries.

  

### 🛠️ The Fix: Clone Quartz First, Then Run `npx quartz create`

Follow these exact steps from inside your terminal:

  

#### 1. Clone the Official Quartz Repository

If you are inside `~/Desktop/Quartz`, remove the empty folder (or step back) and clone the official repository:

  

Bash

```
cd ~/Desktop
rm -rf Quartz   # remove the empty folder
git clone https://github.com/jackyzha0/quartz.git
cd quartz
```

#### 2. Install the Required Dependencies

Before running the setup wizard, install Quartz's required npm packages:

  

Bash

```
npm install
```

#### 3. Run the Creation Wizard

Now that the Quartz scripts are downloaded locally, run the interactive setup command:

  

Bash

```
npx quartz create
```

This will launch the setup wizard! It will prompt you with three simple choices:

  

1. **Choose a setup option:** Choose **"Obsidian"** (or _Default_).
    
      
    
2. **Content strategy:** Select **"symlink"** (to link directly to your `~/Documents/FullStack-Academy-md` vault so any changes in Obsidian update live) or **"copy"**.
    
      
    
3. **Link resolution:** Choose **"shortest"** (standard Obsidian `[[Wikilinks]]` format).
    
      
    

#### 4. Preview Your Site Locally

Once the wizard finishes, install the configured plugins and start the local dev server:

  

Bash

```
npx quartz plugin install --from-config
npx quartz build --serve
```

Then open **`http://localhost:8080`** in Firefox/Brave to see your full vault rendered as an interactive, searchable website!



---


That Quartz preview looks amazing! It is already rendering your breadcrumbs, interactive graph, table of contents, and Markdown styling clean and fast.

  

Notice in your screenshot that the breadcrumb shows `fullStack-academy-md > FullStack-Academy-md` twice. This happens when Quartz copies the entire vault directory into its `content/` folder. We will fix that and get your workflow set up.

  

## 1. 🏷️ Name Proposals for Your Quartz Repository

Since your source vault in Obsidian is **`FullStack-Academy-md`**, naming your Quartz repository differently keeps your source notes distinct from your published web engine:

  

|**Quartz Repo / Site Name**|**Purpose / Vibe**|
|---|---|
|**`fullstack-academy-site`**|**Recommended.** Very clean, indicates this is the generated web site repo.|
|**`dev-notes-hub`**|General public knowledge base name for Netlify/Vercel.|
|**`fullstack-academy-docs`**|Has an official documentation feel.|

## 2. ⚙️  Configure  Quartz?   

1. **Site Title:** Search for `pageTitle` and change `"Quartz 5"` to:
    
      
    
    TypeScript
    
    ```
    pageTitle: "FullStack Academy",
    ```
    
2. **Theme & Colors:** You can customize background colors, accent colors, and dark/light mode defaults under the `theme` object.
    
      
    
3. **Ignore Folders (e.g., Templates):** If you don't want your Obsidian `Templates` folder to show up on your public website, add it to the ignore list in `quartz.config.ts` or `quartz.layout.ts`.


## 3. 🐧 Linux Command to Sync Obsidian Notes to Quartz

Instead of copying nested folders manually (which caused the double `fullStack-academy-md` in your breadcrumbs), use **`rsync`**.

`rsync` syncs the _contents_ of your Obsidian vault directly into Quartz's `content/` directory and ignores unnecessary hidden files.

  

### The Sync Command:

Run this command whenever you want to update Quartz from Obsidian:

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' ~/Documents/FullStack-Academy-md/ ~/Desktop/quartz/content/
```

**Explanation of flags:**


> 
> - `-av`: Archive mode (preserves file dates) + Verbose output.
>      
> - `--delete`: Deletes files in Quartz if you deleted them in Obsidian (keeps them in sync).
>      
> - `~/Documents/FullStack-Academy-md/`: **Note the trailing slash `/`**—this copies the _files inside_, preventing the double folder issue.
>      
> - `~/Desktop/quartz/content/`: Quartz's target content folder.
>      

## 4. 🚀 How to Deploy Quartz to Vercel / Netlify

Quartz is pre-configured to build static files automatically using `npx quartz build`.

  

### Method A: Deploying to Vercel (Easiest)

1. Push your `quartz` folder to a new private or public GitHub repository (e.g., `fullstack-academy-site`).
    
       
2. Go to [Vercel](https://vercel.com) and click **Add New Project** $\rightarrow$ Import your GitHub repository.

    
3. Configure Framework Preset:
    - **Framework Preset:** `Other` (or _Node.js_)
        
    - **Build Command:** `npx quartz build`
    - **Output Directory:** `public`
        
          
        
4. Click **Deploy**. Vercel will auto-build your site in under 30 seconds! Every time you `git push` updates to GitHub, Vercel updates your website automatically.
    
      
    

### Method B: Deploying to Netlify

1. Log into [Netlify](https://netlify.com) and connect your GitHub repository.
    
      
    
2. Set the build settings:
    
      
    - **Build Command:** `npx quartz build`
        
          
        
    - **Publish Directory:** `public`
        
          
        
3. Click **Deploy Site**.
    
      
    

## 💡 Quick Automation Script (`sync-and-build.sh`)

You can create a quick bash script inside your home directory so you can update and preview your Quartz site in a single command:

  

Bash

```
nano ~/sync-quartz.sh
```

Paste these lines:

  

Bash

```
#!/bin/bash
# 1. Sync Obsidian files into Quartz content folder
rsync -av --delete --exclude='.obsidian' --exclude='.git' ~/Documents/FullStack-Academy-md/ ~/Desktop/quartz/content/

# 2. Navigate to Quartz and build/serve
cd ~/Desktop/quartz
npx quartz build --serve
```

Make it executable:

  

Bash

```
chmod +x ~/sync-quartz.sh
```

Now, whenever you finish writing notes in Obsidian, just open a terminal and run **`./sync-quartz.sh`**!




---
The error message shows why it failed:

  

Plaintext

```
rsync: [sender] change_dir "/home/rco/Documents/FullStack-Academy-md" failed: No such file or directory (2)
```

`rsync` cannot find the source folder `~/Documents/FullStack-Academy-md/`. This usually happens if your vault is stored in a different location or if there is a typo/case-sensitivity mismatch in the folder path (e.g. `FullStack-Academy-md` vs `fullstack-academy-md` vs `Desktop`).

  

### Step 1: Find the Exact Path to Your Obsidian Vault

Run this in your terminal to search for your vault folder:

  

Bash

```
find ~ -maxdepth 3 -iname "*FullStack*" -type d
```

_(This will return the exact path to your vault, such as `/home/rco/Documents/FullStack-Academy-md` or `/home/rco/Desktop/fullStack-academy-md`)_.

  

### Step 2: Run `rsync` with the Correct Path

Once you have the exact path, run `rsync` using that path.

  

If your Obsidian vault is actually on your **Desktop**, the command will look like this:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' ~/Desktop/fullStack-academy-md/ ~/Desktop/fullstack-academy-site-quartz/content/
```

If it is under **Documents**, make sure the capital letters match exactly:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' ~/Documents/FullStack-Academy-md/ ~/Desktop/fullstack-academy-site-quartz/content/
```

### Step 3: Test and Build Quartz

Once the sync finishes without errors, build your Quartz site:

Bash

```
cd ~/Desktop/fullstack-academy-site-quartz
npx quartz build --serve
```





---
That explains it! Your source vault is nested inside a folder with the same name: `/home/rco/Desktop/fullStack-academy-md/FullStack-Academy-md/`.

  

Here is the corrected `rsync` command using your exact path:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' ~/Desktop/fullStack-academy-md/FullStack-Academy-md/ ~/Desktop/fullstack-academy-site-quartz/content/
```

### Next Steps to Build and Test:

1. Run the corrected `rsync` command above.
    
      
    
2. Navigate to your Quartz folder and start the server:
    
      
    
    Bash
    
    ```
    cd ~/Desktop/fullstack-academy-site-quartz
    npx quartz build --serve
    ```
    
1. Open `http://localhost:8080` in your browser. The double folder issue in your breadcrumbs will now be completely gone, and your site will match your Obsidian vault structure perfectly!



---
The reason the first `rsync` command failed with the error `No such file or directory (2)` comes down to **how Linux handles folder paths, uppercase/lowercase letters, and subdirectories**:

  

## 🔍 The 2 Reasons It Failed

### 1. Letter Case Mismatch (Linux is Case-Sensitive)

In Linux, folder names are strictly case-sensitive.

  

- Your first command used: `~/Documents/FullStack-Academy-md/` (looking under `Documents` with a capital `F`).
    
      
    
- Your actual folder location is under `Desktop` with a lowercase `f` in the outer directory: `~/Desktop/fullStack-academy-md/`.
    
      
    

To Linux, `fullStack-academy-md` and `FullStack-Academy-md` are treated as two completely different folders.

  

### 2. Nested Subdirectories

As you found, your Obsidian vault was actually nested **two levels deep**:

  

Plaintext

```
/home/rco/Desktop/
└── fullStack-academy-md/           <-- Outer folder
    └── FullStack-Academy-md/       <-- Inner folder (Your actual Obsidian Vault)
```

Because the command was looking for the vault directly in `~/Documents/FullStack-Academy-md/`, `rsync` couldn't find a directory at that path and failed immediately before checking whether any files were inside.

  

## 🛠️ The Correct Clean Setup

Using the exact full path fixes `rsync` completely:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' /home/rco/Desktop/fullStack-academy-md/FullStack-Academy-md/ ~/Desktop/fullstack-academy-site-quartz/content/
```

> **Trailing Slash `/` Tip:**
> 
>   
> 
> Notice the trailing slash `/` at the end of `FullStack-Academy-md/`. This tells `rsync`:
> 
>   
> 
> _"Copy the contents inside this folder directly into Quartz's `content/` directory, rather than creating an extra subfolder inside Quartz."_
> 
>   
> 
> This eliminates the double breadcrumbs (`fullStack-academy-md > FullStack-Academy-md`) you saw earlier on your Quartz web site!



---
Here is the exact recap and complete setup for syncing your Obsidian vault into your Quartz project on Debian Linux.

  

## 📍 Path Reference Summary

|**Role**|**Path on Your System**|
|---|---|
|**Obsidian Source Vault**|`/home/rco/Desktop/FullStack-Academy-Vault-MD/`|
|**Quartz Site Project**|`/home/rco/Desktop/fullstack-academy-site-quartz/`|
|**Quartz Content Destination**|`/home/rco/Desktop/fullstack-academy-site-quartz/content/`|

## ⚡ 1. The Direct `rsync` Command

To sync all your Obsidian notes directly into Quartz without creating extra nested folders, run this in your terminal:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' /home/rco/Desktop/FullStack-Academy-Vault-MD/ /home/rco/Desktop/fullstack-academy-site-quartz/content/
```

> **Why the trailing slash `/` on the source path matters:**
> 
>   
> 
> Placing `/` after `FullStack-Academy-Vault-MD/` tells `rsync` to copy the **contents inside** the vault directory directly into Quartz's `content/` folder. This avoids double breadcrumb folders on your published website.
> 
>   

## 🤖 2. Automated One-Command Workflow Script

Instead of typing out long paths every time you finish editing notes, create a small executable script:

  

### Step 1: Create the script

Bash

```
nano ~/sync-quartz.sh
```

### Step 2: Paste this code

Bash

```
#!/bin/bash

# 1. Sync Obsidian Vault to Quartz Content directory
echo "🔄 Syncing Obsidian notes to Quartz..."
rsync -av --delete --exclude='.obsidian' --exclude='.git' \
  /home/rco/Desktop/FullStack-Academy-Vault-MD/ \
  /home/rco/Desktop/fullstack-academy-site-quartz/content/

# 2. Move to Quartz directory and launch local preview server
echo "🚀 Starting Quartz server..."
cd /home/rco/Desktop/fullstack-academy-site-quartz
npx quartz build --serve
```

### Step 3: Make it executable

Bash

```
chmod +x ~/sync-quartz.sh
```

Now, whenever you finish taking notes in Obsidian, simply open a terminal and run:

  

Bash

```
~/sync-quartz.sh
```

Quartz will update your files and immediately host your local preview at **`http://localhost:8080`**.

  

## 🚀 3. Pushing to GitHub for Vercel / Netlify Deployment

When you are ready to publish your site online:

  

Bash

```
cd /home/rco/Desktop/fullstack-academy-site-quartz
git add .
git commit -m "feat: sync latest obsidian notes"
git push origin main
```

Once pushed, **Vercel** or **Netlify** will pick up the changes and automatically re-deploy your web app in seconds!



---


Using `~` (tilde) is definitely convenient when typing interactively in the terminal! However, in **written instructions, automation scripts, and background tools**, explicitly writing `/home/rco/` or `$HOME` is generally preferred.

  

Here is why both approaches are used and when one is better than the other:

  

## 🆚 `~` vs `/home/username/` (or `$HOME`)

|**Feature**|**Using ~**|**Using /home/rco/ or $HOME**|
|---|---|---|
|**Interactive Terminal**|🚀 **Best for typing.** Fast and short (`~/Desktop`).|🐢 Tedious to type out manually every time.|
|**Quoting & Spaces**|⚠️ **Can fail inside double quotes.** `rsync "~ /path"` won't expand `~` in bash.|🔒 **Safe inside double quotes:** `"$HOME/path with space"` expands cleanly.|
|**Bash Scripts**|⚠️ Can cause silent expansion errors depending on context.|🟢 Standard best practice for shell scripts.|
|**Crontab / Systemd Services**|❌ **Fails.** `~` is a shell feature, not a Linux path.|🟢 Works universally across all environments.|

## 🔍 The Main Issue with `~` in Commands

When you use double quotes around a path in Bash (which you often need if folder names ever contain spaces or special characters):

  

Bash

```
# ❌ THIS FAILS because ~ inside quotes is NOT expanded by Bash:
rsync -av "~/Desktop/My Notes/" "~/Desktop/Quartz/"

# 🟢 THIS WORKS because $HOME expands inside double quotes:
rsync -av "$HOME/Desktop/My Notes/" "$HOME/Desktop/Quartz/"

# 🟢 THIS ALSO WORKS using exact paths:
rsync -av "/home/rco/Desktop/My Notes/" "/home/rco/Desktop/Quartz/"
```

## 💡 Summary & Rule of Thumb

- **Inside a bash script (`.sh` file):** Use **`$HOME`** or full paths `/home/rco/`. It guarantees your script won't break if invoked by Cron, systemd, or another subshell.
    
      
    
- **Typing directly in your terminal:** Use **`~`**—it's fast, convenient, and built for manual navigation!
    
      
    

Both `~/Desktop/...` and `/home/rco/Desktop/...` point to the exact same directory on your machine.




---


Look at your Dolphin file manager window—the screenshot reveals exactly why it broke!

  

Inside your Quartz `content/` folder, you now have a folder called `fullstack-academy-vault-md/` nested inside it. Because of that extra wrapper folder, Quartz is rendering your URLs with `fullstack-academy-vault-md/` in the path, leading to the **404 error** on `http://localhost:8080/`.

  

### 🛠️ How to Fix It Right Now

Run these exact commands in your terminal to clear out the nested folder and sync the contents correctly:

  

#### 1. Clean the Quartz content directory

Bash

```
rm -rf ~/Desktop/fullstack-academy-site-quartz/content/*
```

#### 2. Re-run `rsync` with the **trailing slash `/`**

The trailing slash is critical because it tells `rsync` to copy the _contents inside_ the vault rather than the folder itself:

  

Bash

```
rsync -av --delete --exclude='.obsidian' --exclude='.git' /home/rco/Desktop/FullStack-Academy-Vault-MD/ /home/rco/Desktop/fullstack-academy-site-quartz/content/
```

#### 3. Rebuild and Launch Quartz

Bash

```
cd ~/Desktop/fullstack-academy-site-quartz
npx quartz build --serve
```

Now, when you open `http://localhost:8080`, your notes will sit directly at the root of the website, fixing the 404 error instantly!



---
The official documentation and website for Quartz is:

  

- **[quartz.jzhao.xyz](https://quartz.jzhao.xyz/)**
    
      
    

And its open-source code repository can be found on GitHub at **[github.com/jackyzha0/quartz](https://github.com/jackyzha0/quartz)**.

  

The documentation site is extremely helpful for looking up custom styling options, CSS configuration, layout plugins, and advanced features like embedding components or configuring analytics!



---

Yes, absolutely! Quartz comes with a modular layout system where you can add, remove, or rearrange components in the header, footer, left column, and right column.

  

To customize what appears in your header (like adding custom navigation links, a site title, search bar tweaks, or social icons), you edit the **`quartz.layout.ts`** file in your project folder.

  

### 🛠️ How to Customize the Header

1. Open **`quartz.layout.ts`** inside your `fullstack-academy-site-quartz/` folder using your text editor (like VS Code or nano).
    
      
    
2. Look for the `sharedPageGuard` or **`pageHeader`** configuration. By default, Quartz includes components like breadcrumbs, page title, and search.
    
      
    

Here are 3 ways you can fill up that empty header:

  

#### 1. Add a Custom Title or Logo Text

In `quartz.config.ts` or `quartz.layout.ts`, you can change the main page title so it doesn't look blank. In `quartz.config.ts`, look for:

  

TypeScript

```
pageTitle: "FullStack Academy", // Change this to your desired header title
```

#### 2. Add Links or Navigation Buttons to the Header

You can add custom components to the header in `quartz.layout.ts`. For example, many users add quick-link buttons for "Home", "Tags", or their GitHub profile directly into the header or left sidebar.

  

Under `quartz.layout.ts`, look at the `left` or header component array:

  

TypeScript

```
export const defaultComponentLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(), // This builds the folder tree on the left
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
```

#### 3. Inject Custom HTML / CSS Banner

If you want a physical banner or header image across the top of every page, you can customize `quartz/components/Header.tsx` or inject a custom CSS banner into `quartz/styles/custom.scss`.

  

### 💡 Quick Styling Tip via Custom CSS

Since you mentioned it looks "not beautiful not ugly" (clean and minimalist), you can easily add a subtle header background, accent borders, or a branded header logo by editing **`quartz/styles/custom.scss`**:

  

SCSS

```
// Example: Add a clean border or background to the top navigation header
header {
  border-bottom: 1px solid var(--lightgray);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
}
```

After making any changes in `quartz.layout.ts` or `custom.scss`, just run your local preview again to see the updates instantly:

Bash

```
npx quartz build --serve
```



---
Quartz 5 introduces a new configuration model designed around **`quartz.config.yaml`**.

  

In Quartz 5, components like search, graph, and breadcrumbs are configured as plugins inside **`quartz.config.yaml`**, with their position on the page defined directly in the YAML file.

  

### 🛠️ How Header Positioning Works in Quartz 5

In `quartz.config.yaml`, each plugin in the `plugins:` list accepts a `layout:` section where you define its `position:` and `priority:`.

  

Supported layout positions include:

  

- **`header`** (Laid out horizontally across the top above the main body)
    
      
    
- **`beforeBody`** (Stacked vertically above the note text, where breadcrumbs usually sit)
    
      
    
- **`left`** (Left sidebar)
    
      
    
- **`right`** (Right sidebar)
    
      
    

### 💡 Example: Moving Search & Dark Mode into the Header

If you want to move the **Search bar** or **Darkmode toggle** from the left sidebar up into the top header (making it look like a traditional documentation hub):

  

1. Open **`quartz.config.yaml`** in VS Code.
    
      
    
2. Look for the plugin entries under `plugins:`.
    
      
    
3. Update their `layout:` entry:
    
      
    

YAML

```
plugins:
  - source: github:quartz-community/search
    enabled: true
    layout:
      position: header   # Moved from 'left' to 'header'
      priority: 10

  - source: github:quartz-community/darkmode
    enabled: true
    layout:
      position: header   # Moved from 'left' to 'header'
      priority: 20
```

### 🎨 Customizing Styles via SCSS

To tweak margins, add a subtle border beneath the header, or change header font sizes:

  

1. Look in your sidebar for **`quartz/styles/custom.scss`** (or create it inside `quartz/styles/`).
    
      
    
2. Add your custom CSS/SCSS rules:
    
      
    

SCSS

```
// Add a subtle bottom border under the header section
header {
  border-bottom: 1px solid var(--lightgray);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
```

Save the file and run `npx quartz build --serve` to see your changes immediately on your local server!




---



└  You're all set! Not sure what to do next? Try:  
 • Customizing Quartz a bit more by editing `quartz.config.yaml`  
 • Running `npx quartz build --serve` to preview your Quartz locally  
 • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)



| **Command**              | **Execution Space**          | **Directory Change Affects You?** |
| ------------------------ | ---------------------------- | --------------------------------- |
| **`./goto-quartz.sh`**   | Child process (Subshell)     | **No** (Terminal path stays put)  |
| **`. ./goto-quartz.sh`** | Current process (Main Shell) | **Yes** (Terminal path changes)   |


---


It is awesome to hear that! Welcome to the power of Linux shell scripting.

  

Once you realize that a simple `.sh` file can automate repetitive tasks, automate complex directory navigation, and run multi-step build tools in a single line, terminal work transitions from typing commands into creating custom tools for yourself.

  

Here is why writing bash scripts is so empowering and addictive:

  

- **Complete Automation:** Tasks that used to take 5 to 10 manual steps (`cd`, copying, clearing caches, booting local servers) become a single command.
    
      
    
- **Portability:** By using variables like `$HOME`, your scripts can be copied to any Linux laptop or server and just work.
    
      
    
- **Custom Tooling:** You aren't limited by what an interface gives you—you define your own workflow.
    
      
    

### Quick Tip: Make Your `.sh` Script Executable

If you ever want to run scripts without typing `bash` beforehand, remember to give them execute permissions once using `chmod`:

  

Bash

```
chmod +x your-script-name.sh
```

Now you can run it directly:

  

- `./your-script-name.sh` (runs in a subshell)
    
      
    
- `. ./your-script-name.sh` (runs in your current shell and changes directories)
    

![](data:image/png;base64,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)

you need to learn BASH Scripting RIGHT NOW!! // EP 1

YouTube · NetworkChuck

![](data:image/png;base64,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)

Bash Scripting Tutorial for Beginners

YouTube · freeCodeCamp.org

![](data:image/png;base64,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)

Bash in 100 Seconds

YouTube · Fireship



---
**Yes, but with a slight distinction!** They are closely related, but they represent two different parts of working in the terminal. Think of them like this:

- **Linux Commands** are the **tools** (the nouns and verbs). These are individual programs installed on your system—like `rsync` (to copy files), `cd` (to change folders), `ls` (to list files), or `mkdir` (to make a folder).
    
- **Bash** is the **environment and grammar** (the engine). It's the program that reads what you type, executes those commands, manages variables like `$HOME`, runs your `.sh` scripts, and lets you write logic like loops and conditions.
    

### The Kitchen Analogy

- **Linux commands** are like the pots, pans, knives, and ingredients in a kitchen.
    
- **Bash** is the recipe book, the workflow, and the way you organize how those tools are used together step by step.
    

When people say _"Learn Bash,"_ they usually mean learning both: knowing the most useful Linux commands **plus** how to string them together into automation scripts (just like the one you built today!).




---

It is **not too complex at all**! You can easily tell `rsync` to only clean up and delete directories (folders) while leaving all standalone files in your `content` folder completely safe and untouched.

  

To do this, replace `--delete` with **`--delete-excluded` combined with `--exclude`**, or use the dedicated **`--filter` / `--delete` rule** that targets folders.

  

Here are the two simplest ways to achieve this in your script:

  

### Option 1: Tell `rsync` to only delete directories (`--delete-excluded` with `--filter`)

You can pass a filter rule that tells `rsync` to protect all files and only allow deletion on directories/folders:

  

Bash

```
rsync -av \
  --delete \
  --filter='-f "+ */" -f "- *"' \
  --exclude='.obsidian' \
  --exclude='.git' \
  "$VAULT_PATH/" \
  "$QUARTZ_CONTENT/"
```

> **How it works:**
> 
>   
> 
> - `--filter='-f "+ */" -f "- *"'`: Forces the delete routine to only match directories (`*/`), while ignoring loose files (`*`).
>     
>       
>     
> - Any root-level file in your `content/` folder (like `index.md` or configuration files) is completely protected from being deleted!
>     
>       
>     

### Option 2: Protect all top-level files using `--exclude='/*.*'` (Easiest & Cleanest)

If all your required Quartz files sit directly in the root of the `/content/` folder (like `index.md`, `404.md`, etc.), you can exclude any root-level file from being deleted:

  

Bash

```
rsync -av --delete \
  --exclude='.obsidian' \
  --exclude='.git' \
  --exclude='/*.*' \
  "$VAULT_PATH/" \
  "$QUARTZ_CONTENT/"
```

> **How it works:**
> 
>   
> 
> - `'/*.*'` tells `rsync`: _"Do not touch or delete any file directly sitting in the root of the destination folder."_
>     
>       
>     
> - Folders and subdirectories copied from your Obsidian vault will still sync and clean up normally!
>     
>       
>     

### Complete Updated Script

Here is your full script with **Option 2** applied:

Bash

```
#!/bin/bash

# Define base paths using the $HOME variable
VAULT_PATH="$HOME/Desktop/FullStack-Academy-Vault-MD"
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
```

![](data:image/png;base64,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)

5:06

Linux Exclude Files and Directories in Rsync

YouTube · Code SOS

![](data:image/png;base64,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)

2:18

Using rsync with exclude/include (2 Solutions!!)

YouTube · Roel Van de Paar

![](data:image/png;base64,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)

1:42

Ubuntu: rsync --delete and --exclude

YouTube · Roel Van de Paar



---



The reason those instructions failed is because **Quartz and Obsidian Git work differently than a standard Obsidian setup**:

  

1. **You are building a Quartz site**, which means your repository is the **Quartz site folder** (`fullstack-academy-site-quartz`), **NOT** your raw Obsidian vault folder.
    
      
    
2. The `obsidian-git` plugin needs to point to the **Quartz repository**, or you need to set up Git inside the Quartz directory itself!
    
      
    

Here is how to set this up correctly using your specific SSH key (`id_ed25519_raco`) and repository name (`fullstack-academy-site-quartz`).

  

## Part 1: Where to put `fullstack-academy-site-quartz` and link Git

You will set up Git **inside your Quartz project folder** on Linux (`/home/rco/Desktop/fullstack-academy-site-quartz/quartz`).

  

Run these exact commands in your terminal:

  

Bash

```
# 1. Open your Quartz project folder
cd /home/rco/Desktop/fullstack-academy-site-quartz/quartz

# 2. Initialize Git if it isn't already a git repo
git init

# 3. Tell Git to use your specific SSH key for this repository
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"

# 4. Link your local Quartz site to your GitHub repository
# (Replace YOUR_GITHUB_USERNAME with your real GitHub account name)
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/fullstack-academy-site-quartz.git

# 5. Set branch name and make initial commit
git branch -M main
git add .
git commit -m "feat: initial quartz site setup"

# 6. Push to GitHub
git push -u origin main
```

_(Note: If you already have `origin` set up, run `git remote set-url origin git@github.com:YOUR_GITHUB_USERNAME/fullstack-academy-site-quartz.git` instead)._

  

## Part 2: How your Obsidian Sync fits in

Since your main Obsidian notes live in `/home/rco/Desktop/FullStack-Academy-Vault-MD/`, you **do not** need the `obsidian-git` plugin to push the vault directly.

  

Instead, use the `.sh` script you built earlier! It syncs your raw notes into Quartz and pushes everything to GitHub in one command:

  

Create or update your `.sh` script (e.g., `publish.sh`):

  

Bash

```
#!/bin/bash

VAULT_PATH="$HOME/Desktop/FullStack-Academy-Vault-MD"
QUARTZ_DIR="$HOME/Desktop/fullstack-academy-site-quartz/quartz"

# 1. Sync Obsidian files into Quartz
echo "🔄 Syncing Obsidian notes into Quartz..."
rsync -av --delete \
  --exclude='.obsidian' \
  --exclude='.git' \
  --exclude='/*.*' \
  "$VAULT_PATH/" \
  "$QUARTZ_DIR/content/"

# 2. Go to Quartz and configure SSH Key
cd "$QUARTZ_DIR" || exit
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"

# 3. Commit and push to GitHub
echo "🚀 Pushing changes to GitHub..."
git add .
git commit -m "build: update quartz content $(date +'%Y-%m-%d %H:%M')"
git push origin main
```

## Summary of the Workflow

1. You write notes in **Obsidian**.
    
      
    
2. When you are ready to publish, run:
    
      
    
    Bash
    
    ```
    ./publish.sh
    ```
    
1. The script will automatically copy your updated notes into Quartz, apply your custom SSH key (`id_ed25519_raco`), and push your changes to your `fullstack-academy-site-quartz` repository on GitHub!




---


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


----


Here are the exact steps to connect a **new local project folder** to a **new GitHub repository** using the same SSH key (`id_ed25519_raco`).

  

### Step-by-Step Guide for a New Repository

Replace **`NEW_REPO_NAME`** with the name of your new GitHub repository (and adjust your folder path accordingly).

  

#### Step 1: Open your new project folder in terminal

Bash

```
cd ~/Desktop/YOUR_NEW_PROJECT_FOLDER
```

#### Step 2: Initialize Git inside the folder

Bash

```
git init
```

#### Step 3: Tell Git to use your `id_ed25519_raco` SSH key

Bash

```
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_raco -o IdentitiesOnly=yes"
```

#### Step 4: Link your local folder to your new GitHub repository

Bash

```
git remote add origin git@github.com:raconobe/NEW_REPO_NAME.git
```

#### Step 5: Rename main branch, stage, commit, and push

Bash

```
git branch -M main
git add .
git commit -m "feat: initial commit"
git push -u origin main
```

### Quick Cheat Sheet / Script Template

If you want to create a small helper script or copy-paste block whenever you create a new repository in the future:

  

Bash

```
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





---


**Yes, exactly!**

  

The setup commands (`git init`, `git config`, `git remote add`, `git branch -M`, and `-u origin main`) are **one-time setup steps** needed only when connecting a fresh folder to a new GitHub repository for the very first time.

  

Once a repository is initialized and linked, any subsequent updates only require three basic steps:

  

1. **Stage changes:** `git add .`
    
      
    
2. **Commit changes:** `git commit -m "your update message"`
    
      
    
3. **Push to GitHub:** `git push`
    
      
    

### Your Daily Update Script

For daily syncs or updates on an existing repository, your `.sh` script simplifies to this:

  

Bash

```
#!/bin/bash

# Stage all new and modified files
git add .

# Create a commit with a timestamp
git commit -m "docs: update notes $(date +'%Y-%m-%d %H:%M')"

# Push straight to main branch
git push
```

### Comparison of Workflow Types

|**Action**|**Commands Needed**|**When to Use**|
|---|---|---|
|**First-Time Setup**|`git init`<br><br>  <br>  <br><br>`git config core.sshCommand ...`<br><br>  <br>  <br><br>`git remote add origin ...`<br><br>  <br>  <br><br>`git branch -M main`<br><br>  <br>  <br><br>`git add .`<br><br>  <br>  <br><br>`git commit -m "initial commit"`<br><br>  <br>  <br><br>`git push -u origin main`|Once per new project/repository.|
|**Daily Updates**|`git add .`<br><br>  <br>  <br><br>`git commit -m "your message"`<br><br>  <br>  <br><br>`git push`|Anytime you add, edit, or delete notes.|

Now you can just run `git add .`, `git commit -m "..."`, and `git push` (or save them inside a quick sync script) whenever you want to update GitHub!




---

Yes, exactly! If you write a generic script that checks if there are changes and automatically adds, commits, and pushes them, **it works for any Git repository** on your system.

  

Here is a universal "one-click" sync script that you can drop into _any_ project folder (whether it's your Quartz site, your Obsidian vault, or a coding project). It checks if anything has changed, prompts you for a commit message (or uses a default one), and pushes safely.

  

### The Universal Sync Script (`sync.sh`)

Create a file named `sync.sh` inside any project folder:

  

Bash

```
#!/bin/bash

# 1. Check if there are any changes (modified, new, or deleted files)
if [[ -z $(git status -s) ]]; then
    echo "✨ Everything is already up to date! No changes to push."
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
```

### How to use it anywhere:

1. Save it as `sync.sh` inside the root of **any** git repository folder.
    
      
    
2. Make it executable once:
    
      
    
    Bash
    
    ```
    chmod +x sync.sh
    ```
    
3. Run it whenever you want to push updates:
    
      
    - **With a custom message:** `./sync.sh "feat: added new study notes"`
        
          
        
    - **With a default automated timestamp message:** `./sync.sh`
        
          
        

If there are no changes, it safely stops and tells you everything is clean. If there are changes, it handles staging, committing, and pushing in one smooth motion!








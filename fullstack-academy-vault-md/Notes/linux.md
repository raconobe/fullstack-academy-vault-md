When you install an application via Flatpak on Debian, its application menu shortcut (the `.desktop` file) is saved in `/var/lib/flatpak/exports/share/applications/` or `~/.local/share/flatpak/exports/share/applications/`.

  

If Obsidian doesn't appear in your applications menu immediately, it usually means your desktop environment hasn't picked up Flatpak's application path yet.

  

Here is how to fix it:

  

### Method 1: Log Out and Log Back In (Easiest)

In Debian, environment variables like `XDG_DATA_DIRS` update after a new desktop session starts.

  

1. Save any open work.
    
      
    
2. **Log out** of your desktop session and **log back in**.
    
      
    
3. Search for "Obsidian" in your application menu—it should now appear!
    
      
    

### Method 2: Manually Refresh the App Menu

If logging out doesn't work or you want a quick command-line fix, open your terminal and run:

  

Bash

```
# Update the desktop database for Flatpak apps
sudo update-desktop-database
```

Or copy Flatpak's desktop shortcut directly to your local user applications directory:

  

Bash

```
mkdir -p ~/.local/share/applications
cp /var/lib/flatpak/exports/share/applications/md.obsidian.Obsidian.desktop ~/.local/share/applications/
```

### Method 3: Launch from Terminal / Create a Custom Launcher

If you want to open it right away, you can always run:

Bash

```
flatpak run md.obsidian.Obsidian
```


---
Looking closely at your terminal screenshot, the exact cause is shown right there in the message:

  

> `Note that the directories '/var/lib/flatpak/exports/share' and '/home/rco/.local/share/flatpak/exports/share' are not in the search path set by the XDG_DATA_DIRS environment variable...`
> 
>   
> 
>   

This happens on Debian when Flatpak is installed for the first time—your desktop environment (KDE Plasma) hasn't added Flatpak's app path to your system menu yet.

  

Here are the solutions to fix this and make the icon appear in your application menu permanently:

  

### Solution 1: Log Out and Log Back In (Easiest)

Because environment variables like `XDG_DATA_DIRS` are set when your user session starts, logging out will allow your desktop to re-read system paths:

  

1. Close Obsidian and Terminal.
    
      
    
2. Click the Application Launcher (bottom left) $\rightarrow$ **Log Out**.
    
      
    
3. Log back in to Debian.
    
      
    
4. Open your application launcher and search for **Obsidian**—it will now be visible in your menu.
    
      
    

### Solution 2: Copy the Desktop Shortcut (Instant Fix)

If you don't want to log out right now, copy Flatpak's desktop shortcut directly into your user's personal applications directory:

  

Run this command in your terminal:

  

Bash

```
mkdir -p ~/.local/share/applications
cp /var/lib/flatpak/exports/share/applications/md.obsidian.Obsidian.desktop ~/.local/share/applications/
```

After running this, press `Alt + F2` (or open your application menu) and search for **Obsidian**—it should appear immediately.

  

### Solution 3: Add to Panel / Taskbar

Once Obsidian opens:

  

1. **Right-click** the Obsidian icon on your bottom panel (taskbar).
    
      
    
2. Select **Pin to Task Manager** (or _Pin to Taskbar_).
    
      
    

This gives you quick access without needing to open the terminal each time!

---

The generic document icon is showing up because KDE Plasma looks for the app's icon image files inside Flatpak's icon directories (`/var/lib/flatpak/exports/share/icons/` or `~/.local/share/flatpak/exports/share/icons/`).

  

Because `XDG_DATA_DIRS` wasn't loaded when your current session started, KDE couldn't find the icon path and fell back to a default placeholder.

  

Here are two quick ways to restore the official Obsidian logo:

  

### Solution 1: Copy the Icon Directories (Instant Fix)

You can link or copy Flatpak's exported icons directly to your user's local icon directory so KDE can find them right now:

  

Run this in your terminal:

  

Bash

```
mkdir -p ~/.local/share/icons
cp -r /var/lib/flatpak/exports/share/icons/* ~/.local/share/icons/
```

Then update KDE's icon cache:

  

Bash

```
gtk-update-icon-cache -f ~/.local/share/icons/hicolor
```

### Solution 2: Log Out and Log Back In

If you reboot or **log out and log back in**, Debian will natively include `/var/lib/flatpak/exports/share` in system search paths. KDE will automatically resolve both the `.desktop` menu shortcut and its full-resolution logo without needing manual file copies.



---

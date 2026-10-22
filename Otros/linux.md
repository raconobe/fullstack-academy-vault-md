Here is the clean step-by-step process to remove all existing items in `/var/www/html/` and set up a single, clean symbolic link pointing directly to `/home/rco/Desktop/WEB-PROJECTS/`.

1. **Remove old symlinks and folders in /var/www/html:** Cleanup.
Delete the existing files, folders, and symbolic links inside Apache's web root:

```bash
sudo rm -rf /var/www/html/*

```

**Verification:** Run `ls -la /var/www/html/`. The output should show an empty directory (only `.` and `..`).


2. **Create the single main symlink to WEB-PROJECTS:** Symlink Creation.
Create a symbolic link named `web` inside `/var/www/html/` that points to your source directory:

```bash
sudo ln -s /home/rco/Desktop/WEB-PROJECTS /var/www/html/web

```

**Verification:** Run `ls -la /var/www/html/`. You should see `web -> /home/rco/Desktop/WEB-PROJECTS`.


3. **Set permissions for Apache access:** Permissions.
Ensure Apache can read and enter your home directory and subfolders:

```bash
chmod 755 /home/rco
chmod 755 /home/rco/Desktop
chmod 755 /home/rco/Desktop/WEB-PROJECTS

```

**Verification:** Open your browser and navigate to **`http://localhost/web/`** or run:

```bash
curl -I http://localhost/web/

```

You will see all your subfolders (`pdo`, `CRUD_APP`, `rps`, etc.) listed clearly under one clean URL path: `http://localhost/web/`.



---

To update Visual Studio Code on Debian Linux, you can update it using `apt` via the terminal, as VS Code registers its official repository during installation.

### Option 1: Update via Terminal (Recommended for Debian)

Open your terminal and run:

```bash
sudo apt update && sudo apt upgrade code -y

```

**Verification:** After the package upgrades, check the installed version by running:

```bash
code --version

```

---

### Option 2: Update from Inside VS Code

1. Open **Visual Studio Code**.
2. Click the **Gear icon** (Settings) in the bottom-left corner.
3. Select **Check for Updates...**
4. If an update is available, click **Restart to Update** or **Download Update**.

---

### Option 3: Download the Latest `.deb` Package

If you installed VS Code standalone without adding the repository:

1. Download the latest `.deb` package directly from the official website:
```bash
wget -O vscode.deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"

```


2. Install the updated package over your existing version:
```bash
sudo apt install -y ./vscode.deb

```


3. Remove the temporary installer file:
```bash
rm vscode.deb

```



**Verification:** Open VS Code or run `code --version` to confirm you are on the latest release.



----

Here is how to download, extract, and run the **JetBrains Toolbox App** on Debian Linux.

1. **Install required dependencies:** Prerequisites.
Ensure `curl`, `tar`, and Fuse support (required by AppImage binaries) are installed:

```bash
sudo apt update && sudo apt install -y curl tar libfuse2

```

**Verification:** Run `libfuse2` check or proceed to download.


2. **Download the JetBrains Toolbox archive:** Download & Extract.
Download the latest tarball directly from JetBrains and extract it:

```bash
cd ~/Downloads
curl -fsSL https://download.jetbrains.com/toolbox/jetbrains-toolbox-2.5.2.35332.tar.gz -o toolbox.tar.gz
tar -xzf toolbox.tar.gz

```

*(Note: If the specific version URL changes, you can also download the `.tar.gz` manually from the official JetBrains website).*

**Verification:** Run `ls -la ~/Downloads/jetbrains-toolbox-*` to confirm the extracted folder exists.


3. **Run the Toolbox App:** Execution.
Navigate into the extracted folder and launch the executable:

```bash
cd ~/Downloads/jetbrains-toolbox-*
./jetbrains-toolbox

```

**Verification:** The JetBrains Toolbox icon will appear in your system tray/top panel. Once opened, it automatically integrates itself into your application menu so you can launch it like any standard app in the future.


----


update-desktop-database ~/.local/share/applications/

---   

No, **not all JetBrains IDEs are free Community Editions**.

Only a specific few have free Community Editions or non-commercial tiers. Here is the exact breakdown of how JetBrains licenses its tools:

### 1. Free Community Editions (Always Free & Open Source)

These two IDEs have dedicated **Community Editions** that are completely free for personal and commercial development:

* **IntelliJ IDEA Community Edition** (Java, Kotlin, Android)
* **PyCharm Community Edition** (Pure Python)

---

### 2. Free for Non-Commercial Personal Use

JetBrains offers full versions of several paid IDEs for free **only if you use them for personal learning, hobby projects, or open-source work** (not for paid client/company work):

* **WebStorm** (JavaScript, TypeScript, React, Node.js)
* **CLion** (C and C++)
* **Rider** (.NET and Unity)
* **Aqua** (Test automation)

---

### 3. Paid Only (Commercial / Subscription Required)

These flagship tools **do not** have free Community Editions (though they offer 30-day free trials or free licenses for verified students, teachers, and open-source maintainers):

* **PhpStorm** (PHP, Laravel, Symfony)
* **DataGrip** (SQL Databases)
* **GoLand** (Go programming)
* **RubyMine** (Ruby & Ruby on Rails)

---

### Summary for your setup

Since you work with **PHP, PDO, JavaScript, and HTML**, **PhpStorm** is their dedicated PHP IDE, but it is a paid product. For a free workflow on Debian, stick with **VS Code** for PHP/web development, or use **IntelliJ IDEA Community Edition** for general Java/Kotlin development.



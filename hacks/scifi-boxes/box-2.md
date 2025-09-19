---
layout: base
title: Getting Started Journey
permalink: /scifi-boxes/getting-started/
---

# Getting Started

Add guides for getting started with development, tools, and workflows.

## Quick guide: Setup WSL on Windows and use VS Code inside WSL

If you're on Windows and want a native Linux development workflow, WSL (Windows Subsystem for Linux) + VS Code is a great option. This guide shows how to enable WSL, install Ubuntu (or another distro), and use VS Code with the WSL extension.

Prerequisites: Windows 10 (2004+) or Windows 11 with access to an Administrator account.

1) Enable WSL and install a Linux distribution (Ubuntu example)

```powershell
# Run PowerShell as Administrator
wsl --install -d ubuntu
# If `wsl --install` is not available on older Windows builds, run:
# dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# Then reboot and install Ubuntu from the Microsoft Store.
```

2) Initialize your distro

After installation, launch Ubuntu from the Start menu and create a user account and password when prompted. Then update packages:

```bash
sudo apt update && sudo apt upgrade -y
```

3) Install essential developer tools inside WSL

```bash
sudo apt install -y build-essential git curl wget python3 python3-venv
```

4) Install Visual Studio Code on Windows (if not already installed)

- Download and install from: https://code.visualstudio.com/

5) Install the Remote - WSL extension in VS Code

 - Open VS Code on Windows, go to the Extensions view (Ctrl+Shift+X), and install "Remote - WSL" by Microsoft.

6) Open your WSL project in VS Code

 - In your WSL terminal (Ubuntu), navigate to your project folder, for example:

```bash
cd /home/yourusername/student
code .
```

 - The `code .` command opens VS Code connected to your WSL environment (you'll see "WSL: Ubuntu" in the bottom-left). This lets VS Code use the Linux toolchain, extensions, and terminal.

7) Optional: Install VS Code server components inside WSL (automatic)

 - The first time you connect, VS Code will install its server components inside the WSL distro automatically. Accept any prompts and wait for the install to finish.

8) Using the WSL terminal inside VS Code

 - Use the integrated terminal (Ctrl+`) which will default to your WSL shell. All commands you run there execute inside Linux.

Notes on file locations:
 - Your WSL home directory is under Linux path `/home/<user>`.
 - If you want to edit files stored in Windows from WSL, access them under `/mnt/c/` (e.g. `/mnt/c/Users/<user>/Projects`). Prefer keeping project files in the Linux filesystem for performance.

Troubleshooting:
 - If `code` is not found in WSL, run `which code` in your WSL shell; if missing, open VS Code on Windows and run the "Remote-WSL: New Window" command, which usually sets up the CLI.
 - If you hit permission issues, check your Windows antivirus or policies that may block WSL.

That's it — you're now set up to develop inside WSL using the full Linux toolchain while using the familiar VS Code UI on Windows.




# How to create a python virual environment and use make

# Setting Up Your Python Environment by Using `venv` and `make`

## 1. Creating a Python Virtual Environment (`venv`)
# For the purpose of this project, the student repo is located at /home/sidh001/student
A virtual environment helps isolate your Python dependencies for a project. To create one:

1. Open your terminal.
2. Navigate to your project directory:
   ```bash
   cd /home/sidh001/student
   ```
3. Create a virtual environment named `venv`:
   ```bash
   python3 -m venv venv
   ```
   This will create a folder called `venv` in your project directory.

## 2. Activating the Virtual Environment

To activate the virtual environment, run:
```bash
source /home/sidh001/student/venv/bin/activate
```
After activation, your terminal prompt will change, indicating that you are now using the virtual environment.

## 3. Using the `make` Command

The `make` command automates tasks defined in a file called `Makefile` (usually in your project root). Common tasks include installing dependencies, running tests, or building your project.

**Example usage:**
```bash
make install
```
This will run the `install` task defined in your `Makefile`.

**Note:** Always activate your virtual environment before running `make` if your tasks depend on Python packages.

## 4. Troubleshooting

### If `make` is not found:
- Install it using:
  ```bash
  sudo apt-get update
  sudo apt-get install make
  ```

### If `venv` is not found or fails to activate:
- Ensure you have Python 3 installed:
  ```bash
  python3 --version
  ```
- If `venv` is missing, install it:
  ```bash
  sudo apt-get install python3-venv
  ```
- If activation fails, check the path and permissions.

### If Python packages are missing after activating `venv`:
- Install them using `pip`:
  ```bash
  pip install -r requirements.txt
  ```

### If `make` tasks fail:
- Check your `Makefile` for typos or missing dependencies.
- Run the command manually to see detailed errors.

---

**Summary:**  
1. Create your virtual environment with `python3 -m venv venv`.
2. Activate it using `source /home/sidh001/student/venv/bin/activate`.
3. Use `make` to automate tasks.
4. Refer to troubleshooting steps if you encounter

## 5. Commands to Know

Here are some essential Linux commands, their functionality, usage, and how they relate to publishing on GitHub Pages:

| Command | Functionality | Usage Example | Relevance to GitHub Pages |
|---------|--------------|--------------|--------------------------|
| `cd`    | Change directory | `cd /home/sidh001/student` | Navigate to your project folder to manage or publish your site |
| `ls`    | List files and directories | `ls` | View files in your project, such as `_posts`, `Makefile`, etc. |
| `pwd`   | Print working directory | `pwd` | Confirm your current location in the filesystem before running commands |
| `cp`    | Copy files or directories | `cp file.md backup.md` | Backup important files before making changes |
| `mv`    | Move or rename files | `mv draft.md post.md` | Organize or rename blog posts before publishing |
| `rm`    | Remove files or directories | `rm old.md` | Clean up obsolete files from your project |
| `cat`   | Display file contents | `cat README.md` | Quickly view documentation or configuration files |
| `nano` / `vim` | Edit files in terminal | `nano _config.yml` | Make quick edits to your site configuration |
| `git`   | Version control | `git add .`, `git commit -m "Update"`, `git push`, `git pull`| Track changes and publish your site to GitHub Pages, also be able to pull from the directory you forked from|

**How these commands relate to publishing on GitHub Pages:**
- You use `cd`, `ls`, and `pwd` to navigate and manage your project files.
- `cp`, `mv`, and `rm` help organize and maintain your blog content.
- `cat`, `nano`, and `vim` allow you to view and edit files directly.
- `git` is essential for pushing your changes to GitHub, which triggers the publishing of your site via GitHub Pages.
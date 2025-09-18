# Linux Challenge — Flag Hunt

Welcome to the Linux Challenge! Your goal: clone this repository and find 5 hidden flags. Each flag is hidden somewhere in the repository files (including subdirectories) and follows this exact format:

```
flag{ABC123}
```

Where `ABC123` is a placeholder for the real alphanumeric token in the flag.

Rules
- There are exactly 5 flags to find.
- Flags are case-sensitive and will always use lowercase `flag` with braces, e.g. `flag{a1B2C3}`.
- Flags may appear inside code, comments, text files, or other repository artifacts.
- Do not modify repository files — clone and search locally.

How to participate
1. Clone the repository:

```bash
git clone https://github.com/Jupiterian/student.git
cd student
```

2. Search for flags (examples):

Search with `grep` (recursive, case-sensitive):

```bash
# Simple grep
cd <Directory you want view>
grep -R "flag{" -n .

# More targeted: only show the flag value and file
grep -R -o "flag{[A-Za-z0-9]\+}" -n .
```

Use `ripgrep` (faster) if installed:

```bash
rg "flag{[A-Za-z0-9]+}"
```

3. When you find a flag, copy it exactly (including braces). There are five flags total.

Hints (if you get stuck)
- Search hidden files and directories (files starting with a dot). Use `rg -uu` or `grep -R --binary-files=text` to ensure nothing is skipped.
- Some flags might be embedded in longer strings or comments.
- Check text, markdown, HTML, and source code files.
Submission
- Collect the 5 flags and send them via email to ishanjha100@gmail.com

Good luck!

Here is a link to a linux command cheatsheet: https://www.geeksforgeeks.org/linux-unix/linux-commands-cheat-sheet/ 
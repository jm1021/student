---
# YML (yaml) front matter. this determines metadata for file which GHPages uses
layout: base
title: Tools Purgatory Pt. 2
description: My experience with tools setup (better this time)
permalink: /blog/
---
## Smooth Setup & Verification

This time, getting my tools up and running was a breeze. I started by verifying installations for essentials like Jupyter, Ruby, Git, JavaScript, and Python. It did not take me 129428374 nerve cells and hours of pain like last year so I am very happy.
### Directory Structure

```plaintext
opencs/
├── evanCSP/
│   ├── _posts/
│   └── venv/
├── CSPeople/
├── pages/
└── scripts.sh
```

### Tool Verification

```bash
# Verify Python
python --version

# Activate virtual environment
source venv/bin/activate

# Verify Jupyter
jupyter --version

# Verify Ruby
ruby --version

# Verify Git
git --version

# Verify JavaScript (Node.js)
node --version
```

Setting up my new repositories in the `opencs` directory (`evanCSP`, `CSPeople`, and `pages`) was straightforward. Cloning, initializing, and linking everything together went smoothly. I made sure to activate my Python virtual environment with `source venv/bin/activate`, which ensured all my packages were isolated and ready.

### Setup Script

```bash
# Run setup and verification
bash scripts.sh
```

Running `scripts.sh` for setup and verification worked perfectly, confirming that all my configurations were correct. Overall, the process was efficient and hassle-free, letting me focus on actual development instead of troubleshooting.
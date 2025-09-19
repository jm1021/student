---
layout: base
title: Rookie Tips
permalink: /scifi-boxes/linux-intro-challenge/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linux Challenge — Flag Hunt</title>
    <style>
        :root {
            --primary: #2563eb;
            --secondary: #475569;
            --background: #0f172a;
            --text: #e2e8f0;
            --accent: #3b82f6;
            --success: #22c55e;
            --code-bg: #1e293b;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--background);
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }

        .container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 2rem 0;
        }

        h1 {
            color: var(--primary);
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        h2 {
            color: var(--accent);
            font-size: 1.8rem;
            margin-top: 2rem;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 0.5rem;
        }

        .challenge-intro {
            font-size: 1.2rem;
            color: var(--text);
            text-align: center;
            margin-bottom: 2rem;
        }

        .flag-format {
            background: var(--code-bg);
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            font-family: 'Fira Code', 'Consolas', monospace;
            border-left: 4px solid var(--accent);
        }

        .rules-list {
            list-style: none;
            padding: 0;
        }

        .rules-list li {
            margin: 0.8rem 0;
            padding-left: 1.5rem;
            position: relative;
        }

        .rules-list li:before {
            content: '→';
            color: var(--accent);
            position: absolute;
            left: 0;
        }

        .command-block {
            background: var(--code-bg);
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
        }

        .command {
            font-family: 'Fira Code', 'Consolas', monospace;
            color: #a5f3fc;
        }

        .comment {
            color: #64748b;
        }

        .hints {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
        }

        .hints h3 {
            color: var(--accent);
            margin-top: 0;
        }

        .hints ul {
            margin: 0;
            padding-left: 1.5rem;
        }

        .hints li {
            margin: 0.5rem 0;
        }

        .success {
            color: var(--success);
            font-weight: bold;
        }

        .terminal-window {
            background: #1a1b26;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            font-family: 'Fira Code', monospace;
        }

        .terminal-prompt::before {
            content: '$ ';
            color: #7ee787;
        }

        .terminal-output {
            color: #a5f3fc;
            margin-left: 1rem;
        }

    </style>
</head>
<body>
    <div class="container">
        <h1>🚩 Linux Challenge — Flag Hunt</h1>
        
        <p class="challenge-intro">
            Welcome to the Linux Challenge! Your mission: clone this repository and locate 8 hidden flags scattered throughout the codebase. Think you can find them all?
        </p>

        <h2>🎯 Flag Format</h2>
        <div class="flag-format">
            <code>flag{ABC123}</code>
            <p class="comment">Where ABC123 is a unique alphanumeric token</p>
        </div>

        <h2>📜 Rules</h2>
        <ul class="rules-list">
            <li>There are exactly 8 flags to discover</li>
            <li>Flags are case-sensitive and always use lowercase <code>flag</code> with braces</li>
            <li>Flags may be hidden in code, comments, text files, or other repo artifacts</li>
            <li>Do not modify repository files — clone and search locally</li>
        </ul>

        <h2>🚀 Getting Started</h2>
        
        <h3>1. Clone the Repository</h3>
        <div class="terminal-window">
            <div class="terminal-prompt">git clone https://github.com/Jupiterian/student.git</div>
            <div class="terminal-prompt">cd student</div>
        </div>

        <h3>2. Search for Flags</h3>
        <div class="command-block">
            <p class="comment">Simple grep search</p>
            <p class="command">cat "filename" | grep "flag{"</p>
            
            <p class="comment">Grep Recursive Search</p>
            <p class="command">grep -R "flag{"</p>

            <p class="comment">Get Contents of a file</p>
            <p class="command">cat "filename" </p>
        

        <div class="hints">
            <h3>💡 Hints</h3>
            <ul>
                <li>Grep is your best friend</li>
                <li>Some flags might be embedded within longer strings or comments</li>
                <li>Don't forget to look in all files</li>
                <li>Not everything is in a file</li>
            </ul>
        </div>

        <h2>🏆 Submission</h2>
        <p>Fou>nd all 8 flags? Congratulations! Send them to ishanjha100@gmail.com or just call the instructor over.</p>

        <p class="success">Good luck and happy hunting! 🎉</p>

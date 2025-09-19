---
layout: base
title: How to Make Themes
permalink: /scifi-boxes/how-to-make-themes/
---

### How to Make Themes

Write content about creating and customizing themes here.


On your **Pages repo**, run the following command to see all available themes and actions you can perform:

```
make help
```

This will list all the theme-related commands.  
To use a specific theme, run the command it shows you.  

**Example:**  
```
make-serve-cayman
```
This will set the theme to **Cayman** and run the site with that theme.

---
layout: base
title: How to Make Themes
permalink: /scifi-boxes/how-to-make-themes/
---

### How to add and install themes via config.yml
This is an additionaly quick guide for adding themes to your `student` repo. Follow these steps:

1. Find a theme on GitHub
	- Search GitHub for a Jekyll or GitHub Pages theme you like (for example: `jekyll-theme-minimal`, `jekyll-theme-cayman`, or community themes).
	- Open the theme repository and look for its `/_layouts/base.html` (or `/_layouts/default.html`) to inspect how it structures pages.

2. Copy the theme files into your repo (optional)
	- If you want a local copy you can customize, create a `theme/` folder in your `student` repo and copy the theme's layout files (for example `/_layouts/base.html`) and supporting assets (`assets/`, `_sass/`, etc.) into it.

3. Or use `remote_theme` in `_config.yml` (recommended)
	- Instead of copying files, you can reference the theme directly from GitHub using `remote_theme`. This lets you switch themes quickly.
	- Open your `config.yml` (or `_config.yml`) and add a `remote_theme` line pointing to the theme's GitHub repo, for example:

```yaml
# _config.yml
title: Student Site
remote_theme: pages-themes/cayman@v0.2.0
# OR using a community repo
# remote_theme: owner/repo

# You can still override layout files locally by adding them to your repo
```

4. Enable multiple themes (switchable)
	- Jekyll supports only one active theme at a time, but you can keep multiple theme configs and toggle `remote_theme` when you want to preview another.
	- For an easy workflow, keep the theme you use most in `_config.yml`, and comment/uncomment or script replacement when switching.

5. Test locally
	- Run your usual build/serve command (for this repo you can use `make` targets or `bundle exec jekyll serve` if set up). Check the site in the browser and inspect layout differences.

Notes
- If you copy layout files locally, you can edit them freely — but updates to the original theme won't automatically apply.
- Using `remote_theme` keeps your repo smaller and makes upgrades easier; local overrides still work when you add files with the same path.

If you'd like, I can add an example `remote_theme` switcher script or provide a ready-to-use `theme/` folder with the Cayman layout copied in.

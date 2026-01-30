# AI-Powered Web Presentation Generator

This repository contains a suite of web-based presentation templates and "Skill" definitions designed to allow AI Agents (Antigravity, Claude Code, OpenCode) to autonomously generate beautiful, interactive slide decks.

## 🚀 Features

-   **10 Professionally Designed Templates**: From Minimalist and Corporate to Cyberpunk and Nature themes.
-   **No Build Step**: Pure HTML/JS/CSS. Works directly in the browser (via a simple local server).
-   **Interactive Capabilities**:
    -   Dynamic slide loading (ES Modules).
    -   Integrated Chart.js for data visualization.
    -   KaTeX support for math formulas.
    -   Animations and interactivity support.
-   **Agent Skills**: Pre-packaged instructions (`SKILL.md`) for AI agents to understand how to use this library.

## 📦 content Structure

```
/
├── templates/          # Source code for all 10 templates
│   ├── template-01-minimal
│   ├── ...
│   └── index.html      # Gallery view
├── skills/             # Agent Skill Definitions
│   ├── antigravity/
│   ├── claude-code/
│   └── opencode/
├── install.js          # Config script to set up absolute paths for agents
└── server.js           # Lightweight dev server
```

## 🛠️ Usage

### 1. Installation (For Agents)
To make your AI agents aware of this library on your machine, run:

```bash
node install.js
```

This will update the `SKILL.md` files in the `skills/` directory with the absolute path to this repository. You can then point your agent configuration to the respective `SKILL.md`.

### 2. Manual Usage / Preview
You can browse and test the templates locally:

```bash
node server.js
```

Open `http://localhost:3000` to see the Template Gallery.

### 3. Creating a Presentation (Agent Workflow)
When you ask an agent (e.g., Antigravity) to "Create a presentation":
1.  It will look up the `templates` directory.
2.  It will copy your chosen template to your destination.
3.  It will also copy `server.js` to ensure the presentation runs correctly.

## 🎨 Template List

1.  **Minimal** - Clean, whitespace-heavy.
2.  **Dark** - Neon accents on black.
3.  **Corporate** - Professional blue/grey headers.
4.  **Creative** - Bold yellow/black, angled shapes.
5.  **Academic** - Serif fonts, paper style.
6.  **Tech** - Terminal/Code editor aesthetic.
7.  **Nature** - Green, organic, blurry backgrounds.
8.  **Gradient** - Modern animated gradients.
9.  **Grid** - Bento-box layout.
10. **Image Focus** - Fullscreen cinematic background.

## 📝 License
MIT

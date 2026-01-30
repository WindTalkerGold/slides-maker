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
This script installs the prompt/skill definitions into your target repository (where you want to use the agent).

```bash
# Syntax
node install.js <agent> <path/to/target/repo>

# Examples
node install.js antigravity ../my-cool-project
node install.js claude-code ../another-project
```

- **Antigravity**: Installs to `<target>/.agent/skills/web-presentations/SKILL.md`
- **Claude Code**: Installs to `<target>/.claude/skills/web-presentation-generator.md`
- **OpenCode**: Installs to `<target>/.opencode/skills/web-presentation-generator.md`

The script automatically configures the skill to point back to *this* `templates` directory, so you can generate slides anywhere.

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

10. **Image Focus** - Fullscreen cinematic background.

## 📝 License
MIT

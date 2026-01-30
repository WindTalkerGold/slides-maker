---
name: Web Presentation Generator
description: A skill to generate beautiful web-based presentations using various templates.
---

# Web Presentation Generator Skill

This skill allows you to generate professional web-based presentations by copying pre-built templates.

## Configuration
**Templates Directory**: `D:/Coding/pp/slides-maker/templates`

## Capabilities

### 1. List Available Templates
To see the list of available styles/templates, look into the Templates Directory:
`D:/Coding/pp/slides-maker/templates`

Common templates include:
- `template-01-minimal`
- `template-02-dark`
- `template-03-corporate`
- ...and others.

### 2. Create a Presentation
To create a new presentation, you must COPY the desired template directory AND the server script to the user's specified destination.

**Instructions for the Agent:**
1.  Identify the user's desired template.
2.  Construct the source path: `D:/Coding/pp/slides-maker/templates/<template-id>`
3.  **Copy the template**: Copy the entire directory content to the user's target destination.
4.  **Copy Server Script**: Copy `D:/Coding/pp/slides-maker/templates/../server.js` to the target destination (same folder as index.html).
    *   This is required because the slides use ES Modules which need a web server to run correctly (avoiding CORS issues).

### 3. Customize & Run
After generation, inform the user:
-   Run `node server.js` to start the presentation.
-   Edit `slides/*.js` to change content.

## Example Interaction
**User**: "Create a dark mode presentation in ./my-talk"
**Agent**:
1.  Locates `D:/Coding/pp/slides-maker/templates/template-02-dark`.
2.  Copies `D:/Coding/pp/slides-maker/templates/template-02-dark` content to `./my-talk`.
3.  Copies `D:/Coding/pp/slides-maker/templates/../server.js` to `./my-talk/server.js`.
4.  Tells user to run `node server.js` inside `./my-talk`.

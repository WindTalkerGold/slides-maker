---
name: Web Presentation Generator
description: A skill to generate beautiful web-based presentations using various templates.
---

# Web Presentation Generator Skill (Claude Code)

This toolset allows Claude Code to generate web presentations by copying templates from a local library.

## Configuration
**Library Path**: `{{TEMPLATES_DIR}}`

## Available Templates
You can find templates in the Library Path.

## Instructions
To create a presentation:
1.  **Select Template**: Choose the appropriate folder from the Library Path.
2.  **Copy Template**: Recursively copy the template folder to the user's requested destination.
    - Example: `cp -r {{TEMPLATES_DIR}}/template-01-minimal/* ./my-new-slides/`
3.  **Copy Server**: Copy `server.js` from the parent of Library Path to the destination.
    - Example: `cp {{TEMPLATES_DIR}}/../server.js ./my-new-slides/`
    - *Rationale*: ES Modules require a local server to function without CORS errors.
4.  **Verify**: Check that `index.html` and `server.js` exist in the new location.

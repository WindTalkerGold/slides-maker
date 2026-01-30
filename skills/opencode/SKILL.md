# OpenCode Skill: Web Presentation Generator

## Tool Definition

**Template Library**: `{{TEMPLATES_DIR}}`

## Usage
When asked to create a presentation:
1.  **List**: Read `{{TEMPLATES_DIR}}` templates.
2.  **Copy Template**: Copy `{{TEMPLATES_DIR}}/<template-id>` content to target.
3.  **Copy Server**: Copy `{{TEMPLATES_DIR}}/../server.js` to target.
    - *Required for dynamic JS evaluation and avoiding CORS.*

**Example**:
1. `cp -r {{TEMPLATES_DIR}}/template-05-academic/* ./research-talk`
2. `cp {{TEMPLATES_DIR}}/../server.js ./research-talk/`

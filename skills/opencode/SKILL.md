# OpenCode Skill: Web Presentation Generator

## Tool Definition

**Template Library**: `D:/Coding/pp/slides-maker/templates`

## Usage
When asked to create a presentation:
1.  **List**: Read `D:/Coding/pp/slides-maker/templates` templates.
2.  **Copy Template**: Copy `D:/Coding/pp/slides-maker/templates/<template-id>` content to target.
3.  **Copy Server**: Copy `D:/Coding/pp/slides-maker/templates/../server.js` to target.
    - *Required for dynamic JS evaluation and avoiding CORS.*

**Example**:
1. `cp -r D:/Coding/pp/slides-maker/templates/template-05-academic/* ./research-talk`
2. `cp D:/Coding/pp/slides-maker/templates/../server.js ./research-talk/`

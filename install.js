#!/usr/bin/env node

/**
 * Installation Script for Slides Maker Skills
 * 
 * Usage:
 *   node install.js <agent> <target_path>
 * 
 * Arguments:
 *   agent:        One of 'antigravity', 'claude-code', 'opencode'
 *   target_path:  The path to the repository where you want to install the skill.
 * 
 * Description:
 *   Installs the Web Presentation Generator skill into the specified agent's 
 *   configuration folder within the target repository.
 *   
 *   It performs the following:
 *   1. Copies the 'templates' directory to the target skill location.
 *   2. Copies 'server.js' to the target skill location.
 *   3. Copies and configures 'SKILL.md' to point to the *local* templates.
 */

const fs = require('fs');
const path = require('path');

const ARGS = process.argv.slice(2);

if (ARGS.length < 2) {
    console.error('Usage: node install.js <agent> <target_path>');
    console.error('Agents: antigravity, claude-code, opencode');
    process.exit(1);
}

const [AGENT, TARGET_REPO_PATH] = ARGS;
const SOURCE_TEMPLATES_DIR = path.join(__dirname, 'templates');
const SOURCE_SERVER_JS = path.join(__dirname, 'server.js');
const SKILLS_SRC_DIR = path.join(__dirname, 'skills');

if (!fs.existsSync(TARGET_REPO_PATH)) {
    console.error(`Error: Target path '${TARGET_REPO_PATH}' does not exist.`);
    process.exit(1);
}

// Helper to Copy Files/Directories Recursively
function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Helper to write file with template replacement
function installSkill(sourceFile, destFile) {
    try {
        const destDir = path.dirname(destFile);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        // 1. Copy Templates
        const destTemplatesDir = path.join(destDir, 'templates');
        console.log(`Copying templates to: ${destTemplatesDir}`);
        copyRecursive(SOURCE_TEMPLATES_DIR, destTemplatesDir);

        // 2. Copy server.js
        const destServerJs = path.join(destDir, 'server.js');
        if (fs.existsSync(SOURCE_SERVER_JS)) {
            console.log(`Copying server.js to: ${destServerJs}`);
            copyRecursive(SOURCE_SERVER_JS, destServerJs);
        } else {
            console.warn(`[WARN] server.js not found at ${SOURCE_SERVER_JS}`);
        }

        // 3. Prepare SKILL.md content
        let content = fs.readFileSync(sourceFile, 'utf8');

        // Use forward slashes for the path in the markdown file
        // We use the absolute path of the *copied* directory so the agent knows exactly where it is on the user's disk
        const finalTemplatesPath = destTemplatesDir.replace(/\\/g, '/');
        content = content.replace(/{{TEMPLATES_DIR}}/g, finalTemplatesPath);

        // 4. Write SKILL.md
        fs.writeFileSync(destFile, content);
        console.log(`[OK] Installed skill to: ${destFile}`);
    } catch (e) {
        console.error(`Error installing skill: ${e.message}`);
        process.exit(1);
    }
}

// Agent Logic
switch (AGENT.toLowerCase()) {
    case 'antigravity': {
        // Install to .agent/skills/web-presentations/SKILL.md
        const src = path.join(SKILLS_SRC_DIR, 'antigravity', 'SKILL.md');
        const dest = path.join(TARGET_REPO_PATH, '.agent', 'skills', 'web-presentations', 'SKILL.md');
        installSkill(src, dest);
        break;
    }
    case 'claude-code': {
        // Install to .claude/skills/web-presentations/web-presentation-generator.md
        const src = path.join(SKILLS_SRC_DIR, 'claude-code', 'SKILL.md');
        const dest = path.join(TARGET_REPO_PATH, '.claude', 'skills', 'web-presentations', 'web-presentation-generator.md');
        installSkill(src, dest);
        break;
    }
    case 'opencode': {
        // Search for .opencode or .open-code
        const possibleDirs = ['.opencode', '.open-code'];
        let foundDir = null;

        for (const d of possibleDirs) {
            if (fs.existsSync(path.join(TARGET_REPO_PATH, d))) {
                foundDir = d;
                break;
            }
        }

        if (!foundDir) {
            console.warn(`[WARN] Could not find .opencode folder in ${TARGET_REPO_PATH}. Defaulting to creating .opencode`);
            foundDir = '.opencode';
        }

        const src = path.join(SKILLS_SRC_DIR, 'opencode', 'SKILL.md');
        const dest = path.join(TARGET_REPO_PATH, foundDir, 'skills', 'web-presentations', 'web-presentation-generator.md');
        installSkill(src, dest);
        break;
    }
    default: {
        console.error(`Unknown agent: ${AGENT}`);
        console.log('Supported agents: antigravity, claude-code, opencode');
        process.exit(1);
    }
}

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
 *   configuration folder within the target repository, configuring it to point 
 *   to the templates in THIS repository.
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
const TEMPLATES_DIR = path.join(__dirname, 'templates').replace(/\\/g, '/');
const SKILLS_SRC_DIR = path.join(__dirname, 'skills');

if (!fs.existsSync(TARGET_REPO_PATH)) {
    console.error(`Error: Target path '${TARGET_REPO_PATH}' does not exist.`);
    process.exit(1);
}

// Helper to write file with template replacement
function installSkill(sourceFile, destFile) {
    try {
        const destDir = path.dirname(destFile);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        let content = fs.readFileSync(sourceFile, 'utf8');
        content = content.replace(/{{TEMPLATES_DIR}}/g, TEMPLATES_DIR);

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
        // Install to .claude/skills/web-presentations.md (assuming skills logic)
        // User asked for .claude folder.
        const src = path.join(SKILLS_SRC_DIR, 'claude-code', 'SKILL.md');
        const dest = path.join(TARGET_REPO_PATH, '.claude', 'skills', 'web-presentation-generator.md');
        installSkill(src, dest);
        break;
    }
    case 'opencode': {
        // Search for .opencode folder
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
        const dest = path.join(TARGET_REPO_PATH, foundDir, 'skills', 'web-presentation-generator.md');
        installSkill(src, dest);
        break;
    }
    default: {
        console.error(`Unknown agent: ${AGENT}`);
        console.log('Supported agents: antigravity, claude-code, opencode');
        process.exit(1);
    }
}

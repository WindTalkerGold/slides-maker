const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');
const TEMPLATES_DIR = path.join(__dirname, 'templates').replace(/\\/g, '/'); // Normalize path for consistency

const AGENTS = ['antigravity', 'claude-code', 'opencode'];

console.log('Installing/Configuring Skills...');
console.log(`Templates detected at: ${TEMPLATES_DIR}\n`);

AGENTS.forEach(agent => {
    const skillPath = path.join(SKILLS_DIR, agent, 'SKILL.md');

    if (fs.existsSync(skillPath)) {
        let content = fs.readFileSync(skillPath, 'utf8');

        // Check if already configured or needs update
        if (content.includes('{{TEMPLATES_DIR}}')) {
            const newContent = content.replace(/{{TEMPLATES_DIR}}/g, TEMPLATES_DIR);
            fs.writeFileSync(skillPath, newContent);
            console.log(`[OK] Configured ${agent}: ${skillPath}`);
        } else {
            console.log(`[SKIP] ${agent} (Already configured or invalid format)`);
        }

    } else {
        console.warn(`[WARN] Skill file not found for ${agent}`);
    }
});

console.log('\nInstallation Complete!');
console.log('You can now point your agents to the following skill definitions:');
AGENTS.forEach(agent => {
    console.log(`- ${agent}: ${path.join(SKILLS_DIR, agent, 'SKILL.md')}`);
});
console.log('\nNote: You may need to enable these skills in your specific agent configuration settings.');

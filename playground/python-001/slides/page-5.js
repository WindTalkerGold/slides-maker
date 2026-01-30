import { html } from '../app.js';

export default html`
    <h2>循环 (Loops)</h2>
    <p>不想一直重复说话？用循环！🔄</p>
    
    <pre>
for i in range(5):
    print("你好! 👋")
    </pre>
    
    <div id="typewriter-output" style="text-align: left; background: #fff; padding: 20px; border-radius: 15px; display: inline-block; margin-top: 10px; min-height: 200px; min-width: 200px; border: 2px solid #ddd;">
        <!-- Content will be typed here -->
    </div>
    
    <p style="margin-top: 10px; font-size: 1rem; color: #666;">点击重新播放动画 🎬</p>
`;

export const onMount = (container) => {
    const output = container.querySelector('#typewriter-output');

    const playAnimation = () => {
        output.innerHTML = '';
        let count = 0;
        const max = 5;

        const typeLine = () => {
            if (count >= max) return;

            const div = document.createElement('div');
            div.style.opacity = '0';
            div.style.transform = 'translateY(10px)';
            div.style.transition = 'all 0.3s ease';
            div.textContent = '> 你好! 👋';
            // Alternating colors for fun
            div.style.color = count % 2 === 0 ? '#8b5cf6' : '#f472b6';
            div.style.fontSize = '1.5rem';
            div.style.marginBottom = '5px';

            output.appendChild(div);

            // Trigger animation
            setTimeout(() => {
                div.style.opacity = '1';
                div.style.transform = 'translateY(0)';
            }, 50);

            count++;
            setTimeout(typeLine, 500); // Next line after 500ms
        };

        typeLine();
    };

    // Auto play on load
    playAnimation();

    // Replay on click
    container.addEventListener('click', playAnimation);
};

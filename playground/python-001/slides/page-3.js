import { html } from '../app.js';

export default html`
    <h2>基本概念 & 变量 (Variables)</h2>
    <p>变量就像一个个<strong>小盒子 📦</strong>，用来装东西。</p>
    
    <pre>
name = "小明"   # 这是一个装名字的盒子
age = 8         # 这是一个装数字的盒子
has_dog = True  # 有没有小狗？是的！
    </pre>
    
    <p style="font-size: 1rem; color: #888;">(点一点空白处试试！)</p>

    <div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">
        <div style="background: #fff; padding: 20px; border: 3px solid #8b5cf6; border-radius: 15px; transition: all 0.3s ease;">
            <h3>name</h3>
            <div style="font-size: 2rem;">"小明"</div>
        </div>
        <div id="age-box" style="background: #fff; padding: 20px; border: 3px solid #f59e0b; border-radius: 15px; transition: all 0.3s ease;">
            <h3>age</h3>
            <div id="age-val" style="font-size: 2rem; transition: all 0.3s ease;">8</div>
        </div>
    </div>
    
    <div id="code-change" style="opacity: 0; transform: translateY(10px); transition: all 0.5s ease; margin-top: 10px;">
        <code style="background: #ef4444; color: white; padding: 5px 10px; border-radius: 5px; font-size: 1.5rem;">age = 10</code>
    </div>
`;

export const onMount = (container) => {
    let changed = false;
    const ageBox = container.querySelector('#age-box');
    const ageVal = container.querySelector('#age-val');
    const codeChange = container.querySelector('#code-change');

    const containerClick = () => {
        if (changed) return;
        changed = true;

        // 1. Show code change effect
        codeChange.style.opacity = '1';
        codeChange.style.transform = 'translateY(0)';

        // 2. Animate box
        ageBox.style.transform = 'scale(1.1) rotate(5deg)';
        ageBox.style.borderColor = '#ef4444'; // Red for change

        setTimeout(() => {
            // 3. Change value
            ageVal.style.opacity = '0';
            setTimeout(() => {
                ageVal.textContent = '10';
                ageVal.style.color = '#ef4444';
                ageVal.style.fontWeight = 'bold';
                ageVal.style.opacity = '1';

                // 4. Return to normal size
                ageBox.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 500);
    };

    // Attach to slide container for "click anywhere"
    // The passed 'container' is usually the .slide-container div
    container.addEventListener('click', containerClick);
};

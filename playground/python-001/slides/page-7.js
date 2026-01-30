import { html } from '../app.js';

export default html`
    <h2>试一试！(Let's Try)</h2>
    <p>输入你的名字，让 Python 根据你的年龄跟你打招呼！</p>
    
    <div style="background: #fff; padding: 30px; border-radius: 20px; box-shadow: 0 10px 0 rgba(0,0,0,0.1); border: 4px solid #f472b6; position: relative;">
        <!-- Added width: 120px to prevent truncation -->
        <input type="text" id="name-input" placeholder="你的名字" style="width: 150px;" />
        <input type="number" id="age-input" placeholder="年龄" style="width: 100px;" />
        <button id="run-btn">运行代码 ▶️</button>
        
        <div id="output" style="margin-top: 20px; font-size: 2rem; font-weight: bold; min-height: 3rem; color: #8b5cf6;">
            ...等待运行...
        </div>
        
        <button id="code-btn" style="position: absolute; bottom: 10px; right: 10px; background: transparent; border: none; box-shadow: none; font-size: 0.9rem; color: #aaa; padding: 5px;">📜 查看代码</button>
    </div>
    
    <p style="font-size: 1rem; margin-top: 2rem;">这也叫 "方法调用 (Method Call)" 哦！</p>

    <!-- Modal -->
    <dialog id="code-modal" style="border: none; border-radius: 15px; padding: 0; box-shadow: 0 20px 50px rgba(0,0,0,0.3); width: 80%; max-width: 600px;">
        <div style="background: #1e293b; padding: 20px; color: #fff; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-family: 'Consolas', monospace;">💻 Python Code</h3>
            <button id="close-modal" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: #fff; box-shadow: none; padding: 0;">❌</button>
        </div>
        <div style="padding: 20px; background: #282c34; overflow-x: auto;">
            <pre style="margin: 0; box-shadow: none; border: none; background: transparent; padding: 0;">
<span style="color: #c678dd;">def</span> <span style="color: #61afef;">say_hi</span>(name, age):
    <span style="color: #c678dd;">if</span> age < <span style="color: #d19a66;">10</span>:
        msg = <span style="color: #98c379;">"哇！"</span> + name + <span style="color: #98c379;">"，你还在上小学吧？🐍"</span>
    <span style="color: #c678dd;">else</span>:
        msg = <span style="color: #98c379;">"你好 "</span> + name + <span style="color: #98c379;">"，你已经是个大孩子了！🚀"</span>
    
    <span style="color: #e5c07b;">print</span>(msg)

<span style="color: #5c6370;"># 获取输入</span>
user_name = <span style="color: #98c379;">"..."</span>
user_age = <span style="color: #d19a66;">...</span>

<span style="color: #61afef;">say_hi</span>(user_name, user_age)
            </pre>
        </div>
    </dialog>
`;

export const onMount = (container) => {
    const btn = container.querySelector('#run-btn');
    const nameInput = container.querySelector('#name-input');
    const ageInput = container.querySelector('#age-input');
    const output = container.querySelector('#output');

    btn.onclick = () => {
        const name = nameInput.value || "朋友";
        const age = parseInt(ageInput.value) || 0;

        let message = "";
        if (age < 10) {
            message = `哇！${name}，你还在上小学吧？🐍`;
        } else {
            message = `你好 ${name}，你已经是个大孩子了！🚀`;
        }

        output.textContent = message;
        output.style.animation = "none";
        output.offsetHeight; /* trigger reflow */
        output.style.animation = "popIn 0.5s";
    };

    // Modal Logic
    const modal = container.querySelector('#code-modal');
    const codeBtn = container.querySelector('#code-btn');
    const closeBtn = container.querySelector('#close-modal');

    codeBtn.onclick = () => {
        modal.showModal();
        // Add backdrop click to close
        modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom) {
                modal.close();
            }
        });
    };

    closeBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent modal click closing
        modal.close();
    };
};

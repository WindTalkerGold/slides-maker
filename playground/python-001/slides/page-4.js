import { html } from '../app.js';

export default html`
    <h2>条件判断 (If-Else)</h2>
    <p>就像做选择题！🤔</p>
    
    <pre>
if is_raining:
    print("带雨伞 ☔")
else:
    print("出去玩 ⚽")
    </pre>
    
    <div style="margin-top: 2rem; background: #fef3c7; padding: 2rem; border-radius: 20px;">
        <p>如果 <strong>下雨了</strong>，我们就带伞。</p>
        <p><strong>否则</strong> (没下雨)，我们就去踢球！</p>
    </div>
`;

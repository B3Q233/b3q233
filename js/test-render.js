/**
 * test-render.js — 验证 markdown 渲染输出
 * 用法：node js/test-render.js
 */
const path = require('path');
const fs = require('fs');

const postPath = path.join(__dirname, '..', 'blogs', 'posts', 'test', '渲染测试.json');

if (!fs.existsSync(postPath)) {
    console.error('❌ 测试文章不存在，请先运行 node js/build.js');
    process.exit(1);
}

const p = JSON.parse(fs.readFileSync(postPath, 'utf-8'));
const h = p.bodyHtml;
const results = [];

// 1. 标题 h1-h6
for (let i = 1; i <= 6; i++) {
    const count = (h.match(new RegExp('<h' + i, 'g')) || []).length;
    results.push({ test: 'H' + i + ' 标题', pass: count > 0, detail: count + ' 个' });
}

// 2. 内联格式
results.push({ test: '粗体 <strong>', pass: /<strong>/.test(h) });
results.push({ test: '斜体 <em>', pass: /<em>/.test(h) });
results.push({ test: '行内代码 <code>', pass: /<code>/.test(h) });

// 3. 代码块
const codeBlocks = (h.match(/<pre><code/g) || []).length;
results.push({ test: '围栏代码块', pass: codeBlocks >= 3, detail: codeBlocks + ' 个' });
results.push({ test: 'c++ 语言标签', pass: /language-c\+\+/.test(h) });
results.push({ test: 'kotlin 语言标签', pass: /language-kotlin/.test(h) });

// 4. 表格
const tables = (h.match(/<table>/g) || []).length;
results.push({ test: '表格', pass: tables >= 1, detail: tables + ' 个' });
results.push({ test: '表格内粗体', pass: /<td><strong>/.test(h) });
results.push({ test: '表格内代码', pass: /<td><code>/.test(h) });

// 5. Mermaid
const mermaid = (h.match(/<pre class="mermaid">/g) || []).length;
results.push({ test: 'Mermaid 块', pass: mermaid >= 2, detail: mermaid + ' 个' });
results.push({ test: 'Mermaid 内容不转义', pass: h.includes('-->') || h.includes('->>') });

// 6. 列表
results.push({ test: '有序列表 <ol>', pass: /<ol>/.test(h) });
results.push({ test: '无序列表 <ul>', pass: /<ul>/.test(h) });

// 7. 引用块 & 分割线
results.push({ test: '引用块 <blockquote>', pass: /<blockquote>/.test(h) });
results.push({ test: '分割线 <hr>', pass: /<hr>/.test(h) });

// 8. 链接和图片
results.push({ test: '链接 <a>', pass: /<a href=/.test(h) });
results.push({ test: '图片 <img>', pass: /<img src=/.test(h) });

// 9. 无 raw markdown 残留
const bodyWithoutCode = h.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code>[^<]*<\/code>/g, '');
const hasRawBold = /\*\*[^*]+\*\*/.test(bodyWithoutCode);
const hasRawBacktick = /(?<!`)`(?!`)([^`]+)`(?!`)/.test(bodyWithoutCode);
results.push({ test: '无残留 raw markdown', pass: !hasRawBold && !hasRawBacktick });

// 输出结果
console.log('═'.repeat(50));
console.log('  Markdown 渲染测试 — ' + p.title);
console.log('═'.repeat(50));

let pass = 0, fail = 0;
results.forEach(r => {
    const icon = r.pass ? '✅' : '❌';
    const detail = r.detail ? ' (' + r.detail + ')' : '';
    console.log('  ' + icon + ' ' + r.test + detail);
    if (r.pass) pass++; else fail++;
});

console.log('─'.repeat(50));
console.log('  结果: ' + pass + '/' + (pass + fail) + ' 通过');
if (fail > 0) process.exit(1);

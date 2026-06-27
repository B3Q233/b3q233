/**
 * build.js — 扫描 md/ 目录，生成 posts.json（含完整正文）
 * 用法：node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MD_DIR = path.join(ROOT, 'md');
const OUT_DIR = path.join(ROOT, 'blogs');
const INDEX_FILE = path.join(OUT_DIR, 'posts.json');
const POSTS_DIR = path.join(OUT_DIR, 'posts');
const PIC_DIR = path.join(OUT_DIR, 'pic');

/**
 * 极简 YAML frontmatter 解析（仅支持单层 key: value 和数组）
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    if (!match) return { body: content, meta: {} };

    const meta = {};
    const lines = match[1].split('\n');

    let currentKey = null;
    for (const line of lines) {
        const kvMatch = line.match(/^(\w[\w-]*)\s*:\s*(.+)/);
        if (kvMatch) {
            const key = kvMatch[1];
            let value = kvMatch[2].trim();

            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
            }

            meta[key] = value;
            currentKey = key;
        } else if (currentKey && line.trim().startsWith('- ')) {
            if (!Array.isArray(meta[currentKey])) {
                meta[currentKey] = [meta[currentKey]];
            }
            meta[currentKey].push(line.trim().slice(2).replace(/['"]/g, ''));
        }
    }

    const body = content.slice(match[0].length);
    return { body, meta };
}

/**
 * 内建 markdown → HTML 渲染器（零依赖）
 * 支持：标题、粗斜体、代码块、行内代码、链接、图片、列表、引用、分割线、表格
 */
/**
 * 内联格式化（仅处理行内元素，不涉及块级元素）
 * 用于表格单元格等不能包含块级元素的位置
 * @param {string} text - 已提取行内代码占位符的文本
 */
function renderInline(text) {
    // 图片
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    // 链接
    text = text.replace(/\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // 粗斜体
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    return text;
}

function renderMarkdown(md) {
    // 统一换行符为 \n
    md = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const codeBlocks = [];
    const inlineCodes = [];
    const tables = [];

    // 1. 提取围栏代码块（``` 和 ~~~），语言标签允许任意非换行字符（如 c++、c#）
    //    mermaid 特殊处理：输出 <pre class="mermaid"> 保留原始内容（不转义 HTML 实体）
    let html = md.replace(/(```|~~~)([^\n]*)\n([\s\S]*?)\1/g, (_, fence, lang, code) => {
        const idx = codeBlocks.length;
        const langTrimmed = lang.trim();
        const isMermaid = langTrimmed.toLowerCase() === 'mermaid';
        if (isMermaid) {
            codeBlocks.push(`<pre class="mermaid">${code.trimEnd()}</pre>`);
        } else {
            const langAttr = langTrimmed ? ` class="language-${escAttr(langTrimmed)}"` : '';
            codeBlocks.push(`<pre><code${langAttr}>${escHtml(code.trimEnd())}</code></pre>`);
        }
        return `\x00CODEBLOCK${idx}\x00`;
    });

    // 2. 提取行内代码
    html = html.replace(/`([^`]+)`/g, (_, code) => {
        const idx = inlineCodes.length;
        inlineCodes.push(`<code>${escHtml(code)}</code>`);
        return `\x00INLINECODE${idx}\x00`;
    });

    // 3. 提取表格 → 占位符（必须在段落之前）
    //    行内代码占位符已在步骤2注入，再对内联格式（粗斜体/链接/图片）做二次渲染
    html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (match) => {
        const idx = tables.length;
        const lines = match.trim().split('\n');
        // 表头
        const hCells = lines[0].split('|').map(c => c.trim()).filter(Boolean);
        let tbl = '<table><thead><tr>' + hCells.map(c => `<th>${renderInline(c)}</th>`).join('') + '</tr></thead><tbody>';
        // 跳过表头和分隔线，处理数据行
        for (let i = 2; i < lines.length; i++) {
            const cells = lines[i].split('|').map(c => c.trim()).filter(Boolean);
            tbl += '<tr>' + cells.map(c => `<td>${renderInline(c)}</td>`).join('') + '</tr>';
        }
        tbl += '</tbody></table>';
        tables.push(tbl);
        return `\x00TABLE${idx}\x00`;
    });

    // 4. 图片 ![alt](url)（表格外的图片）
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // 5. 链接 [text](url)（表格外的链接）
    html = html.replace(/\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 6. 标题（在行首）
    html = html.replace(/^######\s+(.+)/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)/gm, '<h1>$1</h1>');

    // 7. 粗体 + 斜体（表格外的）
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 8. 分割线（不能误伤表格占位符）
    html = html.replace(/^([-*_]){3,}\s*$/gm, '<hr>');

    // 9. 引用块
    html = html.replace(/^>\s?(.+)/gm, (_, text) => `<blockquote>${text}</blockquote>`);
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

    // 10. 无序列表
    html = html.replace(/^[\t ]*[-*+]\s+(.+)/gm, '\x00ULI\x00$1</li>');
    html = html.replace(/((\x00ULI\x00.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    html = html.replace(/\x00ULI\x00/g, '<li>');

    // 11. 有序列表
    html = html.replace(/^[\t ]*\d+\.\s+(.+)/gm, '\x00OLI\x00$1</li>');
    html = html.replace(/((\x00OLI\x00.*<\/li>\n?)+)/g, '<ol>$1</ol>');
    html = html.replace(/\x00OLI\x00/g, '<li>');

    // 12. 段落：用空行分隔
    const lines = html.split('\n');
    const result = [];
    let buf = [];

    function flushBuf() {
        if (buf.length > 0) {
            result.push('<p>' + buf.join('\n') + '</p>');
            buf = [];
        }
    }

    for (const line of lines) {
        const trimmed = line.trim();
        if (/^<(h[1-4]|ul|ol|li|pre|blockquote|hr|img|table|thead|tbody|tr|th|td)/.test(trimmed) ||
            /^<\/(ul|ol|table|thead|tbody)>/.test(trimmed) ||
            /\x00(CODEBLOCK|INLINECODE|TABLE)/.test(trimmed)) {
            flushBuf();
            result.push(line);
        } else if (trimmed === '') {
            flushBuf();
        } else {
            buf.push(line);
        }
    }
    flushBuf();

    html = result.join('\n');

    // 还原占位符
    html = html.replace(/\x00TABLE(\d+)\x00/g, (_, i) => tables[+i]);
    html = html.replace(/\x00INLINECODE(\d+)\x00/g, (_, i) => inlineCodes[+i]);
    html = html.replace(/\x00CODEBLOCK(\d+)\x00/g, (_, i) => codeBlocks[+i]);

    html = html.replace(/\n{3,}/g, '\n\n');

    return html.trim();
}

function escHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escAttr(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * 从 markdown 正文提取摘要（跳过标题行，取前 150 个字符）
 */
function extractSummary(body) {
    const withoutTitle = body.replace(/^#\s+.+\n/m, '').trim();
    const plain = withoutTitle
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
        .replace(/[#*>`~_|]/g, '')
        .replace(/\n+/g, ' ')
        .trim();

    if (plain.length <= 150) return plain;
    const truncated = plain.slice(0, 150);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 递归遍历目录，收集所有 .md 文件
 * @param {string} dir 当前目录
 * @param {string} base 根目录（用于计算相对路径）
 * @returns {Array<{ relPath: string, fullPath: string, stat: fs.Stats }>}
 */
function walkMdFiles(dir, base) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            results.push(...walkMdFiles(fullPath, base));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            const relPath = path.relative(base, fullPath);
            results.push({
                relPath,
                fullPath,
                stat: fs.statSync(fullPath)
            });
        }
    }

    return results;
}

/**
 * 处理正文中的本地图片：复制到 blogs/pic/<slug>/ 并改写为相对路径
 * @param {string} body - markdown 正文
 * @param {string} mdDir - md 文件所在目录（用于解析相对路径）
 * @param {string} slug - 文章 slug（如 安卓项目/仿网易云音乐）
 * @returns {{ body: string, copied: number }} 改写后的正文和复制数量
 */
function processImages(body, mdDir, slug) {
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    let newBody = body;
    let copied = 0;

    while ((match = imgRegex.exec(body)) !== null) {
        const src = match[2];

        // 跳过网络图片
        if (/^https?:\/\//i.test(src)) continue;

        // 解析为绝对路径
        let absSrc;
        if (path.isAbsolute(src)) {
            absSrc = src;
        } else {
            absSrc = path.resolve(mdDir, src);
        }

        // 文件不存在则跳过
        if (!fs.existsSync(absSrc)) {
            console.log(`   ⚠ 图片不存在: ${path.basename(absSrc)}`);
            continue;
        }

        const ext = path.extname(absSrc);
        const basename = path.basename(absSrc);
        const destDir = path.join(PIC_DIR, slug);

        // 确保目标目录存在
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

        // 处理重名（编号去重）
        let destName = basename;
        let destPath = path.join(destDir, destName);
        let n = 1;
        while (fs.existsSync(destPath)) {
            const nameWithoutExt = basename.slice(0, -ext.length);
            destName = nameWithoutExt + '-' + n + ext;
            destPath = path.join(destDir, destName);
            n++;
        }

        // 拷贝文件
        fs.copyFileSync(absSrc, destPath);
        copied++;

        // 替换 markdown 中的图片路径（用 replace 精确匹配该 src）
        const newSrc = 'pic/' + slug.replace(/\\/g, '/') + '/' + destName;
        newBody = newBody.split(src).join(newSrc);
    }

    return { body: newBody, copied };
}

// ====== 主流程 ======
function main() {
    if (!fs.existsSync(MD_DIR)) {
        console.error(`错误：目录 ${MD_DIR} 不存在`);
        process.exit(1);
    }

    const mdFiles = walkMdFiles(MD_DIR, MD_DIR);
    const posts = [];
    const fullPosts = [];

    for (const { relPath, fullPath, stat } of mdFiles) {
        // 跳过空文件
        if (stat.size === 0) {
            console.log(`   ⏭ 跳过空文件: ${relPath}`);
            continue;
        }

        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { body, meta } = parseFrontmatter(raw);

        // slug = 相对路径去掉 .md 后缀，使用 / 分隔
        const slug = relPath.replace(/\.md$/, '').replace(/\\/g, '/');
        const mdDir = path.dirname(fullPath);

        // 处理本地图片：复制到 blogs/pic/<slug>/，改写路径
        const { body: processedBody, copied } = processImages(body, mdDir, slug);
        if (copied > 0) console.log(`   🖼 已复制 ${copied} 张图片 → pic/${slug}/`);
        const pathParts = slug.split('/');

        // 文章名 = 文件名（不含 .md）
        const name = pathParts[pathParts.length - 1];

        // 目录层级：a/b/c.md → dirs = ['a', 'a/b']
        const dirs = [];
        for (let i = 0; i < pathParts.length - 1; i++) {
            dirs.push(pathParts.slice(0, i + 1).join('/'));
        }

        // 标题优先用 frontmatter，否则用文件名
        const title = meta.title || name;
        const date = meta.date || formatDate(stat.mtime);
        const summary = meta.summary || extractSummary(processedBody);
        const tags = meta.tags || [];

        const bodyHtml = renderMarkdown(processedBody);

        // 完整数据（含正文）写入独立 JSON
        const fullPost = { slug, name, title, dirs, date, tags, body: processedBody, bodyHtml };

        // 索引数据（不含正文）写入 posts.json
        const { body: _, bodyHtml: __, ...indexEntry } = fullPost;
        indexEntry.summary = summary;

        posts.push(indexEntry);
        fullPosts.push(fullPost);
    }

    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    fullPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    // 确保输出目录存在
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
    if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

    // 写入索引
    fs.writeFileSync(INDEX_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`✅ 已生成 posts.json — 共 ${posts.length} 篇文章`);

    // 写入独立文章 JSON
    for (const p of fullPosts) {
        const jsonPath = path.join(POSTS_DIR, p.slug + '.json');
        const jsonDir = path.dirname(jsonPath);
        if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
        fs.writeFileSync(jsonPath, JSON.stringify(p, null, 2), 'utf-8');
    }
    console.log(`✅ 已生成 ${fullPosts.length} 个独立文章 JSON → blogs/posts/`);
    posts.forEach(p => console.log(`   📄 [${p.date}] ${p.title}  (${p.slug})`));
}

main();

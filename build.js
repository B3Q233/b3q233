/**
 * build.js — 扫描 posts/ 目录，生成 posts.json 博文索引
 * 用法：node build.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'posts.json');

/**
 * 极简 YAML frontmatter 解析（仅支持单层 key: value 和数组）
 * 不引入第三方依赖，覆盖 90% 场景
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

            // 去掉引号
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // 数组：[a, b, c]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
            }

            meta[key] = value;
            currentKey = key;
        } else if (currentKey && line.trim().startsWith('- ')) {
            // 多行数组
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
 * 从 markdown 正文提取标题（第一个 # heading）
 */
function extractTitle(body) {
    const match = body.match(/^#\s+(.+)/m);
    return match ? match[1].trim() : '未命名文章';
}

/**
 * 从 markdown 正文提取摘要（跳过标题行，取前 150 个字符）
 */
function extractSummary(body) {
    // 去掉第一个 # 标题行
    const withoutTitle = body.replace(/^#\s+.+\n/m, '').trim();
    // 取纯文本（去掉 markdown 标记）
    const plain = withoutTitle
        .replace(/```[\s\S]*?```/g, '')   // 去掉代码块
        .replace(/!\[.*?\]\(.*?\)/g, '')   // 去掉图片
        .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // 链接保留文字
        .replace(/[#*>`~_|]/g, '')         // 去掉其他标记符号
        .replace(/\n+/g, ' ')              // 换行转空格
        .trim();

    // 取前 150 个字符，在单词边界截断
    if (plain.length <= 150) return plain;
    const truncated = plain.slice(0, 150);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ====== 主流程 ======
function main() {
    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`错误：目录 ${POSTS_DIR} 不存在`);
        process.exit(1);
    }

    const files = fs.readdirSync(POSTS_DIR);
    const posts = [];

    for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(POSTS_DIR, file);
        const stat = fs.statSync(filePath);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { body, meta } = parseFrontmatter(raw);

        const slug = file.replace(/\.md$/, '');
        const title = meta.title || extractTitle(body);
        const date = meta.date || formatDate(stat.mtime);
        const summary = meta.summary || extractSummary(body);
        const tags = meta.tags || [];

        posts.push({ slug, title, date, summary, tags });
    }

    // 按日期倒序
    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`✅ 已生成 posts.json — 共 ${posts.length} 篇文章`);
    posts.forEach(p => console.log(`   📄 [${p.date}] ${p.title}`));
}

main();

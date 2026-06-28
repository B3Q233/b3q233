/**
 * blog.js — 博客列表页逻辑
 * 多级索引：顶部大标签 → 子目录卡片（可递归） → 文章列表
 */
(function () {
    const listContainer = document.getElementById('post-list-container');
    const tabBar = document.getElementById('blog-tabs');
    const breadcrumb = document.getElementById('blog-breadcrumb');

    let allPosts = [];

    async function loadIndex() {
        const resp = await fetch('posts.json');
        if (!resp.ok) throw new Error('posts.json 加载失败');
        return await resp.json();
    }

    /** 从文章集合中提取"当前层级"的结构：子目录 + 直接文章 */
    function groupByLevel(posts, baseDirs) {
        const subDirs = new Map();
        const direct = [];
        posts.forEach(p => {
            const dirs = p.dirs || [];
            // 去掉 baseDirs 前缀，取下一级目录名
            let remaining = dirs;
            if (baseDirs.length > 0) {
                const idx = dirs.indexOf(baseDirs[baseDirs.length - 1]);
                remaining = idx >= 0 ? dirs.slice(idx + 1) : [];
            }
            if (remaining.length > 0) {
                const key = remaining[0];
                if (!subDirs.has(key)) subDirs.set(key, []);
                subDirs.get(key).push(p);
            } else {
                direct.push(p);
            }
        });
        return { subDirs, direct };
    }

    /** 渲染顶部标签栏 */
    function renderTabs(posts) {
        const topDirs = new Set();
        posts.forEach(p => {
            if (p.dirs && p.dirs.length > 0) topDirs.add(p.dirs[0]);
        });
        const tabs = ['全部', ...[...topDirs].sort()];
        tabBar.innerHTML = tabs.map(t =>
            `<button class="blog-tab${t === '全部' ? ' active' : ''}" data-tab="${escHtml(t)}">${escHtml(t)}</button>`
        ).join('');
        tabBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.blog-tab');
            if (!btn) return;
            tabBar.querySelectorAll('.blog-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showLevel(btn.dataset.tab);
        });
    }

    /** 根据顶层标签获取文章子集，显示当前层级 */
    function showLevel(tab) {
        let subset = tab === '全部' ? allPosts : allPosts.filter(p => p.dirs && p.dirs[0] === tab);
        renderLevel(subset, [tab]);
    }

    /** 递归渲染当前层级 */
    function renderLevel(posts, pathStack) {
        if (!posts.length) {
            listContainer.innerHTML = '<p class="post-empty">暂无文章</p>';
            breadcrumb.innerHTML = '';
            return;
        }

        // 面包屑
        renderBreadcrumb(pathStack);

        const { subDirs, direct } = groupByLevel(posts, pathStack);
        const html = [];

        // 子目录卡片网格
        if (subDirs.size > 0) {
            html.push('<div class="sub-index-grid">');
            [...subDirs.keys()].sort().forEach(key => {
                const count = subDirs.get(key).length;
                html.push(`
                    <div class="sub-index-card" data-dir="${escHtml(key)}">
                        <span class="sub-index-icon">📁</span>
                        <span class="sub-index-label">${escHtml(key)}</span>
                        <span class="sub-index-count">${count} 篇</span>
                    </div>
                `);
            });
            html.push('</div>');
        }

        // 当前层级直接文章
        if (direct.length > 0) {
            html.push('<ul class="post-list">');
            direct.forEach(p => {
                const tagsHtml = (p.tags || []).map(t => `<span class="tag">${escHtml(t)}</span>`).join('');
                html.push(`
                    <li>
                        <a class="post-card" href="post.html?post=${encodeURIComponent(p.slug)}">
                            <div class="post-title">${escHtml(p.title)}</div>
                            <div class="post-meta"><span>📅 ${escHtml(p.date)}</span></div>
                            <div class="post-summary">${escHtml(p.summary)}</div>
                            ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
                        </a>
                    </li>
                `);
            });
            html.push('</ul>');
        }

        listContainer.innerHTML = html.join('');

        // 子目录卡片点击 → 递归下钻
        listContainer.querySelectorAll('.sub-index-card').forEach(card => {
            card.addEventListener('click', () => {
                const dir = card.dataset.dir;
                const subset = subDirs.get(dir) || [];
                renderLevel(subset, [...pathStack, dir]);
            });
        });
    }

    /** 渲染面包屑导航 */
    function renderBreadcrumb(pathStack) {
        const parts = [];
        for (let i = 0; i < pathStack.length; i++) {
            const seg = pathStack[i];
            const isLast = i === pathStack.length - 1;
            if (isLast) {
                parts.push(`<span class="breadcrumb-current">${escHtml(seg)}</span>`);
            } else {
                parts.push(`<a class="breadcrumb-link" data-idx="${i}">${escHtml(seg)}</a>`);
            }
        }
        breadcrumb.innerHTML = parts.join(' <span class="breadcrumb-sep">›</span> ');

        breadcrumb.querySelectorAll('.breadcrumb-link').forEach(link => {
            link.addEventListener('click', () => {
                const idx = parseInt(link.dataset.idx);
                const newStack = pathStack.slice(0, idx + 1);
                if (newStack[0] === '全部') {
                    showLevel('全部');
                } else {
                    // 重组子集
                    let subset = allPosts.filter(p => p.dirs && p.dirs[0] === newStack[0]);
                    for (let i = 1; i < newStack.length; i++) {
                        const prev = newStack[i-1];
                        subset = subset.filter(p => {
                            const pi = (p.dirs || []).indexOf(prev);
                            return pi >= 0 && (p.dirs || []).slice(pi+1)[0] === newStack[i];
                        });
                    }
                    renderLevel(subset, newStack);
                    // 同步标签高亮
                    tabBar.querySelectorAll('.blog-tab').forEach(b => {
                        b.classList.toggle('active', b.dataset.tab === newStack[0]);
                    });
                }
            });
        });
    }

    async function init() {
        try {
            allPosts = await loadIndex();
            if (!allPosts.length) {
                listContainer.innerHTML = '<p class="post-empty">暂无文章</p>';
                return;
            }
            renderTabs(allPosts);
            showLevel('全部');
        } catch (err) {
            console.error(err);
            listContainer.innerHTML = '<p class="post-empty">文章列表加载失败，请确保已运行 <code>node js/build.js</code></p>';
        }
    }

    function escHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    init();
})();

/**
 * blog.js — 博客列表页逻辑
 * 从 posts.json 加载索引，按目录分组渲染文章卡片
 */
(function () {
    const listContainer = document.getElementById('post-list-container');

    async function loadIndex() {
        const resp = await fetch('posts.json');
        if (!resp.ok) throw new Error('posts.json 加载失败');
        return await resp.json();
    }

    async function renderPostList() {
        try {
            const posts = await loadIndex();

            if (!posts.length) {
                listContainer.innerHTML = '<p class="post-empty">暂无文章</p>';
                return;
            }

            // 按目录层级分组
            const groups = new Map();
            const rootPosts = [];

            posts.forEach(p => {
                const topDir = p.dirs && p.dirs.length > 0 ? p.dirs[0] : null;
                if (!topDir) {
                    rootPosts.push(p);
                } else {
                    if (!groups.has(topDir)) groups.set(topDir, []);
                    groups.get(topDir).push(p);
                }
            });

            const html = [];

            function renderGroup(groupPosts) {
                const subGroups = new Map();
                groupPosts.forEach(p => {
                    const subKey = p.dirs.join('/') || '__root__';
                    if (!subGroups.has(subKey)) subGroups.set(subKey, []);
                    subGroups.get(subKey).push(p);
                });

                const sortedKeys = [...subGroups.keys()].sort((a, b) => {
                    const depthA = (a.match(/\//g) || []).length;
                    const depthB = (b.match(/\//g) || []).length;
                    return depthA - depthB || a.localeCompare(b);
                });

                for (const subKey of sortedKeys) {
                    const subPosts = subGroups.get(subKey);
                    if (subKey !== '__root__') {
                        html.push(`<h3 class="dir-heading dir-depth-${subKey.split('/').length}">📁 ${escHtml(subKey)}</h3>`);
                    }

                    html.push('<ul class="post-list">');
                    subPosts.forEach(p => {
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
            }

            // 根目录文章
            if (rootPosts.length > 0) {
                html.push('<h3 class="dir-heading dir-depth-0">📄 未分类</h3>');
                html.push('<ul class="post-list">');
                rootPosts.forEach(p => {
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

            const sortedGroups = [...groups.keys()].sort();
            for (const dirName of sortedGroups) {
                html.push(`<h2 class="section-title">📂 ${escHtml(dirName)}</h2>`);
                renderGroup(groups.get(dirName));
            }

            listContainer.innerHTML = html.join('');
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

    renderPostList();
})();

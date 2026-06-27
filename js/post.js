/**
 * post.js — 文章详情页逻辑
 * 从 posts/<slug>.json 加载文章，渲染 Markdown 正文并初始化 Mermaid 图表
 */
(function () {
    /**
     * 按需加载 Mermaid（仅在文章包含 mermaid 块时下载 ~3.4MB 的库）
     */
    function loadMermaid() {
        return new Promise((resolve) => {
            if (typeof mermaid !== 'undefined') return resolve();
            const script = document.createElement('script');
            script.src = '../js/mermaid.min.js';
            script.onload = () => {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base',
                    themeVariables: {
                        primaryColor: '#e8f0fe',
                        primaryBorderColor: '#2563eb',
                        lineColor: '#475569',
                        textColor: '#1e293b',
                        fontSize: '14px'
                    }
                });
                resolve();
            };
            script.onerror = () => resolve(); // 加载失败不阻塞页面
            document.head.appendChild(script);
        });
    }

    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    async function renderPost() {
        const slug = getParam('post');
        const detailTitle = document.getElementById('detail-title');
        const detailMeta = document.getElementById('detail-meta');
        const detailContent = document.getElementById('detail-content');

        // 验证 slug
        if (!slug || /\.\./.test(slug)) {
            showError('无效的文章标识');
            return;
        }

        try {
            const pathParts = slug.split('/').map(encodeURIComponent).join('/');
            const resp = await fetch(`posts/${pathParts}.json`);
            if (!resp.ok) throw new Error('文章不存在');
            const post = await resp.json();

            document.title = `${post.title} | b3q`;
            detailTitle.textContent = post.title;
            detailMeta.innerHTML = `<span>📅 ${escHtml(post.date)}</span>`;
            if (post.tags && post.tags.length) {
                detailMeta.innerHTML += ' ' + post.tags.map(t =>
                    `<span class="tag">${escHtml(t)}</span>`
                ).join(' ');
            }

            // 显示目录面包屑
            if (post.dirs && post.dirs.length > 0) {
                const breadcrumb = post.dirs.map((d, i) => {
                    const isLast = i === post.dirs.length - 1;
                    return isLast ? escHtml(d.split('/').pop()) : escHtml(d.split('/').pop()) + ' / ';
                }).join('');
                detailMeta.innerHTML += `<span style="margin-left:1rem;color:var(--color-muted)">📂 ${breadcrumb}</span>`;
            }

            detailContent.innerHTML = post.bodyHtml || `<pre>${escHtml(post.body)}</pre>`;

            // Mermaid 图表渲染（按需加载库）
            if (detailContent.querySelector('.mermaid')) {
                await loadMermaid();
                try {
                    await mermaid.run({ querySelector: '.mermaid' });
                } catch (e) {
                    console.error('Mermaid render error:', e);
                }
            }

            // 代码块：添加 class 标记 + 复制按钮（跳过 mermaid 块）
            detailContent.querySelectorAll('pre').forEach(pre => {
                if (pre.classList.contains('mermaid')) return;
                pre.classList.add('code-block');

                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.textContent = '复制';
                btn.addEventListener('click', async () => {
                    const code = pre.querySelector('code');
                    const text = code ? code.textContent : pre.textContent;
                    try {
                        await navigator.clipboard.writeText(text);
                        btn.textContent = '已复制';
                        setTimeout(() => { btn.textContent = '复制'; }, 2000);
                    } catch {
                        // fallback: 使用传统方法
                        const ta = document.createElement('textarea');
                        ta.value = text;
                        ta.style.position = 'fixed';
                        ta.style.opacity = '0';
                        document.body.appendChild(ta);
                        ta.select();
                        document.execCommand('copy');
                        document.body.removeChild(ta);
                        btn.textContent = '已复制';
                        setTimeout(() => { btn.textContent = '复制'; }, 2000);
                    }
                });
                pre.appendChild(btn);
            });

            // 构建文章目录（基于 h1-h4 标题）
            buildTOC(detailContent);

        } catch (err) {
            console.error(err);
            showError('文章加载失败：' + err.message);
        }
    }

    function buildTOC(contentEl) {
        const headings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length < 2) return;

        // 为每个标题生成 ID，收集元数据
        const items = [];
        const usedIds = new Set();
        headings.forEach(h => {
            let id = h.textContent.trim()
                .toLowerCase()
                .replace(/[^\w一-鿿]+/g, '-')
                .replace(/^-|-$/g, '')
                .replace(/-{2,}/g, '-');
            if (!id) id = 'heading';
            if (usedIds.has(id)) {
                let n = 2;
                while (usedIds.has(id + '-' + n)) n++;
                id = id + '-' + n;
            }
            usedIds.add(id);
            h.id = id;
            items.push({ level: parseInt(h.tagName[1]), text: h.textContent.trim(), id, children: [] });
        });

        // 构建嵌套树结构
        const tree = [];
        const stack = []; // 路径栈：从根到当前节点的父级链
        items.forEach(item => {
            // 弹出栈中不比当前层级高的节点
            while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
                stack.pop();
            }
            if (stack.length === 0) {
                tree.push(item);
            } else {
                stack[stack.length - 1].children.push(item);
            }
            stack.push(item);
        });

        // 渲染嵌套树为 HTML
        function renderTree(nodes) {
            if (!nodes.length) return '';
            let html = '<ul class="toc-list">';
            nodes.forEach(node => {
                const hasChildren = node.children.length > 0;
                html += '<li class="toc-item" data-level="' + node.level + '">';
                html += '<div class="toc-node">';
                if (hasChildren) {
                    html += '<span class="toc-arrow">▼</span>';
                }
                html += '<a href="#' + node.id + '" title="' + escHtml(node.text) + '">' + escHtml(node.text) + '</a>';
                html += '</div>';
                if (hasChildren) {
                    html += renderTree(node.children);
                }
                html += '</li>';
            });
            html += '</ul>';
            return html;
        }

        const tocHTML = '<div class="toc-title">📑 目录</div>' + renderTree(tree);

        // 创建 TOC 面板
        const panel = document.createElement('aside');
        panel.className = 'toc-panel';
        panel.innerHTML = tocHTML;

        // 创建切换按钮（左侧标签）
        const toggle = document.createElement('button');
        toggle.className = 'toc-toggle';
        toggle.innerHTML = '▶';
        toggle.title = '显示目录';
        toggle.setAttribute('aria-label', '切换目录');

        // 切换逻辑
        let isOpen = false;
        toggle.addEventListener('click', () => {
            isOpen = !isOpen;
            panel.classList.toggle('toc-open', isOpen);
            toggle.classList.toggle('toc-toggle-open', isOpen);
            toggle.innerHTML = isOpen ? '◀' : '▶';
            toggle.title = isOpen ? '隐藏目录' : '显示目录';
        });

        // 点击 TOC 链接：滚动到目标 + 关闭面板
        panel.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                setTimeout(() => {
                    isOpen = false;
                    panel.classList.remove('toc-open');
                    toggle.classList.remove('toc-toggle-open');
                    toggle.innerHTML = '▶';
                    toggle.title = '显示目录';
                }, 200);
            }
        });

        // 手风琴：点击父级标题折叠/展开子级
        panel.addEventListener('click', (e) => {
            const arrow = e.target.closest('.toc-arrow');
            if (!arrow) return;
            e.preventDefault();
            e.stopPropagation();
            const li = arrow.closest('.toc-item');
            if (!li) return;
            li.classList.toggle('toc-collapsed');
        });

        // 点击面板外部关闭
        document.addEventListener('click', (e) => {
            if (isOpen && !panel.contains(e.target) && e.target !== toggle) {
                isOpen = false;
                panel.classList.remove('toc-open');
                toggle.classList.remove('toc-toggle-open');
                toggle.innerHTML = '▶';
                toggle.title = '显示目录';
            }
        });

        document.body.appendChild(panel);
        document.body.appendChild(toggle);
    }

    function showError(msg) {
        document.getElementById('detail-title').textContent = '出错了';
        document.getElementById('detail-content').innerHTML = `<p class="post-empty">${escHtml(msg)}</p>`;
    }

    function escHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    renderPost();
})();

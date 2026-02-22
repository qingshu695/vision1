/**
 * AI导航罗盘 - 功能增强脚本
 * 包含：搜索、标签筛选、UI交互、本地存储
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 核心功能：实时搜索与筛选（兼容现有 DOM）
    const searchInput = document.getElementById('toolSearch') || document.querySelector('.modern-search-input') || document.querySelector('input[name="q"]');
    const searchForm = document.querySelector('.search-box') || document.querySelector('.modern-search-form');
    const toolCards = document.querySelectorAll('.tool-card');


    // 搜索逻辑函数，keyword 可为 undefined 或 空字符
    function performSearch(keyword) {
        const searchText = (keyword || '').toLowerCase().trim();

        if (!searchText) {
            toolCards.forEach(card => {
                // ❌ 错误写法：card.style.display = 'block';
                // ✅ 正确写法：恢复 CSS 默认的 flex 布局
                card.style.display = ''; 
            });
            return;
        }

        toolCards.forEach(card => {
            const cardContent = (card.textContent || '').toLowerCase();
            if (cardContent.includes(searchText)) {
                // ✅ 这里也要改，确保搜索出来的卡片依然是水平排列
                card.style.display = 'flex'; 
                card.style.animation = 'fadeIn 0.45s';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 监听搜索框输入事件（如果存在）
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }

    // 阻止搜索表单的默认提交行为并触发搜索（如果存在）
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 阻止刷新
            performSearch(searchInput ? searchInput.value : '');
        });
    }

    // 页面加载时确保显示所有卡片（默认状态）
    performSearch('');

    // 3. UI交互：语言切换器优化（适配当前 DOM）
    const langSwitcher = document.querySelector('button[aria-label="语言"]');
    const langDropdown = langSwitcher ? langSwitcher.nextElementSibling : null; // 假设下一个兄弟节点是菜单

    if (langSwitcher && langDropdown) {
        langSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = langDropdown.style.display === 'block';
            langDropdown.style.display = isVisible ? 'none' : 'block';
        });

        // 点击页面其他地方关闭下拉菜单
        document.addEventListener('click', () => {
            if (langDropdown) langDropdown.style.display = 'none';
        });

        // 阻止菜单内点击关闭
        langDropdown.addEventListener('click', (e) => { e.stopPropagation(); });
    }
    // 4. UI交互：卡片按压反馈效果
    toolCards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.98)';
            card.style.transition = 'transform 0.1s';
        });

        card.addEventListener('mouseup', () => {
            card.style.transform = 'scale(1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});
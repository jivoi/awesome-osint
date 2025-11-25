// Load README.md content for display

document.addEventListener('DOMContentLoaded', function() {
    loadReadme();
});

/**
 * Load README.md content
 */
async function loadReadme() {
    const loadingEl = document.getElementById('readme-loading');
    const contentEl = document.getElementById('readme-content');
    const errorEl = document.getElementById('readme-error');
    
    try {
        // Try to load from local file first (for local development)
        let response = await fetch('/README.md');
        
        // If local fetch fails (404), try GitHub API
        if (!response.ok || response.status === 404) {
            console.log('Local README not found, trying GitHub API...');
            response = await fetch('https://raw.githubusercontent.com/jivoi/awesome-osint/master/README.md');
        }
        
        if (!response.ok) {
            throw new Error('Failed to load README');
        }
        
        const text = await response.text();
        
        // Convert markdown to HTML using a simple converter or marked.js
        // For now, we'll use a basic converter
        const html = convertMarkdownToHTML(text);
        
        contentEl.innerHTML = html;
        contentEl.style.display = 'block';
        loadingEl.style.display = 'none';
        
        // Re-initialize TOC and other features after content loads
        setTimeout(() => {
            if (typeof generateTOC === 'function') {
                generateTOC();
            }
            if (typeof buildSearchIndex === 'function') {
                buildSearchIndex();
            }
        }, 100);
        
    } catch (error) {
        console.error('Error loading README:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

/**
 * Convert markdown to HTML using marked.js if available, otherwise use basic converter
 */
function convertMarkdownToHTML(markdown) {
    // Use marked.js if available
    if (typeof marked !== 'undefined') {
        // Configure marked
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
        
        // Convert markdown to HTML
        let html = marked.parse(markdown);
        
        // Add IDs to headers if not present
        html = html.replace(/<h([1-6])>([^<]+)<\/h([1-6])>/g, function(match, level, text) {
            const id = text.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            return `<h${level} id="${id}">${text}</h${level}>`;
        });
        
        // Make external links open in new tab
        html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
        
        return html;
    }
    
    // Fallback to basic converter
    return convertMarkdownBasic(markdown);
}

/**
 * Basic markdown to HTML converter (fallback)
 */
function convertMarkdownBasic(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (para.trim() && !para.match(/^<[hul]/)) {
            return '<p>' + para.trim() + '</p>';
        }
        return para;
    }).join('\n');
    
    // Clean up nested lists
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    return html;
}


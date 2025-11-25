// Search functionality for Awesome OSINT

let searchData = [];
let searchIndex = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    // Build search index from page content
    buildSearchIndex();
    
    // Handle search input
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            performSearch(query);
            searchClear.style.display = 'block';
        } else {
            clearSearch();
            searchClear.style.display = 'none';
        }
    });
    
    // Handle clear button
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            clearSearch();
            searchClear.style.display = 'none';
            searchInput.focus();
        });
    }
    
    // Handle Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearSearch();
            searchClear.style.display = 'none';
        }
    });
}

/**
 * Build search index from page content
 */
function buildSearchIndex() {
    const markdownContent = document.querySelector('.markdown-content');
    if (!markdownContent) return;
    
    // Extract all list items (tools/resources)
    const listItems = markdownContent.querySelectorAll('ul li, ol li');
    
    listItems.forEach((item, index) => {
        const text = item.textContent.trim();
        const link = item.querySelector('a');
        
        if (link && text) {
            const href = link.getAttribute('href');
            const linkText = link.textContent.trim();
            const description = text.replace(linkText, '').trim();
            
            // Find parent section
            let section = '';
            let current = item.parentElement;
            while (current && current !== markdownContent) {
                const heading = current.previousElementSibling;
                if (heading && (heading.tagName === 'H2' || heading.tagName === 'H3')) {
                    section = heading.textContent.trim();
                    break;
                }
                current = current.parentElement;
            }
            
            searchData.push({
                id: index,
                title: linkText,
                description: description,
                url: href,
                section: section,
                fullText: text.toLowerCase()
            });
        }
    });
}

/**
 * Perform search
 */
function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const searchResultsTitle = document.getElementById('search-results-title');
    
    if (!searchResults || !searchResultsList) return;
    
    const queryLower = query.toLowerCase();
    const results = searchData.filter(item => {
        return item.fullText.includes(queryLower) ||
               item.title.toLowerCase().includes(queryLower) ||
               item.description.toLowerCase().includes(queryLower) ||
               item.section.toLowerCase().includes(queryLower);
    });
    
    // Sort by relevance (title matches first)
    results.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(queryLower);
        const bTitleMatch = b.title.toLowerCase().includes(queryLower);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
    });
    
    // Display results
    if (results.length > 0) {
        searchResultsTitle.textContent = `${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`;
        searchResultsList.innerHTML = results.slice(0, 50).map(item => {
            const highlightedTitle = highlightText(item.title, query);
            const highlightedDesc = highlightText(item.description, query);
            
            return `
                <div class="search-result-item">
                    <h3>${highlightedTitle}</h3>
                    ${item.description ? `<p>${highlightedDesc}</p>` : ''}
                    ${item.section ? `<p class="search-section"><i class="fas fa-folder"></i> ${item.section}</p>` : ''}
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Visiter
                    </a>
                </div>
            `;
        }).join('');
        
        searchResults.style.display = 'block';
        
        // Scroll to results
        setTimeout(() => {
            searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        searchResultsTitle.textContent = 'Aucun résultat trouvé';
        searchResultsList.innerHTML = '<p>Aucun outil ou ressource ne correspond à votre recherche.</p>';
        searchResults.style.display = 'block';
    }
}

/**
 * Clear search results
 */
function clearSearch() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

/**
 * Highlight search terms in text
 */
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


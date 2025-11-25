// Main JavaScript for Awesome OSINT

document.addEventListener('DOMContentLoaded', function() {
    // Generate table of contents
    generateTOC();
    
    // Handle smooth scrolling for anchor links
    handleSmoothScroll();
    
    // Highlight active section in TOC
    highlightActiveSection();
    
    // Add click handlers for TOC links
    setupTOCLinks();
});

/**
 * Generate table of contents from headings
 */
function generateTOC() {
    const tocNav = document.getElementById('toc-nav');
    if (!tocNav) return;
    
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    if (headings.length === 0) return;
    
    let tocHTML = '<ul>';
    let currentLevel = 2;
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        
        const text = heading.textContent.trim();
        const link = `<a href="#${id}">${text}</a>`;
        
        if (level === 2) {
            if (index > 0 && currentLevel === 3) {
                tocHTML += '</ul>';
            }
            tocHTML += `<li>${link}</li>`;
            currentLevel = 2;
        } else if (level === 3) {
            if (currentLevel === 2) {
                tocHTML += '<ul>';
            }
            tocHTML += `<li>${link}</li>`;
            currentLevel = 3;
        }
    });
    
    if (currentLevel === 3) {
        tocHTML += '</ul>';
    }
    tocHTML += '</ul>';
    
    tocNav.innerHTML = tocHTML;
}

/**
 * Handle smooth scrolling for anchor links
 */
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#-table-of-contents') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100; // Account for sticky header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Highlight active section in TOC while scrolling
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('.markdown-content h2[id], .markdown-content h3[id]');
    const tocLinks = document.querySelectorAll('.toc-nav a');
    
    if (sections.length === 0 || tocLinks.length === 0) return;
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150;
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                currentSection = section.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial call
}

/**
 * Setup TOC links with proper behavior
 */
function setupTOCLinks() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            tocLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}


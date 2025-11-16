// PresenceNet Whitepaper JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // ===== TABLE OF CONTENTS ACTIVE STATE =====
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.wp-section');

    // Update active TOC link based on scroll position
    function updateActiveTocLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveTocLink);

    // Initial call
    updateActiveTocLink();


    // ===== SMOOTH SCROLL FOR TOC LINKS =====
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ===== COPY CODE BLOCK FUNCTIONALITY =====
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
        `;
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');

        // Position button
        block.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '12px';
        copyButton.style.right = '12px';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        copyButton.style.color = '#e2e8f0';
        copyButton.style.padding = '8px 16px';
        copyButton.style.borderRadius = '8px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.fontSize = '14px';
        copyButton.style.fontWeight = '500';
        copyButton.style.display = 'flex';
        copyButton.style.alignItems = 'center';
        copyButton.style.gap = '8px';
        copyButton.style.transition = 'all 0.2s ease';
        copyButton.style.fontFamily = 'var(--font-family)';

        copyButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });

        copyButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });

        // Copy functionality
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('code').textContent;

            navigator.clipboard.writeText(code).then(() => {
                const span = this.querySelector('span');
                const originalText = span.textContent;
                span.textContent = 'Copied!';
                this.style.background = 'rgba(34, 197, 94, 0.2)';
                this.style.borderColor = 'rgba(34, 197, 94, 0.4)';

                setTimeout(() => {
                    span.textContent = originalText;
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
            });
        });

        block.appendChild(copyButton);
    });


    // ===== READING PROGRESS BAR =====
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--lapis-lazuli), var(--non-photo-blue))';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        progressBar.style.width = scrollPercent + '%';
    });


    // ===== SECTION ANIMATIONS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });


    // ===== EXTERNAL LINK HANDLING =====
    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach(link => {
        // Add external link indicator
        if (!link.hostname.includes('presencenet')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            // Add external link icon
            const icon = document.createElement('span');
            icon.innerHTML = ' ↗';
            icon.style.fontSize = '0.8em';
            icon.style.opacity = '0.6';
            link.appendChild(icon);
        }
    });


    // ===== PRINT OPTIMIZATION =====
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections if any
        document.querySelectorAll('.wp-section').forEach(section => {
            section.style.pageBreakInside = 'avoid';
        });
    });


    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // Press 'T' to focus table of contents
        if (e.key === 't' || e.key === 'T') {
            const firstTocLink = document.querySelector('.toc-link');
            if (firstTocLink) {
                firstTocLink.focus();
            }
        }

        // Press '/' to search (future enhancement)
        if (e.key === '/') {
            e.preventDefault();
            // Search functionality can be added here
        }
    });


    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '40px';
    scrollTopBtn.style.right = '40px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.background = 'var(--lapis-lazuli)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.boxShadow = '0 4px 12px rgba(14, 84, 145, 0.3)';

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 8px 20px rgba(14, 84, 145, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(14, 84, 145, 0.3)';
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
});

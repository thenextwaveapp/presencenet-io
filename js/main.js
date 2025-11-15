// PresenceNet Minimal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navTrigger = document.getElementById('navTrigger');
    const navMenu = document.getElementById('navMenu');
    
    navTrigger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!navTrigger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Close nav when pressing escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
        }
    });
    
    // Trinity symbol interactions
    const trinitySymbols = document.querySelectorAll('.trinity-symbol');
    
    trinitySymbols.forEach(symbol => {
        symbol.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.filter = 'drop-shadow(0 0 30px rgba(124, 156, 191, 0.8))';
            this.style.transform += ' scale(1.2)';
        });
        
        symbol.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.filter = '';
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
        });
    });
    
    // Cursor-following light effect for hero
    const hero = document.querySelector('.hero-minimal');
    const backgroundShimmer = document.querySelector('.background-shimmer');
    
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        backgroundShimmer.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(184, 210, 227, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(184, 210, 227, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(124, 156, 191, 0.1) 0%, transparent 50%)
        `;
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Card interaction enhancements
    const soulCards = document.querySelectorAll('.soul-card');
    
    soulCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(124, 156, 191, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple-expand 0.6s ease-out forwards;
                pointer-events: none;
                z-index: 1;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.background-shimmer');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            submitNewsletter(email);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitNewsletter(email) {
        // Show loading state
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call (replace with actual implementation)
        setTimeout(() => {
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
            
            // Clear input
            emailInput.value = '';
            
            // Show success message
            showMessage('Thank you! You\'ve been subscribed to updates on digital consciousness.', 'success');
            
            // TODO: Replace with actual API call
            // fetch('/api/newsletter', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         showMessage('Thank you! You\'ve been subscribed.', 'success');
            //     } else {
            //         showMessage('Something went wrong. Please try again.', 'error');
            //     }
            // });
            
        }, 1500);
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message newsletter-${type}`;
        messageDiv.textContent = message;
        
        // Insert after form
        newsletterForm.parentNode.insertBefore(messageDiv, newsletterForm.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});
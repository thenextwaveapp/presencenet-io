// PresenceNet - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.js-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-wrap');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileNav.classList.remove('active');
            }
        });
    }

    // Hide navigation on scroll down, show on scroll up
    const nav = document.querySelector('.js-header');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Only start hiding after scrolling 100px

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                nav.classList.add('hide');
            } else {
                // Scrolling up
                nav.classList.remove('hide');
            }
        } else {
            // At top of page, always show
            nav.classList.remove('hide');
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                }

                // Smooth scroll to target
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

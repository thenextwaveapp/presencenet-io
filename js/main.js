// PresenceNet - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== PARALLAX SCROLL EFFECT =====
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    if (parallaxLayers.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero-main')?.offsetHeight || 0;

            // Only apply parallax when hero is visible
            if (scrolled < heroHeight) {
                parallaxLayers.forEach((layer, index) => {
                    const speed = (index + 1) * 0.5; // Increased from 0.15 to 0.5 for more drama
                    const yPos = scrolled * speed;
                    layer.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    }

    // ===== STANDARD MOBILE MENU TOGGLE (Home page style) =====
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

    // ===== WHITEPAPER-STYLE NAVIGATION TOGGLE =====
    const navTrigger = document.getElementById('navTrigger');
    const navMenu = document.getElementById('navMenu');

    if (navTrigger && navMenu) {
        navTrigger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const dots = this.querySelectorAll('.nav-dots span');
            if (navMenu.classList.contains('active')) {
                dots[0].style.transform = 'rotate(45deg) translateY(7px)';
                dots[1].style.opacity = '0';
                dots[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                dots[0].style.transform = 'none';
                dots[1].style.opacity = '1';
                dots[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navTrigger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const dots = navTrigger.querySelectorAll('.nav-dots span');
                dots[0].style.transform = 'none';
                dots[1].style.opacity = '1';
                dots[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const dots = navTrigger.querySelectorAll('.nav-dots span');
                dots[0].style.transform = 'none';
                dots[1].style.opacity = '1';
                dots[2].style.transform = 'none';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                const dots = navTrigger.querySelectorAll('.nav-dots span');
                dots[0].style.transform = 'none';
                dots[1].style.opacity = '1';
                dots[2].style.transform = 'none';
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

    // ===== HORIZONTAL TIMELINE SCROLL PROGRESS =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineProgress = document.querySelector('.timeline-progress');

    if (timelineItems.length > 0 && timelineDots.length > 0) {
        function updateTimeline() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            timelineItems.forEach((item, index) => {
                const itemTop = item.offsetTop;
                const itemHeight = item.offsetHeight;
                const itemMiddle = itemTop + (itemHeight / 2);
                const scrollMiddle = scrollTop + (windowHeight / 2);

                // Activate item when its middle is in the middle third of viewport
                if (scrollMiddle >= itemTop && scrollMiddle <= itemTop + itemHeight) {
                    item.classList.add('active');
                    timelineDots[index].classList.add('active');
                } else {
                    item.classList.remove('active');
                    timelineDots[index].classList.remove('active');
                }
            });

            // Update progress bar
            if (timelineItems.length > 0) {
                const firstItem = timelineItems[0];
                const lastItem = timelineItems[timelineItems.length - 1];
                const firstItemTop = firstItem.offsetTop;
                const lastItemBottom = lastItem.offsetTop + lastItem.offsetHeight;
                const scrollMiddle = scrollTop + (windowHeight / 2);

                let progress = 0;
                if (scrollMiddle >= firstItemTop && scrollMiddle <= lastItemBottom) {
                    progress = ((scrollMiddle - firstItemTop) / (lastItemBottom - firstItemTop)) * 100;
                } else if (scrollMiddle > lastItemBottom) {
                    progress = 100;
                }

                if (timelineProgress) {
                    timelineProgress.style.width = `${progress}%`;
                }
            }
        }

        // Update on scroll
        window.addEventListener('scroll', updateTimeline);
        // Initial update
        updateTimeline();

        // Click timeline dots to scroll to that section
        timelineDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const targetItem = timelineItems[index];
                if (targetItem) {
                    const windowHeight = window.innerHeight;
                    const itemHeight = targetItem.offsetHeight;
                    const targetPosition = targetItem.offsetTop - (windowHeight / 2) + (itemHeight / 2);

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

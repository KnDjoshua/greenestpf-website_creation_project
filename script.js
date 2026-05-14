// ============================================
// INITIALIZE AOS ANIMATIONS - Mobile Optimized
// ============================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: window.innerWidth < 768 ? 600 : 800, // Faster on mobile
        once: true,
        offset: window.innerWidth < 768 ? 50 : 100, // Lower offset on mobile
        easing: 'ease-out',
        disable: window.innerWidth < 576 ? 'phone' : false // Disable on very small devices for performance
    });
}

// ============================================
// SCROLL PROGRESS BAR - Throttled for Performance
// ============================================
let scrollTimeout;
let scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    if (scrollProgress) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// Throttled scroll event for better performance on mobile
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = requestAnimationFrame(() => {
        updateScrollProgress();
        scrollTimeout = null;
    });
});

// ============================================
// NAVBAR SCROLL EFFECT - Optimized
// ============================================
const navbar = document.getElementById('mainNav');
let lastScrollY = 0;

function updateNavbar() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    }
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateNavbar);
});
updateNavbar();

// ============================================
// MOBILE MENU AUTO-CLOSE ON RESIZE
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 991) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) toggler.click();
            }
        }
    }, 250);
});

// ============================================
// HERO BACKGROUND CAROUSEL (SWIPER) - Mobile Optimized
// ============================================
let heroSwiper;
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.querySelector('.heroSwiper')) {
            const isMobile = window.innerWidth < 768;
            heroSwiper = new Swiper('.heroSwiper', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: isMobile ? 4000 : 5000, // Faster on mobile
                    disableOnInteraction: false,
                    pauseOnMouseEnter: !isMobile // Disable on mobile for better performance
                },
                speed: isMobile ? 600 : 800,
                pagination: {
                    el: '.hero-section .swiper-pagination',
                    clickable: true,
                    dynamicBullets: !isMobile, // Disable on mobile for performance
                    dynamicMainBullets: isMobile ? 1 : 3
                },
                navigation: {
                    nextEl: '.hero-section .swiper-button-next',
                    prevEl: '.hero-section .swiper-button-prev',
                },
                touchRatio: isMobile ? 0.8 : 1, // Reduce touch sensitivity on mobile
                resistanceRatio: 0.85,
                breakpoints: {
                    320: {
                        allowTouchMove: true,
                        navigation: false // Hide navigation on small screens
                    },
                    768: {
                        allowTouchMove: true,
                        navigation: true
                    }
                }
            });
        }
    }, 100);
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY) - Optimized
// ============================================
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// BOOKING MODAL - Enhanced Mobile
// ============================================
const bookingModal = document.getElementById('bookingModal');
const openBookingButtons = document.querySelectorAll('.open-booking');
const closeBookingButtons = document.querySelectorAll('.close-booking');
const bookingForm = document.getElementById('bookingForm');
let touchStartY = 0;

function openBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Prevent body scroll on mobile
    if (window.innerWidth < 768) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

// Touch events for mobile swipe to close
if (bookingModal) {
    bookingModal.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    bookingModal.addEventListener('touchmove', (e) => {
        const touchEndY = e.touches[0].clientY;
        const diff = touchEndY - touchStartY;
        if (diff > 50 && e.target === bookingModal) {
            closeBookingModal();
        }
    });
}

openBookingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingModal();
    });
});

closeBookingButtons.forEach(button => {
    button.addEventListener('click', closeBookingModal);
});

if (bookingModal) {
    bookingModal.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            closeBookingModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            closeBookingModal();
        }
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(bookingForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const service = formData.get('service') || 'General Service';
        const date = formData.get('date') || 'Not specified';
        const message = formData.get('message') || 'No additional details provided.';

        const subject = encodeURIComponent('Service Booking Request');
        const body = encodeURIComponent(
            'Name: ' + name + '\nEmail: ' + email + '\nService: ' + service + '\nPreferred date: ' + date + '\n\nDetails:\n' + message
        );
        window.location.href = 'mailto:greenestpf@gmail.com?subject=' + subject + '&body=' + body;
        closeBookingModal();
        bookingForm.reset();

        // Show success message on mobile
        if (window.innerWidth < 768) {
            const toast = document.createElement('div');
            toast.textContent = 'Booking request sent! We\'ll contact you soon.';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: var(--primary);
                color: var(--bg-dark);
                padding: 12px;
                text-align: center;
                border-radius: 10px;
                z-index: 2000;
                font-weight: 600;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    });
};

// ============================================
// COUNT-UP ANIMATION - Mobile Optimized
// ============================================
let observerInitialized = false;
let hasAnimated = false;

function animateNumber(element, target) {
    let current = 0;
    const duration = window.innerWidth < 768 ? 1000 : 1500; // Faster on mobile
    const increment = target / (duration / 20);

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = target;
            clearInterval(interval);
        } else {
            element.innerText = Math.floor(current);
        }
    }, 20);
}

function animateNumbers(container) {
    const countElements = container.querySelectorAll('[data-count]');
    countElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        if (!isNaN(target) && el.innerText !== target.toString()) {
            animateNumber(el, target);
        }
    });
}

// Intersection Observer for count-up with better mobile performance
if (!observerInitialized) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateNumbers(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Lower threshold for earlier trigger on mobile
        rootMargin: '50px' // Start animation slightly before entering viewport
    });

    document.querySelectorAll('.hero-stats, .about-features, .row.g-4, .stats-card').forEach(section => {
        if (section.querySelector('[data-count]')) {
            countObserver.observe(section);
        }
    });
    observerInitialized = true;
}

// Trigger count-up immediately for hero stats on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && !heroStats.classList.contains('counted') && heroStats.querySelector('[data-count]')) {
            heroStats.classList.add('counted');
            animateNumbers(heroStats);
        }
    }, 500);
});

// ============================================
// SMOOTH SCROLLING WITH OFFSET FIX
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            // Calculate offset for fixed navbar
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) {
                    toggler.click();
                }
            }

            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// ============================================
// PARALLAX EFFECT - Disabled on mobile for performance
// ============================================
let parallaxEnabled = window.innerWidth > 768;
let parallaxFrame;

window.addEventListener('scroll', () => {
    if (!parallaxEnabled) return;

    if (parallaxFrame) cancelAnimationFrame(parallaxFrame);

    parallaxFrame = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Disable parallax on resize for mobile
window.addEventListener('resize', () => {
    parallaxEnabled = window.innerWidth > 768;
    if (!parallaxEnabled) {
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) heroOverlay.style.transform = '';
    }
});

// ============================================
// 3D TILT EFFECT - Disabled on touch devices
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    serviceCards.forEach(card => {
        let tiltFrame;

        card.addEventListener('mousemove', (e) => {
            if (tiltFrame) cancelAnimationFrame(tiltFrame);

            tiltFrame = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
} else {
    // Simple hover effect for touch devices
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// SCROLL INDICATOR CLICK
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const elementPosition = aboutSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            window.location.href = 'services.html';
        }
    });
}

// ============================================
// UPDATE FUNCTIONS ON SCROLL (Throttled)
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    updateNavbar();

    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
setTimeout(() => {
    updateActiveNav();
}, 100);

// ============================================
// PREVENT DEFAULT FOR EMPTY HASH LINKS
// ============================================
document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// ============================================
// LOADING STATE MANAGEMENT
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Remove loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 300);
    }
});

// ============================================
// PORTFOLIO SWIPER INITIALIZATION - Mobile Optimized
// ============================================
let portfolioSwiper;
function initPortfolioSwiper() {
    if (document.querySelector('.portfolioSwiper')) {
        const isMobile = window.innerWidth < 768;
        portfolioSwiper = new Swiper('.portfolioSwiper', {
            slidesPerView: isMobile ? 1 : 3,
            spaceBetween: isMobile ? 15 : 30,
            loop: true,
            autoplay: {
                delay: isMobile ? 2500 : 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: !isMobile
            },
            speed: isMobile ? 400 : 500,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: !isMobile
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    navigation: false
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    navigation: true
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                    navigation: true
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    navigation: true
                },
            },
            touchRatio: 0.8,
            resistanceRatio: 0.85,
            grabCursor: true
        });
    }
}

// Initialize portfolio swiper on load and resize
window.addEventListener('load', initPortfolioSwiper);
let resizeSwiperTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeSwiperTimeout);
    resizeSwiperTimeout = setTimeout(() => {
        if (portfolioSwiper) {
            portfolioSwiper.destroy(true, true);
            initPortfolioSwiper();
        }
    }, 250);
});

// ============================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images on mobile
if ('IntersectionObserver' in window && window.innerWidth < 768) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Reduce motion on mobile
if (window.innerWidth < 768) {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up, [data-aos] {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// CONSOLE LOG (Production ready - consider removing)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('GREENEST PF — Website loaded successfully with Bootstrap 5!');
    console.log('Modern responsive engineering solutions for Kampala');
    console.log('Mobile optimizations enabled - Touch device:', isTouchDevice);
    console.log('Viewport size:', window.innerWidth, 'x', window.innerHeight);
}

// ============================================
// FIX FOR IOS 100VH ISSUE
// ============================================
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', () => {
    requestAnimationFrame(setVH);
});
setVH();

// ============================================
// PREVENT DOUBLE TAP ZOOM ON BUTTONS (iOS)
// ============================================
document.querySelectorAll('button, .btn, .nav-link').forEach(el => {
    el.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            setTimeout(() => el.click(), 10);
        }
    }, { passive: false });
});
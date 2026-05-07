// ============================================
// INITIALIZE AOS ANIMATIONS
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('mainNav');

function updateNavbar() {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ============================================
// HERO BACKGROUND CAROUSEL (SWIPER)
// ============================================
let heroSwiper;
window.addEventListener('load', () => {
    setTimeout(() => {
        heroSwiper = new Swiper('.heroSwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-section .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.hero-section .swiper-button-next',
                prevEl: '.hero-section .swiper-button-prev',
            },
        });
    }, 100);
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY)
// ============================================
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.href.split('#')[0];
    const normalizedCurrent = currentUrl.replace(/index\.html$/, 'index.html');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkUrl = link.href.split('#')[0];
        if (linkUrl === currentUrl || linkUrl === normalizedCurrent) {
            link.classList.add('active');
        }
    });
}

// ============================================
// BOOKING MODAL
// ============================================
const bookingModal = document.getElementById('bookingModal');
const openBookingButtons = document.querySelectorAll('.open-booking');
const closeBookingButtons = document.querySelectorAll('.close-booking');
const bookingForm = document.getElementById('bookingForm');

function openBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

openBookingButtons.forEach(button => {
    button.addEventListener('click', openBookingModal);
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
        window.location.href = 'mailto:raweko@greenestpft.com?subject=' + subject + '&body=' + body;
        closeBookingModal();
        bookingForm.reset();
    });
};

// ============================================
// COUNT-UP ANIMATION
// ============================================
function animateNumbers() {
    const countElements = document.querySelectorAll('[data-count]');

    countElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 50);

        const interval = setInterval(() => {
            if (current < target) {
                current = Math.min(current + increment, target);
                el.innerText = current;
            } else {
                clearInterval(interval);
            }
        }, 20);
    });
}

// Intersection Observer for count-up
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countNumbers = target.querySelectorAll('[data-count]');

            if (countNumbers.length > 0 && !target.classList.contains('counted')) {
                target.classList.add('counted');

                countNumbers.forEach(el => {
                    const targetValue = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(targetValue / 50);

                    const interval = setInterval(() => {
                        if (current < targetValue) {
                            current = Math.min(current + increment, targetValue);
                            el.innerText = current;
                        } else {
                            clearInterval(interval);
                        }
                    }, 20);
                });
            }
        }
    });
}, { threshold: 0.5 });

// Observe sections with stats
document.querySelectorAll('.hero-stats, .about-features, .row.g-4').forEach(section => {
    countObserver.observe(section);
});

// Trigger count-up immediately for hero stats on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && !heroStats.classList.contains('counted')) {
            const countNumbers = heroStats.querySelectorAll('[data-count]');
            heroStats.classList.add('counted');

            countNumbers.forEach(el => {
                const targetValue = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const increment = Math.ceil(targetValue / 50);

                const interval = setInterval(() => {
                    if (current < targetValue) {
                        current = Math.min(current + increment, targetValue);
                        el.innerText = current;
                    } else {
                        clearInterval(interval);
                    }
                }, 20);
            });
        }
    }, 300);
});

// ============================================
// SMOOTH SCROLLING FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) {
                    toggler.click();
                }
            }
        }
    });
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// ADD HOVER EFFECT ON SERVICE CARDS (3D Tilt)
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// SCROLL INDICATOR CLICK
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
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
updateActiveNav();

// ============================================
// PREVENT DEFAULT FOR EMPTY HASH LINKS
// ============================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});

// ============================================
// ADD LOADING CLASS TO BODY
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// CONSOLE LOG
// ============================================
console.log('GREENEST PF — Website loaded successfully with Bootstrap 5!');
console.log('Modern responsive engineering solutions for Kampala');

// ============================================
// PORTFOLIO SWIPER INITIALIZATION
// ============================================
const portfolioSwiper = new Swiper('.portfolioSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
});
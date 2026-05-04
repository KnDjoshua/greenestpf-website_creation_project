const menuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const heroOverlay = document.querySelector('.hero-overlay');
const animatedItems = document.querySelectorAll('[data-animate]');
const sectionElements = document.querySelectorAll('main section[id]');
const whatsappButton = document.querySelector('.whatsapp-float');

const closeMobileMenu = () => {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('open');
};

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.classList.toggle('open', isOpen);
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

document.addEventListener('click', event => {
    if (!navLinks || !menuToggle) return;
    const target = event.target;
    if (navLinks.classList.contains('open') && target instanceof Element && !navLinks.contains(target) && !menuToggle.contains(target)) {
        closeMobileMenu();
    }
});

const revealObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.2 }) : null;

if (revealObserver) {
    animatedItems.forEach(item => revealObserver.observe(item));
} else {
    animatedItems.forEach(item => item.classList.add('animate-visible'));
}

const sectionObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) {
            activeLink.classList.toggle('active', entry.isIntersecting);
        }
    });
}, { threshold: 0.45 }) : null;

sectionElements.forEach(section => {
    if (sectionObserver) {
        sectionObserver.observe(section);
    }
});

const pinHero = () => {
    if (!heroOverlay) return;
    const offset = window.scrollY * 0.18;
    heroOverlay.style.transform = `translateY(${offset}px)`;
};

window.addEventListener('scroll', () => {
    window.requestAnimationFrame(pinHero);
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / 18;
        const y = (event.clientY - rect.top - rect.height / 2) / -18;
        card.style.transform = `perspective(500px) rotateX(${y}deg) rotateY(${x}deg) translateZ(4px)`;
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = '';
    });
});

if (whatsappButton) {
    whatsappButton.classList.add('pulse');
}

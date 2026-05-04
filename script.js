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
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '50px';
      cursor.style.height = '50px';
      cursor.style.borderColor = '#ffffff';
      cursor.style.backgroundColor = 'rgba(83, 255, 142, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.borderColor = '#53ff8e';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

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
// MOBILE NAVIGATION
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
  if (mobileToggle && navMenu) {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// Close mobile menu on window resize (if open and screen becomes larger)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY)
// ============================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');

function updateNavbar() {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

// ============================================
// COUNT-UP ANIMATION
// ============================================
const countElements = document.querySelectorAll('[data-count]');

function animateNumbers() {
  countElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const current = parseInt(el.innerText);
    
    if (current < target) {
      const increment = Math.ceil(target / 50);
      const newValue = Math.min(current + increment, target);
      el.innerText = newValue;
    }
  });
}

// Intersection Observer for count-up
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const countNumber = target.querySelector('.stat-number');
      if (countNumber && !target.classList.contains('counted')) {
        target.classList.add('counted');
        const countValue = parseInt(countNumber.getAttribute('data-count'));
        
        let current = 0;
        const interval = setInterval(() => {
          if (current < countValue) {
            current++;
            countNumber.innerText = current;
          } else {
            clearInterval(interval);
          }
        }, 20);
      }
    }
  });
}, { threshold: 0.5 });

// Observe each stat card
document.querySelectorAll('.stat-card, .stat-item').forEach(card => {
  countObserver.observe(card);
});

// ============================================
// SMOOTH SCROLLING FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// PARTICLE BACKGROUND FOR HERO SECTION
// ============================================
function createParticles() {
  const particleContainer = document.getElementById('heroParticles');
  if (!particleContainer) return;
  
  particleContainer.innerHTML = '';
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = `rgba(83, 255, 142, ${Math.random() * 0.3})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    particleContainer.appendChild(particle);
  }
}

// Add float animation CSS dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

createParticles();

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ============================================
// UPDATE FUNCTIONS ON SCROLL
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
updateNavbar();

// ============================================
// ADD HOVER EFFECT ON SERVICE CARDS
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================
// LOADING ANIMATION FOR STAT NUMBERS (HERO SECTION)
// ============================================
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const interval = setInterval(() => {
          if (current < target) {
            current++;
            el.innerText = current;
          } else {
            clearInterval(interval);
          }
        }, 30);
      });
      heroStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroStatsObserver.observe(heroStats);
}

// ============================================
// PREVENT DEFAULT FOR EMPTY HASH LINKS
// ============================================
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});

// ============================================
// CONSOLE LOG FOR DEVELOPMENT
// ============================================
console.log('GREENEST PF — Website loaded successfully!');
console.log('Modern engineering solutions for Kampala');
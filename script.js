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
// ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY)
// ============================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPosition = window.scrollY + 150;
  
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
    const href = link.getAttribute('href');
    if (href && href.substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

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
  
  // Trigger count-up for visible elements on load
  setTimeout(() => {
    const visibleStats = document.querySelectorAll('.hero-stats, .stats-card');
    visibleStats.forEach(stat => {
      countObserver.observe(stat);
    });
  }, 500);
});

// ============================================
// CONSOLE LOG
// ============================================
console.log('GREENEST PF — Website loaded successfully with Bootstrap 5!');
console.log('Modern responsive engineering solutions for Kampala');
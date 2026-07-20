// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== INTERSECTION OBSERVER FOR FADE-IN =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in to sections
const animateElements = [
  '.about-images',
  '.about-content',
  '.service-card',
  '.portfolio-item',
  '.process-step',
  '.testimonial-card',
  '.contact-info',
  '.contact-form-wrap',
  '.social-proof-bar',
  '.section-header'
];

animateElements.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add('fade-in');
    if (index > 0 && index <= 4) {
      el.classList.add(`fade-in-delay-${index}`);
    }
    observer.observe(el);
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function handleFormSubmit(e) {
  e.preventDefault();
  
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '送出中...';
  btn.disabled = true;

  // Submit to Formspree
  fetch(contactForm.action, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      alert('提交失敗，請稍後重試');
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }).catch(error => {
    console.error('Error:', error);
    alert('提交失敗，請稍後重試');
    btn.innerHTML = originalText;
    btn.disabled = false;
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// ===== HERO PARALLAX =====
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroImg.style.transform = `translateY(${rate}px)`;
  }, { passive: true });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix, duration = 2000) {
  if (el.dataset.animated === 'true') return;
  el.dataset.animated = 'true';

  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

// Observe stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num[data-target]');
      statNums.forEach(num => {
        const target = parseInt(num.dataset.target);
        const suffix = num.dataset.suffix || '';
        if (!isNaN(target)) {
          animateCounter(num, target, suffix);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3, rootMargin: '0px' });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// Also trigger immediately if already visible on load
window.addEventListener('load', () => {
  if (heroStats) {
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const statNums = heroStats.querySelectorAll('.stat-num[data-target]');
      statNums.forEach(num => {
        const target = parseInt(num.dataset.target);
        const suffix = num.dataset.suffix || '';
        if (!isNaN(target)) {
          animateCounter(num, target, suffix, 1500);
        }
      });
    }
  }
});

// ===== PORTFOLIO HOVER EFFECT =====
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.querySelector('.portfolio-overlay').style.opacity = '1';
  });
  item.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      this.querySelector('.portfolio-overlay').style.opacity = '0';
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}, { passive: true });

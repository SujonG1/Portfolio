import { throttle } from './utils.js';

// Initialize scroll reveal animations
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elements.forEach((element) => observer.observe(element));
}

// Initialize staggered animations
export function initStaggerAnimations() {
  const containers = document.querySelectorAll('.stagger-children');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  containers.forEach((container) => observer.observe(container));
}

// Initialize scroll progress bar
export function initScrollProgress() {
  const progressBar = document.getElementById('progress-bar');

  if (!progressBar) return;

  const updateProgress = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, 16);

  window.addEventListener('scroll', updateProgress);
}

// Initialize scroll to top button
export function initScrollToTop() {
  const button = document.getElementById('scroll-to-top');

  if (!button) return;

  const toggleButton = throttle(() => {
    if (window.scrollY > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }, 100);

  window.addEventListener('scroll', toggleButton);

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Animate counter numbers
export function animateCounter(element, target, duration = 1500) {
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Initialize number animations on scroll
export function initNumberAnimations() {
  const numberElements = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        const target = parseInt(entry.target.textContent);
        animateCounter(entry.target, target);
        entry.target.setAttribute('data-animated', 'true');
        observer.unobserve(entry.target);
      }
    });
  });

  numberElements.forEach((element) => observer.observe(element));
}

// Parallax scrolling effect
export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  const handleParallax = throttle(() => {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = window.scrollY * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 16);

  window.addEventListener('scroll', handleParallax);
}

// Add hover animations to cards
export function initCardAnimations() {
  const cards = document.querySelectorAll('.card, .project-card, .blog-card, .ai-card, .cert-card');

  cards.forEach((card) => {
    if (!card.classList.contains('hover-lift')) {
      card.classList.add('hover-lift');
    }
  });
}

// Initialize text reveal animations
export function initTextReveal() {
  const textElements = document.querySelectorAll('.section-title');

  textElements.forEach((element) => {
    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.animation = `slideInUp 0.6s ease-out ${index * 0.03}s forwards`;
        return span.outerHTML;
      })
      .join('');
  });
}

// Pulse animation trigger
export function addPulseAnimation(element, duration = 1000) {
  element.style.animation = `pulse ${duration}ms ease-in-out`;
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

// All animation initializations
export function initAllAnimations() {
  initScrollReveal();
  initStaggerAnimations();
  initScrollProgress();
  initScrollToTop();
  initNumberAnimations();
  initParallax();
  initCardAnimations();
  initTextReveal();
}

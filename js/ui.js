// Navigation smooth scrolling
export function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Navbar background on scroll
export function initNavbarScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
    } else {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });
}

// Add active state to nav links based on scroll position
export function initNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Button ripple effect
export function initRippleEffect() {
  const buttons = document.querySelectorAll('button, .btn-primary, .btn-ghost, .preset-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Form input focus effects
export function initFormEffects() {
  const inputs = document.querySelectorAll('input, textarea');

  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 12px rgba(108, 99, 255, 0.4)';
    });

    input.addEventListener('blur', () => {
      input.style.boxShadow = 'none';
    });
  });
}

// Modal/drawer animations
export function initModals() {
  const modals = document.querySelectorAll('[data-modal]');

  modals.forEach((modal) => {
    const trigger = document.querySelector(`[data-modal-trigger="${modal.id}"]`);
    const close = modal.querySelector('[data-modal-close]');

    if (trigger) {
      trigger.addEventListener('click', () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Keyboard shortcuts
export function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Press '?' for help
    if (e.key === '?') {
      console.log('Available shortcuts: ? - help, / - search, j/k - scroll');
    }

    // Press 'j' to scroll down
    if (e.key === 'j') {
      window.scrollBy({ top: 100, behavior: 'smooth' });
    }

    // Press 'k' to scroll up
    if (e.key === 'k') {
      window.scrollBy({ top: -100, behavior: 'smooth' });
    }

    // Press '/' to focus search
    if (e.key === '/') {
      e.preventDefault();
      const chatInput = document.getElementById('chatInput');
      if (chatInput) {
        document.getElementById('chatFab').click();
        chatInput.focus();
      }
    }
  });
}

// Add smooth transitions for page load
export function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease-in-out';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  document.body.style.opacity = '1';
}

// Initialize all UI features
export function initAllUI() {
  initPageLoad();
  initNavigation();
  initNavbarScroll();
  initNavActiveState();
  initRippleEffect();
  initFormEffects();
  initModals();
  initKeyboardShortcuts();
}

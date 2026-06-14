// Throttle function to limit function calls
export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function to delay function calls
export function debounce(func, delay) {
  let timeoutId;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

// Clamp value between min and max
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Linear interpolation
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Ease out cubic
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Generate random number between min and max
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Check if element is in viewport
export function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset
  );
}

// Smooth scroll to element
export function smoothScrollTo(element, offset = 100) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: top,
    behavior: 'smooth'
  });
}

// Add class with animation
export function addAnimationClass(element, className, duration = 600) {
  element.classList.add(className);
  return new Promise((resolve) => {
    setTimeout(() => {
      element.classList.remove(className);
      resolve();
    }, duration);
  });
}

// Get computed animation duration
export function getAnimationDuration(element) {
  const style = getComputedStyle(element);
  const duration = style.animationDuration;
  return parseFloat(duration) * 1000;
}

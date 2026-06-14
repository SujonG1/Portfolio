import { initAllAnimations } from './animations.js';
import { initParticleSystem } from './particles.js';
import { initChatbot } from './chatbot.js';
import { initAllUI } from './ui.js';

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded - initializing animations and interactivity');

  // Initialize all systems
  initParticleSystem();
  initAllAnimations();
  initAllUI();
  initChatbot();

  console.log('All systems initialized ✨');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible - resuming animations');
  }
});

// Log performance metrics
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`Page load time: ${pageLoadTime}ms`);
});

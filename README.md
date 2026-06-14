# Sujon Ganguly's Portfolio

A modern, modular, and animated portfolio website showcasing skills, projects, certifications, and AI experiments.

## Features

✨ **Rich Animations**
- 20+ custom keyframe animations
- Scroll-triggered reveal effects
- Parallax scrolling
- Particle background system
- Smooth transitions and hover effects

🎨 **Modern Design**
- Dark theme with gradient accents
- Responsive design for all devices
- Smooth navigation
- Professional color scheme

🤖 **Interactive Elements**
- AI chatbot assistant with eye tracking
- Scroll progress indicator
- Scroll-to-top button
- Number counters
- Modal effects

📱 **Mobile Optimized**
- Fully responsive
- Touch-friendly interactions
- Optimized animations for mobile
- Reduced motion support

## Project Structure

```
portfolio/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Global styles & variables
│   ├── animations.css     # Keyframes & animation classes
│   ├── components.css     # Component-specific styles
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Entry point
│   ├── animations.js      # Scroll & reveal animations
│   ├── particles.js       # Particle system
│   ├── chatbot.js         # Chatbot logic
│   ├── ui.js              # UI interactions
│   └── utils.js           # Utility functions
├── components/            # Reusable HTML components
│   ├── header.html
│   ├── hero.html
│   ├── about.html
│   ├── projects.html
│   ├── ai-lab.html
│   ├── blog.html
│   ├── contact.html
│   ├── chatbot.html
│   └── footer.html
└── assets/
    └── knowledge-base.json

```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your browser
3. Explore the portfolio!

No build tools or dependencies required. Everything is vanilla HTML, CSS, and JavaScript.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Key Animations

### Scroll Reveal
- Elements fade in and slide up as they enter viewport
- Staggered animations for lists

### Particle System
- Interactive background with mouse-repelling particles
- Color-coded particles
- Smooth connections between nearby particles

### Hover Effects
- Cards lift and glow on hover
- Text transforms
- Scale and rotation effects

### UI Feedback
- Button ripple effects
- Input field focus glow
- Smooth transitions

## JavaScript Modules

**animations.js** - Handles all scroll-triggered animations
- `initScrollReveal()` - Scroll-triggered reveal
- `initScrollProgress()` - Progress bar
- `initScrollToTop()` - Back-to-top button
- `initNumberAnimations()` - Counter animations

**particles.js** - Particle background system
- `initParticleSystem()` - Initialize particle canvas

**chatbot.js** - AI assistant chatbot
- `initChatbot()` - Initialize chat interface
- Eye tracking and blinking
- Knowledge base responses

**ui.js** - UI interactions
- `initNavigation()` - Nav smooth scroll
- `initRippleEffect()` - Button ripples
- `initKeyboardShortcuts()` - Keyboard navigation

**utils.js** - Utility functions
- `throttle()` - Function throttling
- `debounce()` - Function debouncing
- `clamp()` - Value clamping
- `lerp()` - Linear interpolation

## Customization

### Change Colors
Edit CSS variables in `css/main.css`:
```css
:root {
  --indigo: #6C63FF;
  --cyan: #00F5FF;
  --pink: #FF4F9A;
  /* ... more colors */
}
```

### Add New Animations
1. Define keyframes in `css/animations.css`
2. Create utility class with `animation` property
3. Apply to elements

### Modify Content
Edit content directly in `index.html` or use individual component files in `components/`.

## Performance

- No external dependencies
- GPU-accelerated animations (using `transform` & `opacity`)
- Debounced scroll events
- Lazy animations on mobile
- Optimized file sizes

## License

Open source - feel free to use as inspiration for your own portfolio!

---

Built with curiosity & caffeine · 2026

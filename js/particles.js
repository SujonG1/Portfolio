import { randomBetween, lerp, clamp } from './utils.js';

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = this.randomColor();
  }

  randomColor() {
    const colors = ['#6C63FF', '#00F5FF', '#FF4F9A'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouse) {
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repulsion
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d < 120) {
      this.vx -= (dx / d) * 0.04;
      this.vy -= (dy / d) * 0.04;
    }

    // Boundary wrapping
    if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
      this.reset();
    }

    // Velocity damping
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace('#', 'rgba(').replace(/(.{6})/, '$1, ' + this.alpha + ')');
    ctx.fill();
  }
}

export function initParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  // Create particles
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle(canvas));
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Draw particle connections
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${(1 - d / 100) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      p.update(mouse);
      p.draw(ctx);
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
}

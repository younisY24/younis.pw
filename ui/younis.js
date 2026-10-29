/* ====== Ultra Clean K.Y.js ====== */

document.addEventListener('DOMContentLoaded', function() {
  initEntranceAnimations();
  initHoverEffects();
  initProfileEffect();
  initBackgroundAnimation();
  initPerformance();
});

// Entrance Animations Controller
function initEntranceAnimations() {
  // Stagger animations for visual pleasure
  const elements = document.querySelectorAll('[data-entrance]');
  
  elements.forEach((element, index) => {
    // Add slight random delay for organic feel
    const baseDelay = parseFloat(window.getComputedStyle(element).animationDelay) || 0;
    const randomDelay = Math.random() * 0.1;
    element.style.animationDelay = `${baseDelay + randomDelay}s`;
  });

  // Re-trigger animations on page visibility
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      elements.forEach(el => {
        const animation = window.getComputedStyle(el).animationName;
        if (animation && animation !== 'none') {
          el.style.animation = 'none';
          el.offsetHeight; // Trigger reflow
          el.style.animation = '';
        }
      });
    }
  });
}

// Enhanced Hover Effects
function initHoverEffects() {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    let timeout;
    
    link.addEventListener('mouseenter', function(e) {
      // Clear any existing timeout
      clearTimeout(timeout);
      
      // Add magnetic effect
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `
        translateY(-10px) 
        scale(1.1) 
        rotateX(${-y / 5}deg) 
        rotateY(${x / 5}deg)
      `;
    });
    
    link.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `
        translateY(-10px) 
        scale(1.1) 
        rotateX(${-y / 5}deg) 
        rotateY(${x / 5}deg)
      `;
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
      
      // Add bounce effect on leave
      timeout = setTimeout(() => {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }, 100);
    });

    // Touch support for mobile
    link.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    link.addEventListener('touchend', function() {
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
  });
}

// Profile Image 3D Effect
function initProfileEffect() {
  const profileImg = document.querySelector('.profile-img-clean');
  if (!profileImg) return;
  
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let isHovering = false;
  
  profileImg.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  profileImg.addEventListener('mouseleave', () => {
    isHovering = false;
    targetX = 0;
    targetY = 0;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = profileImg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    targetX = (e.clientX - centerX) / 10;
    targetY = (e.clientY - centerY) / 10;
  });
  
  function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    if (isHovering) {
      profileImg.style.transform = `
        scale(1.1)
        perspective(1000px)
        rotateY(${currentX}deg)
        rotateX(${-currentY}deg)
        translateZ(20px)
      `;
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Click effect
  profileImg.addEventListener('click', function() {
    this.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
      this.style.transform = '';
    }, 600);
  });
}

// Background Mesh Animation
function initBackgroundAnimation() {
  const bgMesh = document.querySelector('.bg-mesh');
  if (!bgMesh) return;
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    bgMesh.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
  
  // Parallax on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const speed = scrolled * -0.5;
    
    bgMesh.style.transform = `translateY(${speed}px)`;
    lastScroll = scrolled;
  });
}

// Performance Optimizations
function initPerformance() {
  // Lazy load images
  const images = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Reduce animations for low-power mode
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-entrance]').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
  
  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    const isPaused = document.hidden;
    document.querySelectorAll('[data-entrance]').forEach(el => {
      el.style.animationPlayState = isPaused ? 'paused' : 'running';
    });
  });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  const socialLinks = document.querySelectorAll('.social-link');
  const currentIndex = Array.from(socialLinks).findIndex(link => link === document.activeElement);
  
  switch(e.key) {
    case 'ArrowRight':
      if (currentIndex < socialLinks.length - 1) {
        socialLinks[currentIndex + 1].focus();
      }
      break;
    case 'ArrowLeft':
      if (currentIndex > 0) {
        socialLinks[currentIndex - 1].focus();
      }
      break;
    case 'Enter':
      if (document.activeElement.classList.contains('social-link')) {
        document.activeElement.click();
      }
      break;
  }
});

// PWA Support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}

// Add install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Network Status
window.addEventListener('online', () => {
  console.log('Back online');
});

window.addEventListener('offline', () => {
  console.log('Gone offline');
});

// Easter Egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.body.style.animation = 'rainbow 2s linear infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
// ====== Energy Particle Effect ======
function initEnergyEffect() {
  const canvas  = document.getElementById('energyCanvas');
  const arrow   = document.getElementById('energyArrow');
  if (!canvas || !arrow) return;

  const ctx  = canvas.getContext('2d');
  const SIZE = 220;
  canvas.width  = SIZE;
  canvas.height = SIZE;

  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RADIUS = 60;

  let phase      = 'idle';
  let glowAlpha  = 0;
  let particles  = [];
  let cycleTimeout;

  function drawY(alpha) {
    if (alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = 'bold 54px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0ea5e9';
    ctx.shadowBlur = 22 * alpha;
    ctx.fillText('Y', CX, CY);
    ctx.restore();
  }

  function spawnParticle() {
    const angle = Math.random() * Math.PI * 2;
    const dist  = RADIUS + 45 + Math.random() * 65;
    return {
      x: CX + Math.cos(angle) * dist,
      y: CY + Math.sin(angle) * dist,
      tx: CX + (Math.random() - 0.5) * 16,
      ty: CY + (Math.random() - 0.5) * 16,
      size: 1.8 + Math.random() * 2.2,
      alpha: 0,
      speed: 0.028 + Math.random() * 0.038,
      progress: 0,
      trail: [],
    };
  }

  function startCycle() {
    phase = 'spawning';
    glowAlpha = 0;
    particles = Array.from({ length: 30 }, spawnParticle);

    setTimeout(function() {
      phase = 'charging';
      arrow.classList.remove('pulsing');
      void arrow.offsetWidth;
      arrow.classList.add('charged');
      glowAlpha = 1;
      setTimeout(function() { arrow.classList.add('pulsing'); }, 600);

      setTimeout(function() {
        phase = 'idle';
        glowAlpha = 0;
        arrow.classList.remove('charged', 'pulsing');
        arrow.style.opacity = '0';
        particles = [];
        cycleTimeout = setTimeout(startCycle, 3200);
      }, 3200);
    }, 2500);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    if (phase === 'idle') { requestAnimationFrame(draw); return; }

    if (glowAlpha > 0) {
      var gr = ctx.createRadialGradient(CX, CY, RADIUS - 4, CX, CY, RADIUS + 22);
      gr.addColorStop(0,   'rgba(56,189,248,' + (0.55 * glowAlpha) + ')');
      gr.addColorStop(0.5, 'rgba(14,165,233,' + (0.25 * glowAlpha) + ')');
      gr.addColorStop(1,   'rgba(14,165,233,0)');
      ctx.beginPath();
      ctx.arc(CX, CY, RADIUS + 14, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
    }

    drawY(phase === 'charging' ? Math.min(1, glowAlpha) : 0);

    particles.forEach(function(p) {
      p.progress = Math.min(1, p.progress + p.speed);
      p.alpha = p.progress < 0.2 ? p.progress / 0.2
              : p.progress > 0.85 ? (1 - p.progress) / 0.15
              : 1;

      var eased = 1 - Math.pow(1 - p.progress, 3);
      var cx = lerp(p.x, p.tx, eased);
      var cy = lerp(p.y, p.ty, eased);

      p.trail.push({ x: cx, y: cy });
      if (p.trail.length > 9) p.trail.shift();

      for (var i = 1; i < p.trail.length; i++) {
        var ta = (i / p.trail.length) * p.alpha * 0.5;
        ctx.beginPath();
        ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
        ctx.lineTo(p.trail[i].x, p.trail[i].y);
        ctx.strokeStyle = 'rgba(56,189,248,' + ta + ')';
        ctx.lineWidth = p.size * 0.45;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56,189,248,' + p.alpha + ')';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    if (phase === 'charging') {
      glowAlpha = Math.min(1, glowAlpha + 0.035);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
  cycleTimeout = setTimeout(startCycle, 1800);
}

document.addEventListener('DOMContentLoaded', function() {
  initEnergyEffect();
});

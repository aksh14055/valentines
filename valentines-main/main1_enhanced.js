// ===== GARDEN PAGE INITIALIZATION =====
window.addEventListener("load", () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
});

// ===== INTERACTIVE FLOWER SYSTEM =====
document.addEventListener("DOMContentLoaded", function() {
  const flowers = document.querySelectorAll('.flower');
  const nightDiv = document.querySelector('.night');
  
  let mouseX = 0;
  let mouseY = 0;

  // Mouse tracking for flower interaction
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    flowers.forEach(flower => {
      const rect = flower.getBoundingClientRect();
      const flowerX = rect.left + rect.width / 2;
      const flowerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - flowerX, 2) + Math.pow(mouseY - flowerY, 2)
      );

      // Interact if mouse is within 150px
      if (distance < 150) {
        flower.style.transform = `scale(${1 + 0.1 * (1 - distance / 150)}) translateZ(0)`;
        flower.style.filter = `brightness(${1 + 0.3 * (1 - distance / 150)})`;
      } else {
        flower.style.transform = 'scale(1) translateZ(0)';
        flower.style.filter = 'brightness(1)';
      }
    });
  });

  // Flower click/hover interactions
  flowers.forEach((flower, index) => {
    flower.addEventListener('mouseenter', function() {
      // Bloom animation - make petals expand
      const leafs = this.querySelector('.flower__leafs');
      if (leafs) {
        gsap.to(leafs, {
          scale: 1.2,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.6)"
        });
      }

      // Glow effect
      gsap.to(this, {
        boxShadow: "0 0 30px rgba(74, 144, 226, 0.8), 0 0 60px rgba(74, 144, 226, 0.4)",
        duration: 0.4
      });

      // Create sparkle particles around flower
      createFlowerSparkles(this);
    });

    flower.addEventListener('mouseleave', function() {
      const leafs = this.querySelector('.flower__leafs');
      if (leafs) {
        gsap.to(leafs, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      gsap.to(this, {
        boxShadow: "0 0 20px rgba(74, 144, 226, 0.4)",
        duration: 0.4
      });
    });

    // Initial bloom animation on load
    gsap.from(flower, {
      opacity: 0,
      scale: 0.6,
      y: 30,
      duration: 0.8,
      delay: index * 0.15,
      ease: "back.out"
    });
  });

  // ===== ANIMATED TEXT ON PAGE LOAD =====
  if (nightDiv) {
    const heading = nightDiv.querySelector('h1');
    const paragraph = nightDiv.querySelector('p');

    if (heading) {
      gsap.from(heading, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });
    }

    if (paragraph) {
      gsap.from(paragraph, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
      });
    }
  }

  // ===== ADVANCED CURSOR FOR GARDEN PAGE =====
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor garden-cursor';
  const cursorInner = document.createElement('div');
  cursorInner.className = 'cursor-inner';
  cursor.appendChild(cursorInner);
  document.body.appendChild(cursor);
  
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGardenCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateGardenCursor);
  }
  animateGardenCursor();

  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));

  // ===== FLOATING PARTICLES IN GARDEN =====
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.insertBefore(particle, document.body.firstChild);

    const duration = Math.random() * 15 + 20;
    const xOffset = (Math.random() - 0.5) * 300;
    const yOffset = -(Math.random() * 400 + 200);

    gsap.to(particle, {
      x: xOffset,
      y: yOffset,
      opacity: 0,
      duration: duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  // ===== AMBIENT BREATHING ANIMATION =====
  gsap.to(".flowers", {
    opacity: "+=0.05",
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // ===== PARALLAX EFFECT ON SCROLL =====
  document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    flowers.forEach((flower, index) => {
      gsap.to(flower, {
        y: scrollY * (0.3 + index * 0.05),
        duration: 0.3,
        overwrite: 'auto'
      });
    });
  });
});

// ===== CREATE SPARKLES AROUND FLOWERS =====
function createFlowerSparkles(flower) {
  const rect = flower.getBoundingClientRect();
  const flowerX = rect.left + rect.width / 2;
  const flowerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#ffd700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.boxShadow = '0 0 8px #ffd700';
    sparkle.style.left = flowerX + 'px';
    sparkle.style.top = flowerY + 'px';

    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / 8;
    const distance = 80;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    gsap.to(sparkle, {
      x: targetX,
      y: targetY,
      opacity: 0,
      duration: 1,
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      onComplete: () => sparkle.remove()
    });
  }
}

// ===== PAGE TRANSITION ON LINK CLICK =====
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && !link.target) {
    e.preventDefault();
    
    gsap.to(document.body, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = link.href;
      }
    });
  }
});

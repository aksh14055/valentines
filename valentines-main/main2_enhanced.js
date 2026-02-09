document.addEventListener("DOMContentLoaded", function () {
  // ===== ADVANCED CURSOR SYSTEM =====
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorInner = document.createElement('div');
  cursorInner.className = 'cursor-inner';
  cursor.appendChild(cursorInner);
  document.body.appendChild(cursor);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let isInteractive = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Detect if hovering over interactive elements
    const target = e.target;
    const isButton = target.classList.contains('button') || target.closest('.button');
    const isLink = target.tagName === 'A' || target.closest('a');
    
    if (isButton || isLink) {
      cursor.classList.add('interactive');
      isInteractive = true;
    } else {
      cursor.classList.remove('interactive');
      isInteractive = false;
    }
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));

  // ===== GSAP STAGGERED TEXT ANIMATION =====
  gsap.registerPlugin();
  
  function animateTextOnPage() {
    const headings = document.querySelectorAll('h1, h2, h3');
    const paragraphs = document.querySelectorAll('p');
    
    headings.forEach((heading, i) => {
      gsap.from(heading, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power2.out"
      });
    });

    paragraphs.forEach((para, i) => {
      gsap.from(para, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3 + i * 0.1,
        ease: "power2.out"
      });
    });
  }
  
  animateTextOnPage();

  // ===== FLOATING ELEMENTS WITH GSAP =====
  const container = document.getElementById("absImg");
  if (container) {
    const imageUrls = [
      "https://github.com/NikhilMarko03/resources/blob/main/heart.gif?raw=true",
    ];

    for (let i = 0; i < 15; i++) {
      let img = document.createElement("img");
      img.src = imageUrls[0];
      img.classList.add("image1");

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      img.style.top = startY + "px";
      img.style.left = startX + "px";

      let size = Math.floor(Math.random() * 30) + 20;
      img.style.width = size + "px";
      img.style.height = size + "px";

      container.appendChild(img);

      // Smooth floating animation with GSAP
      const duration = Math.random() * 8 + 12;
      const xOffset = (Math.random() - 0.5) * 200;
      const yOffset = -(Math.random() * 300 + 200);

      gsap.to(img, {
        x: xOffset,
        y: yOffset,
        duration: duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }

  // ===== BUTTON HOVER EFFECTS WITH GSAP =====
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.08,
        duration: 0.3,
        ease: "back.out"
      });
      
      gsap.to(this, {
        boxShadow: "0 15px 40px rgba(74, 144, 226, 0.4)",
        duration: 0.3
      });
    });

    button.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "back.out"
      });
      
      gsap.to(this, {
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3
      });
    });
  });

  // ===== EASTER EGG - HOLD BOTH BUTTONS =====
  let yesPressed = false;
  let noPressed = false;
  let easterEggTimer = null;

  const yesBtn = document.getElementById('yes');
  const noBtn = document.getElementById('no');

  if (yesBtn) {
    yesBtn.addEventListener('mousedown', () => {
      yesPressed = true;
      checkEasterEgg();
      gsap.to(yesBtn, { scale: 0.95, duration: 0.1 });
    });
  }

  if (noBtn) {
    noBtn.addEventListener('mousedown', () => {
      noPressed = true;
      checkEasterEgg();
      gsap.to(noBtn, { scale: 0.95, duration: 0.1 });
    });
  }

  document.addEventListener('mouseup', () => {
    yesPressed = false;
    noPressed = false;
    clearTimeout(easterEggTimer);
    if (yesBtn) gsap.to(yesBtn, { scale: 1, duration: 0.1 });
    if (noBtn) gsap.to(noBtn, { scale: 1, duration: 0.1 });
  });

  function checkEasterEgg() {
    if (yesPressed && noPressed) {
      easterEggTimer = setTimeout(() => {
        showEasterEgg();
      }, 3000);
    }
  }

  function showEasterEgg() {
    const wedate = document.getElementById("wedate");
    if (!wedate) return;

    // Glitch effect with GSAP
    gsap.timeline()
      .to(wedate, { skewY: 10, duration: 0.1 })
      .to(wedate, { skewY: -10, duration: 0.1 })
      .to(wedate, { skewY: 3, duration: 0.1 }, 0.1)
      .to(wedate, { skewY: 0, duration: 0.1 }, 0.2);

    setTimeout(() => {
      wedate.innerHTML = '💙 There was never a "No" option in my heart 💚<br><small style="font-size: 0.5em; opacity: 0.7;">// This button exists just to make you smile</small>';
      gsap.to(wedate, {
        color: 'var(--accent-gold)',
        duration: 0.6,
        ease: "power2.out"
      });
      createConfetti();
    }, 300);
  }
});

function angry() {
  const absImg = document.getElementById("absImg");
  const mainImg = document.getElementById("mainImg");
  
  if (mainImg) mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/sad1.gif?raw=true";
  if (absImg) {
    gsap.to(absImg, { opacity: 1, duration: 0.4, ease: "power1.out" });
    absImg.style.display = "flex";
  }
}

function happy() {
  const absImg = document.getElementById("absImg");
  const mainImg = document.getElementById("mainImg");
  
  if (mainImg) mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true";
  if (absImg) {
    gsap.to(absImg, { opacity: 1, duration: 0.4, ease: "power1.out" });
    absImg.style.display = "flex";
  }
}

const sadCat = [
  "https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216",
  "https://emoji.gg/assets/emoji/5228_cat_cri.gif",
  "https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206",
  "https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif",
  "https://c.tenor.com/fpIAhF2jIY0AAAAC/cat-crying.gif",
  "https://c.tenor.com/BP70qe8X0J8AAAAC/crycat-crying-cat.gif",
];

const playfulMessages = [
  "But blue and green are perfect match! 🥺",
  "We'd go together like sky and grass! 🌿",
  "Don't make me blue... 💧",
  "I'll be the leaf to your flower! 🌸",
  "Think about it... 💚💙",
  "Pretty please? 🥺",
  "Are you sure? Look how cute we are!",
];

function normal() {
  const absImg = document.getElementById("absImg");
  const mainImg = document.getElementById("mainImg");
  
  if (absImg) {
    gsap.to(absImg, { opacity: 0, duration: 0.3, ease: "power1.out" });
    setTimeout(() => absImg.style.display = "none", 300);
  }
  if (mainImg) mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true";
}

let counter = 0;

function no() {
  counter++;

  const model = document.getElementById("model");
  if (!model) return;

  gsap.to(model, {
    opacity: 0,
    scale: 0.9,
    duration: 0.2,
    onComplete: () => {
      model.style.display = "none";
      
      const modelImage = document.getElementById("modelImg");
      const modelText = document.getElementById("modelText");
      
      if (modelImage) modelImage.src = sadCat[Math.floor(Math.random() * sadCat.length)];
      if (modelText) modelText.innerText = playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
      
      gsap.fromTo(model,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out" }
      );
      model.style.display = "flex";
    }
  });
}

function yes() {
  const successModal = document.getElementById("model2");
  const pleadingModal = document.getElementById("model");
  const wedate = document.getElementById("wedate");
  const btns = document.getElementById("btns");
  const mainImg = document.getElementById("mainImg");

  if (pleadingModal) pleadingModal.style.display = "none";
  
  if (successModal) {
    gsap.fromTo(successModal,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
    );
    successModal.style.display = "flex";
  }

  createConfetti();
  createRippleEffect();
  
  if (btns) {
    gsap.to(btns, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.in",
      onComplete: () => {
        btns.style.display = "none";
      }
    });
  }

  setTimeout(() => {
    if (wedate) {
      gsap.to(wedate, {
        duration: 0.6,
        ease: "back.out",
        onUpdate: function() {}
      });
      wedate.innerHTML = 'Yay! 💙 Blue & Green Match Made in Heaven! 💚';
      gsap.from(wedate, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out"
      });
    }
    if (mainImg) mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true";
  }, 300);
}

// ===== ENHANCED CONFETTI WITH PHYSICS =====
function createConfetti() {
  const colors = ['#4a90e2', '#a2c2e0', '#56ab91', '#a8e6cf', '#ffd700'];
  const confettiCount = 120;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.opacity = Math.random() + 0.5;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 3 + 2.5;
    const destination = Math.random() * window.innerHeight + window.innerHeight;
    const rotation = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 250;
    const scale = Math.random() * 1.5 + 0.5;

    gsap.to(confetti, {
      y: destination,
      x: drift,
      rotation: rotation,
      scale: scale,
      opacity: 0,
      duration: duration,
      ease: "power2.in",
      onComplete: () => confetti.remove()
    });
  }
}

// ===== ADVANCED RIPPLE EFFECT =====
function createRippleEffect() {
  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.top = '50%';
  ripple.style.left = '50%';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'radial-gradient(circle, rgba(86,171,145,0.8) 0%, rgba(86,171,145,0) 70%)';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '9998';
  
  document.body.appendChild(ripple);

  gsap.to(ripple, {
    width: '800px',
    height: '800px',
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    onComplete: () => ripple.remove()
  });
}

function ly2() {
  // Page transition effect
  const body = document.body;
  
  gsap.to(body, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      window.location.href = "index1.html";
    }
  });
}
// ===== MODAL CAROUSEL INITIALIZATION =====
// Removed - modal carousel functionality disabled
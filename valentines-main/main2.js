document.addEventListener("DOMContentLoaded", function () {
  // Custom Cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));

  // Dynamically create floating background elements
  const container = document.getElementById("absImg");
  const imageUrls = [
    "https://github.com/NikhilMarko03/resources/blob/main/heart.gif?raw=true",
  ];

  for (let i = 0; i < 15; i++) {
    let img = document.createElement("img");
    img.src = imageUrls[0];
    img.classList.add("image1");

    img.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    img.style.left = Math.floor(Math.random() * window.innerWidth) + "px";

    let size = Math.floor(Math.random() * 30) + 20;
    img.style.width = size + "px";
    img.style.height = size + "px";

    img.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(img);
  }

  // Easter Egg - Hold both buttons
  let yesPressed = false;
  let noPressed = false;
  let easterEggTimer = null;

  document.getElementById('yes').addEventListener('mousedown', () => {
    yesPressed = true;
    checkEasterEgg();
  });

  document.getElementById('no').addEventListener('mousedown', () => {
    noPressed = true;
    checkEasterEgg();
  });

  document.addEventListener('mouseup', () => {
    yesPressed = false;
    noPressed = false;
    clearTimeout(easterEggTimer);
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
    wedate.style.animation = 'glitch 0.3s ease';
    setTimeout(() => {
      wedate.innerHTML = '💙 There was never a "No" option in my heart 💚<br><small style="font-size: 0.5em; opacity: 0.7;">// This button exists just to make you smile</small>';
      wedate.style.color = 'var(--accent-gold)';
      createConfetti();
    }, 300);
  }
});

function angry() {
  var absImg = document.getElementById("absImg");
  var mainImg = document.getElementById("mainImg");
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/sad1.gif?raw=true";

  absImg.style.display = "flex";
  // The images are already there, just hidden by container display logic or opacity
}

function happy() {
  var absImg = document.getElementById("absImg");
  absImg.style.display = "flex";
  var mainImg = document.getElementById("mainImg");
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true";
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
  var absImg = document.getElementById("absImg");
  // absImg.style.display = "none"; // Keep them visible for effect? Or hide. 
  // Let's hide to keep the interactiveness
  absImg.style.display = "none";

  var mainImg = document.getElementById("mainImg");
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true";
}

let counter = 0;

function no() {
  counter++;
  // Removed Audio Logic to prevent crashing

  let model = document.getElementById("model");
  model.style.display = "none";
  setTimeout(() => {
    model.style.display = "flex";
    const modelImage = document.getElementById("modelImg");
    const modelText = document.getElementById("modelText");
    modelImage.src = sadCat[Math.floor(Math.random() * sadCat.length)];
    modelText.innerText =
      playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
  }, 100);
}

function yes() {
  let successModal = document.getElementById("model2");
  let pleadingModal = document.getElementById("model");

  pleadingModal.style.display = "none";
  
  // Show success modal
  successModal.style.display = "flex";
  
  // Create confetti explosion
  createConfetti();
  
  // Create ripple effect from button
  createRippleEffect();
  
  const wedate = document.getElementById("wedate");
  const btns = document.getElementById("btns");
  const mainImg = document.getElementById("mainImg");
  
  btns.style.transition = 'all 0.6s ease';
  btns.style.opacity = '0';
  btns.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    btns.style.display = "none";
    wedate.style.animation = 'heartbeat 0.6s ease';
    wedate.innerHTML = 'Yay! 💙 Blue & Green Match Made in Heaven! 💚';
    mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true";
  }, 300);
}

// Confetti function
function createConfetti() {
  const colors = ['#4a90e2', '#a2c2e0', '#56ab91', '#a8e6cf', '#ffd700'];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.opacity = Math.random() + 0.5;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 3 + 2;
    const destination = Math.random() * window.innerHeight + window.innerHeight;
    const rotation = Math.random() * 720 - 360;
    const drift = (Math.random() - 0.5) * 200;
    
    confetti.animate([
      { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${destination}px) translateX(${drift}px) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

// Ripple effect
function createRippleEffect() {
  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.top = '50%';
  ripple.style.left = '50%';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'radial-gradient(circle, rgba(86,171,145,0.6) 0%, rgba(86,171,145,0) 70%)';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '9998';
  
  document.body.appendChild(ripple);
  
  ripple.animate([
    { width: '20px', height: '20px', opacity: 1 },
    { width: '800px', height: '800px', opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
  
  setTimeout(() => ripple.remove(), 1000);
}

function ly2() {
  window.location.href = "index1.html";
}

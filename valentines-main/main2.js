document.addEventListener("DOMContentLoaded", function () {
  // Dynamically create floating background elements
  const container = document.getElementById("absImg");
  const imageUrls = [
    "https://github.com/NikhilMarko03/resources/blob/main/heart.gif?raw=true", // Heart
    // We can add more if needed
  ];

  for (let i = 0; i < 15; i++) {
    let img = document.createElement("img");
    img.src = imageUrls[0];
    img.classList.add("image1");

    // Random positioning
    img.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    img.style.left = Math.floor(Math.random() * window.innerWidth) + "px";

    // Random size for variety
    let size = Math.floor(Math.random() * 30) + 20; // 20px to 50px
    img.style.width = size + "px";
    img.style.height = size + "px";

    // Random animation delay
    img.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(img);
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
  let model = document.getElementById("model2");
  let model2 = document.getElementById("model");

  // Removed Audio Logic

  model2.style.display = "none";
  model.style.display = "none";
  setTimeout(() => {
    model.style.display = "flex";
  }, 100);
  const wedate = document.getElementById("wedate");
  const btns = document.getElementById("btns");
  btns.style.display = "none";
  wedate.innerText = "Yay! Blue & Green Match Made in Heaven! 💙💚";
}

function ly2() {
  // Open index1.html in the same tab for better flow
  window.location.href = "index1.html";
}

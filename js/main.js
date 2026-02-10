let icon = document.querySelector(".icon");
let listHeader = document.querySelector(".header .links ul");
const typewriterTextElement = document.getElementById("typewriter-text");
const switcherLis = document.querySelectorAll(".shuffle li");
const boxes = document.querySelectorAll(".portfolio-content .card");
const hiddenElements = document.querySelectorAll(".hidden-el");

// Open and close the menu
icon.addEventListener("click", () => {
  if (listHeader.style.display === "block") {
    listHeader.style.display = "none";
  } else {
    listHeader.style.display = "block";
  }
});

// Anmisha changes automatically
const words = [
  "We Are Leon",
  "Super Creative",
  "Minimal Agency",
  "Web Template",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typewriterTextElement.textContent = currentWord.substring(0, charIndex);
  let typeSpeed = isDeleting ? 100 : 200;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex++;
    if (wordIndex === words.length) wordIndex = 0;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeWriter);

// Filter Projects Buttons
switcherLis.forEach((li) => {
  li.addEventListener("click", function () {
    switcherLis.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    boxes.forEach((box) => {
      box.style.display = "none";
    });
    if (this.dataset.cat === "all") {
      boxes.forEach((box) => {
        box.style.display = "block";
      });
    } else {
      document
        .querySelectorAll(
          `.portfolio-content .card[data-cat="${this.dataset.cat}"]`,
        )
        .forEach((el) => {
          el.style.display = "block";
        });
    }
  });
});

// Creating an Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-el");
    } else {
      entry.target.classList.remove("show-el");
    }
  });
});
hiddenElements.forEach((el) => observer.observe(el));

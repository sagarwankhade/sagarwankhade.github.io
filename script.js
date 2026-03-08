// Theme toggle with persistence.
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light-theme");
}

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", body.classList.contains("light-theme") ? "light" : "dark");
});

// Mobile navigation.
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = navPanel ? [...navPanel.querySelectorAll("a")] : [];

navToggle?.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Typing effect for the hero line.
const typedText = document.getElementById("typedText");
const phrases = [
  "Spring Boot microservices.",
  "enterprise-grade REST APIs.",
  "Java full stack platforms.",
  "payment-integrated business systems."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypingEffect() {
  if (!typedText) {
    return;
  }

  const currentPhrase = phrases[phraseIndex];

  if (deleting) {
    charIndex -= 1;
    typedText.textContent = currentPhrase.slice(0, charIndex);
  } else {
    charIndex += 1;
    typedText.textContent = currentPhrase.slice(0, charIndex);
  }

  let timeout = deleting ? 45 : 85;

  if (!deleting && charIndex === currentPhrase.length) {
    timeout = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    timeout = 320;
  }

  window.setTimeout(runTypingEffect, timeout);
}

runTypingEffect();

// Reveal animations.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));

// Animated counters.
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const counter = entry.target;
    const target = Number(counter.dataset.target || 0);
    const decimals = Number.isInteger(target) ? 0 : 1;
    let current = 0;
    const increment = Math.max(0.2, target / 40);

    const step = () => {
      current = Math.min(target, current + increment);
      counter.textContent = current.toFixed(decimals);
      if (current < target) {
        requestAnimationFrame(step);
      }
    };

    step();
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.4 });

counters.forEach((counter) => counterObserver.observe(counter));

// Active link state for the current section.
const sections = document.querySelectorAll("main section[id]");
const navLinkMap = new Map(navLinks.map((link) => [link.getAttribute("href")?.slice(1), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinkMap.get(entry.target.id)?.classList.add("active");
  });
}, { threshold: 0.5 });

sections.forEach((section) => sectionObserver.observe(section));

// Contact form UX for static hosting.
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (formFeedback) {
    formFeedback.textContent = `Thanks ${name || ""}. Opening your email client now.`;
  }

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Website Visitor"}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:sagarpw03@gmail.com?subject=${subject}&body=${body}`;

  contactForm.reset();
});

// Footer year.
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

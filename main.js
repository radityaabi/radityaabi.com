// ====== GLOBAL CONSTANTS & VARIABLES ======
const MOBILE_BREAKPOINT = 700;
let menuOpen = false;

// ====== MAIN INITIALIZATION FUNCTION ======
function initApp() {
  // Initialize all components
  initTypingEffect();
  initIntersectionObserver();
  initScrollProgress();
  initMobileMenu();

  // Page-specific initializations
  if (document.querySelector(".filter-btn")) {
    initProjectFilter();
  }

  if (document.getElementById("contactForm")) {
    initContactForm();
  }
}

// ====== TYPING EFFECT (Home Page) ======
function initTypingEffect() {
  const el = document.getElementById("typedSubtitle");
  if (!el) return;

  const text = "Web Developer & Survey Scripter";
  let i = 0;

  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, 40);
    }
  }

  step();
}

// ====== INTERSECTION OBSERVER ======
function initIntersectionObserver() {
  const sections = document.querySelectorAll(".section");
  const careerItems = document.querySelectorAll(".career-item");

  // Observer for sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { root: null, threshold: 0.25 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  // Observer for career items (if they exist)
  if (careerItems.length > 0) {
    const careerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    careerItems.forEach((item) => careerObserver.observe(item));
  }
}

// ====== SCROLL PROGRESS BAR ======
function initScrollProgress() {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;

  window.addEventListener(
    "scroll",
    () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / docHeight) * 100;
      progressBar.style.width = pct + "%";
    },
    { passive: true }
  );
}

// ====== MOBILE MENU FUNCTIONALITY ======
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  if (!mobileMenuBtn || !sidebar || !overlay) return;

  // Toggle mobile menu
  function toggleMenu() {
    menuOpen = !menuOpen;
    sidebar.classList.toggle("active", menuOpen);
    overlay.classList.toggle("active", menuOpen);
    body.classList.toggle("menu-open", menuOpen);

    // Update icon
    const icon = mobileMenuBtn.querySelector("i");
    if (menuOpen) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      mobileMenuBtn.setAttribute("aria-label", "Close navigation menu");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      mobileMenuBtn.setAttribute("aria-label", "Open navigation menu");
    }
  }

  // Add event listener to mobile menu button
  mobileMenuBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking on overlay
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        toggleMenu();
      }
    });
  });

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (menuOpen && e.key === "Escape") {
      toggleMenu();
    }
  });
}

// ====== PROJECT FILTER (Projects Page) ======
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "flex";
          card.style.flexDirection = "column";
        } else {
          const categories = card.getAttribute("data-categories");
          if (categories && categories.includes(filterValue)) {
            card.style.display = "flex";
            card.style.flexDirection = "column";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
}

// ====== CONTACT FORM (Contact Page) ======
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// ====== INITIALIZE APP WHEN DOCUMENT IS READY ======
document.addEventListener("DOMContentLoaded", initApp);

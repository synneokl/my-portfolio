/* ===================================
    Utility functions
=================================== */

/**
 * Hjelpefunksjon for å hente CSS-variabelverdi
 * @param {string} variableName - Navnet på CSS-variabelen
 * @returns {string}
 */
const getCSSVar = (variableName) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

/**
 * Hjelpefunksjon for å sette en CSS-variabel på et element
 * @param {HTMLElement} el
 * @param {string} name
 * @param {string|number} value
 */
const setCSSVar = (el, name, value) => {
  if (el) el.style.setProperty(name, value);
};

/* ===================================
    Teaser Card Scroll Expand
=================================== */
(function handleTeaserCardExpand() {
  const teaserCard = document.getElementById("teaser-card");
  if (!teaserCard) return;

  const EXPAND_SCROLL_POINT = 100; // px scrolled før full ekspansjon

  document.addEventListener("scroll", () => {
    const progress = Math.min(window.scrollY / EXPAND_SCROLL_POINT, 1);
    setCSSVar(teaserCard, "--expand-progress", progress);
  });
})();

/* ===================================
   Dynamic Section Colors
=================================== */
(function handleSectionColorChange() {
  const teaserCard = document.getElementById("teaser-card");
  const myeachtraxPage = document.getElementById("myeachtrax-page");
  const academyPage = document.getElementById("academy-page");
  const changewatcherPage = document.getElementById("changewatcher-page");

  const targets = [teaserCard, myeachtraxPage, academyPage, changewatcherPage].filter(Boolean);
  const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !entry.target.dataset.color) return;

        const newColor = entry.target.dataset.color;
        targets.forEach((el) => {
          el.style.transition = "background-color 0.6s ease";
          el.style.backgroundColor = newColor;
        });
      });
    },
    {
      threshold: 0.2, // hvor mye av seksjonen må være synlig
      rootMargin: "-10% 0px",
    }
  );

  const sections = document.querySelectorAll(".section-container, .container");
  sections.forEach((section) => observer.observe(section));
})();

/* ===================================
   Scroll Container Image Sync
=================================== */
(function handleScrollMockupSync() {
  const mockup = document.getElementById("mockup");
  if (!mockup) return;

  const sections = document.querySelectorAll(".scroll-text section");
  let currentScreen = mockup.src;

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

      if (!isVisible) return;

      const newSrc = `assets/projects/${section.dataset.screen}`;
      if (currentScreen === newSrc) return;

      currentScreen = newSrc;
      mockup.classList.add("fade-out");

      setTimeout(() => {
        mockup.src = newSrc;
        mockup.classList.remove("fade-out");
      }, 400); // matcher CSS-transition-duration
    });
  });
})();

/* ===================================
   Toggle Details Summary
=================================== */
(function handleToggleCollapse() {
  const toggleButtons = document.querySelectorAll(".toggle-collapse");
  if (!toggleButtons.length) return;

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const summary = btn.closest(".details-summary");
      if (!summary) return;

      summary.classList.toggle("expanded");
      const textSpan = btn.querySelector(".btn-text");
      const icon = btn.querySelector("i");

      const isExpanded = summary.classList.contains("expanded");
      textSpan.textContent = isExpanded ? "Vis mindre" : "Vis mer";
      icon.classList.toggle("bi-chevron-up", isExpanded);
      icon.classList.toggle("bi-chevron-down", !isExpanded);
    });
  });
})();


/*

// scroll to expand
document.addEventListener('scroll', () => {
  const element = document.getElementById('teaser-card');
  if (!element) return;

  const scrollY = window.scrollY;
  const expandPoint = 100; // hvor mange px ned du må scrolle før den er helt "expanded"

  // beregn en progresjon mellom 0 og 1
  let progress = Math.min(scrollY / expandPoint, 1);

  // Bruk CSS variabler til animasjon (mer fleksibelt enn mange klasser)
  element.style.setProperty('--expand-progress', progress);
  //element.style.backgroundColor = 'var(--green)';
});



// section/container colors
const teaserCard = document.getElementById('teaser-card');
const myeachtraxpage = document.getElementById('myeachtrax-page');
const academypage = document.getElementById('academy-page');
const changewatcherpage = document.getElementById('changewatcher-page');
const targets = [teaserCard, myeachtraxpage, academypage, changewatcherpage].filter(Boolean);

const sectionsAndContainers = document.querySelectorAll('.section-container, .container');

const defaultColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--background-color');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.color) {
        const color = entry.target.dataset.color;

        targets.forEach(el => {
          el.style.transition = 'background-color 0.6s ease';
          el.style.backgroundColor = color;
        });
      }
    });
  },
  {
    threshold: 0.2,           // bare 20% må være synlig
    rootMargin: "-10% 0px"    // trigger litt tidligere
  }
);

sectionsAndContainers.forEach(el => observer.observe(el));



//scroll container

const mockup = document.getElementById("mockup");
const section = document.querySelectorAll(".scroll-text section");

let currentScreen = mockup.src; // Holder styr på nåværende bilde

window.addEventListener("scroll", () => {
  section.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      const newSrc = "assets/projects/" + sec.dataset.screen;

      if (currentScreen !== newSrc) {
        currentScreen = newSrc;

        // Fade ut
        mockup.classList.add("fade-out");

        // Vent litt, bytt bilde, fade inn
        setTimeout(() => {
          mockup.src = newSrc;
          mockup.classList.remove("fade-out");
        }, 400); // matcher transition-duration
      }
    }
  });
});




//toggle button for details container
const toggleButtons = document.querySelectorAll('.toggle-collapse');

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const summary = btn.closest('.details-summary');
    summary.classList.toggle('expanded');

    const textSpan = btn.querySelector('.btn-text');
    const icon = btn.querySelector('i');

    if (summary.classList.contains('expanded')) {
      textSpan.textContent = 'Vis mindre';
      icon.classList.remove('bi-chevron-down');
      icon.classList.add('bi-chevron-up');
    } else {
      textSpan.textContent = 'Vis mer';
      icon.classList.remove('bi-chevron-up');
      icon.classList.add('bi-chevron-down');
    }
  });
});
*/
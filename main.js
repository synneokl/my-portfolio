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
      const newSrc = "assets/" + sec.dataset.screen;

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
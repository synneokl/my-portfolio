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




const teaserCard = document.getElementById('teaser-card');
const myeachtraxapp = document.getElementById('myeachtrax-app');
const academyapp = document.getElementById('academy-app');

const targets = [teaserCard, myeachtraxapp, academyapp].filter(Boolean);

// Her tar vi både sections og containers
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

const phoneScreen = document.getElementById("phone-screen");
const section = document.querySelectorAll(".scroll-text section");

window.addEventListener("scroll", () => {
  section.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      phoneScreen.src = "assets/" + section.dataset.screen;
    }
  });
});



//toggle button
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






/* const myeachtrax_app = document.getElementById('myeachtrax-appcontainer');
const myeachtrax_sections = document.querySelectorAll('.section-container');

const obser = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const color = entry.target.dataset.color;
        myeachtrax_app.style.backgroundColor = color; // Endrer fargen på teaser-card
      }
    });
  },
  {
    threshold: 0.5 // Hvor mye av section må være synlig før den trigger
  }
);

myeachtrax_sections.forEach(section => obser.observe(section)); */
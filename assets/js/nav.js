(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-menu-toggle');
  const links = document.getElementById('nav-links');

  if (!navbar || !toggle || !links) {
    return;
  }

  function setOpen(open) {
    links.classList.toggle('open', open);
    navbar.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', () => {
    setOpen(!links.classList.contains('open'));
  });

  // Close the menu when a link inside it is clicked
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.classList.contains('menu-open')) return;
    if (!navbar.contains(e.target)) {
      setOpen(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('menu-open')) {
      setOpen(false);
    }
  });

  // Close when the viewport grows past mobile breakpoint
  const mq = window.matchMedia('(min-width: 601px)');
  mq.addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
})();

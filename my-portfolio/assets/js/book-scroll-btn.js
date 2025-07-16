// Scrolls to the book wrapper and hides once reached

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('bookScrollBtn');
  const wrapper = document.getElementById('bookWrapper');
  const offcanvas = document.getElementById('offcanvasNavbar');
  const lightbox = document.getElementById('lightbox');
  if (!btn || !wrapper) return;

  let menuOpen = false;
  let modalOpen = false;

  const updateVisibility = () => {
    if (menuOpen || modalOpen || window.scrollY + 5 >= wrapper.offsetTop) {
      btn.classList.remove('show');
    } else {
      btn.classList.add('show');
    }
  };

  updateVisibility();
  window.addEventListener('scroll', updateVisibility);

  offcanvas?.addEventListener('show.bs.offcanvas', () => {
    menuOpen = true;
    btn.classList.remove('show');
  });

  offcanvas?.addEventListener('hidden.bs.offcanvas', () => {
    menuOpen = false;
    updateVisibility();
  });

  if (lightbox) {
    const observer = new MutationObserver(() => {
      modalOpen = !lightbox.classList.contains('hidden');
      updateVisibility();
    });
    observer.observe(lightbox, { attributes: true, attributeFilter: ['class'] });
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.scrollIntoView({ behavior: 'smooth' });
  });
});
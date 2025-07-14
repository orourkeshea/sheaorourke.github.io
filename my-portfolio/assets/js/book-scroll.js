document.addEventListener('DOMContentLoaded', () => {
  const floatingBtn = document.getElementById('floating-book');

  document.addEventListener('activate.bs.scrollspy', function (e) {
    const activeId = e.relatedTarget;

    if (activeId === '#gallery-section') {
      floatingBtn.classList.remove('d-none');
    } else {
      floatingBtn.classList.add('d-none');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const bookBtn = document.getElementById('floating-book');

  document.addEventListener('activate.bs.scrollspy', function (e) {
    const activeLink = e.target;

    if (activeLink.getAttribute('href') === '#gallery-section') {
      bookBtn.classList.remove('d-none');
    } else {
      bookBtn.classList.add('d-none');
    }
  });

  // Scroll-to-book on click
  document.getElementById('book-scroll-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('bookContent')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scrolls to the book wrapper and hides once reached

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('bookScrollBtn');
  const wrapper = document.getElementById('bookWrapper');
  if (!btn || !wrapper) return;

  const updateVisibility = () => {
    if (window.scrollY + 5 >= wrapper.offsetTop) {
      btn.classList.remove('show');
    } else {
      btn.classList.add('show');
    }
  };

  updateVisibility();
  window.addEventListener('scroll', updateVisibility);

  btn.addEventListener('click', () => {
    wrapper.scrollIntoView({ behavior: 'smooth' });
  });
});
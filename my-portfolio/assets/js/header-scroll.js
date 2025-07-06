document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".navbar-toggler");
  let prevScrollPos = window.pageYOffset;
  let ticking = false;

  if (!header) return;

  const scrollThreshold = 10;
  let lastDirection = null;

  const updateHeader = () => {
    const currentScrollPos = window.pageYOffset;

    // Don't hide header if the nav is open (e.g., offcanvas)
    const isMenuOpen = document.body.classList.contains('offcanvas-backdrop');

    if (!isMenuOpen) {
      if (Math.abs(currentScrollPos - prevScrollPos) > scrollThreshold) {
        if (currentScrollPos > prevScrollPos) {
          // Scrolling down
          header.style.top = "-100px";
          lastDirection = "down";
        } else {
          // Scrolling up
          header.style.top = "0";
          lastDirection = "up";
        }

        prevScrollPos = currentScrollPos;
      }
    }

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".navbar-toggler");
  let prevScrollPos = window.pageYOffset;
  let ticking = false;

  if (!header) return;

  const scrollThreshold = 10;

  const updateHeader = () => {
    const currentScrollPos = window.pageYOffset;
    const isMenuOpen = document.body.classList.contains("offcanvas-backdrop");

    // ✅ Immediately show header at top of page and exit
    if (currentScrollPos === 0) {
      header.style.top = "0";
      prevScrollPos = currentScrollPos;
      ticking = false;
      return;
    }

    if (!isMenuOpen) {
      if (currentScrollPos > prevScrollPos + scrollThreshold) {
        // Scrolling down
        header.style.top = "-100px";
      } else if (currentScrollPos < prevScrollPos - scrollThreshold) {
        // Scrolling up
        header.style.top = "0";
      }
    }

    prevScrollPos = currentScrollPos;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
});

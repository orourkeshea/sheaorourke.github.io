document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");

    const chevron = document.getElementById("floating-chevron");
    const chevronLink = chevron?.querySelector("a");

    const chevronUp = document.getElementById("floating-chevron-up");
    const chevronUpButton = document.getElementById("chevron-up-button");

    const sections = Array.from(document.querySelectorAll(".image-section"));

    let currentIndex = 0;
    let prevScrollPos = window.pageYOffset;
    let scrollTimeout;
let isAutoScrolling = false;
    // Track scroll direction & current section
    const updateChevronTarget = () => {
      const scrollY = window.scrollY;
      const buffer = window.innerHeight / 3;

      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;

        if (scrollY + buffer >= sectionTop && scrollY + buffer < sectionBottom) {
          currentIndex = i;
          break;
        }
      }

      const nextSection = sections[currentIndex + 1];
      const prevSection = sections[currentIndex - 1];

      // Show/hide bottom chevron
      if (nextSection) {
        chevron.classList.remove("d-none");
        chevronLink.setAttribute("href", `#${nextSection.id}`);
      } else {
        chevron.classList.add("d-none");
      }

      // Show/hide top chevron
      if (currentIndex > 0) {
        chevronUp.classList.remove("d-none");
      } else {
        chevronUp.classList.add("d-none");
      }
    };

    // Scroll behavior for header + chevron visibility
    window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;

  // Only hide/show header if the scroll is user-triggered
if (!isAutoScrolling && header) {
  if (currentScrollPos === 0) {
    header.style.top = "0";
  } else {
    header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
  }
}
  prevScrollPos = currentScrollPos;

  // Hide chevrons while scrolling
  chevron?.classList.add("invisible");
  chevronUp?.classList.add("invisible");

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    chevron?.classList.remove("invisible");
    chevronUp?.classList.remove("invisible");
  }, 150);

  updateChevronTarget();
    });

    // Bottom chevron click → scroll to next
    chevronLink?.addEventListener("click", (e) => {
      e.preventDefault();
      const nextSection = sections[currentIndex + 1];
      if (nextSection) {
        chevron.classList.add("invisible");

        nextSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        setTimeout(() => {
          chevron.classList.remove("invisible");
        }, 700);
      }
    });

    // Top chevron click → scroll to previous
chevronUpButton?.addEventListener("click", (e) => {
  e.preventDefault();
  const prevSection = sections[currentIndex - 1];
  if (prevSection) {
    chevronUp.classList.add("invisible");
    isAutoScrolling = true;

    prevSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // After the scroll finishes
    setTimeout(() => {
      isAutoScrolling = false;
      header.style.top = "-100px"; // 👈 Force header to hide after programmatic scroll
      chevronUp.classList.remove("invisible");
    }, 800);
  }
});
    // Prevent URL fragment updates
    window.addEventListener('hashchange', function () {
      history.replaceState(null, null, ' ');
    });

    // On initial load
    updateChevronTarget();
  });
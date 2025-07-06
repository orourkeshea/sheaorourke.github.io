document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll(".image-section"));
  const indicator = document.getElementById("scrollIndicator");

  // Create dots
  sections.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    // Optional: Click-to-scroll to that section
    dot.addEventListener("click", () => {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    indicator.appendChild(dot);
  });

  const dots = indicator.querySelectorAll(".dot");

  // Update dot based on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const buffer = window.innerHeight / 2;

    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionBottom = sectionTop + sections[i].offsetHeight;

      if (scrollY + buffer >= sectionTop && scrollY + buffer < sectionBottom) {
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[i]) dots[i].classList.add("active");
        break;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const chevron = document.getElementById("floating-chevron");
  const chevronLink = chevron?.querySelector("a");
  const chevronUp = document.getElementById("floating-chevron-up");
  const chevronUpButton = document.getElementById("chevron-up-button");
  const indicator = document.getElementById("scrollIndicator");
  const sections = Array.from(document.querySelectorAll(".image-section"));

  let currentIndex = 0;
  let prevScrollPos = window.pageYOffset;
  let scrollTimeout;
  let isAutoScrolling = false;

  // 🔄 Setup dots for indicator
  if (indicator) {
    sections.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      indicator.appendChild(dot);
    });
  }
  const dots = indicator?.querySelectorAll(".dot");

  // 📌 Update section index + chevrons
  const updateSectionState = () => {
    const scrollY = window.scrollY;
    const buffer = window.innerHeight / 3;

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop;
      const bottom = top + sections[i].offsetHeight;
      if (scrollY + buffer >= top && scrollY + buffer < bottom) {
        currentIndex = i;
        dots?.forEach(dot => dot.classList.remove("active"));
        dots?.[i]?.classList.add("active");
        break;
      }
    }

    const next = sections[currentIndex + 1];
    const prev = sections[currentIndex - 1];

    if (next) {
      chevron?.classList.remove("d-none");
      chevronLink?.setAttribute("href", `#${next.id}`);
    } else {
      chevron?.classList.add("d-none");
    }

    if (currentIndex > 0) {
      chevronUp?.classList.remove("d-none");
    } else {
      chevronUp?.classList.add("d-none");
    }
  };

  // 🔼 Header visibility logic
  const updateHeaderVisibility = () => {
    const scrollY = window.pageYOffset;

    if (!header || isAutoScrolling) return;

    if (scrollY === 0) {
      header.style.top = "0";
    } else if (Math.abs(scrollY - prevScrollPos) > 10) {
      header.style.top = scrollY < prevScrollPos ? "0" : "-100px";
    }

    prevScrollPos = scrollY;
  };

  window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const buffer = 100; // px from bottom to stop header from flickering

  // Only hide/show header if the scroll is user-triggered
  if (!isAutoScrolling && header) {
    const nearBottom = currentScrollPos + buffer >= maxScroll;

    if (!nearBottom) {
      header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
    }
  }

  prevScrollPos = currentScrollPos;

  // ...rest of your chevron/hide logic
});

  // 📜 On scroll
  window.addEventListener("scroll", () => {
    updateHeaderVisibility();

    // Fade chevrons
    chevron?.classList.add("invisible");
    chevronUp?.classList.add("invisible");

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      chevron?.classList.remove("invisible");
      chevronUp?.classList.remove("invisible");
    }, 150);

    updateSectionState();
  });

  // ⬇️ Chevron scroll to next
  chevronLink?.addEventListener("click", (e) => {
    e.preventDefault();
    const next = sections[currentIndex + 1];
    if (next) {
      chevron.classList.add("invisible");
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => chevron.classList.remove("invisible"), 700);
    }
  });

  // ⬆️ Chevron scroll to previous
  chevronUpButton?.addEventListener("click", (e) => {
    e.preventDefault();
    const prev = sections[currentIndex - 1];
    if (prev) {
      chevronUp.classList.add("invisible");
      isAutoScrolling = true;
      prev.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isAutoScrolling = false;
        header.style.top = "-100px"; // 👈 Force hide after programmatic scroll
        chevronUp.classList.remove("invisible");
      }, 800);
    }
  });

  // Prevent ugly hash update
  window.addEventListener('hashchange', function () {
    history.replaceState(null, null, ' ');
  });

  // 🔃 On page load
  updateSectionState();
});
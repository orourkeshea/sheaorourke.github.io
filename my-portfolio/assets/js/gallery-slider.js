document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".simple-slider").forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slider-img");
    const prevBtn = slider.querySelector(".prevBtn");
    const nextBtn = slider.querySelector(".nextBtn");
    const counter = slider.querySelector(".counter .current");
    const captionEl = slider.querySelector(".slider-caption");

    let currentIndex = 0;

    function scrollToIndex(index) {
      if (!slides[index]) return;
      const slideWidth = slides[0].clientWidth;
      track.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      currentIndex = index;
      updateUI();
    }

    function updateUI() {
      if (counter) counter.textContent = currentIndex + 1;
      if (captionEl && slides[currentIndex]) {
        captionEl.textContent = slides[currentIndex].dataset.caption || "";
      }
    }

    // Click navigation
    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIndex > 0) scrollToIndex(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIndex < slides.length - 1) scrollToIndex(currentIndex + 1);
    });

    // Scroll sync
    track.addEventListener("scroll", () => {
      const trackRect = track.getBoundingClientRect();
      let best = 0;
      let closest = Infinity;

      slides.forEach((img, i) => {
        const imgRect = img.getBoundingClientRect();
        const distance = Math.abs(imgRect.left - trackRect.left);
        if (distance < closest) {
          closest = distance;
          best = i;
        }
      });

      if (best !== currentIndex) {
        currentIndex = best;
        updateUI();
      }
    });

    // Init
    updateUI();
  });
});

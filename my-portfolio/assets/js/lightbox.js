document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxDots = document.getElementById("lightboxDots");
  const btnNext = document.getElementById("lightboxNext");
  const btnPrev = document.getElementById("lightboxPrev");

  let galleryImgs = [];
  let currentIndex = 0;

  // Setup all clickable images
  document.querySelectorAll(".lightbox-img").forEach((img, _, allImgs) => {
    img.addEventListener("click", (e) => {
    if (isInEdgeZone(e.clientX)) {
        return; // Scroll zone → do nothing
    }
      const group = img.dataset.group;
      galleryImgs = [...document.querySelectorAll(`.lightbox-img[data-group="${group}"]`)];
      currentIndex = galleryImgs.indexOf(img);
      openModal();
    });
  });

    function openModal() {
    updateModal();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    lightbox.setAttribute("tabindex", "-1");
    lightbox.focus(); // ✅ Capture key events immediately
    }

  function closeModal() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    lightboxCaption.textContent = "";
    lightboxDots.innerHTML = "";
  }

  function updateModal() {
    const img = galleryImgs[currentIndex];
    lightboxImg.src = img.dataset.full;
    lightboxCaption.textContent = img.dataset.caption || "";
    const captionText = img.dataset.caption;

    if (captionText && captionText.trim() !== "") {
    lightboxCaption.innerHTML = captionText;
    lightboxCaption.classList.remove("hidden");
    } else {
    lightboxCaption.innerHTML = "";
    lightboxCaption.classList.add("hidden");
    }

    updateDots();
    updateChevronVisibility();
  }

  function updateChevronVisibility() {
    const isMulti = galleryImgs.length > 1;
    btnPrev.style.display = isMulti && currentIndex > 0 ? "block" : "none";
    btnNext.style.display = isMulti && currentIndex < galleryImgs.length - 1 ? "block" : "none";
  }

  function updateDots() {
    lightboxDots.innerHTML = "";
    if (galleryImgs.length < 2) return;
    galleryImgs.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = i;
        updateModal();
      });
      lightboxDots.appendChild(dot);
    });
  }

  function showNext() {
    if (currentIndex < galleryImgs.length - 1) {
      currentIndex++;
      updateModal();
    }
  }

  function showPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateModal();
    }
  }

  // Close if clicking backdrop
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeModal();
  });

  // Navigation
  btnNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
  btnPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

    document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;

    const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Escape"];
    if (keys.includes(e.key)) {
        e.preventDefault(); // ✅ Stop browser scroll
    }

    if (e.key === "ArrowRight") showNext();
    else if (e.key === "ArrowLeft") showPrev();
    else if (e.key === "Escape") closeModal();
    });

  // Mobile swipe
  let touchStartX = null;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    if (!touchStartX) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) showPrev();
    else if (dx < -50) showNext();
    touchStartX = null;
  });
  function updateDots() {
  lightboxDots.innerHTML = "";
  if (galleryImgs.length < 2) return;
  galleryImgs.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === currentIndex ? " active" : "");
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = i;
      updateModal();
    });
    lightboxDots.appendChild(dot);
  });
}

  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.style.cursor = "zoom-in";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const track = document.getElementById("lightboxTrack");
  const captionEl = document.getElementById("lightbox-caption");
  const dotsEl = document.getElementById("lightboxDots");
  const btnNext = document.getElementById("lightboxNext");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnClose = document.getElementById("lightboxClose");

  let galleryImgs = [];
  let currentIndex = 0;
  let lastWheelTime = 0;

  function preloadSurrounding(idx) {
    [idx - 1, idx, idx + 1].forEach((i) => {
      const thumb = galleryImgs[i];
      if (thumb) {
        const src = thumb.dataset.full;
        if (src) {
          const img = new Image();
          img.src = src;
        }
      }
    });
  }

  // Preload every image in the current gallery
  function preloadAll() {
    galleryImgs.forEach((thumb) => {
      const src = thumb.dataset.full;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }

  // Helper to build slides from current gallery
  function populateSlides() {
    track.innerHTML = "";
    galleryImgs.forEach((img) => {
      const slide = document.createElement("img");
      slide.className = "lightbox-slide";
      slide.src = img.dataset.full;
      slide.alt = img.alt || "";
      slide.draggable = false;
      track.appendChild(slide);
    });
  }

  function scrollToIndex(index, smooth = true) {
    currentIndex = index;
    track.style.scrollBehavior = smooth ? "smooth" : "auto";
    const width = track.clientWidth;
    track.scrollTo({ left: width * index });
    updateUI();
    preloadSurrounding(currentIndex);
  }

  function updateUI() {
    const img = galleryImgs[currentIndex];
    captionEl.textContent = img?.dataset.caption || "";
    updateDots();
    updateChevronVisibility();
  }

  function updateChevronVisibility() {
    const isMulti = galleryImgs.length > 1;
    btnPrev.style.display = isMulti && currentIndex > 0 ? "block" : "none";
    btnNext.style.display = isMulti && currentIndex < galleryImgs.length - 1 ? "block" : "none";
  }

  function updateDots() {
    dotsEl.innerHTML = "";
    if (galleryImgs.length < 2) return;
    galleryImgs.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === currentIndex ? " active" : "");
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        scrollToIndex(i);
      });
      dotsEl.appendChild(dot);
    });
  }

  function openModal() {
    preloadAll();
    populateSlides();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    lightbox.setAttribute("tabindex", "-1");
    lightbox.focus();
    scrollToIndex(currentIndex, false);
  }

  function closeModal() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    track.innerHTML = "";
    captionEl.textContent = "";
    dotsEl.innerHTML = "";
  }

  // Setup thumbnails
  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", (e) => {
      if (isInEdgeZone(e.clientX)) return;
      const group = img.dataset.group;
      galleryImgs = [...document.querySelectorAll(`.lightbox-img[data-group="${group}"]`)];
      currentIndex = galleryImgs.indexOf(img);
      openModal();
    });
    img.style.cursor = "zoom-in";
  });

  // Navigation handlers
  function showNext(smooth = true) {
    if (currentIndex < galleryImgs.length - 1) {
      scrollToIndex(currentIndex + 1, smooth);
    }
  }

  function showPrev(smooth = true) {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1, smooth);
    }
  }

  btnNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext(false);
  });
  btnPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev(false);
  });
  btnClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Escape"];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "ArrowRight") showNext(false);
    else if (e.key === "ArrowLeft") showPrev(false);
    else if (e.key === "Escape") closeModal();
  });

  // Sync index when user scrolls manually
  track.addEventListener("scroll", () => {
    const width = track.clientWidth;
    const idx = Math.round(track.scrollLeft / width);
    if (idx !== currentIndex) {
      currentIndex = idx;
      updateUI();
      preloadSurrounding(currentIndex);
    }
  });

  // Wheel navigation (horizontal)
  lightbox.addEventListener(
    "wheel",
    (e) => {
      if (lightbox.classList.contains("hidden")) return;
      e.preventDefault();
      const now = Date.now();
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const threshold = 40;
      const timeThreshold = 500;
      if (Math.abs(delta) > threshold && now - lastWheelTime > timeThreshold) {
        delta > 0 ? showNext() : showPrev();
        lastWheelTime = now;
      }
    },
    { passive: false }
  );

  // Touch swipe
  let touchStartX = null;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  lightbox.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) showPrev();
    else if (dx < -50) showNext();
    touchStartX = null;
  });
});

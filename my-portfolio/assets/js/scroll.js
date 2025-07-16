const scrollContainer = document.getElementById("photoScroll");
const images = scrollContainer.querySelectorAll(".gallery-img");
const indicator = document.getElementById("scrollIndicator");

// Helper function
const isModalOpen = () => !document.getElementById("lightbox")?.classList.contains("hidden");

document.addEventListener("mousemove", (e) => {
  if (isModalOpen()) return;

  const container = scrollContainer;
  const bounds = container.getBoundingClientRect();

  const edgeZone = bounds.width * 0.2;
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const inContainer =
    mouseX >= bounds.left &&
    mouseX <= bounds.right &&
    mouseY >= bounds.top &&
    mouseY <= bounds.bottom;

  const inLeftEdge = inContainer && mouseX <= bounds.left + edgeZone;
  const inRightEdge = inContainer && mouseX >= bounds.right - edgeZone;

  document.body.classList.remove("cursor-left", "cursor-right");

   if (inLeftEdge) {
    document.body.classList.add("cursor-left");
  } else if (inRightEdge) {
    document.body.classList.add("cursor-right");
  }
  else {

  document.querySelectorAll(".gallery-img").forEach((img) => {
    if (img.matches(":hover")) {
      hoveringImage = true;
      img.style.cursor = (inLeftEdge || inRightEdge) ? "default" : "zoom-in";
    } else {
      img.style.cursor = ""; // reset
    }
  });
  }
});

// Optional: click-to-scroll behavior
document.addEventListener("click", (e) => {
  if (isModalOpen()) return;

  // Disable this behavior on small screens
  if ('ontouchstart' in window) return;

  const offcanvas = document.getElementById('offcanvasNavbar');
  if (
    e.target.closest('#bookScrollBtn') ||
    e.target.closest('a') ||
    e.target.closest('button') ||
    offcanvas?.classList.contains('show')
  ) {
    return;
  }

  const rect = scrollContainer.getBoundingClientRect();
  const edgeZone = rect.width * 0.2;
  const sampleImg = scrollContainer.querySelector("img");
  const scrollAmount = (sampleImg?.clientWidth || 300) / 2;

  const inLeftEdge =
    e.clientX >= rect.left &&
    e.clientX <= rect.left + edgeZone &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;
  const inRightEdge =
    e.clientX <= rect.right &&
    e.clientX >= rect.right - edgeZone &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (inLeftEdge) {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (inRightEdge) {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
});




// Scroll indicator logic
if (indicator) {
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      images[index].scrollIntoView({ behavior: "smooth", inline: "center" });
    });

    indicator.appendChild(dot);
  });

  const dots = indicator.querySelectorAll(".dot");

  scrollContainer.addEventListener("scroll", () => {
    if (isModalOpen()) return;

    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const index = Math.round((scrollLeft / scrollWidth) * (images.length - 1));

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  });
}
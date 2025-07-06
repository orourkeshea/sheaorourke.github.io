const scrollContainer = document.getElementById("photoScroll");

// Cursor effect: track mouse near edges
document.addEventListener("mousemove", (e) => {
  const edgeZone = window.innerWidth * 0.2;
  document.body.classList.remove("cursor-left", "cursor-right");

  if (e.clientX < edgeZone) {
    document.body.classList.add("cursor-left");
  } else if (e.clientX > window.innerWidth - edgeZone) {
    document.body.classList.add("cursor-right");
  }
});

// Optional: click-to-scroll behavior
document.addEventListener("click", (e) => {
  const edgeZone = window.innerWidth * 0.2;
  const sampleImg = scrollContainer.querySelector("img");
  const scrollAmount = (sampleImg?.clientWidth || 300) / 2;

  if (e.clientX < edgeZone) {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else if (e.clientX > window.innerWidth - edgeZone) {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
});

// Bottom scroll indicator
const images = scrollContainer.querySelectorAll(".gallery-img");
const indicator = document.getElementById("scrollIndicator");

// Create dots
images.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  indicator.appendChild(dot);
});

const dots = indicator.querySelectorAll(".dot");

scrollContainer.addEventListener("scroll", () => {
  const scrollLeft = scrollContainer.scrollLeft;
  const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  const index = Math.round((scrollLeft / scrollWidth) * (images.length - 1));

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
});
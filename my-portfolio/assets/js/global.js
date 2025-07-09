function isInEdgeZone(x) {
  const edgeZone = window.innerWidth * 0.2;
  return x < edgeZone || x > window.innerWidth - edgeZone;
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spinner-img").forEach((img) => {
    let spinner = img.parentElement.querySelector(".img-spinner");
    let timeoutId;

    const remove = () => {
      clearTimeout(timeoutId);
      spinner?.remove();
    };

    // Optionally delay showing spinner to avoid flickering
    timeoutId = setTimeout(() => {
      spinner?.classList.add("visible");
    }, 100);

    // Remove spinner as soon as image *starts* painting
    requestAnimationFrame(() => {
      if (img.complete && img.naturalWidth !== 0) {
        remove();
      } else {
        img.addEventListener("load", remove);
        img.addEventListener("error", remove);
      }
    });
  });
});


  const scrollContainer = document.getElementById("photoScroll");

  scrollContainer.addEventListener("click", (e) => {
    const rect = scrollContainer.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const direction = e.clientX < midpoint ? -1 : 1;

    const sampleImg = scrollContainer.querySelector("img");
    const scrollAmount = (sampleImg?.clientWidth || 300) / 2;

    scrollContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  });
---
layout: default
title: Home
body_class: landing
---

<div class="landing-icons">
  <a href="{{ "/vermont" | relative_url }}" target="_blank" aria-label="Photos">
    <img
      src="{{ '/assets/images/camera.svg' | relative_url }}"
      data-fuzzy="{{ '/assets/images/fuzzy-camera.svg' | relative_url }}"
      alt="Photos"
      class="menu-icon"
    />
  </a>
  <a href="{{ "/vermont" | relative_url }}" target="_blank" aria-label="Book">
    <img
      src="{{ '/assets/images/book.svg' | relative_url }}"
      data-fuzzy="{{ '/assets/images/fuzzy-book.svg' | relative_url }}"
      alt="Book"
      class="menu-icon"
    />
  </a>
  <a href="{{ "/vermont" | relative_url }}" target="_blank" aria-label="About">
    <img
      src="{{ '/assets/images/note.svg' | relative_url }}"
      data-fuzzy="{{ '/assets/images/fuzzy-note.svg' | relative_url }}"
      alt="About"
      class="menu-icon"
    />
  </a>
</div>

<script>
  document.querySelectorAll('.menu-icon').forEach(img => {
    const originalSrc = img.src;
    const fuzzySrc = img.getAttribute('data-fuzzy');

    img.addEventListener('mouseenter', () => {
      img.src = fuzzySrc;
    });

    img.addEventListener('mouseleave', () => {
      img.src = originalSrc;
    });
  });
</script>

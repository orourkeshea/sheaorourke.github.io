---
layout: default
title: Home
body_class: landing
---

<div class="container min-vh-100 d-flex align-items-center justify-content-center">
  <div class="row w-100 justify-content-center text-center g-5">
    <div class="col-12 col-sm-4">
      <a href="{{ "/vermont" | relative_url }}" aria-label="Photos">
        <img src="{{ '/assets/images/camera.svg' | relative_url }}" 
             data-fuzzy="{{ '/assets/images/flash-fuzzy-camera.svg' | relative_url }}" 
             alt="Photos" 
             class="img-fluid landing-icon" />
      </a>
    </div>
    <div class="col-12 col-sm-4">
      <a href="{{ "/guatemala" | relative_url }}" aria-label="Book">
        <img src="{{ '/assets/images/book.svg' | relative_url }}" 
             data-fuzzy="{{ '/assets/images/fuzzy-book.svg' | relative_url }}" 
             alt="Book" 
             class="img-fluid landing-icon" />
      </a>
    </div>
    <div class="col-12 col-sm-4">
      <a href="{{ "/vermont" | relative_url }}" aria-label="About">
        <img src="{{ '/assets/images/note.svg' | relative_url }}" 
             data-fuzzy="{{ '/assets/images/fuzzy-note.svg' | relative_url }}" 
             alt="About" 
             class="img-fluid landing-icon" />
      </a>
    </div>
  </div>
</div>



<script>
  document.querySelectorAll('.landing-icon').forEach(img => {
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

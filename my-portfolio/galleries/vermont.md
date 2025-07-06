---
layout: book-page
title: Vermont Book
permalink: /vermont/
folder: vermont
images:
  - .jpg
  - book2.jpg
  - book3.jpg
  - book3.jpg
  - book3.jpg
  - book3.jpg
  - book3.jpg
  - book3.jpg
  - book3.jpg
---

<div class="book-two-column container my-5">
  <div class="row">
    <div class="col-md-5 book-left">
      <h1>Red Clover</h1>
      <p><strong>Bound:</strong> January 2025</p>
      <p>25 pages. 26 photographs. Size: 12x12 inches; Weight: 5.7 pounds (28x28.4cm; 2.6kg). Hardbound.</p>
      <p>Trip to Vermont!</p>
    </div>

    <div class="col-md-7 book-right">
      {% for image in page.images %}
        <img src="https://media.sheaorourke.com/vermont/horse_large.webp" class="img-fluid mb-3" alt="Book image">
      {% endfor %}
    </div>
  </div>
</div>
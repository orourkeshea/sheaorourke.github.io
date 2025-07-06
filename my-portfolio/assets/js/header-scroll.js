document.addEventListener("DOMContentLoaded", function () {
let prevScrollPos = window.pageYOffset;
const header = document.querySelector(".site-header");

if (!header) return;

header.style.top = "0";

window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
    header.style.top = "0";
    } else {
    header.style.top = "-100px";
    }

    prevScrollPos = currentScrollPos;
});
});
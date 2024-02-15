const bars = document.querySelector(".bars");
const overlay = document.querySelector(".overlay");

bars.addEventListener("click", () => {
    if (window.getComputedStyle(overlay, null).display === "none") {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
});
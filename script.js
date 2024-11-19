// =========================== Toggle light and dark ===========================
const themeToggle = document.querySelector("#theme-toggle");

const toggleTheme = () => {
    document.body.classList.toggle("theme-mode"); // add a class called 'theme-mode'
}                                                 // to the body tag

themeToggle.addEventListener("click", toggleTheme);
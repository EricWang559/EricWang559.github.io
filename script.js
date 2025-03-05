document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.createElement("button");
    toggle.textContent = "Toggle Dark Mode";
    toggle.style.position = "fixed";
    toggle.style.top = "10px";
    toggle.style.right = "10px";
    toggle.style.padding = "10px";
    toggle.style.background = "#ff9800";
    toggle.style.color = "#fff";
    toggle.style.border = "none";
    toggle.style.cursor = "pointer";

    document.body.appendChild(toggle);

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
});

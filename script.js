document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.createElement("button");
    toggle.textContent = "Change Theme";
    toggle.style.position = "fixed";
    toggle.style.top = "10px";
    toggle.style.right = "10px";
    toggle.style.padding = "10px";
    toggle.style.background = "#d4d8ee"; // Changed to light gray
    toggle.style.color = "#ffffff"; // Changed to black text
    toggle.style.border = "none";
    toggle.style.borderRadius = "5px";
    toggle.style.cursor = "pointer";
    toggle.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";

    document.body.appendChild(toggle);

    toggle.addEventListener("click", () => {
        const themeStyle = document.getElementById("theme-style");
        if (themeStyle.getAttribute("href") === "style.css") {
            themeStyle.setAttribute("href", "tnstyle.css"); // Switch to dark theme
        } else {
            themeStyle.setAttribute("href", "style.css"); // Switch to light theme
        }
    });
});

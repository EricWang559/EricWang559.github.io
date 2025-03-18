document.addEventListener("DOMContentLoaded", () => {
    // create btn
    const toggle = document.createElement("button")
    toggle.textContent = "change theme"
    toggle.style.position = "fixed"
    toggle.style.top = "10px"
    toggle.style.right = "10px"
    toggle.style.padding = "10px"
    toggle.style.background = "#002945" // btn col
    toggle.style.color = "#ffffff"
    toggle.style.border = "none"
    toggle.style.borderRadius = "5px"
    toggle.style.cursor = "pointer"
    toggle.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)"
    // use monospaced font
    toggle.style.fontFamily = "'courier new', courier, monospace"
    document.body.appendChild(toggle)
  
    // create theme name disp
    const themeNameDisplay = document.createElement("p")
    themeNameDisplay.style.position = "fixed"
    themeNameDisplay.style.top = "50px"
    themeNameDisplay.style.right = "10px"
    themeNameDisplay.style.margin = "0"
    themeNameDisplay.style.padding = "0"
    themeNameDisplay.style.color = "#002945"
    themeNameDisplay.style.fontFamily = "'courier new', courier, monospace"
    document.body.appendChild(themeNameDisplay)
  
    // define themes and names
    const themes = ["styles/style.css", "styles/tnstyle.css", "styles/tnstyle2.css"]
    const themeNames = ["light theme", "tn theme", "tn style 2"]
  
    // get curr theme index or def to 0
    let currentThemeIndex = localStorage.getItem("themeIndex")
      ? parseInt(localStorage.getItem("themeIndex"), 10)
      : 0
  
    // set theme on load
    document.getElementById("theme-style").setAttribute("href", themes[currentThemeIndex])
    themeNameDisplay.textContent = themeNames[currentThemeIndex]
  
    toggle.addEventListener("click", () => {
      // cycle theme
      currentThemeIndex = (currentThemeIndex + 1) % themes.length
      document.getElementById("theme-style").setAttribute("href", themes[currentThemeIndex])
      localStorage.setItem("themeIndex", currentThemeIndex)
      // update disp
      themeNameDisplay.textContent = themeNames[currentThemeIndex]
    })
  })
  
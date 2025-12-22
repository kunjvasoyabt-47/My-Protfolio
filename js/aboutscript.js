// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser")

  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn")
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
  })

  // About page specific functionality only
  console.log("About page loaded")
})

// Show loader function
function showLoader() {
  document.getElementById("loader").style.display = "block"
}

// Hide loader function
function hideLoader() {
  document.getElementById("loader").style.display = "none"
}


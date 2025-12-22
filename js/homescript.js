// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser")

  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Skills grid intersection observer
  const skillsGrid = document.querySelector(".skills-grid")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsGrid.classList.add("show")
          observer.unobserve(skillsGrid)
        }
      })
    },
    { threshold: 0.3 },
  )

  if (skillsGrid) observer.observe(skillsGrid)

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  
  }

  // CTA button actions
  const ctaPrimary = document.querySelector(".cta-primary")
  const ctaSecondary = document.querySelector(".cta-secondary")

  if (ctaPrimary) {
    ctaPrimary.addEventListener("click", () => {
      window.location.href = "contact.html"
    })
  }

  
})


function openAndDownloadResume() {
  const resumePath = "../assets/sample_dummy_resume.pdf";

  // 1️⃣ Open in new tab
  window.open(resumePath, "_blank");

  // 2️⃣ Trigger download
  const link = document.createElement("a");
  link.href = resumePath;
  link.download = "sample_dummy_resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


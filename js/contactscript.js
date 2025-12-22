document.addEventListener("DOMContentLoaded", () => {
  /* ---------- AUTH CHECK ---------- */
  const currentUser = localStorage.getItem("currentUser")
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  /* ---------- ELEMENTS ---------- */
  const form = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")

  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const messageError = document.getElementById("messageError")

  // Declare variables for validation functions and loader
  const isValidUsername = (name) => /^[a-zA-Z\s]{2,30}$/.test(name)
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 

  /* ---------- LOGOUT ---------- */
  const logoutBtn = document.getElementById("logoutBtn")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }

  const mailClick = document.getElementById("mail-click")
  const phoneClick = document.getElementById("phone-click")
  const locationClick = document.getElementById("location-click")

  if (mailClick) {
    mailClick.addEventListener("click", () => {
      const email = "kunjvasoya03@gmail.com";
      const subject = "Contact from Website";
      const body = "Hello Kunj,";

      window.location.href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if (phoneClick) {
    phoneClick.addEventListener("click", () => {
      window.open("tel:+916353710257", "_self");
    })
  }

  if (locationClick) {
    locationClick.addEventListener("click", () => {
      window.open("https://www.google.com/maps/place/Ahmedabad,+Gujarat,+India", "_blank")
    })
  }

  const sheetURL =
    "https://script.google.com/macros/s/AKfycbzQGob7UisqmpIR982wYaA_LwdFy3Kb88lOQg0xeeAauJxNMsKj1cAfinh9Ko1foSkP4g/exec"

  /* ---------- NAME VALIDATION ---------- */
  nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim()

    if (!isValidUsername(name) || name.length < 2 || name.length > 30) {
      nameError.innerText = "*Name must be 2–30 characters and contain only letters and spaces"
      nameError.style.display = "block"
      nameInput.style.border = "1px solid red"
    } else {
      nameError.innerText = ""
      nameError.style.display = "none"
      nameInput.style.border = "1.2px solid green"
    }
  })

  /* ---------- EMAIL VALIDATION ---------- */
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim()

    if (!isValidEmail(email)) {
      emailError.innerText = "*Enter a valid business email"
      emailError.style.display = "block"
      emailInput.style.border = "1px solid red"
    } else {
      emailError.innerText = ""
      emailError.style.display = "none"
      emailInput.style.border = "1.2px solid green"
    }
  })

  /* ---------- MESSAGE VALIDATION ---------- */
  messageInput.addEventListener("input", () => {
    const message = messageInput.value.trim()

    if (message.length < 10 || message.length > 200) {
      messageError.innerText = "*Message must be 10–200 characters"
      messageError.style.display = "block"
      messageInput.style.border = "1px solid red"
    } else {
      messageError.innerText = ""
      messageError.style.display = "none"
      messageInput.style.border = "1.2px solid green"
    }
  })

  /* ---------- FORM SUBMIT ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const isValid = nameError.innerText === "" && emailError.innerText === "" && messageError.innerText === ""

    if (!isValid) {
      alert("Please fix all errors before submitting")
      return
    }

    const contactData = {
      type: "contact",
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    }

    showLoader()
    submitBtn.disabled = true

    fetch(sheetURL, {
      method: "POST",
      body: JSON.stringify(contactData),
    })
      .then((res) => res.text())
      .then((result) => {
        setTimeout(() => {
          hideLoader()

          if (result === "success") {
            alert("Message sent successfully ✅")
            submitBtn.disabled = false
            form.reset()

            nameInput.style.border = ""
            emailInput.style.border = ""
            messageInput.style.border = ""
          } else {
            alert("Something went wrong ❌")
          }
        }, 2000)
      })
      .catch(() => {
        hideLoader()
        alert("Network error ❌")
      })
  })
})

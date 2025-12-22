document.addEventListener("DOMContentLoaded", function () {

    /* ---------- AUTH CHECK ---------- */
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }
    

    /* ---------- ELEMENTS ---------- */
    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");


    /* ---------- LOGOUT ---------- */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}


    const sheetURL =
        "https://script.google.com/macros/s/AKfycbzQGob7UisqmpIR982wYaA_LwdFy3Kb88lOQg0xeeAauJxNMsKj1cAfinh9Ko1foSkP4g/exec";

    /* ---------- NAME VALIDATION ---------- */
    nameInput.addEventListener("input", function () {
        const name = nameInput.value.trim();

        if (!isValidUsername(name) || name.length < 2 || name.length > 30) {
            nameError.innerText =
                "*Name must be 2–30 characters and contain only letters and spaces";
            nameError.style.display = "block";
            nameInput.style.border = "1px solid red";
        } else {
            nameError.innerText = "";
            nameError.style.display = "none";
            nameInput.style.border = "1.2px solid green";
        }
    });


    /* ---------- EMAIL VALIDATION ---------- */
    emailInput.addEventListener("input", function () {
        const email = emailInput.value.trim();

        if (!isValidEmail(email)) {
            emailError.innerText = "*Enter a valid business email";
            emailError.style.display = "block";
            emailInput.style.border = "1px solid red";
        } else {
            emailError.innerText = "";
            emailError.style.display = "none";
            emailInput.style.border = "1.2px solid green";
        }
    });

    /* ---------- MESSAGE VALIDATION ---------- */
    messageInput.addEventListener("input", function () {
        const message = messageInput.value.trim();

        if (message.length < 10 || message.length > 200) {
            messageError.innerText = "*Message must be 10–200 characters";
            messageError.style.display = "block";
            messageInput.style.border = "1px solid red";
        } else {
            messageError.innerText = "";
            messageError.style.display = "none";
            messageInput.style.border = "1.2px solid green";
        }
    });

    /* ---------- FORM SUBMIT ---------- */
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const isValid =
            nameError.innerText === "" &&
            emailError.innerText === "" &&
            messageError.innerText === "";

        if (!isValid) {
            alert("Please fix all errors before submitting");
            return;
        }

        const contactData = {
            type: "contact",
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };

        showLoader();


        fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(contactData)
        })
        .then(res => res.text())
        .then(result => {
            setTimeout(() => {
                hideLoader();

                if (result === "success") {
                    alert("Message sent successfully ✅");
                    form.reset();

                    nameInput.style.border = "";
                    emailInput.style.border = "";
                    messageInput.style.border = "";
                } else {
                    alert("Something went wrong ❌");
                }
            }, 800);
        })
        .catch(() => {
            hideLoader();
            alert("Network error ❌");
        });
    });

});



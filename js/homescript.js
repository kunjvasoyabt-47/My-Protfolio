if (!localStorage.getItem("currentUser")) {
    window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", function () {
    


    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const form = document.getElementById("contact-form");
    const logoutBtn = document.getElementById("logoutBtn");

    const sheetURL = "https://script.google.com/macros/s/AKfycbzQGob7UisqmpIR982wYaA_LwdFy3Kb88lOQg0xeeAauJxNMsKj1cAfinh9Ko1foSkP4g/exec";

    nameInput.addEventListener("input", function () {

        const regex = /^[A-Za-z]*$/;
        if (!regex.test(nameInput.value)) {
            nameError.innerText = "*Enter only alphabets (no spaces)";
            nameInput.style.border = "1px solid red";
        } else {
            nameError.innerText = "";
            nameInput.style.border = "1.2px solid green";
        }
    });

    emailInput.addEventListener("input", function () {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)(?!yahoo\.com$)(?!outlook\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailInput.value)) {
            emailError.innerText = "*Enter a valid business email (no Gmail/Yahoo/Outlook)";
            emailInput.style.border = "1px solid red";
        } else {
            emailError.innerText = "";
            emailInput.style.border = "1.2px solid green";
        }
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        alert("Logged out successfully");
        window.location.replace("login.html");
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        if (nameInput.value.trim() === "") {
            nameError.innerText = "Name is required";
            valid = false;
        } else {
            nameError.innerText = "";
        }

        if (emailInput.value.trim() === "") {
            emailError.innerText = "Email is required";
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.innerText = "Message cannot be empty";
            valid = false;
        } else {
            messageError.innerText = "";
        }

        if (!valid) return;

        const contactData = {
            type: "contact",
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };

        fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(contactData)
        })
        .then(res => res.text())
        .then(result => {
            if (result === "success") {
                alert("Message sent successfully");
                form.reset();
            } else {
                alert(" Something went wrong");
            }
        });
    });
});

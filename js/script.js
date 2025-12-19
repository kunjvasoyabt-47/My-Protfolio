document.addEventListener("DOMContentLoaded", function () {


    const usernameInput = document.getElementById("username");
    const usernameError = document.getElementById("username-error");

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    const confirmPasswordInput = document.getElementById("confirm_password");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dob-error");

    const termsCheckbox = document.getElementById("terms");
    const termsError = document.getElementById("terms-error");

    const form = document.querySelector("form");


    const sheetURL = "https://script.google.com/macros/s/AKfycbzQGob7UisqmpIR982wYaA_LwdFy3Kb88lOQg0xeeAauJxNMsKj1cAfinh9Ko1foSkP4g/exec";


    usernameInput.addEventListener("input", function () {

        if (!isValidUsername(usernameInput.value)) {
            usernameError.innerText = "*Enter only alphabets (no spaces)";
            usernameInput.style.border = "1px solid red";
        } else {
            usernameError.innerText = "";
            usernameInput.style.border = "1.2px solid green";
        }
    });

    emailInput.addEventListener("input", function () {
       
        if (!isValidEmail(emailInput.value)) {
            emailError.innerText = "*Enter a valid business email (no Gmail/Yahoo/Outlook)";
            emailInput.style.border = "1px solid red";
        } else {
            emailError.innerText = "";
            emailInput.style.border = "1.2px solid green";
        }
    });

      passwordInput.addEventListener("input", function () {
    const rules = checkPasswordRules(passwordInput.value);
    let messages = [];

    if (!rules.hasLowercase) messages.push("• Add lowercase letter");
    if (!rules.hasUppercase) messages.push("• Add uppercase letter");
    if (!rules.hasNumber) messages.push("• Add number");
    if (!rules.hasSpecial) messages.push("• Add special character");
    if (!rules.hasMinLength) messages.push("• Minimum 8 characters");

    if (messages.length > 0) {
        passwordError.innerHTML = messages.join("<br>");
        passwordInput.style.border = "1px solid red";
    } else {
        passwordError.innerHTML = "";
        passwordInput.style.border = "1.2px solid green";
    }
    });

    confirmPasswordInput.addEventListener("input", function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.innerText = "*Confirm Passwords do not match with Password";
            confirmPasswordInput.style.border = "1px solid red";
        } else {
            confirmPasswordError.innerText = "";
            confirmPasswordInput.style.border = "1.2px solid green";
        }
    });

    dobInput.addEventListener("input", function () {
        const dob = new Date(dobInput.value);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18) {
            dobError.innerText = "*You must be at least 18 years old";
            dobInput.style.border = "1px solid red";
        } else {
            dobError.innerText = "";
            dobInput.style.border = "1.2px solid green";
        }
    });

    termsCheckbox.addEventListener("change", function () {
        termsError.innerText = termsCheckbox.checked
            ? ""
            : "*You must agree to the terms";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const isValid =
            usernameError.innerText === "" &&
            emailError.innerText === "" &&
            passwordError.innerText === "" &&
            confirmPasswordError.innerText === "" &&
            dobError.innerText === "" &&
            termsCheckbox.checked;

        if (!isValid) {
            alert(" Please fix all errors before submitting");
            return;
        }

            
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some(
            user => user.email === emailInput.value
        );

        if (emailExists) {
            emailError.innerText = "Email already registered (local)";
            emailInput.style.border = "1px solid red";
            return;
        }

        users.push({
            email: emailInput.value,
            password: passwordInput.value
        });

        localStorage.setItem("users", JSON.stringify(users));

        const sheetData = {
            username: usernameInput.value,
            email: emailInput.value,
            dob: dobInput.value,
            termsAccepted: termsCheckbox.checked
        };

        showLoader();

        fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(sheetData)
        })
        .then(res => res.text())
        .then(result => {
            hideLoader();

            if (result === "success") {
                alert("🎉 Registration Successful");
                window.location.href = "login.html";
            } else if (result === "duplicate") {
                emailError.innerText = "Email already registered";
            }
        })
        .catch(() => {
            hideLoader();
            alert("Network error");
        });

      });

});

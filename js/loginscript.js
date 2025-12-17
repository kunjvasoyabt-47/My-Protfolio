document.addEventListener("DOMContentLoaded", function () {

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    const form = document.querySelector("form");

    emailInput.addEventListener("input", function () {
        if (emailInput.value.trim() === "") {
            emailError.innerText = "*Email is required";
            emailInput.style.border = "1px solid red";
        } else {
            emailError.innerText = "";
            emailInput.style.border = "1.2px solid green";
        }
    });

    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.trim() === "") {
            passwordError.innerText = "*Password is required";
            passwordInput.style.border = "1px solid red";
        } else {
            passwordError.innerText = "";
            passwordInput.style.border = "1.2px solid green";
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(
            user =>
                user.email === emailInput.value &&
                user.password === passwordInput.value
        );

        if (userFound) {
        localStorage.setItem("currentUser", emailInput.value);
        alert("Login successful!");
        window.location.replace("home.html");
            } else {
            alert("Invalid email or password");
        }

    });

});

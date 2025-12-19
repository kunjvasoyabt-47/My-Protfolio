
document.addEventListener("DOMContentLoaded", function () {
    
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    const form = document.querySelector("form");

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


    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(
            user =>
                user.email === emailInput.value &&
                user.password === passwordInput.value
        );
       

        if (!userFound) {
            loginError.innerText = "Invalid email or password";
            return;
        }
         showLoader();
   
        requestAnimationFrame(() => {
            setTimeout(() => {
                localStorage.setItem("currentUser", emailInput.value);
                window.location.href = "home.html";
            }, 800);
        });

    });

});

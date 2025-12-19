let globalLoader = null;

document.addEventListener("DOMContentLoaded", () => {
    globalLoader = document.querySelector(".global-loader");
});

function showLoader() {
    if (!globalLoader) return;
    globalLoader.style.display = "flex";
}

function hideLoader() {
    if (!globalLoader) return;
    globalLoader.style.display = "none";
}



/* ---------- REGEX ---------- */
const REGEX = {
    username: /^[A-Za-z]*$/,
    email: /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)(?!yahoo\.com$)(?!outlook\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

/* ---------- VALIDATORS ---------- */
function isValidUsername(username) {
    return REGEX.username.test(username);
}

function isValidEmail(email) {
    return REGEX.email.test(email);
}

function isValidPassword(password) {
    return REGEX.password.test(password);
}


function checkPasswordRules(password) {
    return {
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecial: /[@$!%*?&]/.test(password),
        hasMinLength: password.length >= 8
    };
}

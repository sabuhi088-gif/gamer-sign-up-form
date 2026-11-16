
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const termsInput = document.getElementById("terms");

const submitBtn = document.getElementById("submitBtn");

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function checkName() {
    const name = nameInput.value.trim();

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) {
        showError("nameError", "Enter 3-20 valid characters.");
        return false;
    }

    showError("nameError", "");
    return true;
}

function checkEmail() {
    const email = emailInput.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("emailError", "Enter a valid email address.");
        return false;
    }

    showError("emailError", "");
    return true;
}

function checkPassword() {
    const password = passwordInput.value;

    if (password.length < 8) {
        showError("passwordError", "Password must be at least 8 characters.");
        return false;
    }

    showError("passwordError", "");
    return true;
}

function checkConfirm() {
    if (confirmInput.value !== passwordInput.value ||
        confirmInput.value === "") {
        showError("confirmError", "Passwords do not match.");
        return false;
    }

    showError("confirmError", "");
    return true;
}

function checkTerms() {
    if (!termsInput.checked) {
        showError("termsError", "You must accept the terms.");
        return false;
    }

    showError("termsError", "");
    return true;
}

// Password strength

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    for (let i = 1; i <= 4; i++) {
        document.getElementById("bar" + i)
            .classList.toggle("active", i <= strength);
    }

    const texts = [
        "At least 8 characters",
        "Weak password",
        "Fair password",
        "Good password",
        "Strong password"
    ];

    document.getElementById("strengthText").textContent =
        texts[strength];

    checkConfirm();
});

// Show / hide password

document.querySelectorAll(".toggle").forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(
            button.dataset.target
        );

        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
});

// Live operator information

nameInput.addEventListener("input", function () {
    document.getElementById("operator").textContent =
        nameInput.value.trim() || "UNASSIGNED";
});

// Form submit

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const validName = checkName();
    const validEmail = checkEmail();
    const validPassword = checkPassword();
    const validConfirm = checkConfirm();
    const validTerms = checkTerms();

    if (
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validTerms
    ) {
        submitBtn.disabled = true;
        submitBtn.textContent = "INITIALIZING...";

        document.getElementById("success").textContent = "";

        setTimeout(function () {
            document.getElementById("success").textContent =
                "✓ ACCOUNT SUCCESSFULLY CREATED!";

            submitBtn.textContent = "ACCOUNT CREATED";

            document.getElementById("nameStatus").textContent = "READY";
            document.getElementById("emailStatus").textContent = "READY";
            document.getElementById("passwordStatus").textContent = "READY";
            document.getElementById("confirmStatus").textContent = "READY";
            document.getElementById("termsStatus").textContent = "ACCEPTED";

        }, 1500);
    }
});

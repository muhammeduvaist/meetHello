
const signupForm = document.querySelector("form");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");

    // Clear previous errors
    document.querySelectorAll(".field-error").forEach(error => {
        error.textContent = "";
    });

    document.querySelectorAll(".input-error").forEach(input => {
        input.classList.remove("input-error");
    });

    function showError(input, errorId, message) {
        document.getElementById(errorId).textContent = message;
        input.classList.add("input-error");
        isValid = false;
    }

    if (!name.value.trim()) {
        showError(name, "nameError", "Full name is required");
    }

    if (!email.value.trim()) {
        showError(email, "emailError", "Email is required");
    } else if (!email.validity.valid) {
        showError(email, "emailError", "Enter a valid email address");
    }

    if (password.value.length < 8) {
        showError(password, "passwordError", "Password must contain at least 8 characters");
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "confirmPasswordError", "Passwords do not match");
    }

    if (!terms.checked) {
        document.getElementById("termsError").textContent =
            "Please accept the Terms and Conditions";
        isValid = false;
    }

    if (!isValid) return;

    // Submit using fetch without reloading the page
    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value.trim(),
                email: email.value.trim(),
                password: password.value
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            alert(data.message || "Registration failed");
            return;
        }

        // Save success message and redirect
        sessionStorage.setItem("successMessage", data.message);
        window.location.href = data.redirectUrl || "/";

    } catch (error) {
        console.error("Registration error:", error);
        alert("Unable to connect. Please try again.");
    }
});

// Clear individual errors while typing
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const error = document.getElementById(input.id + "Error");

        if (error) error.textContent = "";

        input.classList.remove("input-error");
    });
});

// Show / Hide Password
function togglePassword(id, button) {
    const input = document.getElementById(id);

    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "password" ? "Show" : "Hide";
}

// Password strength
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

passwordInput.addEventListener("input", function () {
    const value = this.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const levels = [
        { width: "0%", color: "transparent", text: "Use at least 8 characters." },
        { width: "20%", color: "#ff647c", text: "Very weak password" },
        { width: "40%", color: "#ff9d58", text: "Weak password" },
        { width: "60%", color: "#f2c45e", text: "Fair password" },
        { width: "80%", color: "#83c8a2", text: "Good password" },
        { width: "100%", color: "#52d99b", text: "Strong password" }
    ];

    const level = levels[score];

    strengthBar.style.width = level.width;
    strengthBar.style.background = level.color;
    strengthText.textContent = level.text;
});

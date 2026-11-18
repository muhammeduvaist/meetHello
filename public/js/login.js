
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const loginError = document.getElementById("loginError");

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    email.classList.remove("input-error");
    password.classList.remove("input-error");

    // Frontend validation
    let isValid = true;

    if (!email.value.trim()) {
        emailError.textContent = "Email is required";
        email.classList.add("input-error");
        isValid = false;
    } else if (!email.validity.valid) {
        emailError.textContent = "Enter a valid email address";
        email.classList.add("input-error");
        isValid = false;
    }

    if (!password.value.trim()) {
        passwordError.textContent = "Password is required";
        password.classList.add("input-error");
        isValid = false;
    }

    if (!isValid) return;

    try {

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await response.json();

        if (!response.ok) {

            // Show backend validation error
            if (data.field === "email") {
                emailError.textContent = data.message;
                email.classList.add("input-error");
            } else if (data.field === "password") {
                passwordError.textContent = data.message;
                password.classList.add("input-error");
            } else {
                loginError.textContent = data.message;
            }

            return;
        }

        // Login successful
        sessionStorage.setItem("successMessage", data.message);
        window.location.href = data.redirectUrl || "/";

    } catch (error) {
        console.error("Login error:", error);
        loginError.textContent = "Unable to connect. Please try again.";
    }
});


// Clear individual errors while typing
document.querySelectorAll("#email, #password").forEach(input => {
    input.addEventListener("input", function () {

        const error = document.getElementById(this.id + "Error");

        if (error) {
            error.textContent = "";
        }

        this.classList.remove("input-error");
    });
});


// Show / Hide password
function togglePassword() {

    const password = document.getElementById("password");
    const button = document.querySelector(".toggle-password");

    if (password.type === "password") {
        password.type = "text";
        button.textContent = "Hide";
    } else {
        password.type = "password";
        button.textContent = "Show";
    }
}

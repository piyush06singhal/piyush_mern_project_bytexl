// Form Elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Form Submit
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  // Clear Old Errors
  emailError.textContent = "";
  passwordError.textContent = "";

  // Email Validation
  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailValue.includes("@") && emailValue.length < 10) {
    emailError.textContent = "Enter valid email or mobile number";
    isValid = false;
  }

  // Password Validation
  const passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (passwordValue.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  }

  // Success
  if (isValid) {
    alert("Login Successful");
    loginForm.reset();
  }
});





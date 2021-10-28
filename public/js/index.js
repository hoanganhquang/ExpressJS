import { login, logout } from "./login.js";
import { updateMe } from "./updateSetting.js";

const loginForm = document.querySelector(".form--login");
const formDataUpdate = document.querySelector(".form-user-data");
const formPasswordUpdate = document.querySelector(".form-user-password");
const logoutBtn = document.querySelector(".nav__el--logout");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

if (formDataUpdate) {
  formDataUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    updateMe({ name, email }, "data");
  });
}

if (formPasswordUpdate) {
  formPasswordUpdate.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";

    const currentPassword = document.getElementById("password-current").value;
    const newPassword = document.getElementById("password").value;
    await updateMe({ currentPassword, newPassword }, "password");

    document.querySelector(".btn--save-password").textContent = "Save password";
  });
}

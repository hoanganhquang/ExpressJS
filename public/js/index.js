import { login, logout } from "./login.js";
import { updateMe } from "./updateSetting.js";
import { bookTour } from "./stripe.js";

const loginForm = document.querySelector(".form--login");
const formDataUpdate = document.querySelector(".form-user-data");
const formPasswordUpdate = document.querySelector(".form-user-password");
const logoutBtn = document.querySelector(".nav__el--logout");
const bookBtn = document.getElementById("book-tour");

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
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateMe(form, "data");
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

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

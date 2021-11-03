const $eaa6913386173b1b$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $eaa6913386173b1b$export$de026b00723010c1 = (type, msg)=>{
    $eaa6913386173b1b$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($eaa6913386173b1b$export$516836c6a9dfc573, 5000);
};


const $c29fe3e4627a4397$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "http://localhost:3000/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            $eaa6913386173b1b$export$de026b00723010c1("success", "Logged in");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (error) {
        $eaa6913386173b1b$export$de026b00723010c1("error", error.response.data.message);
    }
};
const $c29fe3e4627a4397$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/users/logout"
        });
        if (res.data.status === "success") location.reload(true);
    } catch (error) {
        $eaa6913386173b1b$export$de026b00723010c1("error", "Error logging out!");
    }
};



const $ad489fe6a55bf4b2$export$8ddaddf355aae59c = async (data, type)=>{
    try {
        const url = type === "password" ? "http://localhost:3000/api/v1/users/updatePassword" : "http://localhost:3000/api/v1/users/updateMe";
        const res = await axios({
            method: "POST",
            url: url,
            data: data
        });
        console.log(res);
        if (res.data.status === "success") {
            $eaa6913386173b1b$export$de026b00723010c1("success", "Updated");
            window.setTimeout(()=>{
                location.reload();
            }, 1200);
        }
    } catch (error) {
        $eaa6913386173b1b$export$de026b00723010c1("error", "update fail");
    }
};


const $25f54650620fced4$var$loginForm = document.querySelector(".form--login");
const $25f54650620fced4$var$formDataUpdate = document.querySelector(".form-user-data");
const $25f54650620fced4$var$formPasswordUpdate = document.querySelector(".form-user-password");
const $25f54650620fced4$var$logoutBtn = document.querySelector(".nav__el--logout");
if ($25f54650620fced4$var$loginForm) $25f54650620fced4$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    $c29fe3e4627a4397$export$596d806903d1f59e(email, password);
});
if ($25f54650620fced4$var$logoutBtn) $25f54650620fced4$var$logoutBtn.addEventListener("click", $c29fe3e4627a4397$export$a0973bcfe11b05c9);
if ($25f54650620fced4$var$formDataUpdate) $25f54650620fced4$var$formDataUpdate.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);
    $ad489fe6a55bf4b2$export$8ddaddf355aae59c(form, "data");
});
if ($25f54650620fced4$var$formPasswordUpdate) $25f54650620fced4$var$formPasswordUpdate.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const currentPassword = document.getElementById("password-current").value;
    const newPassword = document.getElementById("password").value;
    await $ad489fe6a55bf4b2$export$8ddaddf355aae59c({
        currentPassword: currentPassword,
        newPassword: newPassword
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
});


//# sourceMappingURL=bundle.js.map

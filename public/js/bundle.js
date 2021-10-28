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


const $25f54650620fced4$var$loginForm = document.querySelector(".form");
const $25f54650620fced4$var$logoutBtn = document.querySelector(".nav__el--logout");
if ($25f54650620fced4$var$loginForm) $25f54650620fced4$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    $c29fe3e4627a4397$export$596d806903d1f59e(email, password);
});
if ($25f54650620fced4$var$logoutBtn) $25f54650620fced4$var$logoutBtn.addEventListener("click", $c29fe3e4627a4397$export$a0973bcfe11b05c9);


//# sourceMappingURL=bundle.js.map

import { showAlert } from "./alert.js";

export const updateMe = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "http://localhost:3000/api/v1/users/updatePassword"
        : "http://localhost:3000/api/v1/users/updateMe";

    const res = await axios({
      method: "POST",
      url,
      data,
    });
    console.log(res);
    if (res.data.status === "success") {
      showAlert("success", "Updated");
      window.setTimeout(() => {
        location.reload();
      }, 1200);
    }
  } catch (error) {
    showAlert("error", "update fail");
  }
};

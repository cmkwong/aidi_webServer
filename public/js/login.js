import axios from "axios";

export const login = async (user_name, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/auth/user/login", // send the post request to server
      data: {
        name: user_name,
        password: password,
      },
    });

    if (res.data.status === "success") {
      // after login, direct to home page automatically. #189 1610
      window.setTimeout(() => {
        location.assign("/projectStatus");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    alert(err.response.data.message);
  }
};

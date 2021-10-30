import axios from "axios";

export const getPrjStatus = async (project_id, locale) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/v1/project/status?project_id=${project_id}&locale=${locale}`,
    });
    if (res.status === 200) {
      return res.data.prjStatus_data;
    }
  } catch (err) {
    document.querySelector(".message").innerText = err.response.data.message;
  }
};

export const initPrjStatus = () => {
  // init the status
  [...document.querySelectorAll(".row p")].forEach(
    (el) => (el.innerText = "-")
  );
  document.querySelector(".message").innerText = "";
};

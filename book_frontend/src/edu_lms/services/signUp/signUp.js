import { axiosService } from "../axiosService";

const urlRegister = "v2/register-for-book?lang=vi-VN";

export const postRegister = (data) => {
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlRegister}`,
    data
  );
};

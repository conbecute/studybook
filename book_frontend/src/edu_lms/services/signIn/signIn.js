import AxiosService from "../axiosService";

const urlLogin = "v1/login-for-book?lang=vi-VN";
const urlUserInfo = "get-info-user-school";
const urlGetUserInfo = "v1/get-info-user-school";

export const postLogin = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlLogin}`,
    data
  );
};

export const postUserInfo = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlUserInfo}`,
    data
  );
};

export const getUserInfo = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlGetUserInfo}`,
    data
  );
};

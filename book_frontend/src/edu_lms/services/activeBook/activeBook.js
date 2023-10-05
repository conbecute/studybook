import AxiosService from "../axiosService";

const urlActiveBook = "active-book?lang=vi-VN";
const urlCheckSerial = "check-serial?lang=vi-VN";

export const postActiveBook = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlActiveBook}`,
    data
  );
};
export const getCheckSerial = (data) => {
  const axiosService = new AxiosService();
  data = {
    serial: data.seri,
  };
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlCheckSerial}`,
    data
  );
};

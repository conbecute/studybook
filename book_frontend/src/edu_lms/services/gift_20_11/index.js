import AxiosService from "../axiosService";

const VERIFY_EMAIL_BY_EVENT = "send-email-by-event";
const GET_INFO_USER_REFERENCE = "get-info-user-reference";

export const giftEvent20_11 = () => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${VERIFY_EMAIL_BY_EVENT}`
  );
};

export const getUserInforEvent20_11 = (teacherCode) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${GET_INFO_USER_REFERENCE}?click_gif=1&teacher_code=${teacherCode}`
  );
};

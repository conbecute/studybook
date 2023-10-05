import AxiosService from "../axiosService";

const urlSendOtpVerifyPw = "v1/mobile/account/send-opt-verify-pw?lang=vi-VN";
const urlVerifyOtpPw = "v1/mobile/account/verify-opt-for-email?lang=vi-VN";
const urlVerifyOtpPwPhone = "v1/mobile/account/verify-opt-for-phone?lang=vi-VN";
const urlChangePw = "v2/mobile/account/change-pw?lang=vi-VN";
const urlConfirmPw = "v1/mobile/account/confirm-pw?lang=vi-VN";
const urlPopupChangePw = "v1/update-pw-on-web?lang=vi-VN&is_web=1";

export const sendOtpVerifyPw = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlSendOtpVerifyPw}`,
    data
  );
};

export const verifyOtpPw = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlVerifyOtpPw}`,
    data
  );
};
export const verifyOtpPwPhone = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlVerifyOtpPwPhone}`,
    data
  );
};

export const changePw = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlChangePw}`,
    data
  );
};

export const confirmPw = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlConfirmPw}`,
    data
  );
};

export const onPopupChangePw = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_APP}${urlPopupChangePw}`,
    data
  );
};

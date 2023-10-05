import AxiosService from "../axiosService";

const listQuiz = "v1/list-quiz?";
const listDetailQuiz = "detail-history-quiz?";
const sendLinkVerifyEmail = "send-link-verify-email";
const verifyEmail = "verify-email";
const sendOtpEmail = "send-opt-verify-email";
const verifiedOtpEmail = "verify-opt-verify-email";
const TRACK_CLICK_LINK_EMAIL_TRAINING = "track-click-link-email-training";

export const getHistoryTraining = () => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(`${process.env.REACT_APP_API_URL}${listQuiz}`);
};

export const getDetailHistoryTraining = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listDetailQuiz}subject_id=${data.subject_id}&grade_id=${data.grade_id}`
  );
};

export const postVerifyEmail = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${sendLinkVerifyEmail}`,
    data
  );
};

export const postAuthVerifyEmail = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${verifyEmail}`,
    data
  );
};

export const sendVerifiedOtp = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${sendOtpEmail}`,
    data
  );
};

export const verifiedOtp = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${verifiedOtpEmail}`,
    data
  );
};

export const trackClickLinkEmailTraining = ({ email }) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${TRACK_CLICK_LINK_EMAIL_TRAINING}`,
    { email }
  );
};

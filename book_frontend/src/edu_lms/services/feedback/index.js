import AxiosService from "../axiosService";

const urlFeedback = "create-feedback";

export const postFeedback = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlFeedback}`,
    data
  );
};

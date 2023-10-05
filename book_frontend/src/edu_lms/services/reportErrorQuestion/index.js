import AxiosService from "../axiosService";

const saveReportError = "create-report-error-question";

export const postSaveReportErrorQuestion = (data) => {
  const axiosService = new AxiosService();

  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${saveReportError}`,
    data
  );
};

import AxiosService from "../axiosService";

const saveReportError = "create-report-error";

export const postSaveReportError = (data) => {
  const axiosService = new AxiosService();

  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${saveReportError}`,
    data
  );
};

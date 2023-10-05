import AxiosService from "../axiosService";

const urlGetReportEvent = "get-report-event-vm";

export const getReportEvent = (timeStart, timeEnd) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlGetReportEvent}?time_start=${timeStart}&time_end=${timeEnd}`
  );
};

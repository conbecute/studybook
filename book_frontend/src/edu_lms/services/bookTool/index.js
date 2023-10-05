import AxiosService from "../axiosService";

const saveDraw = "create-or-update-history-draw";

export const postSaveDraw = (data) => {
  const axiosService = new AxiosService();

  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${saveDraw}`,
    data
  );
};

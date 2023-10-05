import AxiosService from "../axiosService";

const urlBookDetail = "get-detail-book?";

export const getBookDetail = (bookId) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlBookDetail}book_id=${1}`
  );
};

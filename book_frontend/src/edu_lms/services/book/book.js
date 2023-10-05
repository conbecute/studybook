import AxiosService from "../axiosService";

const urlSearchBook = "search-book?";

export const getSearchBook = (text, grade_id, type_book) => {
  const axiosService = new AxiosService();
  if (text) {
    return axiosService.getRequest(
      `${process.env.REACT_APP_API_URL}${urlSearchBook}grade_id=${grade_id}&title=${text}&type_book=${type_book}&status=1`
    );
  } else {
    return axiosService.getRequest(
      `${process.env.REACT_APP_API_URL}${urlSearchBook}grade_id=${grade_id}&type_book=${type_book}&status=1`
    );
  }
};

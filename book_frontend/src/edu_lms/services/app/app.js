import AxiosService from "../axiosService";

const listBookType = "list-book-type";
const listGrade = "list-grade?";
const listSubject = "list-subject?";
const listNotification = "get-list-notification-by-user-id?";
const readNotification = "update-notification-by-user-id";

export const getListBookType = () => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBookType}`
  );
};

export const getListGrade = (data = 0) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listGrade}get_all=${data}`
  );
};
export const getListSubject = (id) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listSubject}grade_id=${id}`
  );
};
export const getListNoti = ({ limit, page, read }) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${
      process.env.REACT_APP_API_URL
    }${listNotification}limit=${limit}&page=${page}&read=${read || ""}`
  );
};
export const postReadNotification = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${readNotification}`,
    { id: data }
  );
};

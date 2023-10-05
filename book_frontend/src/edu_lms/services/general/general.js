import AxiosService from "../axiosService";

const listBook = "list-book?";
const listBookUsed = "list-book-used?";
const listBookDocument = "list-book-document?";

const listWorkSheet = "list-work-sheet?";
const listSubject = "get-list-book-activated?";

export const getAllListBook = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBook}book_type_id=${
      data.bookType
    }&grade_id=${data.gradeId}&page=1&status=1&limit=50`
  );
};

export const getListBook = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBook}book_type_id=${
      data.typeBook
    }&grade_id=${data.gradeId}&page=${data.page || 1}&status=${1}`
  );
};
export const getListSubjectActive = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listSubject}grade_id=${data.gradeId}`
  );
};
export const getListBookUse = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBookUsed}grade_id=${
      data.gradeId
    }&page=${data.page || 1}&status=${1}`
  );
};
export const getListBookDocument = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${
      process.env.REACT_APP_API_URL
    }${listBookDocument}type_document=18&grade_id=${data.gradeId}&book_id=${
      data.subjectId ? data.subjectId : ""
    }&status=1&page=1&limit=9`
  );
};

export const getListWorkSheet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listWorkSheet}category=2&grade_id=${
      data.gradeId
    }&book_id=${data.subjectId ? data.subjectId : ""}&status=1&page=${
      data.page || data.page
    }&limit=9`
  );
};
// export const getListBookTeacher = (data) => {
//   const axiosService = new AxiosService()
//   return axiosService.getRequest(
//     `${process.env.REACT_APP_API_URL}${listBook}book_type_id=${data.typeBook}&grade_id=${data.gradeId
//     }&page=${data.page || 1}`
//   );
// };

import AxiosService from "../axiosService";

const listBook = "list-book-document?";

const listDocument = "list-work-sheet?";

export const getListBookTutorial = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBook}type_document=${
      data.typeDocument
    }&grade_id=${data.gradeId}&status=1&page=${data.page || 1}&limit=${
      data.limit || 9
    }`
  );
};

export const searchBookTutorial = (data) => {
  const axiosService = new AxiosService();
  const params = {
    type_document: data.typeDocument,
    title: data.value,
    status: 1,
    limit: data.limit,
    page: data.page,
  };

  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listBook}`,
    params
  );
};

export const getListDocument = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${listDocument}type_document=${
      data.typeDocument
    }&category=${data.category}&grade_id=${data.gradeId}&subject_id=${
      data.subjectId
    }&status=1&page=${data.page || 1}&limit=${data.limit || 9}`
  );
};

export const searchListDocument = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_COMMON}${listDocument}type_document=${
      data.typeDocument
    }&category=${data.category}&grade_id=${data.gradeId}&subject_id=${
      data.subjectId
    }&title=${data.value}&status=1&page=${data.page || 1}&limit=${
      data.limit || 9
    }`
  );
};

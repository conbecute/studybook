import AxiosService from "../axiosService";

const createQuestionSet = "create-question-set";
const deleteQuestionSet = "delete-question-set";
const listQuestionSet = "list-question-set?";
const createQuestion = "create-question";
const deleteQuestion = "delete-question";
const listQuestion = "v1/list-question?";
const postUploadImage = "upload";
const updateQuestion = "update-question";
const creatHistotyExam = "create-history-exam";
const notiError = "send-notice-error";
const createQuestionByActivity = "create-question-by-act";

export const postContactQuestionSet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${createQuestionSet}`,
    data
  );
};

export const postCreateQuestionSet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${createQuestionSet}`,
    data
  );
};

export const postDeleteQuestionSet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${deleteQuestionSet}`,
    data
  );
};

export const getListQuestionSet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${listQuestionSet}grade_id=${
      data.gradeId
    }&subject_id=${data.subjectId}&title=${data.title}&status=1&page=${
      data.page || 1
    }&limit=${data.limit || 10}&source=${data.source || 1}`
  );
};

export const postCreateQuestion = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${createQuestion}`,
    data
  );
};

export const postCreateQuestionByActivity = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${createQuestionByActivity}`,
    data
  );
};

export const postUpdateQuestion = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${updateQuestion}`,
    data
  );
};

export const postDeleteQuestion = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${deleteQuestion}`,
    data
  );
};

export const getListQuestion = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${listQuestion}`,
    data
  );
};

export const postUploadImageQuestion = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_MEDIA}${postUploadImage}`,
    data
  );
};

export const postHistoryExam = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${creatHistotyExam}`,
    data
  );
};

export const postNotiErrorExam = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${notiError}`,
    data
  );
};

import AxiosService from "../axiosService";

const listBook = "get-detail-page?";
const actionGameBook = "get-detail-object?";
const menuBook = "get-book-content?";
const questionLibrary = "get-book-index?";
const listExam = "list-exam?";
const createHistoryGame = "create-history-game";
const questionSet = "list-page-has-question-set?";
const historyExam = "history-exam?";
const getQuestionSet = "get-question-set-by-content-id?";
const listAct = "list-act?";
const getActByActName = "api/v1/get-act-by-act-name?";

export const getListBook = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_COMMON}${listBook}book_id=${
      1
    }&page=${data.page}&book_name=tieng-viet-1-1&limit=${data.limit}&status=${
      data.status ? data.status : ""
    }`
  );
};

export const getListBookDetail = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_COMMON}${listBook}book_id=${
      data.book_id
    }&page=${data.page}&limit=${data.limit}&status=${
      data.status ? data.status : ""
    }`
  );
};
export const getMenuBook = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${menuBook}book_id=${1}`
  );
};

export const getQuestionSetByContentId = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${getQuestionSet}content_id=${data.content_id}`
  );
};

export const getQuestionLibrary = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${questionLibrary}book_id=${data.book_id}&type=${data.type}`
  );
};

export const getListExam = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${listExam}type=${data.type}&grade_id=${data.gradeId}&subject_id=${data.subjectId}`
  );
};

export const getActionGameBook = (id) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_COMMON}${actionGameBook}object_id=${id}`
  );
};

export const postHistoryGame = (data) => {
  if (localStorage.getItem("token")) {
    const axiosService = new AxiosService();
    data = {
      object_id: data.objectId,
      game_id: data.gameId,
      data: data.data,
      data_v1: data.dataV1
    };
    return axiosService.postRequest(
      `${process.env.REACT_APP_API_URL}${createHistoryGame}`,
      data
    );
  }
};

export const getListQuestionSet = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${questionSet}content_id=${data}`
  );
};

export const getHistoryExam = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${historyExam}question_set_id=${
      data.question_set_id || ""
    }&book_content_id=${data.book_content_id || ""}&guest_id=${data.guest_id}&user_class_room_id=${
      data.user_class_room_id || ""
    }`
  );
};

export const getListAct = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${listAct}book_content_id=${data}`
  );
};

export const getListActByActName = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_MEDIA_URL_CMS}${getActByActName}activity_name=${data}`
  );
};

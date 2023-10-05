import AxiosService from "../axiosService";

const urlListQuiz = "list-quiz";
const urlListQuizDetail = "detail-quiz?";
const urlResultQuiz = "v1/check-quiz";
const urlHistoryQuiz = "history-quiz";

export const getListQuiz = () => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlListQuiz}`
  );
};

export const getListQuizDetail = ({
  gradeId,
  subjectId,
  quizId,
  year = 2021,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlListQuizDetail}grade_id=${gradeId}&subject_id=${subjectId}&quiz_id=${quizId}&year=${year}`
  );
};

export const getResultQuiz = (data) => {
  const axiosService = new AxiosService();
  return axiosService.postRequest(
    `${process.env.REACT_APP_API_URL}${urlResultQuiz}`,
    data
  );
};

export const getHistoryQuiz = (data) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${urlHistoryQuiz}`
  );
};

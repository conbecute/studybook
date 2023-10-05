import AxiosService from "../axiosService";

const GET_ACTIVITY_BY_BOOK = "get-activity-by-book-content-id";
const GET_TITLE_EXERCISE = "get-book-by-book-content-id";

export const getActExercise = ({
  book_content_id,
  level,
  activity_ids,
  game_id,
  limit,
  source,
}) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL_QUESTION}${GET_ACTIVITY_BY_BOOK}?book_content_id=${book_content_id}&level=${level}&activity_ids=${activity_ids}&game_id=${game_id}`
  );
};

export const getTitleExercise = ({ book_content_id }) => {
  const axiosService = new AxiosService();
  return axiosService.getRequest(
    `${process.env.REACT_APP_API_URL}${GET_TITLE_EXERCISE}?book_content_id=${book_content_id}`
  );
};

import * as TYPES from "../../constants/actionsType";

let initialState = {
  listQuiz: [],
  dataPopupQuiz: {},
  dataQuizDetail: [],
  resultQuestion: {},
  resetQuiz: false,
};

let updateListQuiz = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_QUIZ:
      return { ...state, listQuiz: action.data };
    case TYPES.PA_DATA_DATA_QUIZ:
      return { ...state, dataPopupQuiz: action.data };
    case TYPES.PA_DATA_DATA_QUIZ_DETAIL:
      return { ...state, dataQuizDetail: action.data };
    case TYPES.PA_DATA_DATA_RESULT_QUESTION:
      return { ...state, resultQuestion: action.data };
    case TYPES.PA_DATA_RESET_QUESTION:
      return { ...state, resetQuiz: action.data };
    default:
      return state;
  }
};
export default updateListQuiz;

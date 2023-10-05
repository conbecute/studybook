import * as TYPES from "../../constants/actionsType";

let initialState = {
  listQuestion: [],
  gradeName: "",
  subjectName: "",
  title: "",
};

let questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_QUESTION_:
      return { ...state, listQuestion: action.data };
    case TYPES.PA_DATA_TITLE_SUBJECT_NAME:
      return { ...state, subjectName: action.data };
    case TYPES.PA_DATA_TITLE_GRADE_NAME:
      return { ...state, gradeName: action.data };
    case TYPES.PA_DATA_TITLE_QUESTION_SET:
      return { ...state, title: action.data };
    default:
      return state;
  }
};
export default questionReducer;

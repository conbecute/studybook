import * as TYPES from "../../constants/actionsType";

let initialState = {
  listQuestionSet: [],
  listSubjectQuestionSet: [],
  paramterQuestionSet: {
    gradeId: 0,
    fileId: 0,
    subjectId: 0,
    subjectName: "",
    title: "",
  },
  initialPageExercise: 0,
};

let questionSetReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_QUESTION_SET:
      return { ...state, listQuestionSet: action.data };
    case TYPES.PA_DATA_LIST_SUBJECT_QUESTION_SET:
      return { ...state, listSubjectQuestionSet: action.data };
    case TYPES.SET_INITIAL_PAGE_EXERCISE:
      return { ...state, initialPageExercise: action.data.initialPageExercise };
    case TYPES.PA_UPDATE_DATA_PARAMTER_QUESTION_SET:
      return {
        ...state,
        paramterQuestionSet: { ...state.paramterQuestionSet, ...action.data },
      };
    default:
      return state;
  }
};
export default questionSetReducer;

import * as TYPES from "../../constants/actionsType";

let initialState = {
  listBookIntroduce: [],
  listSubject: [],
  paramterIntroduce: {
    gradeId: 0,
    subjectId: 0,
    fileId: 0,
  },
};

let educationTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_EDUCATION_TEACHER:
      return { ...state, listBookIntroduce: action.data };
    case TYPES.PA_DATA_LIST_SUBJECT_TEACHER:
      return { ...state, listSubject: action.data };
    case TYPES.PA_UPDATE_DATA_PARAMTER_EDUCATION_TEACHER:
      return {
        ...state,
        paramterIntroduce: { ...state.paramterIntroduce, ...action.data },
      };
    default:
      return state;
  }
};
export default educationTeacherReducer;

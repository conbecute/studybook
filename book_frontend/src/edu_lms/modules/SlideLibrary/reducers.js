import * as TYPES from "../../constants/actionsType";

let initialState = {
  listSlide: [],
  listSubjectSlide: [],
  paramterSlide: {
    gradeId: 0,
    fileId: 0,
    subjectId: 0,
    subjectName: "",
    title: "",
  },
  initialPage: 0,
};

let slideReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_SLIDE:
      return { ...state, listSlide: action.data };
    case TYPES.PA_DATA_LIST_SUBJECT_SLIDE:
      return { ...state, listSubjectSlide: action.data };
    case TYPES.SET_INITIAL_PAGE:
      return { ...state, initialPage: action.data };
    case TYPES.PA_UPDATE_DATA_PARAMTER_SLIDE:
      return {
        ...state,
        paramterSlide: { ...state.paramterSlide, ...action.data },
      };
    default:
      return state;
  }
};
export default slideReducer;

import * as TYPES from "../../constants/actionsType";
import {
  BOOK_DOCUMENT_COURSEWARE,
  VIDEO_ENGLISH_COURSEWARE,
} from "../../constants/type";

let initialState = {
  listBookCourseware: [],
  listSubjectCourseware: [],
  paramterCourseware: {
    gradeId: 0,
    fileId: 0,
    subjectId: 0,
  },
};

let coursewareReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_BOOK_COURSEWARE:
      return { ...state, listBookCourseware: action.data };
    case TYPES.PA_DATA_LIST_SUBJECT_COURSEWARE:
      return { ...state, listSubjectCourseware: action.data };
    case TYPES.PA_UPDATE_DATA_PARAMTER_COURSEWARE:
      return {
        ...state,
        paramterCourseware: { ...state.paramterCourseware, ...action.data },
      };
    default:
      return state;
  }
};
export default coursewareReducer;

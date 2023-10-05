import * as TYPES from "../../constants/actionsType";

export const onDispatchListBookCourseware = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_BOOK_COURSEWARE,
    data,
  };
};

export const onDispatchListSubjectCourseware = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_SUBJECT_COURSEWARE,
    data,
  };
};

export const onDispatchUpdateParamterCourseware = (data) => {
  return {
    type: TYPES.PA_UPDATE_DATA_PARAMTER_COURSEWARE,
    data,
  };
};

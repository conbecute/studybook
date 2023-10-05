import * as TYPES from "../../constants/actionsType";

export const onDispatchEducationId = (educationId) => {
  return {
    type: TYPES.PA_DATA_EDUCATION_ID,
    educationId,
  };
};

export const onDispatchListBookEducation = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_BOOK_EDUCATION,
    data,
  };
};

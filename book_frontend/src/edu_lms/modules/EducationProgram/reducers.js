import * as TYPES from "../../constants/actionsType";

let initialState = {
  educationId: 4,
  listBookEducation: [],
};

let educationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_EDUCATION_ID:
      return { ...state, educationId: action.educationId };
    case TYPES.PA_DATA_LIST_BOOK_EDUCATION:
      return { ...state, listBookEducation: action.data };
    default:
      return state;
  }
};
export default educationReducer;

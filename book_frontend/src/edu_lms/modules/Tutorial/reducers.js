import * as TYPES from "../../constants/actionsType";

let initialState = {
  fileId: 0,
  listBookTutorial: [],
};

let tutorialReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_TUTORIAL_ID:
      return { ...state, fileId: action.fileId };
    case TYPES.PA_DATA_LIST_BOOK_TUTORIAL:
      return { ...state, listBookTutorial: action.data };
    default:
      return state;
  }
};
export default tutorialReducer;

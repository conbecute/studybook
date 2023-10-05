import * as TYPES from "../../constants/actionsType";

const initialState = {
  matrixBookContent: {},
  isMaxQuestion: false, //purpose: limit get all activity
  doingInfo: {
    timeStart: 0,
    clickShare: false,
    clickExit: false,
    completed: false,
    sourceFromPractice: false,
    data: {}
  }
};

const doingExerciseReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_SET_MATRIX_BOOK_CONTENT:
      return { ...state, matrixBookContent: action.data };
    case TYPES.PA_SET_STATE_MAX_QUESTION:
      return { ...state, isMaxQuestion: action.data };
    case TYPES.PA_SET_STATE_DOING_INFO:
      return { ...state, doingInfo: action.data };

    default:
      return state;
  }
};

export default doingExerciseReducers;

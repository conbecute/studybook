import * as TYPES from "../../constants/actionsType";

let initialState = {
  listBookIntroduce: [],
  paramterIntroduce: {
    gradeId: 0,
    fileId: 3,
  },
};

let introduceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_BOOK_INTRODUCE_ID:
      return { ...state, listBookIntroduce: action.data };
    case TYPES.PA_UPDATE_DATA_PARAMTER_INTRODUCE:
      return {
        ...state,
        paramterIntroduce: { ...state.paramterIntroduce, ...action.data },
      };
    default:
      return state;
  }
};
export default introduceReducer;

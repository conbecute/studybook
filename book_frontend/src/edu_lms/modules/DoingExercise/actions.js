import * as types from "../../constants/actionsType";

export const onDispatchUpdateMatrixBookContent = (data) => {
  return {
    type: types.PA_SET_MATRIX_BOOK_CONTENT,
    data,
  };
};

export const onDispatchUpdateStateMaxQuestion = (data) => {
  return {
    type: types.PA_SET_STATE_MAX_QUESTION,
    data,
  };
};

export const onDispatchSetStateDoingInfo = (data) => {
  return {
    type: types.PA_SET_STATE_DOING_INFO,
    data,
  };
};

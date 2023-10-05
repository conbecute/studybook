import * as types from "../../constants/actionsType";

export const onDispatchDataSlide = (data) => {
  return {
    type: types.PA_DATA_SLIDE,
    data,
  };
};

export const onDispatchTitleSlide = (data) => {
  return {
    type: types.PA_DATA_TITLE_SLIDE,
    data,
  };
};

export const onDispatchUrlSlide = (data) => {
  return {
    type: types.PA_DATA_URL_SLIDE,
    data,
  };
};

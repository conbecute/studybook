import * as TYPES from "../../constants/actionsType";

let initialState = {
  dataSlide: [],
  title: "",
  url: "",
};

let readingSlideReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_SLIDE:
      return { ...state, dataSlide: action.data };
    case TYPES.PA_DATA_TITLE_SLIDE:
      return { ...state, title: action.data };
    case TYPES.PA_DATA_URL_SLIDE:
      return { ...state, url: action.data };
    default:
      return state;
  }
};
export default readingSlideReducer;

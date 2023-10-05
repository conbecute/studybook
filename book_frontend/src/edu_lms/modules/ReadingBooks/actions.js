import * as types from "../../constants/actionsType";

export const onDispatchDataBook = (data) => {
  return {
    type: types.PA_DATA_BOOK,
    data,
  };
};

export const onDispatchMenuBook = (data) => {
  return {
    type: types.PA_MENU_BOOK,
    data,
  };
};
export const onDispatchShowQuestionPopup = (value) => {
  return {
    type: types.PA_DATA_QUESTION_POPUP,
    value,
  };
};

export const onDispatchNumberPageBook = (number) => {
  return {
    type: types.PA_DATA_NUMBER_PAGE_BOOK,
    number,
  };
};

export const onDispatchDataQuestion = (data) => {
  return {
    type: types.PA_DATA_QUESTION,
    data,
  };
};
export const onDispatchTypeGameQuestion = (typeNumber) => {
  return {
    type: types.PA_TYPE_GAME_QUESTION,
    typeNumber,
  };
};

export const onDispatchParamterPage = (number) => {
  return {
    type: types.PA_TYPE_PARAMTER_PAGE,
    number,
  };
};

export const onDispatchIdBook = (id) => {
  return {
    type: types.PA_TYPE_ID_BOOK,
    id,
  };
};

export const onDispatchLanguageBook = (language) => {
  return {
    type: types.PA_TYPE_LANGUAGE_BOOK,
    language,
  };
};

export const onDispatchChangeTotal = (total) => {
  return {
    type: types.PA_TYPE_CHANGE_TOTAL,
    total,
  };
};

export const onDispatchChangeParamterBookId = (paramaterBookId) => {
  return {
    type: types.PA_TYPE_PARAMTER_BOOK_ID,
    paramaterBookId,
  };
};

export const onDispatchChangeIsActive = (isActive) => {
  return {
    type: types.PA_TYPE_CHANGE_IS_ACTIVE,
    isActive,
  };
};

export const onDispatchChangeIsLicence = (isLicence) => {
  return {
    type: types.PA_TYPE_CHANGE_IS_LICENCE,
    isLicence,
  };
};

export const onDispatchUpdateBookToolPage = (data) => {
  return {
    type: types.PA_READING_BOOK_UPDATE_BOOKTOOL_PAGE,
    data,
  };
};

export const onDispatchUpdateBookToolGame = (data) => {
  return {
    type: types.PA_READING_BOOK_UPDATE_BOOKTOOL_GAME,
    data,
  };
};

export const onDispatchUpdatePageId = (pageId) => {
  return {
    type: types.PA_READING_BOOK_UPDATE_PAGE_ID,
    pageId,
  };
};

export const onDispatchUpdatePageDraw = (data) => {
  return {
    type: types.PA_READING_BOOK_UPDATE_PAGE_DRAW,
    data,
  };
};

export const onDispatchUpdateReadingBookData = (data) => {
  return {
    type: types.PA_READING_BOOK_UPDATE,
    data,
  };
};

export const onDispatchUpdateCurrentMenu = (currentMenu) => {
  return {
    type: types.PA_SET_CURRENT_MENU,
    currentMenu,
  };
};

export const onDispatchSetClickPractice = (clickPractice) => {
  return {
    type: types.PA_SET_STATE_CLICK_PRACTICE,
    clickPractice
  };
};

import * as TYPES from "../../constants/actionsType";

export const onDispatchTutorialId = (tutorialId) => {
  return {
    type: TYPES.PA_DATA_TUTORIAL_ID,
    tutorialId,
  };
};

export const onDispatchListBookTutorial = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_BOOK_TUTORIAL,
    data,
  };
};

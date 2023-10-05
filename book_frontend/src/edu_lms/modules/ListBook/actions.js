import * as types from "../../constants/actionsType";

export const onDispatchListBooksInUse = (data) => {
  return {
    type: types.PA_DATA_LIST_BOOKS_IN_USE,
    data,
  };
};

export const onDispatchBooksInUse = (data) => {
  return {
    type: types.PA_DATA_BOOKS_IN_USE,
    data,
  };
};

export const onDispatchListTextbooks = (data) => {
  return {
    type: types.PA_DATA_LIST_TEXTBOOKS,
    data,
  };
};

export const onDispatchListReferenceBooks = (data) => {
  return {
    type: types.PA_DATA_LIST_REFERENCE_BOOKS,
    data,
  };
};

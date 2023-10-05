import * as TYPES from "../../constants/actionsType";

let initialState = {
  listBookInUse: [],
  listTextbooks: [],
  referenceBooks: [],
};

let listBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_LIST_BOOKS_IN_USE:
      const dataListBookInUse = getUniqueListBy(
        [...state.listBookInUse, ...action.data],
        "id"
      );
      return { ...state, listBookInUse: dataListBookInUse };
    case TYPES.PA_DATA_BOOKS_IN_USE:
      const dataBookInUse = getUniqueListBy(
        [...state.listBookInUse, ...action.data],
        "id"
      );
      return { ...state, listBookInUse: dataBookInUse };
    case TYPES.PA_DATA_LIST_TEXTBOOKS:
      const dataListTextbooks = getUniqueListBy(
        [...state.listTextbooks, ...action.data],
        "id"
      );
      return { ...state, listTextbooks: dataListTextbooks };
    case TYPES.PA_DATA_LIST_REFERENCE_BOOKS:
      const dataReferenceBooks = getUniqueListBy(
        [...state.referenceBooks, ...action.data],
        "id"
      );
      return { ...state, referenceBooks: dataReferenceBooks };
    default:
      return state;
  }
};
export default listBookReducer;

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

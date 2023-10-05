import * as TYPES from "../../constants/actionsType";

export const onDispatchListBookIntroduce = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_BOOK_INTRODUCE_ID,
    data,
  };
};
export const onDispatchUpdateParamterIntroduce = (data) => {
  return {
    type: TYPES.PA_UPDATE_DATA_PARAMTER_INTRODUCE,
    data,
  };
};

import * as TYPES from "../../constants/actionsType";

let initialState = {
  tokenToChangePw: "",
};

let verifyOtpReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_VERIFY_OTP:
      return { ...state, tokenToChangePw: action.tokenToChangePw };

    default:
      return state;
  }
};
export default verifyOtpReducers;

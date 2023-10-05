import * as TYPES from "../../constants/actionsType";

let initialState = {
  userName: "",
  sendOtp: "",
};

let forgotPasswordReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.PA_DATA_FORGOT_PASS_WORD:
      return { ...state, userName: action.userName };
    case TYPES.PA_SEND_OTP_FORGOT_PASSWORD:
      return { ...state, sendOtp: action.data };
    default:
      return state;
  }
};
export default forgotPasswordReducers;

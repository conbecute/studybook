import * as types from "../../constants/actionsType";

export const onDispatchForgotPassword = (userName) => {
  return {
    type: types.PA_DATA_FORGOT_PASS_WORD,
    userName,
  };
};
export const onDispatchSentOtpForgotPassword = (data) => {
  return {
    type: types.PA_SEND_OTP_FORGOT_PASSWORD,
    data,
  };
};

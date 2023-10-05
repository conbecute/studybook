import * as types from "../../constants/actionsType";

export const onDispatchVerifyOtp = (tokenToChangePw) => {
  return {
    type: types.PA_DATA_VERIFY_OTP,
    tokenToChangePw,
  };
};

import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import LogoComponent from "../../components/Header/LogoComponent";
import { onDispatchTogglePopupSuccess } from "../../modules/App/actions";
import * as PATH from "../../constants/path";
import * as TEXT from "../../constants/text";
import { changePw, sendOtpVerifyPw } from "../../services/forgotPw/forgotPw";
import { APP_ID_WEB, APP_ID_MOBILE } from "../../constants/type";
import { setEventGTM } from "../../constants/googleTagManager";
import { FORGOT_PASSWORD } from "../../constants/eventNameGTM";

const ChangePwContainer = (props) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [isStatus, onSetStatus] = useState(false);
  const [messageError, onSetMessageError] = useState("");
  const [isPassword, setStatePassword] = useState(false);
  const [isConfirmPassword, setStateConfirmPassword] = useState(false);
  const iconShowPassword = watch("password");
  const iconConfirmPassword = watch("confirm_password");
  const [isFocusPassword, setStateFocusPassword] = useState(false);
  const [isFocusConfirmPassword, setStateFocusConfirmPassword] =
    useState(false);

  const onChangePw = (dataForm) => {
    if (dataForm.password != dataForm.confirm_password) {
      onSetStatus(true);
      onSetMessageError("Mật khẩu không trùng khớp");
    } else {
      let data = {
        token_to_change_pw: props.tokenToChangePw,
        password: dataForm.password,
        is_web: 1,
      };
      if (props.userName.includes("@")) {
        data = { ...data, email: props.userName, app_id: APP_ID_WEB };
      } else {
        data = {
          ...data,
          phone: props.userName,
          app_id: APP_ID_MOBILE,
          country_code: "+84",
        };
      }

      changePw(data)
        .then((res) => {
          if (res.data.status === "fail") {
            setEventGTM(
              FORGOT_PASSWORD,
              ["sent_otp", props.sendOtp],
              ["reset_successful", "fail"]
            );
            props.alert.error(res.data.message);
          }
          if (res.data.status === "success") {
            setEventGTM(
              FORGOT_PASSWORD,
              ["sent_otp", props.sendOtp],
              ["reset_successful", "true"]
            );
            const dataSuccess = {
              status: true,
              title: [TEXT.TEXT_CHANGE_PASSWORD],
              url: PATH.ROUTE_PATH_SIGN_IN,
              labelButton: TEXT.TEXT_VALUE_BUTTON_CHANGE_PASSWORD,
            };
            props.onDispatchTogglePopupSuccess(dataSuccess);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };
  const history = useHistory();
  return (
    <div className="main_logo_wrapper">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center pt-5 pb-5">
              <LogoComponent />
            </div>
          </div>
          <div className="col-lg-5 col-md-8">
            <div className="sign_in_form text-center">
              <h5 className="monkey-f-bold mb-5 monkey-color-violet">
                Đặt lại mật khẩu
              </h5>
              <form onSubmit={handleSubmit(onChangePw)}>
                <div className="form-group position-relative">
                  <i
                    className={`${
                      isFocusPassword ? "monkey-color-violet" : ""
                    } fa fa-lock`}
                    aria-hidden="true"
                  ></i>
                  <input
                    style={{
                      height: "44px",
                      paddingLeft: "34px",
                      paddingRight: "34px",
                    }}
                    className="form-control rounded-pill"
                    type={isPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    autoComplete="off"
                    name="password"
                    ref={register({ required: true, minLength: 8 })}
                    onFocus={() => setStateFocusPassword(true)}
                    onBlur={() => setStateFocusPassword(false)}
                  />
                  {iconShowPassword && (
                    <i
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "15px",
                        zIndex: "20",
                      }}
                      onClick={() => setStatePassword(!isPassword)}
                      className={`fa cursor ${
                        isConfirmPassword
                          ? "fa-eye monkey-color-violet"
                          : "fa-eye-slash"
                      }`}
                      aria-hidden="true"
                    ></i>
                  )}
                  <p className="monkey-color-red monkey-mt-15">
                    {errors.password && "Vui lòng nhập mật khẩu"}
                  </p>
                </div>
                <div className="form-group position-relative">
                  <i
                    className={`${
                      isFocusConfirmPassword ? "monkey-color-violet" : ""
                    } fa fa-lock`}
                    aria-hidden="true"
                  ></i>
                  <input
                    style={{
                      height: "44px",
                      paddingLeft: "34px",
                      paddingRight: "34px",
                    }}
                    className="form-control rounded-pill"
                    type={isConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    name="confirm_password"
                    autoComplete="off"
                    ref={register({ required: true, minLength: 8 })}
                    onFocus={() => setStateFocusConfirmPassword(true)}
                    onBlur={() => setStateFocusConfirmPassword(false)}
                  />
                  {iconConfirmPassword && (
                    <i
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "15px",
                        zIndex: "20",
                      }}
                      onClick={() =>
                        setStateConfirmPassword(!isConfirmPassword)
                      }
                      className={`fa cursor ${
                        isConfirmPassword
                          ? "fa-eye monkey-color-violet"
                          : "fa-eye-slash"
                      }`}
                      aria-hidden="true"
                    ></i>
                  )}
                  <p className="monkey-color-red monkey-mt-15">
                    {errors.confirm_password && "Vui lòng nhập lại mật khẩu"}
                    {errors.confirm_password?.type === "minLength" &&
                      "Mật khẩu phải từ 8 ký tự trở lên"}
                  </p>

                  {isStatus && (
                    <div className="text-center monkey-color-red mb-3">
                      {messageError}
                    </div>
                  )}
                </div>
                <input
                  style={{ height: "44px" }}
                  value="Lưu"
                  className="btn monkey-bg-violet monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 hvr-registration-white"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { tokenToChangePw } = state.verifyOtpReducers;
  const { userName } = state.forgotPasswordReducers;
  const { sendOtp } = state.forgotPasswordReducers;
  return { tokenToChangePw, userName, sendOtp };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};
export default compose(
  withAlert(),
  connect(mapStateToProps, mapDispatchToProps)
)(ChangePwContainer);

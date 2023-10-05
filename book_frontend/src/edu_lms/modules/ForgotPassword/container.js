import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { useForm, formState } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

import LogoComponent from "../../components/Header/LogoComponent";
import * as PATH from "../../constants/path";
import { postLogin } from "../../services/signIn/signIn";
import * as TEXT from "../../constants/text";
import { sendOtpVerifyPw } from "../../services/forgotPw/forgotPw";
import {
  APP_ID,
  SEND_OTP_PW_BY_EMAIL,
  SEND_OTP_PW_BY_PHONE,
  PHONE_TYPE,
  GMAIL_TYPE,
} from "../../constants/type";
import {
  onDispatchForgotPassword,
  onDispatchSentOtpForgotPassword,
} from "./actions";
import { onDispatchShowLoading } from "../App/actions";
import { REG_EXP_EMAIL } from "../../constants/type";
import { APP_ID_WEB, APP_ID_MOBILE } from "../../constants/type";

const ForgotPasswordContainer = (props) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const isDisabled = !isDirty || !isValid;
  const [isStatus, onSetStatus] = useState(false);
  const [messageError, onSetMessageError] = useState("");
  const [isFocusEmail, setStateFocusEmail] = useState(false);

  const onResetPassword = (data) => {
    props.onDispatchShowLoading(true);
    props.onDispatchForgotPassword(data.userName);
    const userName = data.userName.replace(/\s+/g, "");
    let reg = /^[0-9]*[.]?[0-9]*$/;
    let dataPost = { type: "", is_web: 1 };

    if (reg.test(userName)) {
      dataPost = {
        ...dataPost,
        type: SEND_OTP_PW_BY_PHONE,
        phone: userName,
        app_id: APP_ID_WEB,
      };
    }
    if (userName.includes("@")) {
      dataPost = {
        ...dataPost,
        type: SEND_OTP_PW_BY_EMAIL,
        email: userName,
        app_id: APP_ID_WEB,
      };
    }

    sendOtpVerifyPw(dataPost)
      .then((res) => {
        props.onDispatchShowLoading(false);
        if (res.data.status === "fail") {
          onSetStatus(true);
          onSetMessageError(res.data.message);
        }
        if (res.data.status === "success") {
          history.push(PATH.ROUTE_PATH_VERIFY_OTP_PW);
          if (dataPost.type === SEND_OTP_PW_BY_EMAIL) {
            props.onDispatchSentOtpForgotPassword("email");
          } else if (dataPost.type === SEND_OTP_PW_BY_PHONE) {
            props.onDispatchSentOtpForgotPassword("phone");
          }
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const onValidateEmail = (value) => {
    const userName = value.replace(/\s+/g, "");
    let reg = /^[0-9]*[.]?[0-9]*$/;
    if (userName.includes("@")) {
      return REG_EXP_EMAIL.test(userName);
    } else {
      return reg.test(userName);
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
              <h5 className="monkey-f-header mb-5 text-uppercase monkey-color-violet">
                Quên mật khẩu
              </h5>
              <form onSubmit={handleSubmit(onResetPassword)}>
                <div className="form-group position-relative">
                  <i
                    className={`${
                      isFocusEmail ? "monkey-color-violet" : ""
                    } fa fa-user-o`}
                    aria-hidden="true"
                  ></i>
                  <input
                    style={{ height: "44px", paddingLeft: "40px" }}
                    className="form-control rounded-pill"
                    type="text"
                    placeholder="Nhập email hoặc số điện thoại"
                    autoComplete="off"
                    name="userName"
                    ref={register({
                      required: true,
                      validate: (value) => onValidateEmail(value),
                    })}
                    onFocus={() => setStateFocusEmail(true)}
                    onBlur={() => setStateFocusEmail(false)}
                  />
                  <p className="monkey-color-red monkey-mt-15">
                    {errors.userName &&
                      errors.userName.type === "required" &&
                      "Vui lòng nhập email hoặc số điện thoại để đặt lại mật khẩu"}
                    {errors.userName &&
                      errors.userName.type === "validate" &&
                      "Email hoặc số điện thoại không đúng định dạng"}
                  </p>
                  {!errors.userName && isStatus && (
                    <div className="text-center monkey-color-red monkey-mt-15">
                      {messageError}
                    </div>
                  )}
                </div>

                <input
                  style={{ height: "44px" }}
                  value="Gửi yêu cầu"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "monkey-bg-gray" : "monkey-bg-violet cursor"
                  } btn monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 `}
                  type="submit"
                />
              </form>
              <p className="text-center mt-5 monkey-fz-14">
                Đã có tài khoản?{" "}
                <a
                  onClick={() => history.push(PATH.ROUTE_PATH_SIGN_IN)}
                  className="monkey-color-violet cursor"
                >
                  Đăng nhập ngay
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchForgotPassword,
      onDispatchShowLoading,
      onDispatchSentOtpForgotPassword,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);

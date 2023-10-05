import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import LogoComponent from "../../components/Header/LogoComponent";
import { onDispatchVerifyOtp } from "./actions";
import * as PATH from "../../constants/path";
import {
  verifyOtpPw,
  verifyOtpPwPhone,
} from "../../services/forgotPw/forgotPw";
import { onDispatchShowLoading } from "../App/actions";
import {
  TEXT_EMAIL_VERIFY_OTP,
  TEXT_PHONE_VERIFY_OTP,
} from "../../constants/text";
import { APP_ID_WEB, APP_ID_MOBILE } from "../../constants/type";

const VerifyOtpPwContainer = (props) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const isDisabled = !isDirty || !isValid;
  const checkValue = props.userName.includes("@");
  const history = useHistory();
  const onVerifyOtpPw = (dataForm) => {
    props.onDispatchShowLoading(true);
    let data = {
      code: dataForm.otp,
      is_web: 1,
    };
    if (checkValue) {
      data = { ...data, email: props.userName, app_id: APP_ID_WEB };
    } else {
      data = {
        ...data,
        phone: props.userName,
        country_code: "+84",
        app_id: APP_ID_MOBILE,
      };
    }
    if (checkValue) {
      verifyOtpPw(data)
        .then((res) => {
          if (res.data.status === "fail") {
            props.alert.error(res.data.message);
            props.onDispatchShowLoading(false);
          }
          if (res.data.status === "success") {
            props.onDispatchVerifyOtp(res.data.data.token_to_change_pw);
            history.push(PATH.ROUTE_PATH_CHANGE_PW);
            props.onDispatchShowLoading(false);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      verifyOtpPwPhone(data)
        .then((res) => {
          props.onDispatchShowLoading(false);
          if (res.data.status === "fail") {
            props.alert.error(res.data.message);
          }
          if (res.data.status === "success") {
            props.onDispatchVerifyOtp(res.data.data.token_to_change_pw);
            history.push(PATH.ROUTE_PATH_CHANGE_PW);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

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
              <h5 className="mb-5">
                {checkValue ? TEXT_EMAIL_VERIFY_OTP : TEXT_PHONE_VERIFY_OTP}
                <span className="monkey-color-violet"> {props.userName} </span>
              </h5>
              <form onSubmit={handleSubmit(onVerifyOtpPw)}>
                <div className="form-group">
                  <input
                    style={{ height: "44px" }}
                    className="form-control rounded-pill"
                    type="text"
                    placeholder="Nhập mã xác thực"
                    autoComplete="off"
                    name="otp"
                    ref={register({ required: true })}
                  />
                  <div className="monkey-color-red monkey-mt-15">
                    <p>{errors.otp && "Vui lòng nhập mã xác thực"}</p>
                  </div>
                </div>

                <input
                  style={{ height: "44px" }}
                  value="Tiếp tục"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "monkey-bg-gray" : "monkey-bg-violet cursor"
                  } btn monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 `}
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
  const { userName } = state.forgotPasswordReducers;
  return { userName };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchVerifyOtp,
      onDispatchShowLoading,
    },
    dispatch
  );
};

export default compose(
  withAlert(),
  connect(mapStateToProps, mapDispatchToProps)
)(VerifyOtpPwContainer);

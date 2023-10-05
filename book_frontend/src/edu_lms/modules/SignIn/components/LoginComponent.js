import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as PATH from "../../../constants/path";
import { Link } from "react-router-dom";

const LoginComponent = (props) => {
  const { register, handleSubmit, errors, reset, watch } = useForm();
  const [isPassword, setStatePassword] = useState(false);
  const [isFocusPhone, setStateFocusPhone] = useState(false);
  const [isFocusPass, setStateFocusPass] = useState(false);
  const iconShowPassword = watch("password");
  const history = useHistory();
  const onSubmit = (data) => {
    props.onLogin(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group position-relative">
        <i
          className={`${isFocusPhone ? "monkey-color-violet" : ""} fa fa-user`}
          aria-hidden="true"
        ></i>
        <input
          style={{ height: "44px", paddingLeft: "34px", paddingRight: "34px" }}
          className="form-control rounded-pill"
          type="text"
          placeholder="Nhập tên đăng nhập, Số điện thoại, Email"
          name="userName"
          onFocus={() => setStateFocusPhone(true)}
          onBlur={() => setStateFocusPhone(false)}
          ref={register({ required: true, maxLength: 80 })}
        />
        <p className="monkey-color-red monkey-mt-15">
          {errors.userName &&
            "Vui lòng nhập tên đăng nhập hoặc số điện thoại hoặc email"}
        </p>
      </div>

      <div className="form-group position-relative">
        <i
          className={`${isFocusPass ? "monkey-color-violet" : ""} fa fa-lock`}
          aria-hidden="true"
        ></i>
        <input
          style={{ height: "44px", paddingLeft: "34px", paddingRight: "34px" }}
          className="form-control rounded-pill"
          type={isPassword ? "text" : "password"}
          placeholder="Mật khẩu"
          name="password"
          onFocus={() => setStateFocusPass(true)}
          onBlur={() => setStateFocusPass(false)}
          ref={register({ required: true, maxLength: 20 })}
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
              isPassword ? "fa-eye monkey-color-violet" : "fa-eye-slash"
            }`}
            aria-hidden="true"
          ></i>
        )}

        <p className="monkey-color-red monkey-mt-15">
          {errors.password && "Vui lòng nhập mật khẩu"}
        </p>
      </div>
      {!errors.password && props.isStatus && (
        <div className="text-center monkey-color-red mb-3">
          {props.messageError}
        </div>
      )}
      <input
        style={{ height: "44px" }}
        className="btn monkey-bg-violet hvr-registration-white monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 monkey-mb-30"
        type="submit"
        value="Đăng nhập"
      />

      <p className="monkey-mt-5 monkey-mb-15 monkey-fz-14">
        <Link
          className="monkey-color-violet monkey-f-bold cursor"
          to={PATH.ROUTE_PATH_FORGOT_PASSWORD}
        >
          <i>Quên mật khẩu?</i>
        </Link>
      </p>
    </form>
  );
};

export default LoginComponent;

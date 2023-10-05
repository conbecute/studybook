import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TEXT_CONFIRM_PASS_WORD } from "../../../constants/text";
import * as PATH from "../../../constants/path";
import PhoneInput from "react-phone-input-2";
import { useHistory } from "react-router-dom";

const FromSignUpComponent = (props) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [check_confirm_passWord, checkConfirmPassWord] = useState("");
  const [numberPhone, setStateNumberPhone] = useState(false);
  const [errorPhone, setStateErrorPhone] = useState(false);
  const [isPassword, setStatePassword] = useState(false);
  const [isConfirmPassword, setStateConfirmPassword] = useState(false);
  const iconShowPassword = watch("password");
  const iconConfirmPassword = watch("confirm_password");
  const [isFocusPassword, setStateFocusPassword] = useState(false);
  const [isFocusConfirmPassword, setStateFocusConfirmPassword] =
    useState(false);

  const history = useHistory();
  const onChangePhoneNumber = (value) => {
    if (value) {
      setStateNumberPhone(value);
      setStateErrorPhone(false);
    } else {
      setStateErrorPhone(true);
    }
  };

  const onSignUp = (data) => {
    if (data.password !== data.confirm_password) {
      checkConfirmPassWord(TEXT_CONFIRM_PASS_WORD);
    } else {
      checkConfirmPassWord("");
    }
    if (numberPhone) {
      setStateErrorPhone(false);
    } else {
      setStateErrorPhone(true);
    }
    const newData = {
      phone: numberPhone,
      password: data.password,
    };
    if (!errorPhone && !isFocusPassword && !isFocusConfirmPassword) {
      props.onSignUp(newData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <div className="form-group">
        <PhoneInput
          country="vn"
          value={numberPhone}
          onChange={(phone) => onChangePhoneNumber(phone)}
          className="form-control rounded-pill"
          onlyCountries={["vn"]}
          defaultCountry="vn"
          disableAreaCodes={true}
          disableCountryCode={true}
          disableDropdown={true}
          placeholder="Nhập số điện thoại"
        />
        <p className="monkey-color-red monkey-mt-15">
          {errorPhone && "Vui lòng nhập số điện thoại"}
        </p>
      </div>

      <div className="form-group position-relative">
        <i
          className={`${
            isFocusPassword ? "monkey-color-violet" : ""
          } fa fa-lock`}
          aria-hidden="true"
        ></i>
        <input
          style={{ height: "44px", paddingLeft: "34px", paddingRight: "34px" }}
          className="form-control rounded-pill"
          type={isPassword ? "text" : "password"}
          placeholder="Mật khẩu"
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
              isPassword ? "fa-eye monkey-color-violet" : "fa-eye-slash"
            }`}
            aria-hidden="true"
          ></i>
        )}

        <p className="monkey-color-red monkey-mt-15">
          {errors.password?.type === "required" && "Vui lòng nhập mật khẩu"}
          {errors.password?.type === "minLength" &&
            "Mật khẩu phải từ 8 ký tự trở lên"}
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
          style={{ height: "44px", paddingLeft: "34px", paddingRight: "34px" }}
          className="form-control rounded-pill"
          type={isConfirmPassword ? "text" : "password"}
          placeholder="Xác nhận mật khẩu"
          name="confirm_password"
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
            onClick={() => setStateConfirmPassword(!isConfirmPassword)}
            className={`fa cursor ${
              isConfirmPassword ? "fa-eye monkey-color-violet" : "fa-eye-slash"
            }`}
            aria-hidden="true"
          ></i>
        )}

        <p className="monkey-color-red monkey-mt-15">
          {errors.confirm_password?.type === "required" &&
            "Vui lòng xác nhận mật khẩu"}
          {errors.confirm_password?.type === "minLength" &&
            "Mật khẩu phải từ 8 ký tự trở lên"}
        </p>
      </div>

      {check_confirm_passWord && (
        <div className="text-center monkey-color-red mb-3">
          {check_confirm_passWord}
        </div>
      )}

      {props.isStatus && (
        <div className="text-center monkey-color-red mb-3">
          {props.messageError}
        </div>
      )}

      <input
        style={{ height: "44px" }}
        className="btn monkey-bg-violet hvr-registration-white monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 monkey-mb-30"
        type="submit"
        value="Đăng ký"
      />

      <p className="monkey-mb-30">
        <i>Nếu đã sử dụng ứng dụng học tập Monkey, hãy</i>
        <a
          className="monkey-color-violet monkey-f-bold cursor"
          onClick={() => history.push(PATH.ROUTE_PATH_SIGN_IN)}
        >
          &nbsp; đăng nhập ngay
        </a>
        <i> bằng số điện thoại đã dùng trong ứng dụng.</i>
      </p>
    </form>
  );
};

export default FromSignUpComponent;

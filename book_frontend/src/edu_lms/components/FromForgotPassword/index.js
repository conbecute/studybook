import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import { onDispatchDataInfo } from "../../modules/SignIn/actions";
import * as TEXT from "../../constants/text";
import { APP_ID } from "../../constants/type";

const FromForgotPassword = (props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [isStatus, onSetStatus] = useState(false);
  const [messageError, onSetMessageError] = useState("");
  const [isFocusPassword, setStateFocusPassword] = useState(false);
  const [isFocusNewPassword, setStateFocusNewPassword] = useState(false);
  const [isFocusConfirmNewPassword, setStateFocusConfirmNewPassword] =
    useState(false);

  const onConfirm = (data) => {
    if (data.new_password !== data.new_password_confirm) {
      onSetStatus(true);
      onSetMessageError("Mật khẩu không trùng khớp");
    } else {
      onSetStatus(false);
      const userInfo = {
        old_password: data.old_password,
        new_password: data.new_password,
        app_id: APP_ID,
        is_web: 1,
      };
      props.onResetPW(userInfo);
      reset();
    }
  };
  return (
    <form className="from-info p-3" onSubmit={handleSubmit(onConfirm)}>
      <div className="row">
        <div className="col-12">
          <div className="form-group position-relative">
            <i
              style={{ top: "2.5rem" }}
              className={`${
                isFocusPassword ? "monkey-color-violet" : ""
              } fa fa-lock`}
              aria-hidden="true"
            ></i>
            <label className="monkey-color-violet">{TEXT.TEXT_PASSWORD}</label>
            <input
              style={{ height: "44px", paddingLeft: "40px" }}
              className="form-control rounded-pill"
              type="password"
              placeholder={TEXT.TEXT_PASSWORD}
              name="old_password"
              autoComplete="off"
              ref={register({ required: true, maxLength: 20 })}
              onFocus={() => setStateFocusPassword(true)}
              onBlur={() => setStateFocusPassword(false)}
            />
            <p className="monkey-color-red monkey-mt-15">
              {errors.old_password && "Vui lòng nhập mật khẩu hiện tại"}
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group position-relative">
            <i
              style={{ top: "2.5rem" }}
              className={`${
                isFocusNewPassword ? "monkey-color-violet" : ""
              } fa fa-lock`}
              aria-hidden="true"
            ></i>
            <label className="monkey-color-violet">
              {TEXT.TEXT_NEW_PASSWORD}
            </label>
            <input
              style={{ height: "44px", paddingLeft: "40px" }}
              className="form-control rounded-pill"
              type="password"
              placeholder={TEXT.TEXT_NEW_PASSWORD}
              name="new_password"
              autoComplete="off"
              ref={register({ required: true, minLength: 8 })}
              onFocus={() => setStateFocusNewPassword(true)}
              onBlur={() => setStateFocusNewPassword(false)}
            />
            <p className="monkey-color-red monkey-mt-15">
              {errors.new_password?.type === "required" &&
                "Vui lòng nhập mật khẩu muốn thay đổi"}
              {errors.new_password?.type === "minLength" &&
                "Mật khẩu phải từ 8 ký tự trở lên"}
            </p>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group position-relative">
            <i
              style={{ top: "2.5rem" }}
              className={`${
                isFocusConfirmNewPassword ? "monkey-color-violet" : ""
              } fa fa-lock`}
              aria-hidden="true"
            ></i>
            <label className="monkey-color-violet">
              {TEXT.TEXT_CONFIRM_NEW_PASSWORD}
            </label>
            <input
              style={{ height: "44px", paddingLeft: "40px" }}
              className="form-control rounded-pill"
              type="password"
              autoComplete="off"
              placeholder={TEXT.TEXT_CONFIRM_NEW_PASSWORD}
              name="new_password_confirm"
              ref={register({ required: true, minLength: 8 })}
              onFocus={() => setStateFocusConfirmNewPassword(true)}
              onBlur={() => setStateFocusConfirmNewPassword(false)}
            />
            <p className="monkey-color-red monkey-mt-15">
              {errors.new_password_confirm?.type === "required" &&
                "Vui lòng nhập xác nhận lại mật khẩu muốn thay đổi"}
              {errors.new_password_confirm?.type === "minLength" &&
                "Mật khẩu phải từ 8 ký tự trở lên"}
            </p>
          </div>
        </div>
        {isStatus && (
          <div className="text-center monkey-color-red mb-3 pl-3">
            {messageError}
          </div>
        )}
        {props.messageError && (
          <div className="monkey-color-red mb-3 pl-3">{props.messageError}</div>
        )}
        <div className="col-12">
          <input
            style={{ height: "44px" }}
            className="btn monkey-bg-violet monkey-color-white rounded-pill mr-2 hvr-registration-white"
            type="submit"
            value={TEXT.TEXT_DONE}
          />
        </div>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataInfo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(FromForgotPassword);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm, Controller } from "react-hook-form";
import {
  onDispatchShowPopupActivateBook,
  onDispatchShowLoading,
  onDispatchTogglePopupSuccess,
} from "../../modules/App/actions";
import { getCreateAccountTeacher } from "../../services/info/info";
import { onDispatchVerifyOtp } from "../../modules/VerifyOtpPw/actions";
import { useHistory } from "react-router-dom";
import {
  APP_ID_WEB,
  APP_ID_MOBILE,
  LOCAL_STORAGE_KEY_USER_INFO,
} from "../../constants/type";
import {
  verifyOtpPw,
  verifyOtpPwPhone,
} from "../../services/forgotPw/forgotPw";
import { onResultUserInfo, onCryptoData } from "../../modules/selection";
import { error } from "jquery";
import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";

const ContentPopupOTP = ({
  onDispatchShowPopupActivateBook,
  statusModal,
  onDispatchShowLoading,
  userName,
  onDispatchTogglePopupSuccess,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const newDataForm = {
    ...JSON.parse(localStorage.getItem("dataForm")),
    type: JSON.parse(localStorage.getItem("dataForm"))?.type === 2 ? 1 : 2,
  };
  const resultData = JSON.parse(localStorage.getItem("result_data"));
  const useInfo = onResultUserInfo() ? onResultUserInfo() : newDataForm;
  const isDisabled = !isDirty || !isValid;
  const checkValue = resultData ? resultData : newDataForm;

  const [errorMessage, setStateErrorMessage] = useState();
  const history = useHistory();

  const onVerifyOtpPw = (dataForm) => {
    onDispatchShowLoading(true);
    let data = {
      code: dataForm.otp,
      is_web: 1,
    };
    if (Number(checkValue.type) === 1) {
      data = { ...data, email: useInfo.email, app_id: APP_ID_MOBILE };
    } else {
      data = {
        ...data,
        phone: useInfo.phone,
        country_code: "+84",
        app_id: APP_ID_MOBILE,
      };
    }
    if (Number(checkValue.type) === 1) {
      verifyOtpPw(data)
        .then((res) => {
          onDispatchShowLoading(false);
          if (res.data.status === "success") {
            const data = {
              ...useInfo,
              list_grade_subject: JSON.parse(
                localStorage.getItem("listGradeSubject")
              ),
              type_verify: 1,
              code_verify: res.data.data.token_to_change_pw,
            };
            getCreateAccount(data);
          }
          if (res.data.status === "fail") {
            setStateErrorMessage(res.data.message);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      verifyOtpPwPhone(data)
        .then((res) => {
          onDispatchShowLoading(false);
          if (res.data.status === "success") {
            const data = {
              ...useInfo,
              list_grade_subject: JSON.parse(
                localStorage.getItem("listGradeSubject")
              ),
              type_verify: 1,
              code_verify: res.data.data.token_to_change_pw,
            };
            getCreateAccount(data);
          }
          if (res.data.status === "fail") {
            setStateErrorMessage(res.data.message);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  const getCreateAccount = (data) => {
    onDispatchShowLoading(true);
    getCreateAccountTeacher(data)
      .then((res) => {
        onDispatchShowLoading(false);
        if (res.data.status === "fail") {
          setStateErrorMessage(res.data.message);
        }
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.data.access_token);
          localStorage.setItem("user_id", res.data.data.user_id);
          const encryptUserInfo = onCryptoData(
            res.data.data?.user_info,
            LOCAL_STORAGE_KEY_USER_INFO
          );
          localStorage.setItem(LOCAL_STORAGE_KEY_USER_INFO, encryptUserInfo);
          onDispatchShowPopupActivateBook(false);
          const dataSuccessConfig = {
            status: true,
            title: [
              TEXT.TEXT_FINISH_UPDATE_INFO_1,
              TEXT.TEXT_FINISH_UPDATE_INFO_3,
            ],
            url: PATH.ROUTE_PATH_LIST_QUIZ,
            labelButton: TEXT.TEXT_VALUE_BUTTON_FINISH_UPDATE_INFO_2,
          };
          setTimeout(function () {
            onDispatchTogglePopupSuccess(dataSuccessConfig);
            localStorage.setItem("isEventUpdateInfo", false);
            localStorage.setItem("pathQuiz", "");
          }, 0);
        }
      })
      .catch((err) => {
        console.log(error);
        onDispatchShowLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h5 className="mb-4 text-center">
        {checkValue.type === 1
          ? TEXT.TEXT_EMAIL_VERIFY_OTP
          : TEXT.TEXT_PHONE_VERIFY_OTP}
        <span className="monkey-color-violet">
          {" "}
          {checkValue.type === 1 ? useInfo.email : useInfo.phone}{" "}
        </span>
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
          <div className="monkey-color-red monkey-mt-15 text-center">
            {errors.otp && <p>"Vui lòng nhập mã xác thực"</p>}
            {errorMessage && errorMessage}
          </div>
        </div>
        <div className="text-center">
          <input
            style={{ height: "44px" }}
            value="Tiếp tục"
            disabled={isDisabled}
            className={`${
              isDisabled ? "monkey-bg-gray" : "monkey-bg-violet cursor"
            } btn monkey-color-white rounded-pill monkey-pr-45 monkey-pl-45 `}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { listProvince } = state.updateInfoInReducers;
  const { userName } = state.forgotPasswordReducers;
  return {
    listProvince,
    userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchShowPopupActivateBook,
      onDispatchVerifyOtp,
      onDispatchShowLoading,
      onDispatchTogglePopupSuccess,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentPopupOTP);

import React, { Component } from "react";
import { compose } from "redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import SignInWrapper from "./components";
import { postLogin } from "../../services/signIn/signIn";
import {
  onDispatchShowLoading,
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../App/actions";
import { onDispatchListSubjectAll } from "../UpdateInformation/actions";

import {
  onDispatchDataInfo,
  onDispatchListSchoolByProvince,
  onDispatchDataProfile,
} from "./actions";
import {
  APP_ID,
  FACEBOOK_TYPE,
  GMAIL_TYPE,
  PHONE_TYPE,
  USER_CRM,
} from "../../constants/type";
import {
  onDispatchBooksInUse,
  onDispatchAddBookId,
  onDispatchTextbooks,
  onDispatchGradeIdBookTest3710,
} from "../General/actions";
import { onDispatchTogglePopupSuccess } from "../App/actions";
import {
  onAddLocalStorage,
  onCheckValueNull,
  onDataSuccess,
  setItemUserInfo,
} from "../selection";
import { onListGradeSubject } from "../../modules/UpdateInformation/config";
import { getListSubject } from "../../services/app/app";

import { sendOtpVerifyPw } from "../../services/forgotPw/forgotPw";

import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";
import * as TYPE from "../../constants/type";
import { cleanLocalStorage } from "../../constants/general";
import { setEventGTM } from "../../constants/googleTagManager";
import { SIGN_IN } from "../../constants/eventNameGTM";

class SignInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStatus: false,
      messageError: "",
      type: USER_CRM,
      phone: "",
      email: "",
      userNameCrm: "",
      isGoogle: false,
      successful: "",
      loginType: "",
    };
  }

  componentDidMount() {
    cleanLocalStorage();
  }

  onLogin = (data) => {
    this.props.onDispatchShowLoading(true);
    const userName = data.userName.replace(/\s+/g, "");
    let reg = /^[0-9]*[.]?[0-9]*$/;
    if (reg.test(userName)) {
      this.setState({ type: PHONE_TYPE, phone: userName, email: "" });
    } else if (userName.includes("@")) {
      this.setState({
        type: GMAIL_TYPE,
        email: userName,
        phone: "",
        isGoogle: false,
      });
    } else {
      this.setState({ userNameCrm: userName, email: "", phone: "" });
    }
    data = {
      type: this.state.type,
      phone: this.state.phone,
      email: this.state.email,
      user_name_crm: this.state.userNameCrm,
      is_web: 1,
      app_id: APP_ID,
      password: data.password,
    };
    this.onPostLogin(data);
  };

  responseFace = (data) => {
    this.props.onDispatchShowLoading(true);
    data = {
      type: FACEBOOK_TYPE,
      email: data.email ?? data.email,
      name: data.name ?? data.name,
      access_token: data.accessToken,
      is_web: 1,
      app_id: APP_ID,
    };
    this.onPostLogin(data);
  };

  responseGoogle = (data) => {
    this.props.onDispatchShowLoading(true);
    data = {
      type: GMAIL_TYPE,
      email: data.profileObj.email,
      name: data.profileObj.name,
      access_token: data.accessToken,
      is_web: 1,
      app_id: APP_ID,
      isGoogle: true,
    };
    this.onPostLogin(data);
  };
  onPostLogin = (data) => {
    switch (data.type) {
      case FACEBOOK_TYPE:
        this.setState({ loginType: "facebook" });
        break;
      case GMAIL_TYPE:
        this.setState({ loginType: data.isGoogle ? "google" : "email" });
        break;
      case PHONE_TYPE:
        this.setState({ loginType: "phone" });
        break;
      case USER_CRM:
        this.setState({ loginType: "username" });
        break;
      default:
        return;
    }
    const dataForm = data;
    postLogin(data)
      .then((res) => {
        if (res.data.status === "fail") {
          this.setState({ successful: "fail" });
          this.props.onDispatchShowLoading(false);
          this.setState({
            isStatus: true,
            messageError: res.data.message,
          });
        }
        if (res.data.status === "success") {
          this.setState({ successful: "true" });
          this.props.onDispatchShowLoading(false);
          const listGradeSubject = onListGradeSubject(
            res.data.data.user_info.list_grade_subject
          );
          const userInfo = {
            ...res.data.data.user_info,
            list_grade_subject: listGradeSubject,
          };
          setItemUserInfo(userInfo);
          this.props.onDispatchDataInfo(userInfo);
          onAddLocalStorage(
            res.data.data.access_token,
            res.data.data.user_id,
            1
          );
          getListSubject(0)
            .then((res) => {
              if (res.data.status === "success") {
                const configData = res.data?.data?.list_subject.map((item) => ({
                  ...item,
                  label: item.title,
                  value: item.title,
                }));
                this.props.onDispatchListSubjectAll(configData);
              }
            })
            .catch((errors) => {
              console.log(errors);
            });
          const isValueNull = onCheckValueNull(res.data.data.user_info);
          if (this.props.location.state?.from) {
            this.props.history.push(this.props.location.state.from);
          } else {
            if (res.data.data.user_info?.test_book_3_7_10) {
              const dataSuccessConfig = {
                status: true,
                title: [TEXT.TITLE_POPUP_SUCCESS_LOGIN],
                url: PATH.ROUTE_PATH_LIST_BOOK_TEST_3710,
                labelButton: TEXT.BUTTON_ACCESS_LOGIN_3710,
              };

              let grade_id_book_test =
                res.data.data.user_info?.grade_id_book_test == "all"
                  ? 6
                  : res.data.data.user_info?.grade_id_book_test;

              localStorage.setItem(
                "grade_id_book_test",
                res.data.data.user_info?.grade_id_book_test
              );
              localStorage.setItem(
                "test_book_3_7_10",
                res.data.data.user_info?.test_book_3_7_10
              );
              this.props.onDispatchGradeIdBookTest3710(
                grade_id_book_test == "all" ? 6 : grade_id_book_test
              );
              this.props.onDispatchTogglePopupSuccess(dataSuccessConfig);
            } else {
              const dataSuccess = onDataSuccess(
                isValueNull,
                res.data.data.user_info
              );
              this.props.onDispatchTogglePopupSuccess(dataSuccess);
            }
          }
        }
        if (res.data.code === 303 || res.data.code === 304) {
          const dataSuccessConfig = {
            status: true,
            title: [TEXT.TITLE_POPUP_SUCCESS_LOGIN_2],
            url: PATH.ROUTE_PATH_TRAINING_TEST_2,
            labelButton: TEXT.TEXT_VALUE_BUTTON_FINISH_UPDATE_INFO_2,
          };
          this.props.onDispatchTogglePopupSuccess(dataSuccessConfig);
        }

        if (res.data.code === 302) {
          let dataPost = { type: "", is_web: 1 };
          if (dataForm.email) {
            dataPost = {
              ...dataPost,
              type: TYPE.SEND_OTP_PW_BY_EMAIL,
              email: dataForm.email,
              phone: "",
              app_id: TYPE.APP_ID,
            };
          }
          if (dataForm.phone) {
            dataPost = {
              ...dataPost,
              type: TYPE.SEND_OTP_PW_BY_PHONE,
              phone: dataForm.phone,
              email: "",
              app_id: TYPE.APP_ID,
            };
          }
          localStorage.setItem("dataForm", JSON.stringify(dataPost));
          this.props.onDispatchShowLoading(true);
          sendOtpVerifyPw(dataPost)
            .then((res) => {
              this.props.onDispatchShowLoading(false);
              if (res.data.status === "fail") {
                this.setState({
                  isStatus: true,
                  messageError: res.data.message,
                });
              }
              if (res.data.status === "success") {
                this.props.onDispatchTypePopup(TYPE.TYPE_POPUP_OTP);
                this.props.onDispatchShowPopupActivateBook(true);
              }
            })
            .catch((errors) => {
              console.log(errors);
            });
        }
        setEventGTM(
          SIGN_IN,
          ["type", this.state.loginType],
          ["monkey_user", "false"][("successful", this.state.successful)]
        );
      })
      .catch((errors) => {
        console.log(errors);
        this.props.onDispatchShowLoading(false);
      });
  };
  render() {
    const { messageError, isStatus } = this.state;
    return (
      <SignInWrapper
        onLogin={this.onLogin}
        isStatus={isStatus}
        messageError={messageError}
        responseFace={this.responseFace}
        responseGoogle={this.responseGoogle}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { gradeIdTextBook, gradeIdBookUsed, listBookInUse, listTextbooks } =
    state.generalReducer;
  return {
    gradeIdTextBook,
    gradeIdBookUsed,
    listBookInUse,
    listTextbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataInfo,
      onDispatchAddBookId,
      onDispatchBooksInUse,
      onDispatchTextbooks,
      onDispatchTogglePopupSuccess,
      onDispatchShowLoading,
      onDispatchListSchoolByProvince,
      onDispatchDataProfile,
      onDispatchListSubjectAll,
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
      onDispatchGradeIdBookTest3710,
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignInContainer);

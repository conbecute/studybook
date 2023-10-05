import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignUpWrapper from "./components";
import { postRegister } from "../../services/signUp/signUp";
import {
  APP_ID,
  FACEBOOK_TYPE,
  GMAIL_TYPE,
  PHONE_TYPE,
  LOCAL_STORAGE_KEY_USER_INFO,
} from "../../constants/type";
import { onDispatchDataInfo } from "../SignIn/actions";
import {
  onDispatchTogglePopupSuccess,
  onDispatchShowLoading,
} from "../App/actions";
import * as TEXT from "../../constants/text";
import * as PATH from "../../constants/path";
import { postLogin } from "../../services/signIn/signIn";
import { onCheckValueNull, onDataSuccess, onCryptoData } from "../selection";
import { setEventGTM } from "../../constants/googleTagManager";
import { SIGN_UP } from "../../constants/eventNameGTM";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStatus: false,
      messageError: "",
    };
  }

  callback = (data) => {
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
    data = {
      type: GMAIL_TYPE,
      email: data.profileObj.email,
      name: data.profileObj.name,
      access_token: data.accessToken,
      is_web: 1,
      app_id: APP_ID,
    };
    this.onPostLogin(data);
  };

  onSignUp = (data) => {
    this.props.onDispatchShowLoading(true);
    data = {
      type: PHONE_TYPE,
      phone: data.phone,
      is_web: 1,
      app_id: APP_ID,
      password: data.password,
    };
    postRegister(data)
      .then((data) => {
        if (data.data.status === "fail") {
          setEventGTM(
            SIGN_UP,
            ["login_type", "phone"],
            ["login_successful", false]
          );
          this.props.onDispatchShowLoading(false);
          this.setState({
            isStatus: true,
            messageError: data.data.message,
          });
        }
        if (data.data.status === "success") {
          setEventGTM(
            SIGN_UP,
            ["login_type", "phone"],
            ["login_successful", true]
          );
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchDataInfo(data.data.data.user_info);
          localStorage.setItem("token", data.data.data.access_token);
          localStorage.setItem("user_id", data.data.data.user_id);
          const encryptUserInfo = onCryptoData(
            data.data.data.user_info,
            LOCAL_STORAGE_KEY_USER_INFO
          );
          localStorage.setItem(LOCAL_STORAGE_KEY_USER_INFO, encryptUserInfo);

          // if (data.data.data.user_info?.email) {
          //   localStorage.setItem("email", data.data.data.user_info.email);
          // }
          // if (data.data.data.user_info?.phone) {
          //   localStorage.setItem("phone", data.data.data.user_info.phone);
          // }
          const dataSuccess = {
            status: true,
            title: [TEXT.TITLE_POPUP_SUCCESS_REGISTER],
            url: PATH.ROUTE_UPDATE_INFORMATION,
            labelButton: TEXT.TITLE_BUTTON_UPDATE,
          };

          this.props.onDispatchTogglePopupSuccess(dataSuccess);
        }
      })
      .catch((errors) => {
        this.props.onDispatchShowLoading(false);
        console.log(errors);
      });
  };

  onPostLogin = (data) => {
    postLogin(data)
      .then((res) => {
        if (res.data.status === "fail") {
          this.setState({
            isStatus: true,
            messageError: res.data.message,
          });
        }
        if (res.data.status === "success") {
          this.props.onDispatchShowLoading(false);
          this.props.onDispatchDataInfo(res.data.data.user_info);
          localStorage.setItem("token", res.data.data.access_token);
          localStorage.setItem("user_id", res.data.data.user_id);
          const encryptUserInfo = onCryptoData(
            data.data.data.user_info,
            LOCAL_STORAGE_KEY_USER_INFO
          );
          localStorage.setItem(LOCAL_STORAGE_KEY_USER_INFO, encryptUserInfo);

          // if (res.data.data.user_info?.email) {
          //   localStorage.setItem("email", res.data.data.user_info.email);
          // }
          // if (res.data.data.user_info?.phone) {
          //   localStorage.setItem("phone", res.data.data.user_info.phone);
          // }
          const isValueNull = onCheckValueNull(res.data.data.user_info);
          const dataSuccess = onDataSuccess(
            isValueNull,
            res.data.data.user_info
          );
          this.props.onDispatchTogglePopupSuccess(dataSuccess);
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  render() {
    const { isStatus, messageError } = this.state;

    return (
      <SignUpWrapper
        onSignUp={this.onSignUp}
        isStatus={isStatus}
        messageError={messageError}
        callback={this.callback}
        responseGoogle={this.responseGoogle}
      />
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     navigationOption: state.fna.paContainer,
//     language: state.fna.settings.language,
//     isLoggedIn: isLoggedIn(state),
//     isFnaPilot: isFnaPilot(state)
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTogglePopupSuccess,
      onDispatchShowLoading,
      onDispatchDataInfo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SignUpContainer);

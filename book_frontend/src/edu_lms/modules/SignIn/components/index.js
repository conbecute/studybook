import React from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import LoginComponent from "./LoginComponent";
import FooterComponent from "./FooterComponent";
import LogoComponent from "../../../components/Header/LogoComponent";
import { TEXT_HEADER_LOGIN, TEXT_NOTE_LOGIN } from "../../../constants/text";
import * as PATH from "../../../constants/path";

const SignInWrapper = (props) => {
  // const onSignInFace = (data) => {
  //   console.log(data);
  // };
  const responseFace = (response) => {
    props.responseFace(response);
  };
  const responseGoogle = (response) => {
    props.responseGoogle(response);
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
              <h4 className="monkey-f-header monkey-color-violet text-uppercase ">
                {TEXT_HEADER_LOGIN}
              </h4>

              <p className="monkey-mb-30 monkey-mt-20 monkey-fz-12">
                <i>{TEXT_NOTE_LOGIN}</i>
              </p>

              <LoginComponent
                onLogin={props.onLogin}
                isStatus={props.isStatus}
                messageError={props.messageError}
              />

              <FacebookLogin
                appId={402736724816484}
                autoLoad={false}
                fields="name,email,picture"
                // onClick={onSignInFace}
                callback={responseFace}
                cssClass="facebook-button monkey-color-white monkey-bg-neon-blue border-0 rounded-pill monkey-mb-15 d-flex justify-content-center align-items-center"
                textButton="Đăng nhập với Facebook"
                isMobile={false}
                icon={
                  <i
                    className="fa fa-facebook monkey-mr-15"
                    aria-hidden="true"
                  ></i>
                }
              />
              <div className="monkey-mb-15">
                <GoogleLogin
                  clientId="794463747839-s2c9mvrkreignl677mvcibvgikto4v09.apps.googleusercontent.com"
                  buttonText="Đăng nhập với Google"
                  className="google-button w-100 social_lnk_btn border cursor monkey-bg-blue rounded-pill monkey-p-15 monkey-mb-15 d-flex justify-content-center"
                  onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                />
              </div>

              <FooterComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInWrapper;

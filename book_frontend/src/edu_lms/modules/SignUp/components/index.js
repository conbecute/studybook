import React from "react";
import FromSignUpComponent from "./FromSignUpComponent";
import FooterComponent from "./FooterComponent";
import LogoComponent from "../../../components/Header/LogoComponent";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { TEXT_HEADER_REGISTER } from "../../../constants/text";
import { setEventGTM } from "../../../constants/googleTagManager";
import { SIGN_UP } from "../../../constants/eventNameGTM";

const SignUpWrapper = (props) => {
  const responseFace = (response) => {
    props.callback(response);
    setEventGTM(
      SIGN_UP,
      ["login_type", "facebook"],
      ["login_successful", true]
    );
  };
  const responseGoogle = (response) => {
    props.responseGoogle(response);
    setEventGTM({
      event: SIGN_UP,
      login_type: "google",
      login_successful: true,
    });
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
              <h4 className="monkey-f-header monkey-color-violet text-uppercase mb-4">
                {TEXT_HEADER_REGISTER}
              </h4>
              <FromSignUpComponent
                onSignUp={props.onSignUp}
                isStatus={props.isStatus}
                messageError={props.messageError}
              />

              <FacebookLogin
                appId={402736724816484}
                autoLoad={false}
                fields="name,email,picture"
                // onClick={onSignInFace}
                isMobile={false}
                callback={responseFace}
                cssClass="facebook-button monkey-color-white monkey-bg-neon-blue border-0 rounded-pill monkey-mb-15 d-flex justify-content-center align-items-center"
                textButton="Đăng ký với Facebook"
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
                  buttonText="Đăng ký với Google"
                  className="google-button w-100 social_lnk_btn border cursor d-flex justify-content-center monkey-color-white monkey-bg-blue rounded-pill monkey-p-15 monkey-mb-15"
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

export default SignUpWrapper;

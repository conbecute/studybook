import React, { Fragment, useRef, useEffect } from "react";
import Slider from "react-slick";

import { DATA_MENU_INFO_TEACHER } from "../config";
import FromUpdateInformation from "../../../components/FromUpdateInformation";
import FromCommunications from "../../../components/FromCommunications";
import FromForgotPassword from "../../../components/FromForgotPassword";
import FromSchoolInfo from "../../../components/FromSchoolInfo";
import FromTeachingInformation from "../../../components/FromTeachingInformation";

const SectionUpdateInfoUser = (props) => {
  const status = localStorage.getItem("status");
  const sliderRef = useRef();
  useEffect(() => {
    if (props.isForgotPassword) {
      sliderRef.current.slickGoTo(props.numberActiveSlider);
    }
  }, [props.numberActiveSlider, props.isForgotPassword]);

  const onSlickNext = () => {
    sliderRef.current.slickNext();
  };
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: false,
    arrows: false,
    equalizeHeight: true,
    adaptiveHeight: true,
    swipe: false,
    className: "slider variable-width",
    dotsClass: "slick-thumb d-flex flex-column dot_info",
    customPaging: function (i) {
      return (
        <span
          className="cursor d-flex"
          style={{
            marginLeft: "-25px",
            pointerEvents: Number(status) === 1 ? "auto" : "none",
          }}
        >
          <i
            className={`${
              DATA_MENU_INFO_TEACHER[i + 1]["icon"]
            } fa mr-2 money-fz-18 d-desktop`}
          ></i>
          {DATA_MENU_INFO_TEACHER[i + 1]["value"]}
        </span>
      );
    },
  };

  return (
    <Fragment>
      {props.isForgotPassword && (
        <Slider ref={sliderRef} {...settings}>
          <div className="list-item">
            <FromUpdateInformation
              onSlickNext={onSlickNext}
              onUpdateInfo={props.onUpdateInfo}
              userInfo={props.userInfo}
              valueJob={props.valueJob}
            />
          </div>
          <div className="list-item">
            <FromSchoolInfo
              onSlickNext={onSlickNext}
              onUpdateInfo={props.onUpdateInfo}
              listProvince={props.listProvince}
              listDistrict={props.listDistrict}
              listWard={props.listWard}
              listGradeAll={props.listGradeAll}
              listSchool={props.listSchool}
              userInfo={props.userInfo}
              valueProvinceDefault={props.valueProvinceDefault}
              valueDistrictDefault={props.valueDistrictDefault}
              valueWardDefault={props.valueWardDefault}
              valueGradeDefault={props.valueGradeDefault}
              valueSchool={props.valueSchool}
              valueJob={props.valueJob}
              valueSchoolName={props.valueSchoolName}
              statusSchool={props.statusSchool}
            />
          </div>
          <div className="list-item">
            <FromTeachingInformation
              listGradeAll={props.listGradeAll}
              dataTeachingInformation={props.dataTeachingInformation}
              onUpdateTeachingInformation={props.onUpdateTeachingInformation}
              listTeachingInformation={props.listTeachingInformation}
              listSubjectAll={props.listSubjectAll}
              onGetListSubject={props.onGetListSubject}
              userInfo={props.userInfo}
              onSlickNext={onSlickNext}
            />
          </div>
          <div className="list-item">
            <FromCommunications
              onSlickNext={onSlickNext}
              // onUpdateInfo={props.onUpdateInfo}
              userInfo={props.userInfo}
            />
          </div>
          {/* {status == 1 && (
            <div className="list-item">
              <FromSetting
                notification={props.notification}
                onUpdateInfo={props.onUpdateInfo}
                userInfo={props.userInfo}
              />
            </div>
          )} */}
        </Slider>
      )}
      {!props.isForgotPassword && (
        <div className="forgot_password_wrapper d-flex justify-content-end">
          <div className="nav_forgot_password monkey-color-violet monkey-f-bold">
            <i className="fa-lock fa mr-2 money-fz-18 d-desktop"></i>
            Đổi mật khẩu
          </div>
          <div className="slick-list">
            <FromForgotPassword
              onResetPW={props.onResetPW}
              messageError={props.messageError}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SectionUpdateInfoUser;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import LogoComponent from "./LogoComponent";
import SectionLogin from "./components/SectionLogin";
import SectionProfile from "./components/SectionProfile";
import IconNewSvg from "../../assets/images/new-badge.svg";
import {
  onDispatchShowPopupActivateBook,
  onDispatchTypePopup,
  onDispatchTogglePopupSuccess,
  onDispatchShowPopupPDF,
} from "../../modules/App/actions";
import * as PATH from "../../constants/path";
import * as PATH_NAME from "../../constants/routerName";
import * as TEXT from "../../constants/text";
import { COLOR_BLUE, TYPE_POPUP_ACTIVE_BOOK } from "../../constants/type";
import { setEventGTM } from "../../constants/googleTagManager";
import { CLICK_LECTURE_LINK } from "../../constants/eventNameGTM";

const ImageStyle = styled.img`
  position: absolute;
  width: 36px;
  top: 14px;
  right: -16px;
`;

export const HeaderComponent = (props) => {
  const activeStyle = {
    borderBottom: `4px solid ${COLOR_BLUE}`,
  };
  const [isShowNavIem, setStateItem] = useState();
  const [isActive, setStateActive] = useState(false);
  const onShowPopupNotification = () => {
    const access_token = localStorage.getItem("token");
    if (access_token) {
      props.onDispatchTypePopup(TYPE_POPUP_ACTIVE_BOOK);
      props.onDispatchShowPopupActivateBook(true);
    } else {
      const dataSuccess = {
        status: true,
        title: [TEXT.TITLE_POPUP_NOTIFICATION],
        url: PATH.ROUTE_PATH_SIGN_IN,
        labelButton: TEXT.TITLE_SIGN_IN,
        icon: "fa-exclamation",
        close: true,
      };
      props.onDispatchTogglePopupSuccess(dataSuccess);
    }
  };

  const onShowNavItem = () => {
    if (window.innerWidth <= 1024) {
      setStateItem(!isShowNavIem);
    }
  };

  return (
    <header className="monkey-header monkey-bg-light-gray fixed-top border-bottom">
      <section className="monkey-bg-white monkey-nav-wrapper">
        <div className="container-fluid container-xl">
          <nav className="navbar navbar-expand-lg navbar-light monkey-nav">
            <span
              onClick={() => setStateActive(!isActive)}
              className="toggler-icon d-mobile"
            >
              <span className="hamburger"></span>
            </span>
            <LogoComponent />
            <div className="profile-mobile">{isMobile && onCheckLogin()}</div>
            <div className={`${isActive ? "active" : ""} monkey-collapse`}>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item monkey-nav-item distance-center">
                  <NavLink
                    className="nav-link nav-link-monkey distance-center"
                    to={PATH.ROUTE_PATH_GENERAL}
                  >
                    {PATH_NAME.ROUTE_NAME_PRODUCT}
                  </NavLink>
                </li>
                <li className="nav-item monkey-nav-item">
                  <NavLink
                    className="nav-link nav-link-monkey distance-center"
                    to={PATH.ROUTE_PATH_EDUCATION_PROGRAM}
                  >
                    {PATH_NAME.ROUTE_NAME_PROGRAMME_GDPT}
                  </NavLink>
                </li>
                <li
                  className={`${
                    isShowNavIem ? "active" : ""
                  } nav-item monkey-nav-item pr-4`}
                  onClick={onShowNavItem}
                >
                  <span className="nav-link nav-link-monkey distance-center">
                    {PATH_NAME.ROUTE_NAME_TRAINING}
                    <span className="icon-caret-down">
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </span>
                  <div className="monkey-dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to={PATH.ROUTE_PATH_EDUCATION_TEACHER}
                    >
                      {PATH_NAME.ROUTE_NAME_EDUCATION_TEACHER}
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={PATH.ROUTE_PATH_ELECTRONIC_COURSEWARE}
                    >
                      {PATH_NAME.ROUTE_NAME_ELECTRONIC_COURSEWARE}
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={PATH.ROUTE_PATH_TRAINING_TEST}
                    >
                      {PATH_NAME.ROUTE_NAME_TRAINING_TEST}
                    </Link>
                  </div>
                </li>

                <li className="nav-item monkey-nav-item">
                  <NavLink
                    className="nav-link nav-link-monkey distance-center icon-new"
                    to={PATH.ROUTE_PATH_SLIDE_LIBRARY}
                    onClick={() => setEventGTM({ event: CLICK_LECTURE_LINK })}
                  >
                    {PATH_NAME.ROUTE_NAME_SLIDE_LIBRARY}
                    <ImageStyle src={IconNewSvg} alt="" />
                  </NavLink>
                </li>

                {onCheckRouterGeneral(activeStyle, onShowPopupNotification)}
                {!isMobile && onCheckLogin()}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </header>
  );
};

const mapStateToProps = (state) => {
  const { statusModal, dataPopupPdf } = state.app;
  return {
    dataPopupPdf,
    statusModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTogglePopupSuccess,
      onDispatchShowPopupActivateBook,
      onDispatchTypePopup,
      onDispatchShowPopupPDF,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

function onCheckLogin(info = {}) {
  const access_token = localStorage.getItem("token");

  if (access_token) {
    return <SectionProfile info={info} />;
  } else {
    return <SectionLogin />;
  }
}
function onCheckRouterGeneral(activeStyle, onShowPopupNotification) {
  return (
    <li
      className={`${
        isMobile ? "mt-2" : ""
      } nav-item ml-2 distance-center d-flex`}
    >
      <div
        className="btn monkey-bg-violet hvr-registration monkey-f-bold monkey-color-white nav-link-monkey rounded-pill monkey-fz-15 text-uppercase"
        onClick={onShowPopupNotification}
      >
        {PATH_NAME.ROUTE_NAME_ADD_BOOK}
      </div>
    </li>
  );
}

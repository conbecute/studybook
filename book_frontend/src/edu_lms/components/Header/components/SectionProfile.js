import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import * as PATH_NAME from "../../../constants/routerName";
import * as PATH from "../../../constants/path";
import { onDispatchDataInfo } from "../../../modules/SignIn/actions";
import iconDropdown from "../../../assets/images/icon-dropdown.svg";
import AVATAR_USER from "../../../assets/images/icon-avatar-login.svg";
import { cleanLocalStorage } from "../../../constants/general";

export const Image = styled.img`
  src: ${(props) => props.src};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const SectionProfile = ({ info, onDispatchDataInfo }) => {
  const [isShowProfile, setStateProfile] = useState();
  const history = useHistory();
  const onLogOut = () => {
    cleanLocalStorage();
    history.push(PATH.ROUTE_PATH_SIGN_IN);
    const userInfo = {
      job_id: "",
      full_name: "",
      birth_day: "",
      gender_id: "",
      email: "",
      phone: "",
      province_id: "",
      district_id: "",
      ward_id: "",
      school_id: "",
      grade_id: "",
    };
    onDispatchDataInfo(userInfo);
  };

  const onShowProfile = () => {
    if (window.innerWidth <= 1024) {
      setStateProfile(!isShowProfile);
    }
  };

  const onGoToUpdateInfo = () => {
    localStorage.setItem("status", 1);
    history.push(PATH.ROUTE_UPDATE_INFORMATION);
  };
  const onShowForgotPassword = () => {
    history.push(PATH.ROUTE_PATH_UPDATE_PASSWORD);
  };
  return (
    <Fragment>
      <li
        className={`${
          isShowProfile ? "active" : ""
        } nav-item ml-2 monkey-nav-item button-profile`}
        onClick={onShowProfile}
      >
        <div className="nav-link nav-link-monkey distance-center">
          <Image src={info.avatar ? info.avatar : AVATAR_USER} />
          <img
            style={{ width: "10px", marginLeft: "10px" }}
            src={iconDropdown}
            alt="#"
          />
        </div>
        <div className="monkey-dropdown-menu">
          {!localStorage.getItem("test_book_3_7_10") && (
            <>
              <div
                onClick={onGoToUpdateInfo}
                className="dropdown-item"
                href="#"
              >
                {PATH_NAME.ROUTE_NAME_INFO}
              </div>
              <div onClick={onShowForgotPassword} className="dropdown-item">
                {PATH_NAME.ROUTE_NAME_FORGOT_PASSWORD}
              </div>
            </>
          )}
          <div className="dropdown-item" onClick={onLogOut}>
            {PATH_NAME.ROUTE_NAME_LOGOUT}
          </div>
        </div>
      </li>
    </Fragment>
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

export default connect(null, mapDispatchToProps)(SectionProfile);

import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import * as PATH from "../../../constants/path";
import "react-toastify/dist/ReactToastify.css";
import {
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
} from "../../App/actions";
import { INNER_WIDTH } from "../../../constants/type";

const Header = ({ title, gradeName, subjectName }) => {
  const history = useHistory();
  const [isShowHeader, setStateShowHeader] = useState(true);
  const [isShowButton, setStateShowButton] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= INNER_WIDTH.MOBILE) {
      handleLoading();
    }
  }, []);

  const onShowHeader = () => {
    setStateShowHeader(!isShowHeader);
  };
  const handleLoading = () => {
    setTimeout(function () {
      setStateShowHeader(false);
      setStateShowButton(true);
    }, 0);
  };

  return (
    <NavWrapper>
      <Animated
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        animationInDuration={1000}
        animationOutDuration={1000}
        isVisible={isShowHeader}
      >
        <Header1>
          <div className="d-flex h-100 justify-content-start ml-2 justify-content-between mx-md-5">
            <div className="d-flex align-items-center justify-content-center">
              <Button
                className="btn btn-secondary"
                onClick={() => history.push(PATH.ROUTE_PATH_MY_STUDY)}
              >
                <i
                  className="fa fa-long-arrow-left monkey-fz-22 cursor align-items-center "
                  aria-hidden="true"
                />
              </Button>
              <Span className="font-weight-bold d-none d-md-block">
                {subjectName}
              </Span>
              <Span className="font-weight-bold d-none d-md-block">
                {gradeName}
              </Span>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <span className=" monkey-fz-20 text-center mb-1 font-weight-bold">
                {title}
              </span>
            </div>
            <div className="my-auto">
              <button
                style={{ color: "white", width: "120px" }}
                className="btn monkey-bg-question"
                type="submit"
              >
                <i className="fa fa-floppy-o mr-1" aria-hidden="true"></i>
                Lưu
              </button>
            </div>
          </div>
        </Header1>
      </Animated>
      {isShowButton && (
        <Animated
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={isShowButton}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              position: "absolute",
              right: "0",
              top: `${isShowHeader ? "38px" : "0"}`,
              opacity: `${isShowButton ? "1" : "0"}`,
              transition: "all 0.5s linear",
            }}
          >
            <i
              onClick={onShowHeader}
              className={`${
                isShowHeader ? "fa-rotate-180" : ""
              } fa fa-chevron-down monkey-fz-30 cursor`}
              aria-hidden="true"
              style={{
                transition: "all 0.5s linear",
              }}
            ></i>
          </div>
        </Animated>
      )}
    </NavWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Header);

const NavWrapper = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
`;
const Header1 = styled.div`
  height: 58px;
  width: 100%;
  position: relative;
  background-color: #eaeced;
`;

const Span = styled.span`
  margin-left: 20px;
  line-height: 22px;
  height: 37px;
  padding: 7px 10px;
  background-color: #fff;
  border-radius: 5px;
`;
const Button = styled.button`
  height: 37px;
  background-color: #2a404f;
`;

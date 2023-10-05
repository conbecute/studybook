import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Tooltip } from "reactstrap";
import { onDispatchIncreaseBookTool } from "../../General/actions";
import IconLeft from "edu_lms/assets/images/icon-left.svg";

import {
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
  onDispatchStatusTour,
} from "../../../modules/App/actions";
import {
  COLOR_BLACK_READING_BOOK,
  TYPE_POPUP_SUPPORT,
} from "../../../constants/type";
import { INNER_WIDTH } from "../../../constants/type";
import { setEventGTM } from "../../../constants/googleTagManager";
import { OPEN_BOOK } from "../../../constants/eventNameGTM";
import HeaderLeftReadingBook from "./readingBooksV2/HeaderLeftReadingBook";

const HeaderReadingBook = ({
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
  onDispatchStatusTour,
}) => {
  const history = useHistory();
  const [isShowHeader, setStateShowHeader] = useState(true);
  const [isShowButton, setStateShowButton] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const bookInfo = useSelector((state) => state.generalReducer.bookInfo);
  const dispatch = useDispatch();
  const [getTitleSubject, setStateGetTitleSubject] = useState([]);

  useEffect(() => {
    if (window.innerWidth <= INNER_WIDTH.MOBILE) {
      handleLoading();
    }
    setStateGetTitleSubject(JSON.parse(localStorage.dataRecentBook || "[]"));
  }, []);

  useEffect(
    () =>
      setStateGetTitleSubject(JSON.parse(localStorage.dataRecentBook || "[]")),
    [localStorage.dataRecentBook]
  );

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const onShowHeader = () => {
    setStateShowHeader(!isShowHeader);
  };
  const handleLoading = () => {
    setTimeout(function () {
      setStateShowHeader(false);
      setStateShowButton(true);
    }, 0);
  };

  const onShowPopupSupport = () => {
    onDispatchTypePopup(TYPE_POPUP_SUPPORT);
    onDispatchShowPopupActivateBook(true);
  };

  const onDispatchStatusIntro = () => {
    onDispatchStatusTour(true);
  };

  const handleBackPage = () => {
    {
      history.goBack();
      setEventGTM({
        event: OPEN_BOOK,
        book_name: bookInfo.bookName,
        book_type: bookInfo.bookType,
        book_grade: bookInfo.bookGrade,
        book_subject: bookInfo.bookSubject,
        count_click_cursor: bookInfo.count_click_cursor,
        count_click_pencil: bookInfo.count_click_pencil,
        count_click_brush: bookInfo.count_click_brush,
        count_add_text: bookInfo.count_add_text / 2,
        count_add_hyperlink: bookInfo.count_add_hyperlink / 2,
        count_add_line: bookInfo.count_add_line,
        count_add_rectangle: bookInfo.count_add_rectangle,
        count_add_circle: bookInfo.count_add_circle,
        count_click_delete: bookInfo.count_click_delete,
        count_click_delete_all: bookInfo.count_click_delete_all,
        count_select_color: bookInfo.count_select_color,
        count_zoom_in: bookInfo.count_zoom_in,
        count_zoom_out: bookInfo.count_zoom_out,
        count_zoom_back_100: bookInfo.count_zoom_back_100,
        count_change_page: bookInfo.count_change_page,
        count_show_tools: bookInfo.count_show_tools,
        count_open_book_instructions: bookInfo.count_open_book_instructions,
        count_open_table_of_contents: Math.round(
          bookInfo.count_open_table_of_contents / 2
        ),
      });
    }
  };

  return (
    <Fragment>
      <NavWrapper>
        <Animated
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={isShowHeader}
        >
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            className="header-reading-book d-flex"
            // className="d-flex pl-3 pr-3 pt-1 pb-1 align-items-center justify-content-between"
          >
            <div className="pr container-logo">
              {/* <Link className="logo width-logo" to="">
                <img src="/assets/img/updated_logo.png" alt="logo-hoc10" />
              </Link> */}
            </div>
            {/* <div
              onClick={handleBackPage}
              className="cursor rounded-pill monkey-f-header d-flex align-items-center"
            >
              <img src={IconLeft} alt="" className="pr-2" />
              {!isMobile && window.innerWidth > INNER_WIDTH.MOBILE && (
                <span>Kho sách của tôi</span>
              )}
            </div> */}
            <p className="text-uppercase monkey-fz-18 monkey-f-header">
              <img
                src={IconLeft}
                alt="img-go-back"
                className="img-go-back cursor"
                onClick={handleBackPage}
              />{" "}
              <span className="subject-name">{bookInfo.bookName}</span>
            </p>
            {/* <div className="dropdown">
              <div
                className="cursor"
                id="reading-support-tooltip"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() =>
                  dispatch(
                    onDispatchIncreaseBookTool("count_open_book_instructions")
                  )
                }
              >
                <i
                  className="fa fa-question-circle monkey-fz-30 monkey-color-orange mr-2 ml-2"
                  aria-hidden="true"
                />
                <Tooltip
                  className="d-block"
                  placement="left"
                  isOpen={tooltipOpen}
                  target="reading-support-tooltip"
                  toggle={toggle}
                >
                  Hướng dẫn sử dụng
                </Tooltip>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="reading-support-tooltip"
              >
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={onShowPopupSupport}
                >
                  Hướng dẫn sử dụng
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={onDispatchStatusIntro}
                >
                  Giới thiệu tính năng
                </a>
              </div>
            </div> */}
          </div>
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
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchTypePopup,
      onDispatchShowPopupActivateBook,
      onDispatchStatusTour,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(HeaderReadingBook);

const NavWrapper = styled.div`
  position: fixed;
  height: 80px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 19;
  color: ${COLOR_BLACK_READING_BOOK};
  .header-reading-book {
    padding: 7px 0;
  }

  .text-uppercase {
    align-items: center;
    display: flex;
    margin-left: 85px;
    width: 100%;
    .img-go-back {
      width: 20px;
      height: 14px;
    }
  }
  .container-logo {
    padding-left: 60px;
  }
  .subject-name {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #4b4b4b;
    padding-left: 15px;
  }
  .logo {
    margin: 0;
    img {
      width: 104px;
    }
  }
  @media screen and (max-width: 577px) {
    .subject-name {
      font-size: 13px;
    }
  }
`;

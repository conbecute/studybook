import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { onDispatchIncreaseBookTool } from "edu_lms/modules/General/actions";
import { Animated } from "react-animated-css";
import {
  onDispatchTypePopup,
  onDispatchShowPopupActivateBook,
  onDispatchStatusTour,
} from "../../../App/actions";
import { onDispatchUpdateBookToolPage, onDispatchSetClickPractice } from "../../actions";
import {
  grades,
  PLAY_MODE,
  TYPE_POPUP_SUPPORT,
} from "../../../../constants/type";
import ItemHeaderLeft from "./ItemHeaderLeft";
import { TYPE_EVENT_READING_BOOK } from "edu_lms/constants/type";
import Guide from "./Guide";
import { VIEW_MODE } from "../const";
import ExerciseFooter from "./ExerciseFooter";
import ViewModeReadingBook from "./ViewModeReadingBook";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { ROUTE_PATH_PRACTIVE } from "edu_lms/constants/path";
import PopupActiveQuestionSet from "edu_lms_v2/modules/MockTest/PopupActiveQuestionSet";
import LoginWrapper from "edu_lms_v2/modules/Login/LoginWrapper";
import PopupLoginSuccess from "edu_lms_v2/modules/Login/PopupLoginSuccess";
import ForgotPassword from "edu_lms_v2/modules/ForgotPassword/ForgotPassword";
import PopupShowHistoryExam from "edu_lms_v2/modules/QuestionLibraryV2/PopupShowHistoryExam";
import { getHistoryExam } from "edu_lms/services/readingBook";
import { findIdQuestion } from "../const";
import { onDispatchSetStateDoingInfo } from "edu_lms/modules/DoingExercise/actions";
import { setEventGTM } from "edu_lms/constants/googleTagManager";
import { HOC10_VERIFY_ACCOUNT } from "edu_lms/constants/eventNameGTM";

export default function HeaderLeftReadingBook({
  isMenu,
  onShowMenu,
  onToggleStationPoint,
  eventActive,
  setEventActive,
  setIsShowPractice,
  isShowPractice,
  isShowMenuWidthMobile,
}) {
  const [switchStationPoint, setSwitchStationPoint] = useState(true);
  const [showRequiredLogin, setShowRequiredLogin] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showHistoryExam, setShowHistoryExam] = useState(false);
  const [routerRedirect, setRouterRedirect] = useState("");
  const [showPopupForgotPw, setShowPopupForgotPw] = useState(false);
  const singlePage = localStorage.getItem("singlePage");
  const token = localStorage.getItem("token");
  const [keyPopup, setKeyPopup] = useState({
    currentGrade: {},
    currentSubject: {},
    title: "",
  });
  const history = useHistory();
  const viewMode =
    VIEW_MODE[JSON.parse(singlePage) ? "two_page" : "single_page"];
  const dispatch = useDispatch();
  const bookTool = useSelector((state) => state.readingBookReducers.bookTool.page);
  const doingInfo = useSelector((state) => state.doingExerciseReducers.doingInfo);
  const bookInfo = useSelector((state) => state.generalReducer.bookInfo);
  const pageBook = useSelector((state) => state.readingBookReducers.pageBook);
  const menuBook = useSelector((state) => state.readingBookReducers.menuBook);
  const currentMenu = useSelector(
    (state) => state.readingBookReducers.currentMenu
  );
  const dataRecentBook = JSON.parse(localStorage.dataRecentBook || "[]");

  const onShowTool = () => {
    if (isMenu) {
      onShowMenu();
    }
    dispatch(onDispatchIncreaseBookTool("count_show_tools"));
    dispatch(
      onDispatchUpdateBookToolPage({
        ...bookTool,
        show: !bookTool.show,
        control: bookTool.show ? false : bookTool.control,
      })
    );
  };

  const onShowPopupSupport = () => {
    dispatch(onDispatchTypePopup(TYPE_POPUP_SUPPORT));
    dispatch(onDispatchShowPopupActivateBook(true));
  };

  const onDispatchStatusIntro = () => {
    dispatch(onDispatchStatusTour(true));
  };

  const handleChangeModeViewBook = () => {
    localStorage.setItem("singlePage", !JSON.parse(singlePage));
    window.location.reload();
  };

  const handleEventReadingBook = (data) => {
    switch (data.event) {
      case TYPE_EVENT_READING_BOOK.menu:
        dispatch(onDispatchIncreaseBookTool("count_open_table_of_contents"));
        onShowMenu(true);
        setIsShowPractice(false);
        break;
      case TYPE_EVENT_READING_BOOK.tools:
        onShowTool();
        setIsShowPractice(false);
        break;
      case TYPE_EVENT_READING_BOOK.guide:
        dispatch(onDispatchIncreaseBookTool("count_open_book_instructions"));
        setIsShowPractice(false);
        onShowMenu(false);
        break;
      case TYPE_EVENT_READING_BOOK.touchPoint:
        onToggleStationPoint();
        setSwitchStationPoint(!switchStationPoint);
        setIsShowPractice(false);
        break;
      case TYPE_EVENT_READING_BOOK.practice:
        setIsShowPractice(!isShowPractice);
        onShowMenu(false);
        break;
      default:
    }
    let eventReadingBook = "";
    if (data.event !== eventActive.event) {
      eventReadingBook = data;
    }
    setEventActive(eventReadingBook);
  };

  const doingExercise = () => {
    dispatch(onDispatchSetClickPractice(true));
    dispatch(onDispatchSetStateDoingInfo({...doingInfo, sourceFromPractice: true}));

    const desiredMenu = findIdQuestion(menuBook, pageBook);
    if (!desiredMenu) return;

    if (!token) {
      setShowRequiredLogin(true);
      setEventGTM({event: HOC10_VERIFY_ACCOUNT})
      return;
    }

    getHistory();
  };

  const getHistory = () => {
    const desiredMenu = findIdQuestion(menuBook, pageBook);
    const grade = grades.find(
      ({ value }) => value === dataRecentBook[0].gradeId
    );
    const data = {
      book_content_id: desiredMenu.id,
      guest_id: localStorage.getItem("guest_id"),
    };

    getHistoryExam(data)
      .then((res) => {
        const dataHistory = res.data.data;
        setKeyPopup({
          ...keyPopup,
          dataHistory,
          currentGrade: { name: grade ? grade.label : '' },
          currentSubject: { title: dataRecentBook[0].title },
          title: desiredMenu.title,
        });
      })
      .catch((e) => console.log(e));

    setShowHistoryExam(true);
  };

  const onLoginSuccess = () => {
    setShowLogin(false);
    setShowLoginSuccess(true);
  };

  const onActiveForgotPw = () => {
    setShowLogin(false);
    setShowPopupForgotPw(true);
  };

  const handleShowExam = () => {
    dispatch(onDispatchSetStateDoingInfo({...doingInfo, timeStart: Math.round(Date.now() / 1000)}));

    const desiredMenu = findIdQuestion(menuBook, pageBook);
    history.push(`${ROUTE_PATH_PRACTIVE}/${desiredMenu.id}`);
  };

  return (
    <MenuWrapper isShowMenuWidthMobile={isShowMenuWidthMobile}>
      <div className="header-left-container justify-content-center">
        <ListItemContainer className="position-relative">
          <ItemHeaderLeft
            eventActive={eventActive}
            handleEventReadingBook={handleEventReadingBook}
          />
          {eventActive.event === TYPE_EVENT_READING_BOOK.guide && (
            <div className="detail-guide position-fixed">
              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutLeft"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={eventActive.event === TYPE_EVENT_READING_BOOK.guide}
              >
                <Guide
                  onShowPopupSupport={onShowPopupSupport}
                  onDispatchStatusIntro={onDispatchStatusIntro}
                  setEventActive={setEventActive}
                />
              </Animated>
            </div>
          )}
          <ModeView
            singlePage={singlePage}
            onClick={handleChangeModeViewBook}
            className="flex-column justify-content-center align-items-center cursor"
          >
            <ViewModeReadingBook viewMode={viewMode} />
          </ModeView>
        </ListItemContainer>
      </div>
      <ExerciseFooter
        titleBook={bookInfo.bookName}
        currentMenu={currentMenu}
        doingExercise={doingExercise}
      />
      <PopupActiveQuestionSet
        show={showRequiredLogin}
        setShow={setShowRequiredLogin}
        setShowLogin={setShowLogin}
      />
      <ForgotPassword
        show={showPopupForgotPw}
        onHide={() => setShowPopupForgotPw(false)}
        setLogin={setShowLogin}
      />
      <LoginWrapper
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onLoginSuccess={onLoginSuccess}
        onActiveForgotPw={onActiveForgotPw}
        showPopupForgotPw={showPopupForgotPw}
        setShowPopupForgotPw={setShowPopupForgotPw}
      />
      <PopupLoginSuccess
        show={showLoginSuccess}
        onHide={() => {
          setShowLoginSuccess(false);
          getHistory();
        }}
        path={""}
        redirect={false}
      />
      <PopupShowHistoryExam
        showHistoryExam={showHistoryExam}
        setShowHistoryExam={setShowHistoryExam}
        keyPopup={keyPopup}
        handleShowExam={handleShowExam}
        playMode={PLAY_MODE.PRACTICE_V2}
      />
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  padding: 15px;
  position: fixed;
  background-color: #fff;
  left: 0;
  z-index: 9;
  width: 148px;
  height: calc(100% - 140px);
  top: 60px;
  text-align: center;
  overflow: auto;
  .exercise {
    border-radius: 16px;
    .exercise-bg {
    }
    .exercise-container {
      border-radius: 16px;
      background-color: #24243a;
      min-height: 115px;
      top: 60px;
      .icon-1 {
        left: 15px;
        top: -10px;
        z-index: 2;
      }
      .icon-2 {
        right: 20px;
        top: -45px;
        z-index: 1;
      }
      .titleExercise {
        font-size: 14px;
        line-height: 29px;
      }
    }
    .btn-exercises {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .animated {
    width: 100%;
    height: 100%;
  }
  .header-left-container {
    /* padding-top: 75px; */
  }

  .item {
    border-radius: 12px;
    height: 72px;
    color: #777777;
    align-items: center;
    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .item:hover {
    cursor: pointer;
    background-color: #fb6d3a;
    p {
      color: #fff;
      transition: 0.3s ease-in-out;
    }
    i {
      color: #fff;
      transition: 0.3s ease-in-out;
    }
  }
  .item-container {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    img {
      margin: 0 auto;
    }
  }
  .toggleStationPoint {
    filter: invert(44%) sepia(91%) saturate(1229%) hue-rotate(355deg)
      brightness(105%) contrast(104%);
  }
  @media screen and (max-width: 1150px) {
    width: 100px;
    .item {
      p {
        font-size: 13px;
        line-height: 13px;
      }
      i {
        font-size: 25px;
      }
    }
    .subject-name {
      font-size: 13px;
    }
    .exercise {
      .exercise-container {
        border-radius: 16px;
        background-color: #24243a;
        min-height: 95px;

        .titleExercise {
          font-size: 11px;
          line-height: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 577px) {
    display: ${(props) => (props.isShowMenuWidthMobile ? "block" : "none")};
    top: 0;
    padding-top: 60px;
    z-index: 15;
    height: calc(100%);
    background-color: #fff;
    padding-bottom: 60px;
  }
`;

const ListItemContainer = styled.div`
  position: relative;
  .color-orange {
    background-color: #ff7707;
    i,
    p {
      color: #fff;
    }
  }
  .button-close {
    right: 0;
    top: 0;
  }
  .detail-guide {
    z-index: 9;
    left: 148px;
    top: 250px;
    padding-top: 20px;
    .guide-container {
      padding-top: 20px;
      background-color: #fff;
      padding-bottom: 20px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      box-shadow: 5px 0px 2px #ccc;
      .dropdown-item:hover {
        background-color: #fffbf7;
        border-left: 2px solid #ff7707;
      }
    }
    @media screen and (max-width: 1150px) {
      left: 100px;
    }
  }
  @media screen and (max-width: 577px) {
    .detail-guide {
      top: 25%;
    }
  }
`;

const ModeView = styled.div`
  display: flex;
  border-radius: 12px;
  height: 72px;
  color: #777777;
  align-items: center;
  &:hover {
    background-color: #fb6d3a;
    p {
      color: #fff;
    }
  }
  @media (max-width: 630px) {
    display: none;
  }

  img {
    width: ${(props) => (JSON.parse(props.singlePage) ? "30px" : "25px")};
  }

  p {
    color: #777777;
    font-size: 16px;
    line-height: 24px;
  }
  @media screen and (max-width: 1150px) {
    p {
      font-size: 13px;
      line-height: 13px;
    }
  }
`;

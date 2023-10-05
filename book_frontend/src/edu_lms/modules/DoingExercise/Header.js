import { useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { useHistory } from "react-router-dom";
import {
  ROUTE_PATH_QUESTION_SET_V2,
  ROUTE_PATH_V3_STUDENT_MOCK_TEST,
} from "edu_lms/constants/path";
import { ShareAndCopy } from "edu_lms_v2/components/ShareAndCopy";
import { useSelector, useDispatch } from "react-redux";
import { onDispatchSetStateDoingInfo } from "./actions";
import { setEventGTM } from "edu_lms/constants/googleTagManager";

export default function Header({
  subjectName,
  gradeName,
  title,
  levelQuestions,
  setEventPlayMockTest,
  step,
  id,
  isPlayModeExamV2
}) {
  const [showMenuBars, setShowMenuBars] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const rawStudentInfo = localStorage.getItem("student_info");
  const studentInfo = JSON.parse(rawStudentInfo);
  const doingInfo = useSelector((state) => state.doingExerciseReducers.doingInfo);
  const appConfig = useSelector((state) => state.app.config);
  const currentURL = window.location.href;

  const handleBack = () => {
    dispatch(onDispatchSetStateDoingInfo({...doingInfo, clickExit: true}));
    localStorage.removeItem("student_info");
    const eventPracticeNow = localStorage.getItem('event_practice_now');
    
    if (eventPracticeNow) {
      setEventGTM(JSON.parse(eventPracticeNow));
    }
    
    step === 1 && setEventPlayMockTest(false);
    if (history.action == "PUSH") {
      history.goBack();
    } else {
      if (currentURL.includes("bai-tap-ve-nha")) {
        history.push(ROUTE_PATH_QUESTION_SET_V2);
      } else {
        history.push(ROUTE_PATH_V3_STUDENT_MOCK_TEST);
      }
    }
  };

  return (
    <Animated
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      animationInDuration={1000}
      animationOutDuration={1000}
      isVisible={true}
    >
      <HeaderWrapper>
        <div className="d-flex justify-content-between h-100 monkey-color-black">
          <div className="d-flex align-items-center justify-content-center ml-2">
            <div className="btn" onClick={() => handleBack()}>
              <i
                style={{ fontSize: "1.4rem" }}
                className="icon icon-back cursor align-items-center"
                aria-hidden="true"
              />
            </div>
            {appConfig.showGrade && (
              <Span className="font-weight-bold d-none d-md-block ">
                {gradeName}
              </Span>
            )}
            {appConfig.showSubject && (
              <Span className="font-weight-bold d-none d-md-block mr-4">
                {subjectName}
              </Span>
            )}
          </div>
          <TitleWrapper className="d-md-flex align-items-md-center justify-content-md-center text-truncate pr-4 ml-2 pt-3 pt-md-0 text-center">
            <span className=" monkey-fz-24 text-center mb-1 font-weight-bold monkey-fz-20 text-truncate">
              {isPlayModeExamV2 && "Luyện tập: "} {title}
            </span>
          </TitleWrapper>
          <div className="d-flex align-items-center justify-content-center">
            <StyleUsername className="mr-3 monkey-f-header monkey-color-back-reading-book">
              {studentInfo?.name}
            </StyleUsername>

            <ShareAndCopy
              urlShareFb={currentURL}
              title={title}
              questionSetId={id}
              gradeName={gradeName}
              subjectName={subjectName}
            />
            <StyleLogOut className="cursor mx-2" onClick={() => handleBack()}>
              <i className="fa fa-sign-out monkey-fz-20" aria-hidden="true" />
            </StyleLogOut>
            <StyleBarMenu
              onClick={() => setShowMenuBars(!showMenuBars)}
              className="px-2 monkey-fz-24 monkey-color-back-reading-book"
            >
              <i
                className={`fa cursor ${showMenuBars ? "fa-times" : "fa-bars"}`}
                aria-hidden="true"
              />
              {showMenuBars && (
                <div className="position-fixed sub-bar-menu monkey-bg-white w-100 px-4 py-2 monkey-color-back-reading-book">
                  <p className="monkey-f-header monkey-color-back-reading-book py-2 border-bottom ">
                    {studentInfo?.name}
                  </p>
                  <div
                    className="py-2 log-out cursor monkey-color-orange"
                    onClick={() => handleBack()}
                  >
                    <i
                      className="fa fa-sign-out monkey-fz-20 mr-2"
                      aria-hidden="true"
                    />
                    <p className="d-inline monkey-fz-20">Đăng xuất</p>
                  </div>
                </div>
              )}
            </StyleBarMenu>
          </div>
        </div>
      </HeaderWrapper>
    </Animated>
  );
}

const StyleBarMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
  .sub-bar-menu {
    left: 0;
    top: 60px;
    box-shadow: 5px 10px 10px 1px #ccc;
  }
`;

const StyleUsername = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyleLogOut = styled.div`
  padding: 7px 12px 5px 16px;
  border-radius: 8px;
  border: 1px solid #ff7707;
  color: #ff7707;
  &:hover {
    color: #fff;
    background-color: #ff7707;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderWrapper = styled.div`
  height: 58px;
  width: 100%;
  background-color: #eaeced;
  position: relative;
`;

const Span = styled.span`
  margin-right: 11px;
  margin-left: 20px;
  height: 35px;
  width: max-content;
  line-height: 22px;
  padding: 5.5px 8px;
  border: 1px solid var(--gray);
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  color: var(--gray);
  font: 16px/24px var(--SVN-GilroyBold);
`;
const TitleWrapper = styled.div`
  flex: 0 1 60%;
  gap: 20px;
`;

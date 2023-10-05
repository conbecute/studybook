import React from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import classNames from "classnames";
import * as TYPE from "../../../constants/type";
import { LABEL_ANSWER } from "edu_lms/components/Game/selection";
import styles from "../listQuizDetail.module.scss";

const NavBar = ({ data, isMenu, onHandleDot, submitted }) => {
  return (
    <NavBarWrapper>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        animationInDuration={1000}
        animationOutDuration={1000}
        isVisible={isMenu}
      >
        <NavBarHeader className="position-relative monkey-bg-white">
          Danh sách câu hỏi
        </NavBarHeader>
        <div className="navbar-body">
          {data.map((item, index) => {
            const selectedAnswerIndex = item.answers.findIndex(
              (answer) => answer.status === 1
            );
            const answers = item.answers || [];
            const hasSelectedAnswer = answers.find(
              (answer) => answer.status !== 0
            );
            const hasCorrectAnswer = !!answers.find(
              (answer) => answer.is_correct && answer.status !== 0
            );
            const hasWrongAnswer = !!answers.find(
              (answer) => !answer.is_correct && answer.status !== 0
            );

            return (
              <div
                onClick={() => onHandleDot(index, item)}
                key={index}
                className="nav-item border-top border-bottom d-flex align-items-center justify-content-between px-sm-2 py-2 cursor question"
                style={{
                  backgroundColor: onChangeBgColor(item.status),
                  color:
                    item.status !== 0 ? TYPE.COLOR_WHITE : TYPE.COLOR_BLACK,
                  pointerEvents:
                    item.disabled || submitted ? "initial" : "none",
                  opacity: item.disabled || submitted ? 1 : 0.4,
                }}
              >
                <div className="d-flex align-items-center">
                  <div
                    className={classNames("nav-dot mr-1 mr-sm-3", {
                      [styles.nav_dot_normal]:
                        (!submitted && !hasSelectedAnswer) ||
                        (submitted && !hasSelectedAnswer),
                      [styles.answer_selected]: !submitted && hasSelectedAnswer,
                      [styles.answer_correct]: submitted && hasCorrectAnswer,
                      [styles.answer_wrong]: submitted && hasWrongAnswer,
                    })}
                  />
                  Câu {index + 1}
                </div>
                {LABEL_ANSWER[selectedAnswerIndex] && (
                  <div
                    className={`border d-flex justify-content-center align-items-center ${styles.answer_navbar}`}
                    style={{
                      backgroundColor: onChangeBgColor(item.status),
                      color:
                        item.status !== 0 ? TYPE.COLOR_WHITE : TYPE.COLOR_BLACK,
                    }}
                  >
                    {LABEL_ANSWER[selectedAnswerIndex]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Animated>
    </NavBarWrapper>
  );
};
export default NavBar;

const onChangeBgColor = (status) => {
  switch (status) {
    case 1:
      return TYPE.COLOR_ORANGE;
    default:
      return TYPE.COLOR_WHITE;
  }
};

const NavBarHeader = styled.div`
  z-index: 5;
  height: 80px;
  border-bottom: 1px solid rgb(215, 215, 215);
  line-height: 80px;
  padding-left: 10px;
  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const NavBarWrapper = styled.div`
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 444;
  height: 100%;
  .navbar-body {
    overflow-y: scroll;
    height: calc(100vh - 100px);
    z-index: 3;
  }

  .nav-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    width: 100px;
    .question {
      font-size: 11px;
    }
  }
`;

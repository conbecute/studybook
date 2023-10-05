import React from "react";
import styled from "styled-components";
import {
  BOOK_LANGUAGE,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_RED,
  COLOR_BLUE,
  ANSWER_STATUS,
} from "edu_lms/constants/type";

export default function CheckGraph({
  dataGame,
  indexQuestion,
  isCheckQuestion,
  checkResult,
  typeButton,
  onNextQuestionGame,
  isActive,
  languageBook,
}) {
  return (
    <div>
      <ButtonCheckGraph className="position-absolute">
        <div className="footer-left d-flex align-items-center justify-content-end position-relative">
          <div className="d-flex align-items-center justify-content-center ml-3 mr-3 ">
            {dataGame.length > 1 &&
              dataGame.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: `${indexQuestion === index ? "16px" : "12px"}`,
                    height: `${indexQuestion === index ? "16px" : "12px"}`,
                    border: `2px solid ${onBorderColor(item.status)}`,
                    borderRadius: "50%",
                    margin: "0 5px",
                    backgroundColor: onBackgroundColor(item.status),
                  }}
                />
              ))}
            {!isCheckQuestion ? (
              <button
                onClick={checkResult}
                disabled={!isActive}
                className={`${
                  !isActive ? "monkey-bg-gray" : "monkey-bg-blue cursor"
                } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
              >
                {typeButton}
              </button>
            ) : (
              <button
                onClick={onNextQuestionGame}
                className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                    ?.buttonContinue
                }
              </button>
            )}
          </div>
        </div>
      </ButtonCheckGraph>
    </div>
  );
}
function onBorderColor(type) {
  switch (type) {
    case ANSWER_STATUS.CORRECT:
      return COLOR_BLUE;
    case ANSWER_STATUS.WRONG:
      return COLOR_RED;
    default:
      return COLOR_GRAY;
  }
}

function onBackgroundColor(type) {
  switch (type) {
    case ANSWER_STATUS.CORRECT:
      return COLOR_BLUE;
    case ANSWER_STATUS.WRONG:
      return COLOR_RED;
    default:
      return COLOR_WHITE;
  }
}

const ButtonCheckGraph = styled.div`
  right: 20px;
  bottom: 10px;
  .no-active-graph {
    background-color: #ccc;
    pointer-events: none;
  }
`;

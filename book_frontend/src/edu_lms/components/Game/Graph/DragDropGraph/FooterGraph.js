import React, { useState } from "react";
import styled from "styled-components";
import {
  BOOK_LANGUAGE,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_RED,
  COLOR_WHITE,
  GAME_TYPE,
  CTA_POPUP_TYPE,
  ANSWER_STATUS,
} from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";

const FooterGraph = ({
  alert,
  indexQuestion,
  languageBook,
  activeQuestion,
  isReview,
  checkResult,
  onNextQuestion,
  handleDispatchDataAlert,
  setShowResult,
  question,
  showAlert,
  setShowAlert,
  countCorrect,
  onResetData,
}) => {
  const handleShowResult = () => {
    setShowResult(true);
    setShowAlert(false);
  };

  return (
    <>
      <FooterWrapper>
        <div className="footer-left d-flex align-items-center justify-content-end position-relative">
          <div className="d-flex align-items-center justify-content-center ml-3 mr-3">
            {question.length > 1 &&
              question.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${indexQuestion === index ? "16px" : "12px"}`,
                      height: `${indexQuestion === index ? "16px" : "12px"}`,
                      border: `2px solid ${onBorderColor(item.result)}`,
                      borderRadius: "50%",
                      margin: "0 5px",
                      backgroundColor: onBackgroundColor(item.result),
                    }}
                  ></div>
                );
              })}
          </div>
          <div className="footer-right">
            {!isReview ? (
              <button
                onClick={() => checkResult()}
                className=" monkey-bg-blue cursor 
               btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                    ?.buttonCheck
                }
              </button>
            ) : activeQuestion + 1 < question.length ? (
              <button
                onClick={() => onNextQuestion()}
                className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                    ?.buttonContinue
                }
              </button>
            ) : (
              <button
                onClick={question.length > 1 ? handleShowResult : onResetData}
                className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
              >
                {question.length > 1
                  ? BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                      ?.buttonClose
                  : BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                      ?.buttonRefresh}
              </button>
            )}
            <AnswerComponent
              typeGame={GAME_TYPE.oneGame}
              checkScreen={CTA_POPUP_TYPE.yesNo}
              totalAnswer={
                question[indexQuestion].result === ANSWER_STATUS.CORRECT ? 1 : 0
              }
              totalQuestion={1}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </div>
        </div>
      </FooterWrapper>
    </>
  );
};

export default FooterGraph;
function onBackgroundColor(type) {
  switch (type) {
    case 0:
      return COLOR_WHITE;
    case 1:
      return COLOR_BLUE;
    case 2:
      return COLOR_RED;
    default:
      return COLOR_WHITE;
  }
}
function onBorderColor(type) {
  switch (type) {
    case 0:
      return COLOR_GRAY;
    case 1:
      return COLOR_BLUE;
    case 2:
      return COLOR_RED;
    default:
      return COLOR_GRAY;
  }
}
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  width: 100%;
  .alert {
    position: absolute;
    top: -96px;
    width: 295px;
    right: 5px;
  }
`;

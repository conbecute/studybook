import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";
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
import { WARNING_DISEQUATIONS } from "./selection";
import AnswerComponent from "../../AnswerComponent";

export default function Footer({
  languageBook,
  isReview,
  question,
  showAlert,
  setShowAlert,
  onResetData,
  stepResult,
  onSubmitForm,
  checkRegion,
  totalAnswer,
  setCheckValueInput,
  checkValueInput,
  continudeGame,
  checkStep,
}) {
  return (
    <FooterWrapper>
      <div className="footer-left d-flex align-items-center justify-content-end position-relative">
        <div className="footer-right">
          {checkValueInput && (
            <Alert color="danger" toggle={() => setCheckValueInput(false)}>
              {WARNING_DISEQUATIONS}
            </Alert>
          )}
          {!isReview && (
            <>
              {stepResult ? (
                <button
                  onClick={checkRegion}
                  className=" monkey-bg-blue cursor
               btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
                >
                  {
                    BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                      ?.buttonCheck
                  }
                </button>
              ) : (
                <>
                  {checkStep && (
                    <button
                      onClick={continudeGame}
                      form="hook-form"
                      className="monkey-bg-blue cursor
                btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
                    >
                      {
                        BOOK_LANGUAGE.filter(
                          (ele) => ele.id === +languageBook
                        )[0]?.buttonContinue
                      }
                    </button>
                  )}
                </>
              )}
            </>
          )}
          {isReview && (
            <>
              <button
                onClick={onResetData}
                className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                    ?.buttonRefresh
                }
              </button>
            </>
          )}
          {!checkStep && !isReview && (
            <button
              onClick={onSubmitForm}
              className=" monkey-bg-blue cursor
               btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
            >
              {
                BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                  ?.buttonCheck
              }
            </button>
          )}
          <AnswerComponent
            typeGame={GAME_TYPE.oneGame}
            checkScreen={CTA_POPUP_TYPE.yesNo}
            totalQuestion={question[0].coefficient.length}
            totalAnswer={totalAnswer}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </div>
      </div>
    </FooterWrapper>
  );
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

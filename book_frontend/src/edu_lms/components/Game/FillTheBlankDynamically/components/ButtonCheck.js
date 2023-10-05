import React, { Fragment } from "react";
import styled from "styled-components";
import {
  BOOK_LANGUAGE,
  CTA_POPUP_TYPE,
  GAME_TYPE,
} from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const ButtonCheck = ({
  dataGame,
  isDisabled,
  alert,
  languageBook,
  isButtonReset,
  onResetFormData,
  onSubmitForm,
  handleDispatchDataAlert,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  onNextQuestionGame,
}) => {
  return (
    <Fragment>
      {!isButtonReset ? (
        <button
          onClick={onSubmitForm}
          disabled={isDisabled}
          className={`${
            isDisabled ? "monkey-bg-black" : "monkey-bg-blue cursor"
          } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
              ?.buttonCheck
          }
        </button>
      ) : (
        <button
          onClick={dataGame.length === 1 ? onResetFormData : onNextQuestionGame}
          className="btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-bg-blue cursor monkey-fz-20"
        >
          {dataGame.length === 1
            ? BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                ?.buttonRefresh
            : BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                ?.buttonContinue}
        </button>
      )}
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalQuestion={totalQuestion}
          totalAnswer={countCorrect}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
    </Fragment>
  );
};
export default ButtonCheck;

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

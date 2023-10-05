import React, { Fragment } from "react";
import styled from "styled-components";
import {
  BOOK_LANGUAGE,
  CTA_POPUP_TYPE,
  GAME_TYPE,
} from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const ButtonCheckGameFIBText = ({
  isDisabled,
  languageBook,
  isButtonReset,
  onResetFormData,
  onSubmitForm,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  nextQuestion,
  data,
}) => {
  return (
    <Fragment>
      {!isButtonReset ? (
        <button
          disabled={isDisabled}
          onClick={onSubmitForm}
          className={`${
            isDisabled ? "monkey-bg-gray" : "monkey-bg-blue cursor"
          } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
              ?.buttonCheck
          }
        </button>
      ) : (
        <button
          className="monkey-bg-blue cursor monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20"
          onClick={data.length === 1 ? onResetFormData : nextQuestion}
        >
          {data.length === 1
            ? BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                ?.buttonRefresh
            : BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
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
export default ButtonCheckGameFIBText;

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

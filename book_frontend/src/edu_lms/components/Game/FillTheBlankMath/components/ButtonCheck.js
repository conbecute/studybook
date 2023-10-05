import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnswerComponent from "../../AnswerComponent";
import {
  CTA_POPUP_TYPE,
  GAME_TYPE,
  BOOK_LANGUAGE,
} from "../../../../constants/type";
import { styleAlertGame } from "../../selection";

const ButtonCheck = ({
  isDisabled,
  isButtonReset,
  onSubmitForm,
  setShowAlert,
  showAlert,
  totalQuestion,
  totalAnswer,
  nextQuestion,
  data,
  onResetFormData,
}) => {
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );

  return (
    <Fragment>
      {isButtonReset ? (
        <button
          onClick={data.length > 1 ? nextQuestion : onResetFormData}
          className="btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-bg-blue cursor monkey-fz-20"
        >
          {data.length > 1
            ? BOOK_LANGUAGE.filter(
                (ele) => ele.id === parseInt(languageBook)
              )[0]?.buttonContinue
            : BOOK_LANGUAGE.filter(
                (ele) => ele.id === parseInt(languageBook)
              )[0]?.buttonRefresh}
        </button>
      ) : (
        <button
          onClick={onSubmitForm}
          disabled={isDisabled}
          className={`${
            isDisabled ? "monkey-bg-black" : "monkey-bg-blue cursor"
          } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id === parseInt(languageBook))[0]
              ?.buttonCheck
          }
        </button>
      )}
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
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

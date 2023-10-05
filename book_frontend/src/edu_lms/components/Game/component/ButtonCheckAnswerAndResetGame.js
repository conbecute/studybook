import React from "react";
import { useSelector } from "react-redux";
import { BOOK_LANGUAGE } from "edu_lms/constants/type";

export default function ButtonCheckAnswerAndResetGame({
  onResetGame,
  onSubmitGame,
  isDisabled,
  isSubmitted,
}) {
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );

  if (isSubmitted) {
    return (
      <button
        onClick={onSubmitGame}
        disabled={isDisabled}
        checkDisabled={isDisabled}
        className={`${
          isDisabled ? "monkey-bg-gray" : "monkey-bg-blue cursor"
        } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
      >
        {
          BOOK_LANGUAGE.filter((ele) => ele.id === parseInt(languageBook))[0]
            ?.buttonCheck
        }
      </button>
    );
  }

  return (
    <button
      type="reset"
      onClick={onResetGame}
      className="btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-bg-blue cursor monkey-fz-20"
    >
      {
        BOOK_LANGUAGE.filter((ele) => ele.id === parseInt(languageBook))[0]
          ?.buttonRefresh
      }
    </button>
  );
}

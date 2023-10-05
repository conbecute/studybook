import React from "react";
import { BOOK_LANGUAGE } from "edu_lms/constants/type";

export default function ButtonsGame({
  questions,
  onNextQuestion,
  onResetData,
  languageBook,
}) {
  if (questions.length > 1) {
    return (
      <button
        onClick={onNextQuestion}
        className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
      >
        {
          BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
            ?.buttonContinue
        }
      </button>
    );
  }

  return (
    <button
      onClick={onResetData}
      className="monkey-bg-blue cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
    >
      {BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.buttonRefresh}
    </button>
  );
}

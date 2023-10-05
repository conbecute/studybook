import React from "react";
import { useSelector } from "react-redux";
import {
  CTA_POPUP_TYPE,
  CHECK_ANSWER_GAME,
  BOOK_LANGUAGE,
  ALERT_GAME,
} from "edu_lms/constants/type";
import AlertFinalReport from "./components/AlertFinalReport";
import AlertReportAQuestion from "./components/AlertReportAQuestion";
import AlertReportMultipleQuestion from "./components/AlertReportMultipleQuestion";
import FinalReport from "./components/FinalReport";

export default function AnswerComponent({
  totalQuestion,
  totalAnswer,
  checkScreen,
  showAlert,
  setShowAlert,
  totalChoose,
  onResetData,
}) {
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  //Tham số dùng chung (tính toán %)
  let results = (totalAnswer / totalQuestion) * 100;
  if (totalChoose && totalQuestion < totalChoose) {
    results = (totalAnswer / totalChoose) * 100;
  }
  let alertDefault = ALERT_GAME.error;
  if (
    CHECK_ANSWER_GAME.weak <= results &&
    results < CHECK_ANSWER_GAME.average
  ) {
    alertDefault = ALERT_GAME.rather;
  }
  if (
    CHECK_ANSWER_GAME.average <= results &&
    results < CHECK_ANSWER_GAME.pretty
  ) {
    alertDefault = ALERT_GAME.medium;
  }
  if (results === CHECK_ANSWER_GAME.good) {
    alertDefault = ALERT_GAME.success;
  }
  const onDismiss = () => {
    setShowAlert(false);
  };
  //Check ngôn ngữ
  let TextAlert = BOOK_LANGUAGE[0];
  BOOK_LANGUAGE.forEach((item) => {
    if (item.id === languageBook) {
      TextAlert = item;
    }
  });

  switch (checkScreen) {
    case CTA_POPUP_TYPE.yesNo:
      return (
        <AlertReportAQuestion
          showAlert={showAlert}
          alertDefault={alertDefault}
          onDismiss={onDismiss}
          languageBook={languageBook}
        />
      );
    case CTA_POPUP_TYPE.rangeOneGame:
      return (
        <AlertReportMultipleQuestion
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
          showAlert={showAlert}
          alertDefault={alertDefault}
          onDismiss={onDismiss}
          TextAlert={TextAlert}
          languageBook={languageBook}
        />
      );
    case CTA_POPUP_TYPE.rangeMutipleGame:
      return (
        <AlertFinalReport
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
          showAlert={showAlert}
          alertDefault={alertDefault}
          onDismiss={onDismiss}
          totalChoose={totalChoose}
          TextAlert={TextAlert}
          languageBook={languageBook}
        />
      );
    case CTA_POPUP_TYPE.finalReport:
      return (
        <FinalReport
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
          alertDefault={alertDefault}
          onResetData={onResetData}
          TextAlert={TextAlert}
          languageBook={languageBook}
        />
      );
    default:
      return null;
  }
}

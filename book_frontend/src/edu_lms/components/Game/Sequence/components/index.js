import React from "react";
import Question from "./Question";
import BoxContext from "./BoxContext";
import FooterSequence from "./FooterSequence";
import styles from "../Sequence.module.scss";
import { styleWrapper } from "edu_lms/components/Game/selection";

const SequenceWrapper = ({
  dataAnswers,
  typeAnswer,
  fontSizeTitle,
  fontSizeAnswer,
  typeQuestion,
  typeText,
  typeDisplay,
  dataQuestion,
  isDisabled,
  onResetData,
  onDragEnd,
  onCheckAnswers,
  onSrcAudio,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  typeTextContent,
  indexQuestion,
  onNextQuestion,
  checkButton,
  setCheckButton,
  languageBook,
  stateResult,
}) => {
  return (
    <div
      className={`sequence-wrapper ${styles.text}`}
      style={{ ...styleWrapper }}
    >
      <Question
        data={dataQuestion}
        typeQuestion={typeQuestion}
        typeText={typeText}
        fontSizeTitle={fontSizeTitle}
        fontSizeAnswer={fontSizeAnswer}
      />

      <BoxContext
        data={dataAnswers}
        onDragEnd={onDragEnd}
        typeDisplay={Number(typeDisplay[0])}
        typeAnswer={typeAnswer}
        typeQuestion={typeQuestion}
        isDisabled={isDisabled}
        onSrcAudio={onSrcAudio}
        fontSizeAnswer={fontSizeAnswer}
        fontSizeTitle={fontSizeTitle}
        typeTextContent={typeTextContent}
      />

      <FooterSequence
        isDisabled={isDisabled}
        onResetData={onResetData}
        onCheckAnswers={onCheckAnswers}
        totalQuestion={totalQuestion}
        countCorrect={countCorrect}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        dataAnswers={dataAnswers[0]}
        indexQuestion={indexQuestion}
        onNextQuestion={onNextQuestion}
        checkButton={checkButton}
        setCheckButton={setCheckButton}
        languageBook={languageBook}
        stateResult={stateResult}
      />
    </div>
  );
};
export default SequenceWrapper;

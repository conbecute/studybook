import React from "react";
import { Animated } from "react-animated-css";
import { CTA_POPUP_TYPE } from "edu_lms/constants/type";
import FooterMultipleChoice from "../components/FooterMultipleChoice";
import BodyMultipleChoice from "../components/BodyMultipleChoice";
import { styleWrapper } from "../../selection";
import AnswerComponent from "../../AnswerComponent";

const MultipleChoiceWrapper = ({
  dataConfig,
  iconList,
  toggleChange,
  listStatusAudio,
  typeAnswer,
  typeQuestion,
  fontSize,
  fontSizeAnswer,
  indexQuestion,
  result,
  alert,
  languageBook,
  isVisible,
  isDisabled,
  isReview,
  handleDispatchDataAlert,
  onNextQuestion,
  onResetData,
  onAction,
  onReview,
  typeText,
  typeIndex,
  showAlert,
  setShowAlert,
  totalAnswer,
}) => {
  let answer = 0;
  result.forEach((item) => item && (answer = answer + 1));
  return (
    <>
      {indexQuestion >= dataConfig.length ? (
        <AnswerComponent
          checkScreen={CTA_POPUP_TYPE.finalReport}
          onResetData={onResetData}
          totalQuestion={dataConfig.length}
          totalAnswer={answer}
        />
      ) : (
        <div className="multiple-choice p-3 " style={{ ...styleWrapper }}>
          <Animated
            animationIn="slideInRight"
            animationOut="slideOutRight"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={isVisible}
            style={{ paddingBottom: "15px" }}
          >
            <BodyMultipleChoice
              data={dataConfig}
              typeIndex={typeIndex}
              iconList={iconList}
              toggleChange={toggleChange}
              listStatusAudio={listStatusAudio}
              fontSize={fontSize}
              fontSizeAnswer={fontSizeAnswer}
              indexQuestion={indexQuestion}
              onAction={onAction}
              isReview={isReview}
              typeAnswer={typeAnswer}
              typeQuestion={typeQuestion}
              typeText={typeText}
              languageBook={languageBook}
            />
          </Animated>

          <FooterMultipleChoice
            indexQuestion={indexQuestion}
            data={dataConfig}
            isDisabled={isDisabled}
            isReview={isReview}
            result={result}
            onReview={onReview}
            alert={alert}
            languageBook={languageBook}
            onNextQuestion={onNextQuestion}
            handleDispatchDataAlert={handleDispatchDataAlert}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
            totalAnswer={totalAnswer}
            onResetData={onResetData}
          />
        </div>
      )}
    </>
  );
};

export default MultipleChoiceWrapper;

import React, { Fragment } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { CTA_POPUP_TYPE, GAME_TYPE } from "edu_lms/constants/type";
import FooterMultipleChoice from "../components/FooterMultipleChoice";
import BodyMultipleChoice from "../components/BodyMultipleChoice";
import { styleWrapper } from "../../selection";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const MultipleChoiceCheckboxWrapper = ({
  dataConfig,
  iconList,
  typeAnswer,
  fontSize,
  fontSizeAnswer,
  typeQuestion,
  typeIndex,
  typeText,
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
  setShowAlert,
  showAlert,
  totalChoose,
  totalAnswer,
  totalFinalAnswer,
  totalQuestion,
}) => {
  return (
    <Fragment>
      {indexQuestion >= dataConfig.length ? (
        <AnswerComponent
          checkScreen={CTA_POPUP_TYPE.finalReport}
          onResetData={onResetData}
          totalQuestion={dataConfig.length}
          totalAnswer={totalFinalAnswer}
        />
      ) : (
        <div
          className="multiple-choice-checkbox p-3 text-center"
          style={{
            ...styleWrapper,
          }}
        >
          <Animated
            className="m-5"
            animationIn="slideInRight"
            animationOut="slideOutRight"
            animationInDuration={1000}
            animationOutDuration={1000}
            isVisible={isVisible}
          >
            <BodyMultipleChoice
              data={dataConfig}
              typeIndex={typeIndex}
              iconList={iconList}
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
            onResetData={onResetData}
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
          />
        </div>
      )}
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeMutipleGame}
          totalQuestion={totalQuestion}
          totalAnswer={totalAnswer}
          totalChoose={totalChoose}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
    </Fragment>
  );
};

export default MultipleChoiceCheckboxWrapper;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

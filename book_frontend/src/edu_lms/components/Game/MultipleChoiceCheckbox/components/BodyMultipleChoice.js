import React, { Fragment } from "react";
import _ from "lodash";
import styled from "styled-components";
import { onResultIcon, TypeGameMultipleChoice } from "../../selection";
import FormComponentWithImageAudio from "./FormComponentWithImageAudio";
import FormComponentWithText from "./FormComponentWithText";
import TitleComponent from "./TitleComponent";

const BodyMultipleChoice = ({
  data,
  typeIndex,
  iconList,
  fontSize,
  fontSizeAnswer,
  isReview,
  indexQuestion,
  onAction,
  typeAnswer,
  typeQuestion,
  typeText,
  languageBook,
}) => {
  const resultData = onResultIcon(
    data[indexQuestion].question,
    iconList[0].icons
  );
  const srcAudio = resultData?.props[0]?.audio[0]?.path;
  const text = resultData?.props[0]?.text;
  const srcImage = resultData.path;
  return (
    <Fragment>
      <div>
        <TitleComponent
          indexQuestion={indexQuestion}
          text={text}
          fontSize={fontSize}
          srcAudio={srcAudio}
          srcImage={srcImage}
          typeQuestion={typeQuestion}
          typeText={typeText}
        ></TitleComponent>
      </div>
      <MultipleChoiceWrapper>
        {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
          <FormComponentWithText
            data={data}
            typeIndex={typeIndex}
            fontSize={fontSize}
            fontSizeAnswer={fontSizeAnswer}
            iconList={iconList}
            indexQuestion={indexQuestion}
            onAction={onAction}
            isReview={isReview}
            typeAnswer={typeAnswer}
            typeText={typeText}
            languageBook={languageBook}
          />
        )}
        {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
          <FormComponentWithImageAudio
            data={data}
            typeIndex={typeIndex}
            fontSize={fontSize}
            iconList={iconList}
            indexQuestion={indexQuestion}
            onAction={onAction}
            isReview={isReview}
            typeAnswer={typeAnswer}
            typeText={typeText}
          />
        )}
      </MultipleChoiceWrapper>
    </Fragment>
  );
};
export default BodyMultipleChoice;

const MultipleChoiceWrapper = styled.div`
  margin-left: 50px;
`;

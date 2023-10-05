import React, { Fragment } from "react";
import _ from "lodash";
import styled from "styled-components";
import { onResultIcon, TypeGameMultipleChoice } from "../../selection";
import FormComponentWithImageAudio from "./FormComponentWithImageAudio";
import FormComponentWithText from "./FormComponentWithText";
import TitleComponent from "./TitleComponent";

const BodyMultipleChoice = ({
  data,
  iconList,
  toggleChange,
  fontSize,
  fontSizeAnswer,
  listStatusAudio,
  isReview,
  indexQuestion,
  onAction,
  typeAnswer,
  typeQuestion,
  typeText,
  typeIndex,
  languageBook,
}) => {
  const resultData = onResultIcon(
    data[indexQuestion].question,
    iconList[0].icons
  );
  const srcVideo = resultData?.path;
  const srcAudio = resultData?.props[0]?.audio[0]?.path;
  const text = resultData?.props[0]?.text;
  const srcImage = resultData.path;
  return (
    <Fragment>
      <TitleComponent
        indexQuestion={indexQuestion}
        text={text}
        fontSize={fontSize}
        typeText={typeText}
        srcAudio={srcAudio}
        srcImage={srcImage}
        srcVideo={srcVideo}
        typeQuestion={typeQuestion}
      />
      <Fragment>
        {!_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) ? (
          <WrapMultiChoice>
            <FormComponentWithText
              data={data}
              typeIndex={typeIndex}
              iconList={iconList}
              fontSize={fontSize}
              fontSizeAnswer={fontSizeAnswer}
              toggleChange={toggleChange}
              listStatusAudio={listStatusAudio}
              indexQuestion={indexQuestion}
              onAction={onAction}
              isReview={isReview}
              typeAnswer={typeAnswer}
              typeText={typeText}
              languageBook={languageBook}
            />
          </WrapMultiChoice>
        ) : (
          <WrapMultiChoice>
            <FormComponentWithImageAudio
              data={data}
              iconList={iconList}
              fontSize={fontSize}
              isShowAudio={true}
              toggleChange={toggleChange}
              listStatusAudio={listStatusAudio}
              indexQuestion={indexQuestion}
              onAction={onAction}
              isReview={isReview}
              typeAnswer={typeAnswer}
            />
          </WrapMultiChoice>
        )}
      </Fragment>
    </Fragment>
  );
};
export default BodyMultipleChoice;

const WrapMultiChoice = styled.div`
  margin: 0 auto;
`;

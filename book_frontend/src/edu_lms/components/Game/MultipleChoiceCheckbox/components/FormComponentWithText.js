import React, { useState } from "react";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";

import {
  COLOR_GREEN,
  COLOR_WHITE,
  COLOR_BLUE,
  COLOR_RED,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_GRAY_2,
  AUDIO_ACTION,
} from "../../../../constants/type";
import LabelComponent from "./LabelComponent";
import TextComponent from "./AudioComponent";

const FormComponentWithText = ({
  data,
  typeIndex,
  iconList,
  fontSize,
  fontSizeAnswer,
  indexQuestion,
  isReview,
  onAction,
  typeAnswer,
  typeText,
  languageBook,
}) => {
  const isTotal = data[indexQuestion].answers.length > 2;
  const [srcAudio, setStateAudio] = useState("");
  const onHandlerAction = (id) => {
    onAction(id);
    setStateAudio(AUDIO_ACTION);
    setTimeout(() => {
      setStateAudio("");
    }, 500);
  };

  return (
    <Fragment columns={data[indexQuestion].answer_number_in_a_row}>
      {data[indexQuestion].answers.map((item, index) => {
        return (
          <div
            key={index}
            className="cursor quicksand-medium mt-2 d-flex align-items-center"
            onClick={(e) => onHandlerAction(item.answer_id)}
            style={{ pointerEvents: `${isReview ? "initial" : "none"}` }}
          >
            <div className="d-flex justify-content-center monkey-fz-25">
              {isReview ? (
                <LabelComponent
                  typeIndex={typeIndex}
                  background={item.isActive ? COLOR_GREEN : "transparent"}
                  color={item.isActive ? COLOR_WHITE : COLOR_BLACK}
                  index={index}
                  languageBook={languageBook}
                />
              ) : item.isActive ? (
                <LabelComponent
                  typeIndex={typeIndex}
                  background={onBackground(item) ? COLOR_BLUE : COLOR_RED}
                  color={onBackground(item) ? COLOR_BLACK : COLOR_WHITE}
                  index={index}
                  languageBook={languageBook}
                />
              ) : (
                <LabelComponent
                  typeIndex={typeIndex}
                  background={COLOR_GRAY}
                  color={COLOR_WHITE}
                  index={index}
                  languageBook={languageBook}
                />
              )}
            </div>
            {isReview ? (
              <TextComponent
                isTotal={isTotal}
                item={item}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                iconList={iconList}
                color={onBackground(item) ? COLOR_GRAY_2 : COLOR_GRAY_2}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
              />
            ) : item.isActive ? (
              <TextComponent
                isTotal={isTotal}
                item={item}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                iconList={iconList}
                color={onBackground(item) ? COLOR_BLUE : COLOR_RED}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
              />
            ) : (
              <TextComponent
                isTotal={isTotal}
                item={item}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                iconList={iconList}
                color={COLOR_GRAY_2}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
              />
            )}
            <ReactAudioPlayer
              src={srcAudio}
              className="d-none"
              autoPlay={true}
              controls={true}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default FormComponentWithText;

function onBackground(item) {
  if (item.is_correct && item.isActive) {
    return true;
  } else {
    return false;
  }
}

const Fragment = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  text-align: center;
`;

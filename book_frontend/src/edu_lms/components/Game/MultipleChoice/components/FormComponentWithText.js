import React, { useState } from "react";
import styled from "styled-components";
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
import ImageComponent from "./ImageComponent";
import ReactAudioPlayer from "react-audio-player";
import classNames from "classnames";

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
  toggleChange,
  listStatusAudio,
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
    <BodyForm columns={data[indexQuestion]?.answer_number_in_a_row}>
      {data[indexQuestion].answers.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames("cursor d-flex align-items-center", {
              "justify-content-center":
                data[indexQuestion].answer_number_in_a_row > 2,
            })}
            style={{ pointerEvents: `${isReview ? "initial" : "none"}` }}
          >
            <TextResult
              className="d-flex justify-content-center monkey-fz-25"
              onClick={(e) => onHandlerAction(item.answer_id)}
            >
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
            </TextResult>
            {isReview ? (
              <ImageComponent
                isTotal={isTotal}
                item={item}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                iconList={iconList}
                color={onBackground(item) ? COLOR_GRAY_2 : COLOR_GRAY_2}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
                index={index}
                toggleChange={toggleChange}
                listStatusAudio={listStatusAudio}
                isFlex={true}
                onHandlerAction={onHandlerAction}
              />
            ) : item.isActive ? (
              <ImageComponent
                isTotal={isTotal}
                item={item}
                iconList={iconList}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                color={onBackground(item) ? COLOR_BLUE : COLOR_RED}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
                index={index}
                toggleChange={toggleChange}
                listStatusAudio={listStatusAudio}
                isFlex={true}
                onHandlerAction={onHandlerAction}
              />
            ) : (
              <ImageComponent
                isTotal={isTotal}
                item={item}
                iconList={iconList}
                fontSize={fontSize}
                fontSizeAnswer={fontSizeAnswer}
                color={COLOR_GRAY_2}
                typeAnswer={typeAnswer}
                isBorder={false}
                typeText={typeText}
                index={index}
                toggleChange={toggleChange}
                listStatusAudio={listStatusAudio}
                isFlex={true}
                onHandlerAction={onHandlerAction}
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
    </BodyForm>
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

const BodyForm = styled.div`
  // margin-right: 50px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 15px;
  text-align: center;
`;
const TextResult = styled.div`
  padding: 6px;
`;

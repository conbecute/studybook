import React, { useState } from "react";
import _ from "lodash";
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
import ImageComponent from "./ImageComponent";

import MultiPlayer from "./MultiPlayer";
import { TypeGameMultipleChoice } from "../../selection";

const FormComponentWithImageAudio = ({
  data,
  iconList,
  isShowAudio,
  toggleChange,
  listStatusAudio,
  indexQuestion,
  isReview,
  onAction,
  typeAnswer,
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
    <>
      <BodyForm columns={data[indexQuestion]?.answer_number_in_a_row}>
        {data[indexQuestion].answers.map((item, index) => {
          const isBackground = onBackground(item);
          return (
            <div>
              <div key={index} className="quicksand-medium mt-4">
                {isReview && !isShowAudio ? (
                  <ImageComponent
                    isTotal={isTotal}
                    item={item}
                    iconList={iconList}
                    color={COLOR_GRAY_2}
                    typeAnswer={typeAnswer}
                    index={index}
                    toggleChange={toggleChange}
                    listStatusAudio={listStatusAudio}
                    onHandlerAction={onHandlerAction}
                  />
                ) : item.isActive ? (
                  <ImageComponent
                    isTotal={isTotal}
                    item={item}
                    iconList={iconList}
                    color={isBackground ? COLOR_BLUE : COLOR_RED}
                    typeAnswer={typeAnswer}
                    index={index}
                    toggleChange={toggleChange}
                    listStatusAudio={listStatusAudio}
                    onHandlerAction={onHandlerAction}
                  />
                ) : (
                  <ImageComponent
                    isTotal={isTotal}
                    item={item}
                    iconList={iconList}
                    color={COLOR_GRAY_2}
                    typeAnswer={typeAnswer}
                    index={index}
                    toggleChange={toggleChange}
                    listStatusAudio={listStatusAudio}
                    onHandlerAction={onHandlerAction}
                  />
                )}
                <div
                  onClick={(e) => onHandlerAction(item.answer_id)}
                  style={{ pointerEvents: `${isReview ? "initial" : "none"}` }}
                  className="cursor d-flex justify-content-center monkey-fz-25 mt-4"
                >
                  {isReview ? (
                    <LabelComponent
                      background={item.isActive ? COLOR_GREEN : "transparent"}
                      color={item.isActive ? COLOR_WHITE : COLOR_BLACK}
                      index={index}
                    />
                  ) : item.isActive ? (
                    <LabelComponent
                      background={isBackground ? COLOR_BLUE : COLOR_RED}
                      color={isBackground ? COLOR_BLACK : COLOR_WHITE}
                      index={index}
                    />
                  ) : (
                    <LabelComponent
                      background={COLOR_GRAY}
                      color={COLOR_WHITE}
                      index={index}
                    />
                  )}
                </div>
                <ReactAudioPlayer
                  src={srcAudio}
                  className="d-none"
                  autoPlay={true}
                  controls={true}
                />
              </div>
            </div>
          );
        })}
      </BodyForm>
    </>
  );
};

export default FormComponentWithImageAudio;

function onBackground(item) {
  if (item.is_correct && item.isActive) {
    return true;
  } else {
    return false;
  }
}

const BodyForm = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 15px;
  text-align: center;
`;

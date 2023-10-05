import React from "react";
import styled from "styled-components";
import {
  COLOR_GREEN,
  COLOR_WHITE,
  COLOR_BLUE,
  COLOR_RED,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_GRAY_2,
} from "../../../../constants/type";
import LabelComponent from "./LabelComponent";
import ImageComponent from "./ImageComponent";
import AudioGameComponent from "./AudioComponent";

const FormComponentWithImageAudio = ({
  data,
  typeIndex,
  iconList,
  fontSize,
  indexQuestion,
  isReview,
  onAction,
  typeAnswer,
  typeText,
}) => {
  const isTotal = data[indexQuestion].answers.length > 2;
  const onHandlerAction = (id) => {
    onAction(id);
  };

  return (
    <BodyForm columns={data[indexQuestion].answer_number_in_a_row}>
      {data[indexQuestion].answers.map((item, index) => {
        return (
          <div className="position-relative">
            <AudioGameComponent
              item={item}
              fontSize={fontSize}
              iconList={iconList}
              typeAnswer={typeAnswer}
              typeText={typeText}
            />
            <div
              key={index}
              className="cursor mt-4 quicksand-medium"
              onClick={() => onHandlerAction(item.answer_id)}
              style={{ pointerEvents: `${isReview ? "initial" : "none"}` }}
            >
              {isReview ? (
                <ImageComponent
                  isTotal={isTotal}
                  item={item}
                  iconList={iconList}
                  color={onBackground(item) ? COLOR_GRAY_2 : COLOR_GRAY_2}
                  typeAnswer={typeAnswer}
                  typeText={typeText}
                />
              ) : item.isActive ? (
                <ImageComponent
                  isTotal={isTotal}
                  item={item}
                  iconList={iconList}
                  color={onBackground(item) ? COLOR_BLUE : COLOR_RED}
                  typeAnswer={typeAnswer}
                  typeText={typeText}
                />
              ) : (
                <ImageComponent
                  isTotal={isTotal}
                  item={item}
                  iconList={iconList}
                  color={COLOR_GRAY_2}
                  typeAnswer={typeAnswer}
                  typeText={typeText}
                />
              )}
              <div
                className="d-flex justify-content-center monkey-fz-25 mt-4"
                onClick={() => onHandlerAction(item.answer_id)}
                style={{ pointerEvents: `${isReview ? "initial" : "none"}` }}
              >
                {isReview ? (
                  <LabelComponent
                    typeIndex={typeIndex}
                    background={item.isActive ? COLOR_GREEN : "transparent"}
                    color={item.isActive ? COLOR_WHITE : COLOR_BLACK}
                    index={index}
                  />
                ) : item.isActive ? (
                  <LabelComponent
                    typeIndex={typeIndex}
                    background={onBackground(item) ? COLOR_BLUE : COLOR_RED}
                    color={onBackground(item) ? COLOR_BLACK : COLOR_WHITE}
                    index={index}
                  />
                ) : (
                  <LabelComponent
                    typeIndex={typeIndex}
                    background={COLOR_GRAY}
                    color={COLOR_WHITE}
                    index={index}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </BodyForm>
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
  text-align: center;
`;

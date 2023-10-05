import React from "react";
import _ from "lodash";
import ReactPlayer from "react-player";

import BoxAnswerItem from "./BoxAnswerItem";
import { URL_IMAGE_QUESTION, URL_VIDEO } from "edu_lms/constants/type";
import { TEXT_SPLIT } from "edu_lms/constants/type";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";

const BoxAnswer = ({
  dataConfig,
  fontSizeAnswer,
  data,
  nameControl,
  index,
  typeAnswer,
  typeText,
  counter = -1,
  number = -1,
  dataHistory,
  setValue,
  showCorrectAnswer,
  onChangeValue,
  isEdit,
  isReadOnly,
}) => {
  const isMedia =
    _.intersection(typeAnswer, [
      TypeGameMultipleChoice.IMAGE,
      TypeGameMultipleChoice.AUDIO,
      TypeGameMultipleChoice.VIDEO,
    ]).length > 0;
  return (
    <div
      className={`${
        isMedia ? "d-block justify-content-center" : "d-flex"
      } mb-2 align-items-center`}
    >
      {_.includes(typeAnswer, TypeGameMultipleChoice.VIDEO) && (
        <div>
          <div className="mb-3 mt-3">
            <ReactPlayer
              width="60%"
              height="60%"
              pip={true}
              controls={true}
              className="mx-auto"
              url={`${URL_VIDEO}${data.iconList?.path}`}
            />
          </div>
        </div>
      )}

      {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
        <div>
          {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
            <div className="mb-3">
              <img
                src={`${URL_IMAGE_QUESTION}${data.iconList?.path}`}
                alt="#"
                className="w-100"
              />
            </div>
          )}
        </div>
      )}

      {!typeAnswer && (
        <div>
          {data.iconList?.path && (
            <div className="mb-3">
              <img
                src={`${URL_IMAGE_QUESTION}${data.iconList?.path}`}
                alt="#"
                className="w-100"
              />
            </div>
          )}
        </div>
      )}
      <div
        className={`d-flex align-items-center flex-wrap ${
          isMedia ? "justify-content-center" : "justify-content-start"
        }`}
      >
        {data.answer_text.map((answerText) => {
          number++;
          if (answerText === TEXT_SPLIT) {
            counter++;
          }
          return (
            <BoxAnswerItem
              key={number}
              index={index}
              counter={counter}
              nameControl={nameControl}
              data={answerText}
              typeText={typeText}
              fontSize={dataConfig.font_size}
              fontSizeAnswer={fontSizeAnswer}
              color={dataConfig.color}
              blankAnswer={Object.values(data.blank_answer[counter] ?? [])}
              dataHistory={dataHistory}
              setValue={setValue}
              showCorrectAnswer={showCorrectAnswer}
              onChangeValue={onChangeValue}
              isEdit={isEdit}
              isReadOnly={isReadOnly}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoxAnswer;

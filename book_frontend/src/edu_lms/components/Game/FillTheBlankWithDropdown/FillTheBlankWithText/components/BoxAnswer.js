import React, { useState } from "react";
import _ from "lodash";
import ReactPlayer from "react-player";

import BoxAnswerItem from "./BoxAnswerItem";
import { URL_IMAGE_QUESTION, URL_VIDEO } from "../../../../../constants/type";
import { TEXT_SPLIT } from "../../../../../constants/type";
import { TypeGameMultipleChoice } from "../../../selection";
import TextComponent from "edu_lms/components/TextComponent";

const BoxAnswer = ({
  dataConfig,
  data,
  register,
  nameControl,
  index,
  typeAnswer,
  typeText,
  isButtonReset,
  indexQuestion,
  counter = -1,
  number = -1,
  fontSizeAnswer,
}) => {
  const [answer, setAnswer] = useState("");
  const [lengthAnswer, setLengthAnswer] = useState();
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
      } mb-3 align-items-center`}
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
        style={{
          fontSize: `${fontSizeAnswer}px`,
        }}
      >
        {data.answer_text.map((answerText, indexAnswerText) => {
          number++;
          if (answerText === TEXT_SPLIT) {
            counter++;
          }
          return (
            <BoxAnswerItem
              key={number}
              isButtonReset={isButtonReset}
              index={index}
              counter={counter}
              nameControl={nameControl}
              dataStatus={data.status}
              data={answerText}
              typeText={typeText}
              type_answer={dataConfig?.type_answer}
              register={register}
              indexQuestion={indexQuestion}
              new_answer_id={data.new_answer_id}
              answer_text={data.answer_text}
              fontSize={fontSizeAnswer}
              color={dataConfig.color}
              blankAnswer={Object.values(data.blank_answer[counter] ?? [])}
              setAnswer={setAnswer}
              lengthAnswer={lengthAnswer}
              setLengthAnswer={setLengthAnswer}
            />
          );
        })}
      </div>
      {typeText && typeText.includes("text") && lengthAnswer > 25 && (
        <div
          className="d-flex flex-wrap ml-5 mt-2"
          style={{ minWidth: "200px" }}
        >
          <div className="monkey-color-black mr-3 font-weight-bold">
            Lựa chọn của bạn:
          </div>
          <TextComponent
            data={answer}
            typeText={typeText ? typeText : ["text"]}
          />
        </div>
      )}
    </div>
  );
};

export default BoxAnswer;

import React from "react";
import _ from "lodash";
import ReactPlayer from "react-player";
import classNames from "classnames";
import BoxAnswerItem from "./BoxAnswerItem";
import { TypeGameMultipleChoice } from "../../../selection";
import {
  URL_IMAGE_QUESTION,
  URL_VIDEO,
  TEXT_SPLIT,
} from "../../../../../constants/type";

const BoxAnswer = ({
  data,
  typeText,
  typeAnswer,
  indexQuestion,
  index,
  toggleChange,
  listStatusAudio,
  fontSize,
  setValue,
  getValues,
}) => {
  let indexResult = 0;
  const isMedia =
    _.intersection(typeAnswer, [
      TypeGameMultipleChoice.IMAGE,
      TypeGameMultipleChoice.VIDEO,
    ]).length > 0;

  const toggle = () => {
    toggleChange(index);
  };

  return (
    <div
      style={{
        border: isMedia ? "1px solid #ddd" : "none",
        borderRadius: isMedia ? "15px" : "",
      }}
      className={classNames("mb-3 align-items-center", {
        "d-block justify-content-center": isMedia,
        "d-flex": !isMedia,
      })}
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

      {_.includes(typeAnswer, TypeGameMultipleChoice.AUDIO) && (
        <button
          className={`${isMedia ? "mx-auto" : ""} d-block mb-3 mt-3`}
          style={{ border: "none", background: "none" }}
        >
          {listStatusAudio[index] ? (
            <i
              onClick={toggle}
              style={{ color: "red", fontSize: "30px" }}
              className="fa fa-pause-circle"
            ></i>
          ) : (
            <i
              onClick={toggle}
              style={{ color: "dodgerblue", fontSize: "30px" }}
              className="fa fa-play-circle"
            ></i>
          )}
        </button>
      )}

      {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
        <div>
          <div className="mb-3">
            <img
              src={`${URL_IMAGE_QUESTION}${data.iconList?.path}`}
              alt="#"
              className="w-100"
            />
          </div>
        </div>
      )}

      <div>
        {data.answer_text.map((answerText, indexAnswerText) => {
          if (answerText === TEXT_SPLIT) {
            indexResult++;
          }

          return (
            <BoxAnswerItem
              key={indexAnswerText}
              indexResult={indexResult - 1}
              index={indexAnswerText}
              dataStatus={data.status}
              data={answerText}
              fontSize={fontSize}
              typeText={typeText}
              indexQuestion={indexQuestion}
              new_answer_id={data.new_answer_id}
              answer_text={data.answer_text}
              iconList={data.iconList}
              setValue={setValue}
              getValues={getValues}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoxAnswer;

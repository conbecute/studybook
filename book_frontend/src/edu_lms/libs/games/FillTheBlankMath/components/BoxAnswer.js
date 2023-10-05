import React from "react";
import _ from "lodash";
import ReactPlayer from "react-player";
import classNames from "classnames";
import BoxAnswerItem from "./BoxAnswerItem";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import styled from "styled-components";
import {
  URL_IMAGE_QUESTION,
  URL_VIDEO,
  TEXT_SPLIT,
} from "edu_lms/constants/type";

const BoxAnswer = ({
  data,
  typeText,
  register,
  typeAnswer,
  indexQuestion,
  index,
  toggleChange,
  listStatusAudio,
  fontSize,
  setValue,
  showCorrectAnswer,
  onPlaying,
  getValues,
  isMedia,
  setIsEdit,
  isReadOnly,
  isEdit,
  isDone,
  newArrInputName,
}) => {
  let indexResult = 0;

  const toggle = () => {
    toggleChange(index);
  };
  return (
    <Answer
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
        <button className={`${isMedia ? "mx-auto" : ""} d-block mb-3 mt-3`}>
          {listStatusAudio[index] ? (
            <AudioPlay
              onClick={toggle}
              className="fa fa-pause-circle"
            ></AudioPlay>
          ) : (
            <Audio onClick={toggle} className="fa fa-play-circle"></Audio>
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

      <TypeAnswer
        className={`${
          isMedia ? "justify-content-center" : "justify-content-start"
        }`}
      >
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
              register={register}
              typeText={typeText}
              onPlaying={onPlaying}
              indexQuestion={indexQuestion}
              new_answer_id={data.new_answer_id}
              answer_text={data.answer_text}
              iconList={data.iconList}
              setValue={setValue}
              getValues={getValues}
              showCorrectAnswer={showCorrectAnswer}
              isReadOnly={isReadOnly}
              isDone={isDone}
              newArrInputName={newArrInputName}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          );
        })}
      </TypeAnswer>
    </Answer>
  );
};

export default BoxAnswer;
const TypeAnswer = styled.div`
  display: flex;
  alignitems: center;
  flexwrap: wrap;
`;
const AudioPlay = styled.i`
  color: red;
  fontsize: 30px;
`;
const Audio = styled.i`
  color: dodgerblue;
  fontsize: 30px;
`;
const Answer = styled.div`
  line-height: 60px;
`;

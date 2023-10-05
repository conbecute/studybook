import React from "react";
import _ from "lodash";
import classNames from "classnames";
import BoxAnswerItem from "./BoxAnswerItem";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import styles from "../FillTheBlank.module.scss";
import styled from "styled-components";

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
  handlePlaying,
  isEdit,
  setIsEdit,
  newArrInputName,
  showCorrectAnswer,
  isDone,
  isReadOnly,
}) => {
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
      className={classNames("mb-2 align-items-center", {
        "d-block justify-content-center": isMedia,
        "d-flex": !isMedia,
      })}
    >
      {_.includes(typeAnswer, TypeGameMultipleChoice.VIDEO) &&
        data.iconList?.path && (
          <div>
            <div className="mb-3 mt-3 d-flex justify-content-center">
              <video
                height="200px"
                width="auto"
                pip={true}
                controls={true}
                className={`mx-auto ${styles.borderRadius7}`}
                src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${data.iconList?.path}`}
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

      {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) &&
        data.iconList?.path && (
          <div className="d-flex justify-content-center mt-2">
            <Image
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${data.iconList?.path}`}
              alt="#"
              className={`${styles.borderRadius7}`}
            />
          </div>
        )}

      <div
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        className={`${
          isMedia ? "justify-content-center" : "justify-content-start"
        }`}
      >
        {data.answer_text.map((answerText, indexAnswerText) => {
          return (
            <BoxAnswerItem
              key={indexAnswerText}
              index={indexAnswerText}
              data={answerText}
              fontSize={fontSize}
              typeText={typeText}
              indexQuestion={indexQuestion}
              new_answer_id={data.new_answer_id}
              setValue={setValue}
              getValues={getValues}
              handlePlaying={handlePlaying}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              newArrInputName={newArrInputName}
              showCorrectAnswer={showCorrectAnswer}
              isDone={isDone}
              isReadOnly={isReadOnly}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoxAnswer;

const Image = styled.img`
  object-fit: contain;
  height: 160px;
  width: auto;
  @media (max-height: 768px), (max-width: 576px) {
    height: 130px;
  }
`;

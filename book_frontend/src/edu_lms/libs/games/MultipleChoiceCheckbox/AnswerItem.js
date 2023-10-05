import _ from "lodash";
import styled from "styled-components";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import styles from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import classNames from "classnames";

export default function AnswerItem({
  data,
  answer,
  checked,
  onClickAudio,
  register,
  handlePlaying,
  showCorrectAnswer,
  isReadOnly,
}) {
  const arrPath = answer?.icon[0]?.path?.split(".");
  const typePath = arrPath ? arrPath[arrPath?.length - 1] : "";
  const isSelected =
    checked && data?.selectedAnswer?.includes(answer.answer_id);
  const isCorrect = checked && Boolean(answer?.is_correct);
  return (
    <div className="col-md-6 mt-2">
      {_.includes(
        data?.data?.game_config?.type_answer,
        TypeGameMultipleChoice.AUDIO
      ) &&
        answer?.icon[0]?.props[0]?.audio[0]?.path && (
          <div className={`position-absolute ${styles.audioAnswer}`}>
            <div
              className={`cursor position-absolute ${styles.iconAudio}`}
              onClick={() =>
                onClickAudio(
                  `${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${answer?.icon[0]?.props[0]?.audio[0]?.path}`
                )
              }
            >
              <i
                className="fa fa-volume-up monkey-color-orange"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        )}
      <label
        className={classNames("d-block h-100 m-0", { cursor: !isReadOnly })}
        htmlFor={answer.answer_id}
      >
        <PAnswer
          className={classNames("h-100 position-relative", {
            [styles.answerSelected]: isSelected && !showCorrectAnswer,
            [styles.answerDefault]: !isSelected,
            [styles.answerCorrect]:
              isSelected && isCorrect && showCorrectAnswer,
            [styles.answerIncorrect]:
              isSelected && !isCorrect && showCorrectAnswer,
          })}
          fillBorder={isSelected && showCorrectAnswer}
          correctAnswer={isCorrect}
        >
          <div className="ml-3">
            <Checkbox
              className={classNames("container d-flex pr-0 mb-0", {
                cursor: !isReadOnly,
              })}
              fillBorder={isSelected && showCorrectAnswer}
              correctAnswer={isCorrect}
            >
              <input
                id={answer.answer_id}
                ref={register}
                type="checkbox"
                value={answer.answer_id}
                name="selectedAnswer"
                onChange={() => {
                  handlePlaying();
                }}
                disabled={isReadOnly}
              />
              <span className="checkmark"></span>
            </Checkbox>
            {answer?.icon[0]?.props && (
              <LatextComponent
                typeText={
                  data.data.game_config.type_text?.includes("latex")
                    ? ["latex"]
                    : ["text"]
                }
                data={answer?.icon[0]?.props[0]?.text}
                fontSize={data?.data?.game_config?.font_size_answer}
              />
            )}
          </div>
          {_.includes(
            data?.data?.game_config?.type_answer,
            TypeGameMultipleChoice.IMAGE
          ) &&
            typePath !== "mp4" &&
            typePath !== "" && (
              <div
                className={`d-flex justify-content-center ${styles.imgAnswer}`}
              >
                <div className="d-flex justify-content-center overflow-hidden w-75 mt-1">
                  <img
                    src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${answer?.icon[0]?.path}`}
                    alt=""
                    className={styles.borderRad7}
                  />
                </div>
              </div>
            )}
          {_.includes(
            data?.data?.game_config?.type_answer,
            TypeGameMultipleChoice.VIDEO
          ) &&
            typePath === "mp4" && (
              <div className="d-flex justify-content-center mt-2 text-center">
                <video
                  src={`${process.env.REACT_APP_MEDIA_URL_APP_COMMON}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${answer?.icon[0]?.path}`}
                  width="auto"
                  height="160px"
                  controls
                  className={styles.borderRad7}
                />
              </div>
            )}
        </PAnswer>
      </label>
    </div>
  );
}

const PAnswer = styled.div`
  min-height: 48px;
  background: ${(props) =>
    !props.fillBorder ? "#fff" : props.correctAnswer ? "#E2FFD6" : "#FDE0CD"};
  border-radius: 10px;
  margin: 2px;
`;
const Checkbox = styled.label`
  &.container {
    position: absolute;
    padding-left: 28px;
    top: 5px;
    left: 5px;

    input {
      display: none;
      &:checked ~ .checkmark {
        background-color: ${(props) =>
          !props.fillBorder ? "#f70" : props.correctAnswer ? "#23BF2D" : "red"};
      }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      position: absolute;
      top: 10px;
      transform: translateY(-50%);
      left: 0px;
      height: 20px;
      width: 20px;
      background-color: #eee;
      border-radius: 50%;
      &:after {
        content: "";
        position: absolute;
        display: none;
        width: 5px;
        height: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: white;
      }
    }
  }
`;

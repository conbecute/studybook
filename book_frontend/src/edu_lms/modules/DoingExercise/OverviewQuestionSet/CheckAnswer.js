import { forwardRef, useImperativeHandle, useRef } from "react";
import _ from "lodash";
import classNames from "classnames";
import styled from "styled-components";
import { INNER_WIDTH, PLAY_MODE } from "edu_lms/constants/type";

function CheckAnswer(
  {
    questions,
    onChangeQuestion,
    activeQuestionIndex,
    hasAnsweredChecking,
    isComplete,
    playMode
  },
  ref
) {
  const getStyleButtonQuestionOrder = (hasAnsweredCheck, status) => {
    const style = {
      color: "#000",
      background: "#ced4da",
    }
    if (!_.isNil(status)) {
      style.color = "#fff";
      style.background = "#ff7707";
      if (hasAnsweredCheck || isComplete) {
        style.background = status === true ? "#28a745" : "#dc3545";
      }
    }
    return style;
  };

  const refQuestions = useRef();
  useImperativeHandle(ref, () => ({
    questions: refQuestions.current,
  }));

  const handleClickNextQuestion = (index) => {
    if (!isComplete) {
      onChangeQuestion(index);
    }
  };

  return (
    <div
      ref={refQuestions}
      style={{ overflow: "auto" }}
      className={classNames("pb-3 mb-2 ml-2 ml-md-4 d-flex", {
        "d-flex justify-content-start flex-wrap":
          window.innerWidth > INNER_WIDTH.MOBILE,
      })}
    >
      {questions?.map((question, index) => {
        const buttonStyle = getStyleButtonQuestionOrder(hasAnsweredChecking, question.isCorrect);

        return (
          <ActiveQuestion
            key={index}
            className={classNames("mx-2", {
              notLocked: !question?.is_locked,
            })}
            activeQuestion={activeQuestionIndex === index}
            isComplete={isComplete}
          >
            <Button
              type="button"
              onClick={() => handleClickNextQuestion(index)}
              isComplete={isComplete}
              backgroundColor={buttonStyle.background}
              color={buttonStyle.color}
              disabled={playMode === PLAY_MODE.PRACTICE_V2}
            >
              {index + 1}
            </Button>
          </ActiveQuestion>
        );
      })}
    </div>
  );
}

const ActiveQuestion = styled.div`
  border: ${(props) =>
    props.activeQuestion && !props.isComplete
      ? "3px solid #ff7707"
      : "3px solid transparent"};
  padding: 1px;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: inline-block;
  &.notLocked {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  pointer-events: ${props => props.isComplete ? "none" : "auto"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    ${window.innerWidth > INNER_WIDTH.MOBILE && "background-color: #dba87d"}
    ${(props) => props.disabled && "background-color: transparent; cursor: no-drop;"}
  }
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export default forwardRef(CheckAnswer);

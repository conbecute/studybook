import React from "react";
import styled from "styled-components";
import { EQUATION } from "edu_lms/components/Game/Graph/RegionGraph/selection";
import Result from "edu_lms/components/Game/Graph/RegionGraph/Result";

export default function CheckRegion({
  question,
  register,
  checkInput,
  handlePlaying,
  valueDataForm,
  showCorrectAnswer,
  showAlert,
  isReadOnly,
  isDisabled,
  showAnswers,
  showConclusion,
}) {
  const renderPoints = (points) =>
    question.map((item, number) => (
      <React.Fragment key={number}>
        <span className="position-relative">
          &nbsp;{points?.isCoordinatesPoints ? "M" : "d"}
          <span className="equationResult position-absolute">
            {number + 1}&nbsp;
          </span>
        </span>
        {number + 1 !== question.length && <span className="pl-2">,</span>}
        &nbsp;
      </React.Fragment>
    ));

  const renderEquations = () =>
    question.map((item, index) => (
      <span key={index}>
        &nbsp;({index + 1}){index + 1 !== question.length && ","}
      </span>
    ));

  return (
    <CheckAnswer className="position-relative">
      <p>
        <span className=" font-weight-bold pr-3">Bước 2</span>
        {question.length > EQUATION ? (
          <span>
            &nbsp;(Nhập tọa độ các điểm{" "}
            {renderPoints({ isCoordinatesPoints: true })}
            &nbsp;&nbsp;bất kì <br /> lần lượt thuộc miền nghiệm của các bất
            <br />
            phương trình
            {renderEquations()}
            &nbsp;mà không nằm trên <br /> các đường thẳng
            {renderPoints()}
            &nbsp;)
          </span>
        ) : (
          <span>
            (Nhập tọa độ điểm M bất kì thuộc miền nghiệm của bất phương trình
            (1) mà không nằm trên đường thẳng d)
          </span>
        )}
      </p>
      {question.map((item, index) => {
        return (
          <div key={index} className="question-game pt-3">
            <QuestionForm
              checkInput={checkInput[index]}
              showAnswers={showAnswers}
              showCorrectAnswer={showCorrectAnswer || showAlert}
            >
              {question.length > EQUATION ? (
                <label>
                  &nbsp;M
                  <span className="question-coordinates">{++index}</span>
                  &nbsp; &nbsp;<span>(&nbsp;</span>
                </label>
              ) : (
                <label className="label-equation pl-3 mr-3">
                  M <span>(&nbsp;</span>
                </label>
              )}
              <input
                ref={register}
                type="number"
                width="50px"
                disabled={isReadOnly || isDisabled}
                value={valueDataForm?.[`x${index}`] || ""}
                name={`x${index}`}
                className="h-50 w-10"
                onChange={handlePlaying}
              />
              <label>&nbsp; {";"}</label>
              <input
                ref={register}
                type="number"
                width="50px"
                disabled={isReadOnly || isDisabled}
                value={valueDataForm?.[`y${index}`] || ""}
                name={`y${index}`}
                className="h-50 w-10"
                onChange={handlePlaying}
              />
              <label className="brackets">
                <span>&nbsp;)</span>
              </label>
            </QuestionForm>
          </div>
        );
      })}
      <div>
        {!isReadOnly && showConclusion && <Result question={question} />}
      </div>
    </CheckAnswer>
  );
}

const CheckAnswer = styled.div`
  font-size: 1.25rem;
  input {
    width: 100px;
  }
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  label {
    color: #151515;
    position: relative;
    .question-coordinates {
      position: absolute;
      bottom: -5px;
      font-size: 14px;
    }
    span {
      font-size: 30px;
      position: absolute;
      bottom: -10px;
    }
  }

  .question-game {
    p {
      padding-left: 10px;
      position: relative;
      span {
        position: relative;
      }
    }
    label {
      padding-right: 15px;
    }
    .label-equation {
      padding-right: 0;
    }
    .brackets {
      span {
        bottom: -25px;
      }
    }
  }
  .equationResult {
    top: 10px;
    font-size: 13px;
    right: -10px;
  }
  @media screen and (max-width: 1200px) and (min-width: 992px) {
    font-size: 18px;
  }
  @media screen and (max-width: 992px) and (min-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 600px) {
    p {
      font-size: 18px;
    }
    .question-game {
      font-size: 16px;
    }
    label {
      span {
        font-size: 25px;
      }
    }
  }
`;

const QuestionForm = styled.div`
  label {
    color: ${(props) =>
      props.showCorrectAnswer && props.showAnswers
        ? props.checkInput
          ? "green"
          : "red"
        : ""};
  }
  input {
    border: 1px solid
      ${(props) =>
        props.showCorrectAnswer && props.showAnswers
          ? props.checkInput
            ? "green"
            : "red"
          : ""};
    color: ${(props) =>
      props.showCorrectAnswer && props.showAnswers
        ? props.checkInput
          ? "green"
          : "red"
        : ""};
  }
  @media (max-width: 900px) {
    input {
      width: 70px;
    }
  }
`;

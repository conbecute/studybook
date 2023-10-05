import React from "react";
import styled from "styled-components";
import { DISEQUATIONS_REGION, EQUATION } from "./selection";

export default function CheckRegion({
  question,
  register,
  checkInput,
  showAlert,
}) {
  return (
    <CheckAnswer className="position-relative monkey-fz-20 pl-3">
      {question.length === EQUATION ? (
        <>
          <Equation>
            {DISEQUATIONS_REGION}
            {question?.length !== EQUATION ? (
              <>
                <span className="position-absolute">1</span>
                &nbsp;)
              </>
            ) : (
              ")"
            )}
          </Equation>
          {question.map((item, index) => (
            <QuestionForm
              key={index}
              className="pt-1"
              checkInput={checkInput[index]}
              showAlert={showAlert}
            >
              <label>M (&nbsp;</label>
              <input
                type="number"
                ref={register}
                width="50px"
                name={`x${++index}`}
                className="h-50 w-10"
              />
              <label>&nbsp;{";"}&nbsp;</label>
              <input
                type="number"
                ref={register}
                width="50px"
                name={`y${++index}`}
                className="h-50 w-10"
              />
              <label>&nbsp;{")"}</label>
            </QuestionForm>
          ))}
        </>
      ) : (
        <>
          {question.map((item, index) => {
            const checkColor = checkInput[index];
            return (
              <div key={index} className="question pt-3">
                <p className="monkey-header pb-2 position-relative">
                  - Nhập tọa độ điểm M
                  <span className="EquationResult position-absolute">
                    {++index}
                  </span>
                  &nbsp; bất kì thuộc miền nghiệm của bất phương trình ( {index}{" "}
                  ) (không thuộc đường thẳng d
                  <span className="EquationResult position-absolute">
                    {index}
                  </span>
                  &nbsp;&nbsp;)
                </p>
                <QuestionForm checkInput={checkColor} showAlert={showAlert}>
                  <label>
                    &nbsp;M<span className="question-coordinates">{index}</span>
                    &nbsp; &nbsp;<span>(&nbsp;</span>
                  </label>
                  <input
                    ref={register}
                    width="50px"
                    name={`x${index}`}
                    className="h-50 w-10"
                    type="number"
                  />
                  <label>&nbsp; {";"}</label>
                  <input
                    ref={register}
                    width="50px"
                    name={`y${index}`}
                    className="h-50 w-10"
                    type="number"
                  />
                  <label className="brackets">
                    <span>&nbsp;)</span>
                  </label>
                </QuestionForm>
              </div>
            );
          })}
        </>
      )}
    </CheckAnswer>
  );
}

const CheckAnswer = styled.div`
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
  .question {
    p {
      padding-left: 10px;
      position: relative;
      span {
        font-size: 14px;
      }
    }
    label {
      padding-right: 15px;
    }
    .brackets {
      span {
        bottom: -25px;
      }
    }
  }
  .EquationResult {
    top: 10px;
  }
`;
const QuestionForm = styled.div`
  label {
    color: ${(props) =>
      props.showAlert ? (props.checkInput ? "green" : "red") : ""};
  }
  input {
    border: 1px solid
      ${(props) =>
        props.showAlert ? (props.checkInput ? "green" : "red") : ""};
    color: ${(props) =>
      props.showAlert ? (props.checkInput ? "green" : "red") : ""};
  }
`;
const Equation = styled.span`
  position: relative;
  span {
    bottom: -5px;
    font-size: 14px;
  }
`;

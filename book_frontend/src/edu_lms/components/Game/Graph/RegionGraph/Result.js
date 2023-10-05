import React from "react";
import styled from "styled-components";
import {
  RESULT_PLAIN,
  RESULT_EQUATIONS,
  RESULT_DISEQUATIONS,
  EQUATION,
} from "./selection";

export default function Result({ question }) {
  const markGame =
    question[0].markGame.includes("le") || question[0].markGame.includes("ge");
  return (
    <div className="monkey-fz-20 pt-2">
      <span className="monkey-f-header">Kết luận:</span>&nbsp;
      {question?.length === EQUATION ? (
        <EquationResult>
          {markGame ? (
            <span className="monkey-fz-20">{RESULT_PLAIN}</span>
          ) : (
            RESULT_EQUATIONS
          )}
        </EquationResult>
      ) : (
        RESULT_DISEQUATIONS
      )}
    </div>
  );
}

const EquationResult = styled.span`
  position: relative;
  .equation-index {
    bottom: -5px;
    font-size: 14px;
  }
`;

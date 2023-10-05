import React from "react";
import styled from "styled-components";
import Question from "./Question";
import BoxContext from "./BoxContext";

export default function index({
  dataAnswers,
  dataQuestion,
  showCorrectAnswer,
  isReadOnly,
  onDragEnd,
  data,
  dataGameConfig,
}) {
  return (
    <TotalTitle className="sequence-wrapper">
      <Question data={dataQuestion} dataGameConfig={dataGameConfig} />
      <BoxContext
        data={dataAnswers}
        onDragEnd={onDragEnd}
        typeDisplay={Number(dataGameConfig?.type_display?.[0])}
        showCorrectAnswer={showCorrectAnswer}
        isReadOnly={isReadOnly}
        dataGame={data}
        dataGameConfig={dataGameConfig}
      />
    </TotalTitle>
  );
}

const TotalTitle = styled.div`
  height: 92%;
  overflow-y: auto;
  overflow-x: hidden;
`;

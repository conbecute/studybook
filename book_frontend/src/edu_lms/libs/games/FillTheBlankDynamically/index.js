import React, { forwardRef } from "react";
import FillTheBlankWithText from "./FillTheBlankWithText";
import styled from "styled-components";

const FillTheBlankDynamically = (
  {
    data,
    objectId,
    onComplete,
    onPlaying,
    showCorrectAnswer,
    isReadOnly,
  },
  ref
) => {
  return (
      <FillTheBlankWrapper>
        <FillTheBlankWithText
          data={data?.game_config}
          objectId={objectId}
          iconList={data?.icon_list}
          dataDefault={data}
          ref={ref}
          onComplete={onComplete}
          onPlaying={onPlaying}
          showCorrectAnswer={showCorrectAnswer}
          isReadOnly={isReadOnly}
        />
      </FillTheBlankWrapper>
  );
};
export default forwardRef(FillTheBlankDynamically);

const FillTheBlankWrapper = styled.div`
  height: 80%;
  overflow-x: hidden;
`;

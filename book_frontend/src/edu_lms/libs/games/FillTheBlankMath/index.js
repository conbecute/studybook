import React, { forwardRef } from "react";
import FillTheBlankWithText from "./components";
import styled from "styled-components";

const FillTheBlankMatch = (
  { data, onComplete, onPlaying, showCorrectAnswer, isReadOnly },
  ref
) => {
  return (
    <FillTheBlankWrapper>
      <FillTheBlankWithText
        data={data?.game_config.data}
        iconList={data?.icon_list}
        dataDefault={data}
        ref={ref}
        isReadOnly={isReadOnly}
        showCorrectAnswer={showCorrectAnswer}
        onComplete={onComplete}
        onPlaying={onPlaying}
      />
    </FillTheBlankWrapper>
  );
};
export default forwardRef(FillTheBlankMatch);

const FillTheBlankWrapper = styled.div`
  height: 80%;
`;

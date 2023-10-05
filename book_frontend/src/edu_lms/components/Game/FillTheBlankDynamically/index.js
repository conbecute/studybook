import React from "react";
import FillTheBlankWithText from "./FillTheBlankWithText";
import styled from "styled-components";

const FillTheBlankDynamically = ({ data, objectId, isPopupTestGame }) => {
  return (
    <FillTheBlankWrapper>
      <FillTheBlankWithText
        isPopupTestGame={isPopupTestGame}
        objectId={objectId}
        dataDefault={data}
      />
    </FillTheBlankWrapper>
  );
};
export default FillTheBlankDynamically;

const FillTheBlankWrapper = styled.div`
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

import React from "react";
import FillTheBlankWithText from "./FillTheBlankWithText";
import styled from "styled-components";

const FillTheBlankWithDropdown = ({ data, dataDefault, objectId }) => {
  return (
    <FillTheBlankWrapper>
      <FillTheBlankWithText
        data={data}
        dataDefault={dataDefault}
        objectId={objectId}
      />
    </FillTheBlankWrapper>
  );
};
export default FillTheBlankWithDropdown;

const FillTheBlankWrapper = styled.div`
  height: 85%;
  overflow-y: scroll;
  text-align: center;
`;

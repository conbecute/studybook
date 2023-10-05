import React from "react";
import FillTheBlankWithText from "./FillTheBlankWithText";
import styled from "styled-components";

const FillTheBlank = ({ data }) => {
  return (
    <FillTheBlankWrapper>
      <FillTheBlankWithText
        data={data.game_config.data}
        iconList={data.icon_list}
        dataDefault={data}
      />
    </FillTheBlankWrapper>
  );
};
export default FillTheBlank;

const FillTheBlankWrapper = styled.div`
  height: 80%;
  overflow-y: scroll;
`;

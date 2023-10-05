import React from "react";
import FillTheBlankWithText from "./FillTheBlankWithText";
import FillTheBlankWithTableText from "./FillTheBlankWithTableText";
import styled from "styled-components";
const FillTheBlank = ({ data, objectId }) => {
  return (
    <FillTheBlankWrapper>
      {onComponentTypeGame(data, objectId)}
    </FillTheBlankWrapper>
  );
};
export default FillTheBlank;

function onComponentTypeGame(data, objectId) {
  switch (Number(data.game_config.type_game)) {
    case 4:
      return (
        <FillTheBlankWithTableText
          data={data.game_config.data.table}
          titleTable={data.game_config.data.title_table}
          iconList={data.icon_list[0].icons}
          dataDefault={data}
          objectId={objectId}
        />
      );
    default:
      return (
        <FillTheBlankWithText
          data={data.game_config.data}
          iconList={data.icon_list}
          dataDefault={data}
          objectId={objectId}
        />
      );
  }
}

const FillTheBlankWrapper = styled.div`
  height: 80%;
  overflow-y: scroll;
`;

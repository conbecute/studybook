import React, { Fragment } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  COLOR_ORANGE_LIGHT,
  COLOR_BLUE,
  COLOR_RED,
  ANSWER_STATUS,
} from "../../../../constants/type";
import DroppableValue from "./DroppableValue";

export default function DroppableItem({
  data,
  typeDisplay,
  dataGame,
  showCorrectAnswer,
  dataGameConfig,
}) {
  return (
    <Fragment>
      {data.map((item, index) => (
        <Draggable key={item.icon_id} index={index} draggableId={item.icon_id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TotalItem
                backgroundTotalColor={
                  showCorrectAnswer && onChangeBg(item.status, dataGame)
                }
                typeDisplay={typeDisplay}
                className="p-1 ml-3 mr-3 mb-3"
              >
                <div className=" position-relative d-flex justify-content-center align-items-center total-question">
                  <DroppableValue item={item} dataGameConfig={dataGameConfig} />
                </div>
              </TotalItem>
            </div>
          )}
        </Draggable>
      ))}
    </Fragment>
  );
}
function onChangeBg(status, dataGame) {
  if (!dataGame.value) {
    switch (status) {
      case ANSWER_STATUS.CORRECT:
        return COLOR_BLUE;
      case ANSWER_STATUS.WRONG:
        return COLOR_RED;
      default:
        return COLOR_ORANGE_LIGHT;
    }
  }
  return COLOR_BLUE;
}

const TotalItem = styled.div`
  box-shadow: 5px 5px 20px 1px #ccc;
  border-radius: 12px;
  .total-question {
    background-color: ${(props) => props.backgroundTotalColor};
    width: ${(props) =>
      props.typeDisplay === ANSWER_STATUS.CORRECT ? "auto" : "200"};
    height: ${(props) =>
      props.typeDisplay === ANSWER_STATUS.CORRECT ? "auto" : "200"};
    border: 1px solid #${(props) => props.backgroundTotalColor};
    border-radius: 12px;
  }
`;

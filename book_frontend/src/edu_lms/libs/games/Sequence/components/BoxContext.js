import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TYPE_DISPLAY_GAME_SQC } from "edu_lms/constants/type";
import DroppableItem from "./DroppableItem";

export default function BoxContext({
  data,
  typeDisplay,
  isDisabled,
  onDragEnd,
  showCorrectAnswer,
  isReadOnly,
  dataGame,
  dataGameConfig,
}) {
  return (
    <Context
      className="d-flex justify-content-center quicksand-medium"
      isReadOnly={isReadOnly}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {data.map((itemAnswer, index) => {
          return (
            <Droppable
              key={index}
              droppableId={`droppable_${index}`}
              direction={onDirection(typeDisplay)}
            >
              {(provided, snapshot) => (
                <TotalContext
                  ref={provided.innerRef}
                  className={onClassName(typeDisplay)}
                  isDisabled={isDisabled}
                  typeDisplay={typeDisplay}
                  snapshot={snapshot}
                  {...provided.droppableProps}
                >
                  <DroppableItem
                    data={itemAnswer}
                    dataGame={dataGame}
                    typeDisplay={typeDisplay}
                    showCorrectAnswer={showCorrectAnswer}
                    dataGameConfig={dataGameConfig}
                  />
                  {provided.placeholder}
                </TotalContext>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Context>
  );
}
function onDirection(typeDisplay) {
  switch (typeDisplay) {
    case TYPE_DISPLAY_GAME_SQC.HORIZONTAL:
      return "horizontal";
    case TYPE_DISPLAY_GAME_SQC.DEFAULT:
    case TYPE_DISPLAY_GAME_SQC.VERTICAL:
      return "vertical";
    default:
      return "";
  }
}
function onClassName(typeDisplay) {
  switch (typeDisplay) {
    case TYPE_DISPLAY_GAME_SQC.HORIZONTAL:
      return "d-flex";
    case TYPE_DISPLAY_GAME_SQC.DEFAULT:
    case TYPE_DISPLAY_GAME_SQC.VERTICAL:
      return "d-block";
      break;
      return "";
  }
}

const Context = styled.div`
  pointer-events: ${(props) => props.isReadOnly && "none"};
`;
const TotalContext = styled.div`
  width: ${(props) =>
    props.typeDisplay === TYPE_DISPLAY_GAME_SQC.VERTICAL ? "230px" : "auto"};
  background: ${(props) =>
    props.typeDisplay === TYPE_DISPLAY_GAME_SQC.VERTICAL
      ? props.snapshot.isDraggingOver
        ? "lightblue"
        : "lightgrey"
      : "transparent"};
`;

import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DroppableItem from "./DroppableItem";

const BoxContext = ({
  data,
  typeDisplay,
  isDisabled,
  typeAnswer,
  onDragEnd,
  onSrcAudio,
  fontSizeAnswer,
  typeTextContent,
}) => {
  return (
    <div className="d-flex justify-content-center quicksand-medium">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.map((itemAnser, index) => {
          return (
            <Droppable
              key={index}
              droppableId={`droppable_${index}`}
              direction={`${onDirection(typeDisplay)}`}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`${onClassName(typeDisplay)}`}
                  style={{
                    pointerEvents: `${isDisabled ? "inherit" : "none"}`,
                    width: `${typeDisplay === 3 ? "230px" : "auto"}`,
                    background: `${
                      typeDisplay === 3
                        ? snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey"
                        : "transparent"
                    }`,
                  }}
                  {...provided.droppableProps}
                >
                  <DroppableItem
                    data={itemAnser}
                    typeAnswer={typeAnswer}
                    typeDisplay={typeDisplay}
                    onSrcAudio={onSrcAudio}
                    fontSizeAnswer={fontSizeAnswer}
                    typeTextContent={typeTextContent}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};
export default BoxContext;

function onDirection(typeDisplay) {
  switch (typeDisplay) {
    case 1:
      return "horizontal";
      break;
    case 2:
    case 3:
      return "vertical";
      break;
    default:
      return "";
  }
}
function onClassName(typeDisplay) {
  switch (typeDisplay) {
    case 1:
      return "d-flex";
      break;
    case 2:
    case 3:
      return "d-block";
      break;
    default:
      return "";
  }
}

import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { COLOR_WHITE, COLOR_BLUE, COLOR_RED } from "../../../../constants/type";
import DroppableValue from "./DroppableValue";

const DroppableItem = ({
  data,
  typeDisplay,
  onSrcAudio,
  typeAnswer,
  fontSizeAnswer,
  typeTextContent,
}) => {
  return (
    <Fragment>
      {data.map((item, index) => (
        <Draggable key={item.icon_id} index={index} draggableId={item.icon_id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className="border p-1 ml-3 mr-3 mb-3 rounded position-relative d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: `${onChangeBg(item.status)}`,
                  width: `${typeDisplay === 1 ? "auto" : "200px"}`,
                  height: `${typeDisplay === 1 ? "auto" : "200px"}`,
                }}
              >
                <DroppableValue
                  item={item}
                  typeAnswer={typeAnswer}
                  onSrcAudio={onSrcAudio}
                  fontSizeAnswer={fontSizeAnswer}
                  typeTextContent={typeTextContent}
                />
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </Fragment>
  );
};
export default DroppableItem;

function onChangeBg(status) {
  switch (status) {
    case 1:
      return COLOR_BLUE;
    case 2:
      return COLOR_RED;
    default:
      return COLOR_WHITE;
  }
}

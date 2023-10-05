import React from "react";
import { useDrag } from "react-dnd";
import _ from "lodash";
import { TextName, BoxItemWrapper } from "../selection";
import { TypeGameMultipleChoice } from "../../selection";

const BoxItem = ({ item, typeAnswers, onSpliceData }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "BoxItem",
      item: item,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          onSpliceData(item.icon_id);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [item]
  );
  const opacity = isDragging ? 0 : 1;
  const display = item.status ? "none" : "block";
  return (
    <div ref={drag} style={{ opacity, display }}>
      <BoxItemWrapper style={{ opacity: `${item.status ? 0 : 1}` }}>
        {_.includes(typeAnswers, TypeGameMultipleChoice.TEXT) && (
          <TextName>{item.props[0]?.text}</TextName>
        )}
      </BoxItemWrapper>
    </div>
  );
};

export default BoxItem;

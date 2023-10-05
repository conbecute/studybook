import React, { useState } from "react";
import { useDrag } from "react-dnd";
import _ from "lodash";
import { URL_IMAGE_QUESTION, URL_AUDIO } from "../../../../constants/type";
import { TypeGameMultipleChoice } from "../../selection";
import { TextName, BoxItemWrapper, Icon } from "../selection";
import AudioComponent from "../../../AudioComponent";

const BoxItem = ({ item, typeGame, typeAnswer, onSpliceData }) => {
  if (typeGame) {
    if (parseInt(typeGame) === TypeGameMultipleChoice.IMG_IMG) {
      typeAnswer = [TypeGameMultipleChoice.IMAGE];
    }
    if (
      parseInt(typeGame) === TypeGameMultipleChoice.IMG_TEXT_TEXT ||
      parseInt(typeGame) === TypeGameMultipleChoice.TEXT_TEXT ||
      parseInt(typeGame) === TypeGameMultipleChoice.IMAGE_TEXT
    ) {
      typeAnswer = [TypeGameMultipleChoice.TEXT];
    }
    if (parseInt(typeGame) === TypeGameMultipleChoice.IMG_TEXT_IMAGE_TEXT) {
      typeAnswer = [TypeGameMultipleChoice.IMAGE, TypeGameMultipleChoice.TEXT];
    }
  }
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
        {_.includes(typeAnswer, TypeGameMultipleChoice.AUDIO) && (
          <Icon>
            <AudioComponent
              src={`${URL_AUDIO}${item.props[0]?.audio[0].path}`}
            />
          </Icon>
        )}
        {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
          <div>
            <img
              src={`${URL_IMAGE_QUESTION}${item.path}`}
              alt="#"
              className="w-100"
            />
          </div>
        )}
        {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
          <TextName>{item.props[0]?.text}</TextName>
        )}
      </BoxItemWrapper>
    </div>
  );
};

export default BoxItem;

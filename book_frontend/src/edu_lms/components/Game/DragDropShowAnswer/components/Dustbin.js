import { useDrop } from "react-dnd";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { TypeGameMultipleChoice } from "../../selection";
import { URL_IMAGE_QUESTION } from "../../../../constants/type";
import {
  BoxWrapperDustbin,
  onChangeColor,
  onChangeBackground,
  TextName,
} from "../selection";

const Dustbin = ({ data, typeQuestion, isButtonCheck, onDustbin }) => {
  const [start, setStateStart] = useState(0);
  const [value, setStateValue] = useState("");
  useEffect(() => {
    setStateStart(0);
  }, [isButtonCheck]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "BoxItem",
      drop: (item, monitor) => {
        setStateValue(item.props[0]?.text);
        setStateStart(1);
        onDustbin(data.icon_id);
        const result = data.id_answer.indexOf(item.icon_id) !== -1;
        if (result) {
          onDustbin(data.icon_id, 1);
        } else {
          onDustbin(data.icon_id, 2);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [data]
  );
  const isActive = canDrop && isOver;
  return (
    <BoxWrapperDustbin>
      <div
        className={`box-body mb-3`}
        ref={drop}
        role={"Dustbin"}
        style={{
          pointerEvents: `${data.status ? "none" : "initial"}`,
          width: "100%",
          height: "50px",
          border: `1px solid ${onChangeColor(
            isButtonCheck,
            data.result,
            start
          )}`,
          borderRadius: "25px",
          backgroundColor: `${onChangeBackground(
            isButtonCheck,
            data.result,
            start
          )}`,
          color: `${onChangeColor(isButtonCheck, data.result, start)}`,
        }}
      >
        {data.status && value}
      </div>
      {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
        <img
          src={`${URL_IMAGE_QUESTION}${data.path}`}
          alt="#"
          className="w-100"
        />
      )}
      {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
        <TextName>{data?.props[0]?.text}</TextName>
      )}
    </BoxWrapperDustbin>
  );
};

export default Dustbin;

import React, { Fragment, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import { URL_IMAGE_QUESTION, URL_AUDIO } from "../../../../constants/type";
import { onResultIcon, TypeGameMultipleChoice } from "../../selection";
import TextComponent from "../../../TextComponent";

const ImageComponent = ({
  isTotal,
  item,
  iconList,
  fontSize,
  fontSizeAnswer,
  color,
  typeAnswer,
  typeText,
  index,
  toggleChange,
  listStatusAudio,
  isBorder = true,
  isFlex = false,
  onHandlerAction,
}) => {
  const resultData = onResultIcon(item.answer_id, iconList[0]?.icons);
  const [srcAudio, setStateSrcAudio] = useState("");
  const toggle = () => {
    toggleChange(index);
  };

  const onAction = (answer_id) => {
    onHandlerAction(answer_id);
  };
  return (
    <ImagesWrapper
      className={isFlex ? "d-flex" : "d-flex justify-content-center"}
      color={isBorder ? color : "transparent"}
      isBorder={isBorder}
    >
      {_.includes(typeAnswer, TypeGameMultipleChoice.AUDIO) && listStatusAudio && (
        <button
          className={`${isFlex ? "" : "mx-auto w-100"} d-block`}
          style={{ border: "none", background: "none" }}
        >
          {listStatusAudio[index] ? (
            <i
              onClick={toggle}
              style={{ color: "red", fontSize: "40px" }}
              className="fa fa-pause-circle"
            ></i>
          ) : (
            <i
              onClick={toggle}
              style={{ color: "dodgerblue", fontSize: "40px" }}
              className="fa fa-play-circle"
            ></i>
          )}
        </button>
      )}
      {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
        <p
          onClick={(e) => onAction(item.answer_id)}
          className={`${isBorder ? "mb-1" : "pl-1"}`}
          style={{ fontSize: fontSizeAnswer ?? "25px" }}
        >
          <TextComponent
            fontSize={fontSizeAnswer ? `${fontSizeAnswer}px` : "25px"}
            typeText={typeText}
            data={String(resultData.props[0]?.text) || ""}
            fontWeight="normal"
          />
        </p>
      )}

      {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
        <img
          style={{
            maxWidth: "100%",
            objectFit: "contain",
          }}
          src={`${URL_IMAGE_QUESTION}${resultData.path}`}
          alt="#"
          onClick={(e) => onAction(item.answer_id)}
        />
      )}
    </ImagesWrapper>
  );
};
export default ImageComponent;

const ImagesWrapper = styled.div`
  border-radius: 15px;
  // border: 1px solid ${(props) => props.color};
  text-align: ${(props) => `${props.isBorder ? "center" : "left"}`};
`;

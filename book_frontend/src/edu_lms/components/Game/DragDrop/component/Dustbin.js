import { useDrop } from "react-dnd";
import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import {
  URL_IMAGE_QUESTION,
  AUDIO_SUCCESS,
  AUDIO_ERROR,
  URL_AUDIO,
} from "../../../../constants/type";
import ReactAudioPlayer from "react-audio-player";
import { TypeGameMultipleChoice } from "../../selection";
import { Icon } from "../selection";

const Dustbin = ({
  data,
  typeGame,
  typeQuestion,
  dropAnswer,
  setCountCorrect,
}) => {
  if (typeGame) {
    if (parseInt(typeGame) === TypeGameMultipleChoice.IMG_IMG) {
      typeQuestion = [TypeGameMultipleChoice.IMAGE];
    }
    if (
      parseInt(typeGame) === TypeGameMultipleChoice.IMG_TEXT_TEXT ||
      parseInt(typeGame) === TypeGameMultipleChoice.IMG_TEXT_IMAGE_TEXT ||
      parseInt(typeGame) === TypeGameMultipleChoice.IMAGE_TEXT
    ) {
      typeQuestion = [
        TypeGameMultipleChoice.IMAGE,
        TypeGameMultipleChoice.TEXT,
      ];
    }
    if (parseInt(typeGame) === TypeGameMultipleChoice.TEXT_TEXT) {
      typeQuestion = [TypeGameMultipleChoice.TEXT];
    }
  }

  const [start, setStateStart] = useState(0);
  const [srcAudio, setStateSrcAudio] = useState("");

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "BoxItem",
      drop: (item, monitor) => {
        dropAnswer({ question: data.icon_id, answer: item.icon_id });
        const result = data.id_answer.indexOf(item.icon_id) !== -1;
        if (result) {
          setCountCorrect((count) => count + 1);
          setStateStart(1);
          setStateSrcAudio(AUDIO_SUCCESS);
        } else {
          setStateStart(2);
          setStateSrcAudio(AUDIO_ERROR);
        }
        setTimeout(function () {
          setStateStart(0);
          setStateSrcAudio("");
        }, 1000);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [data]
  );
  const onPlayAudio = (src) => {
    setStateSrcAudio(src);
  };
  return (
    <BoxWrapper>
      <div
        className="box-body position-relative quicksand-bold"
        ref={drop}
        role={"Dustbin"}
        style={{
          pointerEvents: `${data.id_answer ? "initial" : "none"}`,
        }}
      >
        <div className="text-center">
          {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) && (
            <Icon>
              <i
                onClick={() =>
                  onPlayAudio(`${URL_AUDIO}${data.props[0]?.audio[0].path}`)
                }
                className=" monkey-fz-14 d-flex justify-content-center align-items-center fa fa-volume-up ml-3 cursor"
                aria-hidden="true"
              ></i>
            </Icon>
          )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
            <img
              className="w-100"
              src={`${URL_IMAGE_QUESTION}${data.path}`}
              alt="#"
            />
          )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
            data.props[0]?.text}
        </div>
        {start > 0 && (
          <i
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "50%",
            }}
            className={`${
              start === 1
                ? "fa-check-circle monkey-color-green"
                : "fa-times-circle monkey-color-red"
            }   fa monkey-fz-30`}
            aria-hidden="true"
          ></i>
        )}
      </div>
      <ReactAudioPlayer
        src={srcAudio}
        className="d-none"
        autoPlay={true}
        controls={true}
      />
    </BoxWrapper>
  );
};

export default Dustbin;

const BoxWrapper = styled.div`
  margin: 0px 20px;
`;

import React from "react";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import {
  URL_AUDIO,
  URL_IMAGE_QUESTION,
  URL_VIDEO,
} from "../../../../constants/type";
import { TypeGameMultipleChoice } from "../../selection";
import TextComponent from "../../../TextComponent";
import AudioComponent from "../../../AudioComponent";
import multipleChoice from "../multipleChoice.module.scss";

const TitleComponent = ({
  text,
  typeQuestion,
  fontSize,
  typeText,
  srcAudio,
  srcImage,
  srcVideo,
}) => {
  return (
    <div className="mt-2 mb-3 quicksand-bold">
      <div>
        <div className="d-flex justify-content-start">
          {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) && srcAudio && (
            <div className="ml-2 mt-2 d-flex justify-content-start">
              <AudioComponent src={`${URL_AUDIO}${srcAudio}`} />
            </div>
          )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && text && (
            <div
              className={`ml-2 ${multipleChoice.muitipGame}`}
              style={{
                marginTop: "20px",
                fontSize:
                  fontSize == "number" || fontSize == undefined
                    ? "25px"
                    : `${fontSize}px`,
              }}
            >
              <TextComponent
                fontSize={fontSize ? `${fontSize}px` : "25px"}
                typeText={typeText}
                data={String(text) || ""}
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          {_.includes(typeQuestion, TypeGameMultipleChoice.VIDEO) &&
            srcVideo && (
              <ReactPlayer
                width="60%"
                pip
                controls
                className="mx-auto"
                url={`${URL_VIDEO}${srcVideo}`}
              />
            )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && srcImage && (
            <img
              src={`${URL_IMAGE_QUESTION}${srcImage}`}
              alt="#"
              // className="w-100 mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleComponent;

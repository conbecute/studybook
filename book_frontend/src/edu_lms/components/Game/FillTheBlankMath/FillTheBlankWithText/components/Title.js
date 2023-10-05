import React from "react";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import styles from "./FillTheBlankWithText.module.scss";
import { TypeGameMultipleChoice } from "../../../selection";
import {
  URL_AUDIO,
  URL_IMAGE_QUESTION,
  URL_VIDEO,
} from "../../../../../constants/type";
import TextComponent from "../../../../TextComponent";

const Title = ({ titleQuestion, typeQuestion, typeText, fontSize }) => {
  return (
    <>
      {typeQuestion && (
        <div>
          {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
            titleQuestion?.props[0]?.text && (
              <div
                className={`pr-3 pl-4 monkey-fz-20 quicksand-bold ${styles.question}`}
              >
                <TextComponent
                  typeText={typeText}
                  fontSize={`${fontSize}px`}
                  data={
                    String(titleQuestion?.props[0]?.text)
                      ? String(titleQuestion?.props[0]?.text)
                      : ""
                  }
                />
              </div>
            )}

          {_.includes(typeQuestion, TypeGameMultipleChoice.VIDEO) &&
            titleQuestion?.path && (
              <ReactPlayer
                width="60%"
                height="60%"
                pip={true}
                controls={true}
                className="mx-auto"
                url={`${URL_VIDEO}${titleQuestion?.path}`}
              />
            )}

          {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
            titleQuestion?.path && (
              <img
                src={`${URL_IMAGE_QUESTION}${titleQuestion?.path}`}
                alt="#"
                className="w-100"
              />
            )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) &&
            titleQuestion.props[0]?.audio[0]?.path && (
              <div style={{ width: "35%", margin: "auto" }}>
                <AudioPlayer
                  src={`${URL_AUDIO}${titleQuestion.props[0]?.audio[0]?.path}`}
                  autoPlay={false}
                />
              </div>
            )}
        </div>
      )}
      {!typeQuestion && (
        <div>
          {titleQuestion?.props[0]?.text && (
            <div
              className="mt-3 pr-3 pl-3 monkey-f-bold monkey-fz-20 quicksand-bold"
              style={{ textAlign: "center" }}
            >
              {`${titleQuestion?.props[0]?.text}`}
            </div>
          )}
          {titleQuestion?.path && (
            <img
              src={`${URL_IMAGE_QUESTION}${titleQuestion?.path}`}
              alt="#"
              className="w-100"
            />
          )}
          {titleQuestion.props[0]?.audio[0]?.path && (
            <div className="ml-2 mt-2" style={{ textAlign: "center" }}>
              <ReactAudioPlayer
                src={`${URL_AUDIO}${titleQuestion.props[0]?.audio[0]?.path}`}
                autoPlay={false}
                controls={true}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Title;

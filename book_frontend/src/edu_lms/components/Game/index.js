import React, { useState, useEffect } from "react";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import { TYPE_TEXT, URL_AUDIO } from "../../constants/type";
import { onTitleQuestion } from "./DragDrop/selection";
import IconMusic from "./component/IconMusic";
import AudioComponent from "../AudioComponent";
import Gamess from "./Game.module.scss";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

const GameContainer = ({
  data,
  children,
  isShowTitle,
  textQuestion = true,
}) => {
  const [title, setStateTitle] = useState([]);
  useEffect(() => {
    const resultTitle = onTitleQuestion(data, isShowTitle);
    setStateTitle(resultTitle);
  }, [data, isShowTitle]);

  const type_text =
    _.includes(data.game_config?.type_text, TYPE_TEXT) && TYPE_TEXT;

  return (
    <div
      className="game-container position-relative"
      style={{
        height: "92%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconMusic />
      {isShowTitle && (
        <div
          className="match-title text-left quicksand-bold d-flex"
          style={{
            minHeight: "68px",
            width: "95%",
          }}
        >
          {title[0]?.props[0]?.audio[0]?.path && (
            <div className="ml-2 mt-2 d-flec justify-content-start">
              <AudioComponent
                src={`${URL_AUDIO}${title[0].props[0]?.audio[0]?.path}`}
              />
            </div>
          )}
          {title[0]?.props[0]?.text && (
            <div
              className="monkey-fz-30 text-left ml-2"
              style={{ marginTop: "20px" }}
            >
              {title[0]?.props[0]?.text && textQuestion && (
                <LatextComponent
                  typeText={type_text}
                  fontSize={data.game_config.font_size_title || data.game_config.font_size}
                  data={title[0]?.props[0]?.text}
                />
              )}
            </div>
          )}
        </div>
      )}
      {!isShowTitle && (
        <div
          className="match-title monkey-fz-30 text-center quicksand-bold"
          style={
            {
              // minHeight: "68px"
            }
          }
        >
          <div className={`p-3 pr-3 text-left ${Gamess.text}`}>
            {title[0]?.props[0]?.text && textQuestion && (
              <LatextComponent
                typeText={type_text}
                fontSize={data.game_config.font_size_title || data.game_config.font_size}
                data={title[0]?.props[0]?.text}
              />
            )}
          </div>
          {title[0]?.props[0]?.audio[0]?.path && (
            <ReactAudioPlayer
              src={`${URL_AUDIO}${title[0].props[0]?.audio[0]?.path}`}
              autoPlay={false}
              controls={true}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default GameContainer;

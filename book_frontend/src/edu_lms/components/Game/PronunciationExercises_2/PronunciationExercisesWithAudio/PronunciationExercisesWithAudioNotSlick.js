import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import {
  COLOR_BLUE,
  COLOR_GRAY,
  URL_IMAGE_QUESTION,
  URL_AUDIO,
} from "../../../../constants/type";
import { TypeGameMultipleChoice } from "../../selection";
import _ from "lodash";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const PronunciationExercisesWithAudioNotSlick = ({ data, typeGame }) => {
  const [srcAudio, setStateDataAudio] = useState("");
  const onPlayAudio = (src) => {
    if (_.includes(typeGame, TypeGameMultipleChoice.AUDIO)) {
      if (srcAudio == "") {
        setStateDataAudio(src);
      }
    }
  };
  return (
    <PronounceContent
      columns={data.answer_number_in_a_row ? data.answer_number_in_a_row : 2}
    >
      {data.map((item, index) => {
        return (
          <div className="pronounce-item mt-3 quicksand-medium" key={index}>
            <div className="pronounce-header">
              {_.includes(typeGame, TypeGameMultipleChoice.IMAGE) && (
                <IMAGE_STYLE
                  className={`${
                    _.includes(typeGame, TypeGameMultipleChoice.AUDIO)
                      ? "cursor"
                      : ""
                  }`}
                  onClick={() =>
                    onPlayAudio(`${URL_AUDIO}${item.props[0].audio[0].path}`)
                  }
                  src={`${URL_IMAGE_QUESTION}${item.path}`}
                />
              )}
              <div className="text-center monkey-fz-20 mb-3 monkey-f-bold d-flex monkey-color-black justify-content-center align-items-center">
                {_.includes(typeGame, TypeGameMultipleChoice.TEXT) && (
                  <span
                    style={{
                      fontSize: `${data.fontSize ? data.fontSize : 20}px`,
                    }}
                  >
                    {item.props[0].text}
                  </span>
                )}
                {_.includes(typeGame, TypeGameMultipleChoice.AUDIO) && (
                  <AudioPlayer
                    src={`${URL_AUDIO}${item.props[0].audio[0].path}`}
                    autoPlay={false}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </PronounceContent>
  );
};

export default PronunciationExercisesWithAudioNotSlick;

const IMAGE_STYLE = styled.img`
  height: auto;
  width: 90%;
  src: (props) => props.src;
`;
const PronounceContent = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-gap: 1em;
  text-align: center;
  .rhap_progress-section {
    display: none;
  }
  .rhap_additional-controls {
    display: none;
  }
  .rhap_volume-controls {
    display: none;
  }
  .rhap_forward-button {
    display: none;
  }
  .rhap_rewind-button {
    display: none;
  }
  .rhap_container {
    width: 50px;
    box-shadow: none;
  }
`;
const Icon = styled.div`
  .fa {
    width: 35px;
    height: 35px;
    background-color: ${COLOR_GRAY};
    color: #fff;
    border-radius: 50%;
    :hover {
      background-color: ${COLOR_BLUE};
    }
  }
`;

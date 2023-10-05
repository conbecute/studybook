import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import _ from "lodash";
import {
  URL_IMAGE_QUESTION,
  URL_AUDIO,
  TYPE_TEXT,
} from "../../../../constants/type";
import { TypeGameMultipleChoice } from "../../selection";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import TextComponent from "../../../TextComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PronunciationExercises from "../PronunciationExercises.module.scss";

const PronunciationExercisesWithAudioSlick = ({ data, typeGame, typeText }) => {
  const sliderRef = useRef();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [srcAudio, setStateDataAudio] = useState("");
  const onPlayAudio = (src) => {
    if (_.includes(typeGame, TypeGameMultipleChoice.AUDIO)) {
      if (srcAudio == "") {
        setStateDataAudio(src);
      }
    }
  };

  return (
    <div
      className={`pronunciation-exercises-width-audio-slick-wrapper quicksand-medium ${PronunciationExercises.pronunciation}`}
    >
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => {
          return (
            <div className="pronounce-item" key={index}>
              <div className="pronounce-header text-center">
                <div className="mb-4">
                  {_.includes(typeGame, TypeGameMultipleChoice.AUDIO) &&
                    item.props[0]?.audio[0]?.path && (
                      <div style={{ width: "35%", margin: "auto" }}>
                        <WrapAudioPlayer>
                          <AudioPlayer
                            src={`${URL_AUDIO}${item.props[0].audio[0].path}`}
                            autoPlay={false}
                          />
                        </WrapAudioPlayer>
                      </div>
                    )}
                </div>

                {_.includes(typeGame, TypeGameMultipleChoice.IMAGE) && (
                  <div>
                    <TransformWrapper
                      initialScale={1}
                      initialPositionX={0}
                      initialPositionY={0}
                      defaultPositionX={200}
                      defaultPositionY={100}
                    >
                      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                          <Toolbox
                            style={{ display: "flex", justifyContent: "left" }}
                          >
                            <button
                              className="btn d-flex justify-content-center align-items-center monkey-bg-blue monkey-color-white"
                              onClick={() => zoomIn(0.1)}
                            >
                              <i
                                className="fa fa-search-plus"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              className="btn d-flex justify-content-center align-items-center monkey-bg-blue monkey-color-white"
                              onClick={() => zoomOut(0.1)}
                            >
                              <i
                                className="fa fa-search-minus"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              className="btn d-flex justify-content-center align-items-center monkey-bg-blue monkey-color-white"
                              onClick={() => resetTransform()}
                            >
                              <i
                                className="fa fa-refresh"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </Toolbox>
                          <TransformComponent>
                            <WrapperContent className="d-flex justify-content-center align-items-center">
                              <IMAGE_STYLE
                                className={`${
                                  _.includes(
                                    typeGame,
                                    TypeGameMultipleChoice.AUDIO
                                  )
                                    ? "cursor"
                                    : ""
                                }`}
                                onClick={() =>
                                  onPlayAudio(
                                    `${URL_AUDIO}${item.props[0].audio[0].path}`
                                  )
                                }
                                src={`${URL_IMAGE_QUESTION}${item.path}`}
                              />
                            </WrapperContent>
                          </TransformComponent>
                        </React.Fragment>
                      )}
                    </TransformWrapper>
                  </div>
                )}

                {_.includes(typeGame, TypeGameMultipleChoice.TEXT) && (
                  <div className="mt-3 pb-3">
                    {item.props[0]?.text && _.includes(typeText, TYPE_TEXT) ? (
                      <TextComponent typeText={typeText} data={data} />
                    ) : (
                      <p
                        style={{
                          fontSize: `${data.fontSize ? data.fontSize : 20}px`,
                        }}
                      >
                        {item.props[0]?.text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PronunciationExercisesWithAudioSlick;

const IMAGE_STYLE = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Toolbox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  max-width: calc(100vw - 60px);
  margin: 10px 0;
  button {
    margin-left: 10px;
    width: 2em;
  }
`;

const WrapAudioPlayer = styled.div`
  .rhap_container {
    padding: 3px 15px !important;
  }
  .rhap_stacked .rhap_controls-section {
    margin-top: 0px !important;
  }
`;

const WrapperContent = styled.div`
  width: 1140px;
  height: calc(100vh - 250px);
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 800px;
  }
  @media screen and (min-width: 768px) and (max-width: 960px) {
    width: 900px;
  }
  @media screen and (min-width: 501px) and (max-width: 700px) {
    width: 650px;
  }
  @media screen and (max-width: 500px) {
    width: 480px;
  }
`;

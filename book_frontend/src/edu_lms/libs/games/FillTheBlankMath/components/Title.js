import React, { useRef, useState } from "react";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { isDesktop } from "react-device-detect";
import styled from "styled-components";
import FullScreen from "edu_lms_v2/components/FullScreen";
import styles from "../../FillTheBlankWithText/FillTheBlank.module.scss";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import TextComponent from "edu_lms/components/TextComponent";

const Title = ({
  titleQuestion,
  typeQuestion,
  typeText,
  fontSize,
  onClickAudio,
}) => {
  const refQuestion = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <>
      {typeQuestion && (
        <div
          className={classNames("", {
            "mt-4": isDesktop,
          })}
        >
          <div className="d-flex ml-md-5 ml-2">
            {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) &&
              titleQuestion?.props[0]?.audio[0]?.path && (
                <div className="p-1 cursor">
                  <icon
                    onClick={() =>
                      onClickAudio(
                        `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${titleQuestion?.props[0]?.audio[0]?.path}`
                      )
                    }
                  >
                    <i
                      className="fa fa-volume-up monkey-color-orange monkey-fz-20"
                      aria-hidden="true"
                    ></i>
                  </icon>
                </div>
              )}
            {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
              titleQuestion?.props[0]?.text && (
                <div className={`pr-3 quicksand-bold monkey-f-header pt-2`}>
                  <TextComponent
                    typeText={typeText}
                    fontSize={24}
                    data={
                      String(titleQuestion?.props[0]?.text)
                        ? String(titleQuestion?.props[0]?.text)
                        : ""
                    }
                  />
                </div>
              )}
          </div>

          <div
            ref={refQuestion}
            className="d-flex justify-content-center align-items-center"
          >
            {_.includes(typeQuestion, TypeGameMultipleChoice.VIDEO) &&
              titleQuestion?.path && (
                <ReactPlayer
                  className={`m-auto ${styles.borderRadius7}`}
                  height="300px"
                  width="auto"
                  pip={true}
                  controls={true}
                  url={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${titleQuestion?.path}`}
                />
              )}

            {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
              titleQuestion?.path && (
                <div
                  className={classNames("position-relative monkey-bg-white", {
                    "mw-100 mh-100": isFullScreen,
                  })}
                >
                  <img
                    src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${titleQuestion?.path}`}
                    alt="#"
                    className={classNames(`m-auto ${styles.borderRadius7}`, {
                      "image-question-exercise": !isFullScreen,
                      "image-question-exercise-full": isFullScreen,
                    })}
                  />
                  <FullScreen
                    ref={refQuestion}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                  ></FullScreen>
                </div>
              )}
          </div>
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
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${titleQuestion?.path}`}
              alt="#"
              className="w-100"
            />
          )}
          {titleQuestion.props[0]?.audio[0]?.path && (
            <div className="ml-2 mt-2" style={{ textAlign: "center" }}>
              <ReactAudioPlayer
                src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${titleQuestion.props[0]?.audio[0]?.path}`}
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
const Audio = styled.div`
  width: 35%;
  margin: auto;
`;

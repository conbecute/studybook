import { Fragment, useRef, useState } from "react";
import classNames from "classnames";
import _ from "lodash";
import ReactAudioPlayer from "react-audio-player";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import {
  URL_AUDIO,
  URL_IMAGE_QUESTION,
  URL_VIDEO,
} from "edu_lms/constants/type";
import TextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import styles from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
import FullScreen from "edu_lms_v2/components/FullScreen";
import styled from "styled-components";

const Title = ({ titleQuestion, typeQuestion, typeText, fontSize }) => {
  const refQuestion = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Fragment>
      {typeQuestion && (
        <div>
          {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
            titleQuestion?.props[0]?.text && (
              <div className="pr-3 pl-3 monkey-f-bold monkey-fz-20 quicksand-bold text-left">
                <TextComponent
                  typeText={typeText}
                  data={titleQuestion?.props[0]?.text}
                  fontSize={fontSize}
                />
              </div>
            )}

          {_.includes(typeQuestion, TypeGameMultipleChoice.VIDEO) &&
            titleQuestion?.path && (
              <div
                className={`d-flex justify-content-center ${styles.videoQuestion}`}
              >
                <video
                  width="350px"
                  controls={true}
                  className={styles.borderRad7}
                  src={`${URL_VIDEO}${titleQuestion?.path}`}
                />
              </div>
            )}

          <div
            ref={refQuestion}
            className={`d-flex justify-content-center align-items-center ${styles.imgQuestion}`}
          >
            {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
              titleQuestion?.path && (
                <div
                  className={classNames("position-relative monkey-bg-white", {
                    "mw-100 mh-100": isFullScreen,
                  })}
                >
                  <img
                    src={`${URL_IMAGE_QUESTION}${titleQuestion?.path}`}
                    className={classNames(`${styles.borderRadius7}`, {
                      "image-question-exercise": !isFullScreen,
                      "image-question-exercise-full": isFullScreen,
                    })}
                    alt=""
                  />
                  <FullScreen
                    ref={refQuestion}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                  ></FullScreen>
                </div>
              )}
          </div>
          {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) &&
            titleQuestion.props[0]?.audio[0]?.path && (
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
      {/* {!typeQuestion && (
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
      )} */}
    </Fragment>
  );
};
export default Title;

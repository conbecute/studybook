import { useRef, useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import { isDesktop } from "react-device-detect";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import styles from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import FullScreen from "edu_lms_v2/components/FullScreen";
import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import { URL_AUDIO } from "edu_lms/constants/type";

const WrapAudioPlayer = styled.div`
  width: 40%;
  margin: 0 auto;
  .rhap_container {
    padding: 3px 15px !important;
  }
  .rhap_stacked .rhap_controls-section {
    margin-top: 0px !important;
  }
`;

export default function QuestionContent({ data, onClickAudio }) {
  const refQuestion = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const displayAudio = data?.game_config?.type_display_audio;

  return (
    <>
      <div
        className={classNames("col mr-0", {
          "mt-4": isDesktop,
        })}
      >
        <div
          className={`d-flex justify-content-between align-items-center position-relative px-md-2 ${styles.questionWrapper}`}
        >
          {_.includes(
            data?.data?.game_config?.type_question,
            TypeGameMultipleChoice.AUDIO
          ) &&
            data.question.props[0]?.audio[0]?.path &&
            (displayAudio?.includes("left") || !displayAudio) && (
              <div
                className="position-absolute cursor"
                style={{ top: 10, left: 0 }}
              >
                <icon
                  onClick={() =>
                    onClickAudio(
                      `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${data.question.props[0]?.audio[0]?.path}`
                    )
                  }
                >
                  <i
                    className="fa fa-volume-up monkey-color-orange monkey-fz-25 cursor"
                    aria-hidden="true"
                  />
                </icon>
              </div>
            )}
          <div className="text-center">
            {_.includes(
              data?.data?.game_config?.type_question,
              TypeGameMultipleChoice.TEXT
            ) &&
              data?.question?.props && (
                <p className="text-left monkey-f-header">
                  <LatextComponent
                    typeText={data.data.game_config.type_text}
                    data={data?.question?.props[0]?.text}
                    fontSize={24}
                  />
                </p>
              )}
          </div>
        </div>

        {displayAudio?.includes("bottom") && (
          <div>
            <WrapAudioPlayer>
              <AudioPlayer
                src={`${URL_AUDIO}${data.question.props[0]?.audio[0]?.path}`}
                autoPlay={false}
              />
            </WrapAudioPlayer>
          </div>
        )}

        <div
          ref={refQuestion}
          className={`d-flex justify-content-center align-items-center ${styles.imgQuestion}`}
        >
          {_.includes(
            data?.data?.game_config?.type_question,
            TypeGameMultipleChoice.IMAGE
          ) &&
            data?.question?.path && (
              <div
                className={classNames("position-relative monkey-bg-white", {
                  "mw-100 mh-100": isFullScreen,
                })}
              >
                <img
                  src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${data?.question.path}`}
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
                />
              </div>
            )}
        </div>
      </div>
      <div style={{ margin: 0 }} className="row mt-2 ml-2">
        <div
          className={`d-flex justify-content-center ${styles.videoQuestion}`}
        >
          {_.includes(
            data?.data?.game_config?.type_question,
            TypeGameMultipleChoice.VIDEO
          ) &&
            data?.question?.path && (
              <video
                src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${data?.question?.path}`}
                width="350px"
                controls
                className={styles.borderRad7}
              />
            )}
        </div>
      </div>
    </>
  );
}

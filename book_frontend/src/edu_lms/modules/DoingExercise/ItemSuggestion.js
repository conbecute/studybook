import { useRef, useState } from "react";
import LatextComponent from "./LatextComponent";
import styles from "edu_lms/modules/DoingExercise/DoingExercise.module.scss";
import ReactAudioPlayer from "react-audio-player";
import FullScreen from "edu_lms_v2/components/FullScreen";
import classNames from "classnames";
import styled from "styled-components";

const Image = styled.img`
  ${(props) => !props.isFullScreen && "width: 650px;"}
`;

export default function ItemSuggestion({ data, typeText }) {
  const refQuestion = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <>
      {data?.props[0]?.audio[0]?.path && (
        <div className="d-flex justify-content-center my-1">
          <ReactAudioPlayer
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${data.props[0]?.audio[0]?.path}`}
            controls={true}
          />
        </div>
      )}
      {data?.props[0]?.text && (
        <div className="text-left">
          <LatextComponent
            typeText={typeText}
            data={data?.props[0].text}
            fontSize={24}
          />
        </div>
      )}
      {data?.path && (
        <div
          ref={refQuestion}
          className={`d-flex justify-content-center align-items-center my-1 ${styles.imgQuestion}`}
        >
          {data?.type_media === 1 && (
            <div
              className={classNames("position-relative monkey-bg-white", {
                "mw-100 mh-100": isFullScreen,
              })}
            >
              <Image
                src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${data?.path}`}
                className={classNames(styles.borderRad7, {
                  "image-question-exercise-full": isFullScreen,
                })}
                alt=""
                isFullScreen={isFullScreen}
              />
              <FullScreen
                ref={refQuestion}
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
              />
            </div>
          )}
          {data?.type_media === 2 && (
            <video
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_VIDEO}/${data?.path}`}
              width="450px"
              controls
              className={styles.borderRad7}
            />
          )}
        </div>
      )}
    </>
  );
}

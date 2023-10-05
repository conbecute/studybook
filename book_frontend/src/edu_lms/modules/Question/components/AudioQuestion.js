import styled from "styled-components";
import AudioPlayer from "react-h5-audio-player";
import soundWave from "edu_lms_v2/assets/img/sound-waves1.svg";

export default function AudioQuestion({ src, onDelete }) {
  return (
    <AudioWrapper className="position-relative">
      <AudioPlayer
        src={src}
        showJumpControls={false}
        showDownloadProgress={false}
        header={
          <>
            <img src={soundWave} className="d-inline" />
            <img src={soundWave} className="d-inline" />
          </>
        }
        customIcons={{
          play: <i className="fa fa-play" aria-hidden="true"></i>,
          pause: <i className="fa fa-pause" aria-hidden="true"></i>,
        }}
        autoPlayAfterSrcChange={false}
      />
      <ButtonDelete
        type="button"
        className="position-absolute monkey-color-orange"
        onClick={onDelete}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </ButtonDelete>
    </AudioWrapper>
  );
}

const AudioWrapper = styled.div`
  display: flex;
  justify-content: center;
  .rhap_additional-controls {
    display: none;
  }
  .rhap_volume-controls {
    display: none;
  }
  .rhap_controls-section {
    //   display: none;
    justify-content: center;
  }
  .rhap_header {
    text-align: center;
  }
  .rhap_container {
    border-radius: 7px;
  }
  .rhap_play-pause-button {
    font-size: 20px;
    width: 25px;
    height: 25px;
  }
  .rhap_progress-indicator {
    width: 20px;
    height: 10px;
    top: -2px;
    margin-left: -10px;
    background-color: #ff7707;
  }
  .rhap_progress-filled {
    background-color: #ff7707;
  }
  .rhap_time {
    color: #979797;
    font-size: 12px;
  }
  .rhap_current-time {
    position: relative;
  }
  .rhap_current-time,
  .rhap_total-time {
    position: absolute;
    bottom: 30px;
  }
  .rhap_total-time {
    right: 25px;
  }
`;
const ButtonDelete = styled.button`
  top: 5px;
  right: 10px;
`;

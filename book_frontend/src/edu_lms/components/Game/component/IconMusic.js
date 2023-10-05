import React, { useState, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "reactstrap";
import { Game_BG_MUSIC, COLOR_BLACK } from "../../../constants/type";
import { onDispatchPlayMusic } from "../../../modules/General/actions";

const IconMusic = ({ onDispatchPlayMusic }) => {
  const [isShowMusic, setStateShowMusic] = useState(false);
  const [tooltipMusic, setTooltipMusic] = useState(false);
  const onToggleMusic = () => {
    onDispatchPlayMusic(true);
    setStateShowMusic(!isShowMusic);
  };
  const toggleMusic = () => setTooltipMusic(!tooltipMusic);

  return (
    <Fragment>
      <i
        style={{
          position: "absolute",
          right: "15px",
          top: "5px",
          padding: "6px",
          width: "30px",
          height: "30px",
          border: `1px solid ${COLOR_BLACK}`,
          borderRadius: "50%",
          zIndex: "999",
        }}
        className={`${
          isShowMusic ? "" : "customs-fa-music"
        } fa fa-music cursor ml-3 hvr-registration`}
        aria-hidden="true"
        onClick={onToggleMusic}
        id="tooltip-music"
      ></i>
      <Tooltip
        isOpen={tooltipMusic}
        target="tooltip-music"
        toggle={toggleMusic}
      >
        {isShowMusic ? "Tắt nhạc nền" : "Mở nhạc nền"}
      </Tooltip>
      {isShowMusic && (
        <ReactAudioPlayer
          src={Game_BG_MUSIC}
          className="d-none"
          loop={true}
          autoPlay={true}
          controls={true}
        />
      )}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchPlayMusic,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(IconMusic);

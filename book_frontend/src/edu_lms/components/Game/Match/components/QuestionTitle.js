import React, { useState, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import { URL_AUDIO } from "../../../../constants/type";

const QuestionTitle = ({ data, sizeWidth, typeGame, classNameQuestion }) => {
  const [srcAudio, setStateSrcAudio] = useState("");
  return (
    <Fragment>
      <div
        style={{ zIndex: 33 }}
        className={`${classNameQuestion} question-header position-relative quicksand-bold`}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{ width: `${sizeWidth}px`, height: "20px" }}
              className="text-center ml-3 mr-3"
            >
              {item.props[0]?.audio[0]?.path && (
                <Fragment>
                  <i
                    onClick={() =>
                      setStateSrcAudio(
                        `${URL_AUDIO}${item.props[0]?.audio[0]?.path}`
                      )
                    }
                    className=" monkey-fz-16 fa fa-volume-up cursor hvr-registration"
                    aria-hidden="true"
                  ></i>
                </Fragment>
              )}
              {Number(typeGame) === 2 && (
                <Fragment>
                  <span>{item.props[0]?.text}</span>
                </Fragment>
              )}
            </div>
          );
        })}
      </div>
      {srcAudio != "" && (
        <ReactAudioPlayer
          src={srcAudio}
          className="d-none"
          autoPlay={true}
          controls={true}
          onEnded={() => setStateSrcAudio("")}
        />
      )}
    </Fragment>
  );
};
export default QuestionTitle;

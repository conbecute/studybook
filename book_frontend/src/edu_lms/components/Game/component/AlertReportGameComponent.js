import React, { useState, useEffect, Fragment } from "react";
import { Alert } from "reactstrap";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
import {
  AUDIO_ERROR,
  AUDIO_VICTORY,
  BOOK_LANGUAGE,
} from "../../../constants/type";
import fireworks from "../../../assets/images/fireworks.png";
import sad from "../../../assets/images/sad.png";
const AlertReportGameComponent = ({
  totalQuestion,
  countCorrect,
  show,
  setShowAlert,
  isAlertSQC,
}) => {
  const [isFirework, setStateFirework] = useState(false);
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const results = countCorrect / totalQuestion;
  const pass = results >= 0.7;

  useEffect(() => {
    if (show) {
      setStateFirework(true);
      setTimeout(() => {
        setStateFirework(false);
      }, 1000);
    }
  }, [show]);

  const onDismiss = () => {
    setShowAlert(false);
  };

  return (
    <Fragment>
      {show && (
        <Alert
          color={pass ? "info" : "danger"}
          toggle={onDismiss}
          style={{
            position: "absolute",
            right: "0px",
            minWidth: "320px",
            bottom: "50px",
            top: "inherit",
            zIndex: "10",
            paddingRight: "2rem",
          }}
        >
          <div className="d-flex w-100 justify-content-center align-items-center">
            <div className="d-inline-flex w-100 align-items-center">
              <div className="fireworks w-25 text-center">
                <img
                  alt="result"
                  className="w-100"
                  src={pass ? fireworks : sad}
                />
              </div>
              <div className="d-flex w-75 align-items-center flex-column">
                <p className="text-center p-2">
                  <span className="monkey-color-blue">
                    {countCorrect}/{totalQuestion}
                  </span>
                  {isAlertSQC
                    ? BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                        ?.correctPosition
                    : BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                        ?.editShowResult}
                </p>
                <span className="p-2 monkey-fz-14 text-center">
                  {pass
                    ? BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                        ?.congratulation
                    : BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                        ?.sorry}
                </span>
              </div>
            </div>
          </div>
          <ReactAudioPlayer
            src={pass ? AUDIO_VICTORY : AUDIO_ERROR}
            className="d-none"
            autoPlay={true}
            controls={true}
          />
          {isFirework && pass && (
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          )}
        </Alert>
      )}
    </Fragment>
  );
};

export default AlertReportGameComponent;

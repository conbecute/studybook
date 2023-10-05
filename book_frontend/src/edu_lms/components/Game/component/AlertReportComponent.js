import React, { useState, useEffect, Fragment } from "react";
import { Alert } from "reactstrap";
import ReactAudioPlayer from "react-audio-player";
import { Tooltip } from "reactstrap";
import { useSelector } from "react-redux";
import { AlertDefault, AlertErrorValidate } from "../selection";
import { BOOK_LANGUAGE } from "../../../constants/type";
import fireworks from "../../../assets/images/fireworks.png";
import sad from "../../../assets/images/sad.png";
const AlertReportComponent = ({
  totalQuestion,
  countCorrect,
  alert,
  handleDispatchDataAlert,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [dataAlert, setStateDataAlert] = useState();
  const [isFirework, setStateFirework] = useState(false);
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );
  const results = countCorrect / totalQuestion;
  const pass = results >= 0.7 ? true : false;

  useEffect(() => {
    setStateDataAlert({ ...dataAlert, ...alert });
    if (alert?.color === "info") {
      setStateFirework(true);
      setTimeout(() => {
        setStateFirework(false);
      }, 1000);
    }
  }, [alert]);

  const onDismiss = () => {
    handleDispatchDataAlert(AlertDefault);
  };
  return (
    <Fragment>
      {alert == AlertErrorValidate && dataAlert?.visible && (
        <Alert
          color={dataAlert.color}
          isOpen={dataAlert.visible}
          toggle={onDismiss}
          style={{
            position: "absolute",
            right: "0px",
            minWidth: "320px",
            bottom: "50px",
            top: "inherit",
            zIndex: "999",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <i
              className={`${dataAlert.icon} fa mr-2 monkey-fz-20`}
              aria-hidden="true"
            ></i>{" "}
            {dataAlert.text}
          </div>
          <ReactAudioPlayer
            src={dataAlert.srcAudio}
            className="d-none"
            autoPlay={true}
            controls={true}
          />
        </Alert>
      )}

      {alert != AlertErrorValidate && dataAlert?.visible && (
        <Alert
          color={dataAlert.color}
          isOpen={dataAlert.visible}
          toggle={onDismiss}
          style={{
            position: "absolute",
            right: "0px",
            minWidth: "320px",
            bottom: "50px",
            top: "inherit",
            zIndex: "999",
            paddingRight: "2rem",
          }}
        >
          <div className="d-flex w-100 justify-content-center align-items-center">
            <div className="d-inline-flex w-100 align-items-center">
              <div className="fireworks w-25 text-center">
                {pass ? (
                  <img className="w-100" src={fireworks} />
                ) : (
                  <img className="w-100" src={sad} />
                )}
              </div>
              <div className="d-flex w-75 align-items-center flex-column">
                <p className="text-center p-2">
                  <span className="monkey-color-blue">
                    {countCorrect}/{totalQuestion}
                  </span>
                  {
                    BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                      ?.editShowResult
                  }{" "}
                </p>

                {pass ? (
                  <span className="p-2 monkey-fz-14 text-center">
                    {
                      BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                        ?.congratulation
                    }
                  </span>
                ) : (
                  <span className="p-2 monkey-fz-14 text-center">
                    {
                      BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                        ?.sorry
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
          <ReactAudioPlayer
            src={dataAlert.srcAudio}
            className="d-none"
            autoPlay={true}
            controls={true}
          />
          {isFirework && (
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

export default AlertReportComponent;

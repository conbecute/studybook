import React, { useState, useEffect, Fragment } from "react";
import { Alert } from "reactstrap";
import { useSelector } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import { AlertDefault } from "../selection";

const AlertComponent = ({ alert, handleDispatchDataAlert, isReview }) => {
  const [dataAlert, setStateDataAlert] = useState();
  const [isFirework, setStateFirework] = useState(false);
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

  useEffect(() => {
    if (!isReview) onDismiss();
  }, [isReview]);
  return (
    <Fragment>
      {dataAlert?.visible && (
        <Alert
          color={dataAlert.color}
          isOpen={dataAlert.visible}
          toggle={onDismiss}
          style={{
            position: "absolute",
            right: "0px",
            width: "fit-content",
            minWidth: "250px",
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

export default AlertComponent;

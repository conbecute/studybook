import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";
import ReactAudioPlayer from "react-audio-player";
import IconAlert from "./IconAlert";
import CTAAlert from "./CTAAlert";
import {
  AUDIO_ERROR,
  AUDIO_VICTORY,
  ALERT_GAME,
} from "../../../../constants/type";

export default function AlertReportMultipleQuestion({
  totalQuestion,
  totalAnswer,
  showAlert,
  alertDefault,
  onDismiss,
  TextAlert,
  languageBook,
}) {
  if (showAlert) {
    return (
      <Alert
        isOpen
        color={alertDefault === ALERT_GAME.success ? "info" : "danger"}
        toggle={onDismiss}
        className="p-0"
      >
        <ContentAlert className="d-flex justify-content-start align-items-center text-center w-100 pt-1 pb-1">
          <div className="icon-alert">
            <IconAlert alertDefault={alertDefault} />
          </div>
          <div className="align-items-center flex-column">
            <p className="text-center">
              <span className="monkey-color-blue p-2">
                {totalAnswer}/{totalQuestion}
              </span>
              {TextAlert.correct_placeholder}
            </p>
            <CTAAlert alertDefault={alertDefault} languageBook={languageBook} />
          </div>
        </ContentAlert>
        <ReactAudioPlayer
          src={
            alertDefault === ALERT_GAME.success ? AUDIO_VICTORY : AUDIO_ERROR
          }
          className="d-none"
          autoPlay
          controls
        />
      </Alert>
    );
  }
  return null;
}

const ContentAlert = styled.div`
  padding-right: 50px;
  padding-left: 15px;
  .icon-alert {
    width: 60px;
  }
`;

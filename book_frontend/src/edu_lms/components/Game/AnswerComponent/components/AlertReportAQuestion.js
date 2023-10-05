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

export default function AlertReportAQuestion({
  showAlert,
  alertDefault,
  onDismiss,
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
        <ContentReport className="d-flex justify-content-start align-items-center w-100 pl-3">
          <div className="icon-alert">
            <IconAlert alertDefault={alertDefault} />
          </div>
          <CTAAlert alertDefault={alertDefault} languageBook={languageBook} />
        </ContentReport>
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

const ContentReport = styled.div`
  padding: 0 50px;
  .icon-alert {
    width: 60px;
  }
`;

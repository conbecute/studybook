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

export default function AlertFinalReport({
  totalQuestion,
  totalAnswer,
  showAlert,
  alertDefault,
  onDismiss,
  totalChoose,
  TextAlert,
  languageBook,
}) {
  if (showAlert) {
    return (
      <Alert
        isOpen
        color={alertDefault === ALERT_GAME.success ? "info" : "danger"}
        toggle={onDismiss}
        className="pl-2 pr-5"
      >
        <div className="d-flex">
          <ContentAlert>
            <div className="icon-alert">
              <IconAlert alertDefault={alertDefault} />
            </div>
          </ContentAlert>
          <AnswerAlert>
            <li>
              {TextAlert.yourCorrect}{" "}
              <span className="monkey-color-blue">{totalAnswer}</span>
            </li>
            <li>
              {TextAlert.yourSelected}{" "}
              <span className="monkey-color-blue">{totalChoose}</span>
            </li>
            <li>
              {TextAlert.totalCorrect}{" "}
              <span className="monkey-color-blue">{totalQuestion}</span>
            </li>
          </AnswerAlert>
        </div>
        <div className="pl-2 text-align-left">
          <CTAAlert alertDefault={alertDefault} languageBook={languageBook} />
        </div>
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
  .icon-alert {
    width: 60px;
  }
`;
const AnswerAlert = styled.ul`
  text-align: left;
  li {
    list-style: none;
  }
`;

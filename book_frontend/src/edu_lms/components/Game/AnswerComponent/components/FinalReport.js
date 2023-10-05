import React from "react";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import IconAlert from "./IconAlert";
import CTAAlert from "./CTAAlert";
import {
  AUDIO_ERROR,
  AUDIO_VICTORY,
  ALERT_GAME,
} from "../../../../constants/type";

export default function FinalReport({
  totalQuestion,
  totalAnswer,
  alertDefault,
  onResetData,
  TextAlert,
  languageBook,
}) {
  return (
    <div className="d-flex justify-content-center h-100 text-center monkey-fz-30">
      <div className="d-inline-flex w-100 align-items-center">
        <div className="fireworks w-100 text-center">
          <ContentAlert className="d-flex justify-content-center align-items-center text-center">
            <div className="icon-alert">
              <IconAlert alertDefault={alertDefault} />
            </div>
            <div className="align-items-center flex-column pt-3">
              <p className="text-center">
                <span className="monkey-color-blue p-2">
                  {totalAnswer}/{totalQuestion}
                </span>{" "}
                {TextAlert.editShowResult}
              </p>
              <CTAAlert
                alertDefault={alertDefault}
                languageBook={languageBook}
              />
            </div>
          </ContentAlert>
          <button
            onClick={onResetData}
            className="btn monkey-bg-blue monkey-color-white cursor"
            id="tooltip-reset"
          >
            {TextAlert.buttonRefresh}
          </button>
          <ReactAudioPlayer
            src={
              alertDefault === ALERT_GAME.success ? AUDIO_VICTORY : AUDIO_ERROR
            }
            className="d-none"
            autoPlay
            controls
          />
        </div>
      </div>
    </div>
  );
}

const ContentAlert = styled.div`
  padding-right: 100px;
  .icon-alert {
    width: 100px;
  }
`;

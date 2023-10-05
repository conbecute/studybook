import React, { forwardRef, Fragment } from "react";
import renderHTML from "react-render-html";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import _ from "lodash";
import styled from "styled-components";
import classNames from "classnames";
import { isDesktop } from "react-device-detect";
import { onChangeColor } from "./selection";
import {
  styleWrapper,
  TypeGameMultipleChoice,
} from "edu_lms/components/Game/selection";
import styles from "./WordFinding.module.scss";
import TitleQuestionWordFinding from "./TitleQuestion";
import IconAudio from "edu_lms/assets/images/speaker-filled-audio-toolc.svg";
import { formatText } from "edu_lms/utils";
import { formattedFontSize } from "../../../components/Game/WordFinding/components";

const WordFindingWrapper = ({
  data,
  dataGameConfig,
  onActiveText,
  showCorrectAnswer,
  isReadOnly,
  handlePlayAudio,
}) => {
  const pathAudioTitle = data?.question.props[0]?.audio[0]?.path;
  const { type_text: typeText, font_size: fontSize } = dataGameConfig;
  return (
    <Fragment>
      <div className="find-words-container" style={{ ...styleWrapper }}>
        <div className="position-relative">
          {pathAudioTitle && (
            <AudioTitle
              className={classNames("d-inline-block position-absolute", {
                "result-screen": isReadOnly,
                "on-mobile": !isDesktop,
              })}
            >
              <img
                src={IconAudio}
                alt=""
                className="cursor p-2"
                onClick={() =>
                  handlePlayAudio(
                    `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${pathAudioTitle}`
                  )
                }
              />
            </AudioTitle>
          )}
          <div className={pathAudioTitle ? "pl-5" : ""}>
            <TitleQuestionWordFinding
              text={data?.question?.props[0]?.text}
              urlImage={data?.question?.path}
              dataGameConfig={dataGameConfig}
            />
          </div>
        </div>
        <div className="find-words-body p-3 quicksand-medium">
          {data?.answers.map((item, index) => {
            const pathAudioAnswer = item.props[0]?.audio[0]?.path;
            return (
              <div className="position-relative pl-4">
                {pathAudioAnswer && (
                  <AudioAnswer
                    className={classNames({
                      "on-desktop": isDesktop,
                      "on-mobile": !isDesktop,
                      "result-screen": isReadOnly,
                    })}
                  >
                    <img
                      src={IconAudio}
                      alt=""
                      className="cursor p-2"
                      onClick={() =>
                        handlePlayAudio(
                          `${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_AUDIO}/${pathAudioTitle}`
                        )
                      }
                    />
                  </AudioAnswer>
                )}
                <div
                  key={index}
                  className={`mb-3 d-flex flex-wrap pr-3 pl-3 ${styles.textSpan}`}
                >
                  {item?.answer_text.map((itemText, indexText) => {
                    return (
                      <div key={indexText} className="mb-1">
                        <TextSpan
                          fontSize={fontSize}
                          className={classNames(
                            `${onChangeColor(
                              itemText.status,
                              showCorrectAnswer
                            )}
                            pl-1 pr-1 cursor rounded-pill span-wfd-hover`,
                            { "result-screen": isReadOnly }
                          )}
                          onClick={() => onActiveText(itemText, item.answer_id)}
                        >
                          {_.includes(
                            typeText,
                            TypeGameMultipleChoice.LATEX
                          ) ? (
                            <MathpixLoader>
                              <MathpixMarkdown
                                text={formatText(itemText.value)}
                              />
                            </MathpixLoader>
                          ) : (
                            renderHTML(formatText(itemText.value))
                          )}
                        </TextSpan>
                        <span>&nbsp;</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default forwardRef(WordFindingWrapper);
const AudioAnswer = styled.div`
  &.on-desktop {
    position: absolute;
    top: 5px;
    left: -10px;
  }
  &.on-mobile {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  &.result-screen {
    pointer-events: none;
  }
`;
const AudioTitle = styled.div`
  top: 0px;
  left: 10px;
  &.result-screen {
    pointer-events: none;
  }
  &.on-mobile {
    top: -5px;
    left: 15px;
  }
`;

const TextSpan = styled.span`
  font-size: ${(props) => formattedFontSize(props.fontSize)};
  border-style: solid;
  line-height: 1.5;
  border-width: 2px;
  pointer-events: inherit;
  display: inline-flex;

  &.result-screen {
    pointer-events: none;
  }
  span {
    border-style: none;
  }
  #content div:first-child {
    padding: 0 !important;
  }

  @media screen and (max-width: 992px) {
    font-size: 28px;
  }
`;

import React, { Fragment } from "react";
import renderHTML from "react-render-html";
import _ from "lodash";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import {
  styleWrapper,
  styleFooterWrapper,
  styleAlertGame,
} from "../../selection";
import { onChangeColor } from "../selection";
import TitleQuestionTextAndImage from "../../component/TitleQuestionTextAndImage";
import AudioComponent from "../../../AudioComponent";
import {
  URL_AUDIO,
  GAME_TYPE,
  CTA_POPUP_TYPE,
} from "../../../../constants/type";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import { formatText } from "edu_lms/utils";
import styled from "styled-components";
import AnswerComponent from "../../AnswerComponent";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";

const WordFindingWrapper = ({
  isButtonReset,
  data,
  isDisabled,
  typeText,
  dataGameConfig,
  onActiveText,
  onResetData,
  onCheckAnswers,
  countCorrect,
  totalQuestion,
  isAlert,
  setAlert,
  totalChoose,
  isSelected,
}) => {
  const pathAudioTitle = data?.question.props[0]?.audio[0]?.path;
  return (
    <Fragment>
      <div className="find-words-container" style={{ ...styleWrapper }}>
        <div className="position-relative">
          {pathAudioTitle && (
            <AudioTitle className="d-inline-block position-absolute">
              <AudioComponent src={`${URL_AUDIO}${pathAudioTitle}`} />
            </AudioTitle>
          )}
          <div className={pathAudioTitle ? "pl-5" : ""}>
            <TitleQuestionTextAndImage
              text={data?.question?.props[0]?.text}
              urlImage={data?.question?.path}
              dataGameConfig={dataGameConfig}
            />
          </div>
        </div>
        <div className="find-words-body p-4 quicksand-medium">
          {data?.answers.map((item, index) => {
            return (
              <div className="position-relative ">
                {item.props && item.props[0]?.audio[0]?.path && (
                  <AudioAnswer>
                    <AudioComponent
                      src={`${URL_AUDIO}${item.props[0]?.audio[0]?.path}`}
                    />
                  </AudioAnswer>
                )}
                <div key={index} className="mb-3 d-flex flex-wrap">
                  {item?.answer_text.map((itemText, indexText) => {
                    return (
                      <AnswerText key={indexText}>
                        <span
                          className={`${onChangeColor(
                            itemText.status
                          )} pl-1 pr-1 cursor rounded-pill hvr-registration d-flex`}
                          style={{
                            fontSize: formattedFontSize(
                              dataGameConfig.font_size
                            ),
                            borderStyle: "solid",
                            lineHeight: "1.5",
                            borderWidth: "2px",
                            pointerEvents: `${isDisabled ? "none" : "inherit"}`,
                          }}
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
                        </span>
                      </AnswerText>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="find-words-footer text-right pr-3 pb-3"
        style={{ ...styleFooterWrapper }}
      >
        <ButtonCheckAnswerAndResetGame
          onResetGame={onResetData}
          onSubmitGame={onCheckAnswers}
          isDisabled={!isSelected}
          isSubmitted={!isButtonReset}
        />
      </div>
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          totalAnswer={countCorrect}
          totalQuestion={totalQuestion}
          typeGame={GAME_TYPE.oneGame}
          checkScreen={CTA_POPUP_TYPE.yesNo}
          totalChoose={totalChoose}
          showAlert={isAlert}
          setShowAlert={setAlert}
        />
      </ShowAlert>
    </Fragment>
  );
};
export default WordFindingWrapper;
export const formattedFontSize = (fontSize) =>
  `${_.trimEnd(fontSize, "px") || 26}px`;

const AudioAnswer = styled.div`
  margin-left: -15px;
  margin-right: 15px;
  position: absolute;
  top: -6px;
`;
const AudioTitle = styled.div`
  top: -13px;
`;
const AnswerText = styled.div`
  p {
    padding: 0 !important;
    display: inline;
  }
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

import React, { Fragment } from "react";
import styled from "styled-components";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";
import {
  styleWrapper,
  styleFooterWrapper,
  styleAlertGame,
} from "../../selection";
import { onChangeColor } from "../../WordFinding/selection";
import TitleQuestionTextAndImage from "../../component/TitleQuestionTextAndImage";
import AudioComponent from "../../../AudioComponent";
import {
  URL_AUDIO,
  GAME_TYPE,
  CTA_POPUP_TYPE,
} from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";
import { formattedFontSize } from "../../WordFinding/components";

const WordFindingWrapper = ({
  isButtonReset,
  dataAnswers,
  dataQuestion,
  isDisabled,
  onActiveText,
  onResetData,
  onCheckAnswers,
  countCorrect,
  totalQuestion,
  showAlert,
  setShowAlert,
  totalChoose,
  isSelected,
  dataGameConfig,
}) => {
  const pathAudioTitle = dataQuestion?.props[0]?.audio[0]?.path;
  return (
    <Fragment>
      <div className="find-words-container" style={{ ...styleWrapper }}>
        <div className="position-relative">
          {pathAudioTitle && (
            <AudioTile>
              <AudioComponent src={`${URL_AUDIO}${pathAudioTitle}`} />
            </AudioTile>
          )}
          <div className={pathAudioTitle ? "pl-5" : ""}>
            <TitleQuestionTextAndImage
              text={dataQuestion?.props[0]?.text}
              urlImage={dataQuestion?.path}
              dataGameConfig={dataGameConfig}
            />
          </div>
        </div>
        <div className="find-words-body p-2 quicksand-medium">
          {dataAnswers.map((item, index) => {
            return (
              <div
                key={index}
                className="mb-3 d-flex flex-wrap pr-3 pl-3 monkey-fz-18"
                style={{
                  fontSize: formattedFontSize(dataGameConfig.font_size),
                }}
              >
                {item?.paragraph.map((data, indexText) => {
                  const pathAudio = data.props[0]?.audio[0]?.path;
                  return (
                    <div key={indexText} className="position-relative w-100">
                      {pathAudio && (
                        <AudioAnswer>
                          <AudioComponent src={`${URL_AUDIO}${pathAudio}`} />
                        </AudioAnswer>
                      )}
                      <div className={pathAudio ? "pl-5" : ""}>
                        <span
                          className={`${onChangeColor(
                            data.status
                          )} cursor rounded-pill hvr-registration`}
                          style={{
                            borderStyle: "solid",
                            lineHeight: "1.5",
                            borderWidth: "2px",
                            pointerEvents: `${isDisabled ? "none" : "inherit"}`,
                          }}
                          onClick={() => onActiveText(data.sentence_id)}
                        >
                          {data?.props[0]?.text}
                        </span>
                        <span>&nbsp;</span>
                      </div>
                    </div>
                  );
                })}
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
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeMutipleGame}
          totalQuestion={totalQuestion}
          totalAnswer={countCorrect}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          totalChoose={totalChoose}
        />
      </ShowAlert>
    </Fragment>
  );
};
export default WordFindingWrapper;
const AudioAnswer = styled.div`
  margin-left: -15px;
  margin-right: 15px;
  position: absolute;
  top: -10px;
`;
const AudioTile = styled.div`
  position: absolute;
  top: -17px;
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

import styled from "styled-components";
import ButtonCheckAnswers from "edu_lms/components/Game/component/ButtonCheckAnswers";
import {
  styleFooterWrapper,
  styleAlertGame,
} from "edu_lms/components/Game/selection";
import AnswerComponent from "../../AnswerComponent";
import {
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_RED,
  COLOR_BLUE,
  BOOK_LANGUAGE,
  ANSWER_STATUS,
  GAME_TYPE,
  CTA_POPUP_TYPE,
} from "../../../../constants/type";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";

const FooterSequence = ({
  isDisabled,
  onResetData,
  onCheckAnswers,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
  indexQuestion,
  onNextQuestion,
  setCheckButton,
  languageBook,
  stateResult,
}) => {
  const onNextQuestionGame = () => {
    onNextQuestion();
    onResetData();
    setCheckButton(true);
  };

  return (
    <div
      className="sequence-footer text-right pr-3"
      style={{ ...styleFooterWrapper }}
    >
      {stateResult?.length > 1 ? (
        <FooterWrapper>
          <div className="footer-left d-flex align-items-center justify-content-end position-relative">
            <div className="d-flex align-items-center justify-content-center ml-3 mr-3 ">
              {stateResult?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `${indexQuestion === index ? "16px" : "12px"}`,
                      height: `${indexQuestion === index ? "16px" : "12px"}`,
                      border: `2px solid ${onBorderColor(item.status)}`,
                      borderRadius: "50%",
                      margin: "0 5px",
                      backgroundColor: onBackgroundColor(item.status),
                    }}
                  ></div>
                );
              })}
              <div className="footer-right">
                <ShowAlert styleAlertGame={styleAlertGame}>
                  <AnswerComponent
                    typeGame={GAME_TYPE.oneGame}
                    checkScreen={CTA_POPUP_TYPE.yesNo}
                    totalQuestion={totalQuestion}
                    totalAnswer={countCorrect}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                  />
                </ShowAlert>
                {!isDisabled && (
                  <button
                    onClick={onNextQuestionGame}
                    className="monkey-bg-green cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
                  >
                    {
                      BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                        ?.buttonContinue
                    }
                  </button>
                )}
                {isDisabled && (
                  <ButtonCheckAnswers onCheckAnswers={onCheckAnswers} />
                )}
              </div>
            </div>
          </div>
        </FooterWrapper>
      ) : (
        <>
          <ShowAlert styleAlertGame={styleAlertGame}>
            <AnswerComponent
              typeGame={GAME_TYPE.oneGame}
              checkScreen={CTA_POPUP_TYPE.yesNo}
              totalQuestion={totalQuestion}
              totalAnswer={countCorrect}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </ShowAlert>
          <ButtonCheckAnswerAndResetGame
            onResetGame={onResetData}
            onSubmitGame={onCheckAnswers}
            isSubmitted={isDisabled}
          />
        </>
      )}
    </div>
  );
};
export default FooterSequence;
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  width: 100%;
  .alert {
    position: absolute;
    top: -96px;
    width: 295px;
    right: 5px;
  }
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;
function onBackgroundColor(type) {
  switch (type) {
    case ANSWER_STATUS.CORRECT:
      return COLOR_RED;
    case ANSWER_STATUS.WRONG:
      return COLOR_BLUE;
    default:
      return COLOR_WHITE;
  }
}
function onBorderColor(type) {
  switch (type) {
    case ANSWER_STATUS.CORRECT:
      return COLOR_RED;
    case ANSWER_STATUS.WRONG:
      return COLOR_BLUE;
    default:
      return COLOR_GRAY;
  }
}

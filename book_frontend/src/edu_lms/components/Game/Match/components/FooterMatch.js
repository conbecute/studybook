import React from "react";
import styled from "styled-components";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";
import { GAME_TYPE, CTA_POPUP_TYPE } from "./../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const FooterMatch = ({
  isDislabeled,
  isDislabeledResult,
  disabledBoxItem,
  onResetData,
  onCheckAnswer,
  totalQuestion,
  countCorrect,
  showAlert,
  setShowAlert,
}) => {
  return (
    <Footer>
      <div
        className="text-right position-relative pr-3 d-flex justify-content-end align-items-center"
        style={{ zIndex: "12" }}
      >
        <ButtonCheckAnswerAndResetGame
          onResetGame={onResetData}
          onSubmitGame={onCheckAnswer}
          isDisabled={isDislabeledResult}
          isSubmitted={!disabledBoxItem}
        />
        <ShowAlert styleAlertGame={styleAlertGame}>
          <AnswerComponent
            typeGame={GAME_TYPE.multipleGame}
            checkScreen={CTA_POPUP_TYPE.rangeOneGame}
            totalAnswer={countCorrect}
            totalQuestion={totalQuestion}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </ShowAlert>
      </div>
    </Footer>
  );
};
export default FooterMatch;

const Footer = styled.div`
  display: block;
  bottom: 0;
  right: 0;
  justify-content: space-between;
  align-items: center;
`;

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

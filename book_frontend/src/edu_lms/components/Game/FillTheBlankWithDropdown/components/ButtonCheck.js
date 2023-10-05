import React, { Fragment } from "react";
import styled from "styled-components";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";
import { GAME_TYPE, CTA_POPUP_TYPE } from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const ButtonCheck = ({
  isDisabled,
  isButtonReset,
  onResetFormData,
  onSubmitForm,
  totalQuestion,
  showAlert,
  setShowAlert,
  dataAnswer,
}) => {
  let answer = 0;
  dataAnswer.forEach((item) =>
    item.blank_answer.forEach(
      (totalAnswer) => totalAnswer.status === 1 && (answer = answer + 1)
    )
  );
  return (
    <Fragment>
      <ButtonCheckAnswerAndResetGame
        onResetGame={onResetFormData}
        onSubmitGame={onSubmitForm}
        isDisabled={isDisabled}
        isSubmitted={!isButtonReset}
      />
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalAnswer={answer}
          totalQuestion={totalQuestion}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
    </Fragment>
  );
};
export default ButtonCheck;

const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

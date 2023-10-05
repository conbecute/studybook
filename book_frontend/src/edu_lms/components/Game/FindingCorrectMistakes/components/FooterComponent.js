import styled from "styled-components";
import ButtonCheckAnswerAndResetGame from "../../component/ButtonCheckAnswerAndResetGame";
import { GAME_TYPE, CTA_POPUP_TYPE } from "edu_lms/constants/type";
import AnswerComponent from "../../AnswerComponent";
import { styleAlertGame } from "../../selection";

const FooterComponent = ({
  onCheckAnswers,
  onResetData,
  data,
  showAlert,
  setShowAlert,
  isCheckAnswer,
  isButtonReset,
}) => {
  let checkAnswer = 0;
  data?.answers.forEach((item) => {
    item.input.show &&
      item.input.status === 1 &&
      (checkAnswer = checkAnswer + 1);
  });
  return (
    <Footer>
      <ButtonCheckAnswerAndResetGame
        onResetGame={onResetData}
        onSubmitGame={onCheckAnswers}
        isDisabled={isCheckAnswer}
        isSubmitted={!isButtonReset}
      />
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalAnswer={checkAnswer}
          totalQuestion={data?.answers.length}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </ShowAlert>
    </Footer>
  );
};

export default FooterComponent;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const ShowAlert = styled.div`
  ${(props) => props.styleAlertGame}
`;

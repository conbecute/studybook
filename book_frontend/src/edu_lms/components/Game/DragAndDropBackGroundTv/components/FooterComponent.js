import React from "react";
import styled from "styled-components";
import AnswerComponent from "../../AnswerComponent";
import { GAME_TYPE, CTA_POPUP_TYPE } from "../../../../constants/type";
import { styleAlertGame } from "../../selection";

const FooterDragDropBackGroundComponent = ({
  setShowAlert,
  showAlert,
  countCorrect,
  totalChoose,
  totalQuestion,
}) => {
  return (
    <>
      <Footer>
        <div
          className="text-right position-relative pr-3 d-flex justify-content-end align-items-center"
          style={{ zIndex: "12" }}
        ></div>
      </Footer>
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.oneGame}
          checkScreen={CTA_POPUP_TYPE.rangeMutipleGame}
          totalAnswer={countCorrect}
          totalQuestion={totalQuestion}
          totalChoose={totalChoose}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
      </ShowAlert>
    </>
  );
};
export default FooterDragDropBackGroundComponent;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ShowAlert = styled.div`
  margin-bottom: 20px;
  margin-right: 15px;
  ${(props) => props.styleAlertGame};
`;

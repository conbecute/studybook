import React from "react";
import ButtonReset from "./ButtonReset";
import AlertReportComponent from "../../component/AlertReportComponent";
import styled from "styled-components";
import {
  BOOK_LANGUAGE,
  GAME_TYPE,
  CTA_POPUP_TYPE,
} from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";

const FooterDragDropBackGroundComponent = ({
  handleDispatchDataAlert,
  countCorrect,
  totalQuestion,
  setShowAlert,
  showAlert,
}) => {
  return (
    <Footer>
      <div
        className="text-right position-relative pr-3 d-flex justify-content-end align-items-center"
        style={{ zIndex: "12" }}
      >
        <AnswerComponent
          typeGame={GAME_TYPE.multipleGame}
          checkScreen={CTA_POPUP_TYPE.rangeOneGame}
          totalAnswer={countCorrect}
          totalQuestion={totalQuestion}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </div>
    </Footer>
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

import React from "react";
import { GAME_TYPE, CTA_POPUP_TYPE } from "edu_lms/constants/type";
import ButtonReset from "./ButtonReset";
import styled from "styled-components";
import { styleAlertGame } from "../../selection";
import { BOOK_LANGUAGE } from "../../../../constants/type";
import AnswerComponent from "../../AnswerComponent";

const FooterMultipleChoiceBackGroundComponent = ({
  isDislabeledResult,
  disabledBoxItem,
  onResetData,
  onCheckAnswer,
  languageBook,
  countCorrect,
  totalQuestion,
  showAlert,
  setShowAlert,
  backgroundList,
  listCheckType,
}) => {
  let totalChoose = 0;
  backgroundList.forEach((item) => {
    if (item.color && item?.color !== "transparent") {
      totalChoose++;
    }
  });
  return (
    <>
      <Footer>
        <div
          className="text-right position-relative pr-3 d-flex justify-content-end align-items-center"
          style={{ zIndex: "12" }}
        >
          {disabledBoxItem && (
            <ButtonReset
              isDislabeled={false}
              languageBook={languageBook}
              onResetData={onResetData}
              className=""
            />
          )}
          {!disabledBoxItem && (
            <button
              className={`${
                isDislabeledResult ? "monkey-bg-gray" : "monkey-bg-blue"
              } btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-fz-20`}
              onClick={onCheckAnswer}
            >
              {
                BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                  ?.buttonCheck
              }
            </button>
          )}
        </div>
      </Footer>
      <ShowAlert styleAlertGame={styleAlertGame}>
        <AnswerComponent
          typeGame={GAME_TYPE.oneGame}
          checkScreen={CTA_POPUP_TYPE.rangeMutipleGame}
          totalQuestion={totalQuestion}
          totalAnswer={countCorrect}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          totalChoose={totalChoose || listCheckType?.length}
        />
      </ShowAlert>
    </>
  );
};
export default FooterMultipleChoiceBackGroundComponent;

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
  ${(props) => props.styleAlertGame}
`;

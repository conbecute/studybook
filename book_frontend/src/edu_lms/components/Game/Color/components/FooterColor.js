import React from "react";
import styled from "styled-components";
import {
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_RED,
  COLOR_BLUE,
  BOOK_LANGUAGE,
} from "../../../../constants/type";
import AlertComponent from "../../component/AlertComponent";

const FooterColor = ({
  indexQuestion,
  data,
  isDisabled,
  alert,
  languageBook,
  isReview,
  onReview,
  onNextQuestion,
  handleDispatchDataAlert,
}) => {
  return (
    <FooterWrapper>
      <div className="footer-left d-flex align-items-center justify-content-end position-relative">
        <div className="d-flex align-items-center justify-content-center ml-3 mr-3">
          {data.length > 1 &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: `${indexQuestion === index ? "16px" : "12px"}`,
                    height: `${indexQuestion === index ? "16px" : "12px"}`,
                    border: `2px solid ${onBorderColor(item.result)}`,
                    borderRadius: "50%",
                    margin: "0 5px",
                    backgroundColor: onBackgroundColor(item.result),
                  }}
                ></div>
              );
            })}
        </div>
        <div className="footer-right">
          {isReview ? (
            <button
              onClick={() => onReview()}
              disabled={!isDisabled}
              style={{ opacity: isDisabled ? "1" : "0.2" }}
              className={`${
                isDisabled ? "monkey-bg-blue cursor" : "monkey-bg-black"
              } btn monkey-color-white pr-3 pl-3 pt-2 pb-2`}
            >
              {
                BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                  ?.buttonCheck
              }
            </button>
          ) : (
            <button
              onClick={() => onNextQuestion()}
              className="monkey-bg-green cursor btn monkey-color-white pr-3 pl-3 pt-2 pb-2"
            >
              {
                BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                  ?.buttonContinue
              }
            </button>
          )}
          <AlertComponent
            alert={alert}
            handleDispatchDataAlert={handleDispatchDataAlert}
          />
        </div>
      </div>
    </FooterWrapper>
  );
};

export default FooterColor;

function onBackgroundColor(type) {
  switch (type) {
    case 2:
      return COLOR_BLUE;
    case 3:
      return COLOR_RED;
    default:
      return COLOR_WHITE;
  }
}
function onBorderColor(type) {
  switch (type) {
    case 2:
      return COLOR_BLUE;
    case 3:
      return COLOR_RED;
    default:
      return COLOR_GRAY;
  }
}

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  .alert {
    position: absolute;
    top: -96px;
    width: 295px;
    right: 5px;
  }
`;

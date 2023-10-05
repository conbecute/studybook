import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import {
  URL_IMAGE_QUESTION,
  COLOR_GRAY,
  COLOR_GREEN,
  COLOR_WHITE,
  COLOR_BLUE,
  BOOK_LANGUAGE,
} from "../../../../constants/type";
import { onResultIcon } from "../../selection";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { TypeGameMultipleChoice } from "../../selection";

const CardFlip = ({
  data,
  iconList,
  typeQuestion,
  languageBook,
  fontSizeQuestion,
}) => {
  const [isFlipped, setStateFlipped] = useState(false);
  const srcQuestion = onResultIcon(data?.icon_id_question, iconList);
  const srcAnswer = onResultIcon(data?.icon_id_answer, iconList);

  const renderWrapperCard = (isFlipped, src) => {
    return (
      <WrapperCardFlip isFlipped={isFlipped}>
        {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
          <img
            className="w-100"
            src={`${URL_IMAGE_QUESTION}${src?.path}`}
            alt="#"
          />
        )}

        {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
          <div
            className="p-4"
            style={{
              fontSize: fontSizeQuestion ? `${fontSizeQuestion}px` : "24px",
            }}
          >
            {src?.props[0]?.text}
          </div>
        )}
      </WrapperCardFlip>
    );
  };
  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        marginBottom: "60px",
        marginTop: "50px",
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {!isFlipped && renderWrapperCard(true, srcQuestion)}
        {isFlipped && renderWrapperCard(false, srcAnswer)}
      </ReactCardFlip>

      <NumberIndex className="p-3" onClick={() => setStateFlipped(!isFlipped)}>
        {isFlipped
          ? BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.question
          : BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.answer}
      </NumberIndex>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { languageBook } = state.readingBookReducers;
  return {
    languageBook,
  };
};

export default connect(mapStateToProps)(CardFlip);

const NumberIndex = styled.div`
  min-width: 88px;
  height: 40px;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR_GRAY};
  border-radius: 15px;
  margin-top: 15px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translate(-50%, 0);
  &:hover {
    background-color: ${COLOR_GREEN};
    color: ${COLOR_WHITE};
    border: 1px solid ${COLOR_GREEN};
  }
`;

const WrapperCardFlip = styled.div`
  width: auto;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid ${(props) => (props.isFlipped ? COLOR_GRAY : COLOR_BLUE)};

  @media screen and (max-height: 849px) and (min-height: 767px) {
    max-width: 80%;
  }
  @media screen and (min-height: 850px) and (min-width: 1024px) {
    max-width: 90%;
  }
  @media screen and (max-height: 766px) and (min-width: 1024px) {
    max-width: 70%;
  }
`;

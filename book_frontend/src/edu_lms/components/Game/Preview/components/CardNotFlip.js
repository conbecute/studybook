import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import {
  URL_IMAGE_QUESTION,
  COLOR_GRAY,
  BOOK_LANGUAGE,
} from "../../../../constants/type";
import { onResultIcon } from "../../selection";
import {
  TypeGameMultipleChoice,
  styleDisplayFlex,
  styleHover,
} from "../../selection";

const CardNotFlip = ({
  data,
  iconList,
  typeAnswer,
  typeQuestion,
  textButton,
  index,
  languageBook,
}) => {
  const srcQuestion = onResultIcon(data.icon_id_question, iconList);
  const srcAnswer = onResultIcon(data.icon_id_answer, iconList);
  const [isFlipped, setStateFlipped] = useState(false);
  const [valueAnswer, setStateValueAnswer] = useState("");
  // const [urlAudio,setStateUrlAudio] = useState("");
  const onAnswer = (value, flipped) => {
    setStateFlipped(!flipped);
    if (!flipped) {
      setStateValueAnswer(value);
    } else {
      setStateValueAnswer("");
    }
  };
  return (
    <div
      className="position-relative monkey-fz-20 d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        marginBottom: "60px",
        marginTop: "35px",
      }}
    >
      <CardContent>
        {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && (
          <img
            className="w-100"
            src={`${URL_IMAGE_QUESTION}${srcQuestion?.path}`}
            alt="#"
          />
        )}
        {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
          <Fragment>
            <div className="pl-4 pr-4 d-flex align-items-center mb-3">
              <CustomSpan
                className="mr-2 border d-flex justify-content-center align-items-center cursor"
                onClick={() => onAnswer(srcAnswer?.props[0]?.text, isFlipped)}
              >
                {index}
              </CustomSpan>
              {srcQuestion?.props[0]?.text}
            </div>
          </Fragment>
        )}
        {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && isFlipped && (
          <img
            className="w-100"
            src={`${URL_IMAGE_QUESTION}${srcAnswer?.path}`}
            alt="#"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "15",
            }}
          />
        )}
        {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
          <div className="pl-4 pr-4 monkey-color-green">
            <div className="form-group">
              <input
                type="text"
                className="form-control monkey-fz-20 monkey-color-green pl-5"
                defaultValue={valueAnswer}
                readOnly
                placeholder="XXX XXX XXX"
              />
            </div>
          </div>
        )}
      </CardContent>
      <NumberIndex
        className="p-3"
        onClick={() => onAnswer(srcAnswer?.props[0]?.text, isFlipped)}
      >
        {isFlipped
          ? BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]?.question
          : textButton
          ? textButton
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

export default connect(mapStateToProps)(CardNotFlip);

const CustomSpan = styled.span`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid ${COLOR_GRAY};
  cursor: pointer;
  ${styleDisplayFlex()};
  &:hover {
    ${styleHover()}
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  padding-bottom: 15px;
  .form-control {
    border: none;
    border-bottom: 1px solid ${COLOR_GRAY};
    border-radius: 0;
    &:focus {
      box-shadow: none;
    }
  }
`;

const NumberIndex = styled.div`
  min-width: 88px;
  height: 40px;
  margin: auto;
  ${styleDisplayFlex()};
  border: 1px solid ${COLOR_GRAY};
  border-radius: 15px;
  margin-top: 15px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  bottom: -50px;
  transform: translate(-50%, 0);
  &:hover {
    ${styleHover()}
  }
`;

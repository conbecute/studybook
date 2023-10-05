import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  URL_IMAGE_QUESTION,
  COLOR_WHITE,
  COLOR_BLACK,
  TYPE_TEXT,
} from "../../../../constants/type";
import { onChangeBackground } from "../selection";
import { P, Wrapper } from "./styles";
import TextComponent from "edu_lms/components/TextComponent";

const QuestionContent = ({
  data,
  onAction,
  sizeWidth,
  sizeHeight,
  typeGame,
  disabledBoxItem,
  typeDisplay,
  columnTitleLeft,
  classNameQuestion,
  marginBottom,
  classMarginBottom,
  numberClickQuestion,
  type,
  typeDisplayContent,
  fontSizeContent,
}) => {
  const [questions, setQuestions] = useState(data);
  const typeText = _.includes(typeDisplayContent, TYPE_TEXT) && TYPE_TEXT;

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  const handleActiveAnswer = (id) => {
    const newQuestions = questions.map((question) => {
      return { ...question, active: question.icon_id === id };
    });
    setQuestions(newQuestions);
  };

  return (
    <div
      className={`${classNameQuestion} question-wrapper quicksand-medium`}
      style={{ marginBottom: `${marginBottom}px` }}
    >
      {questions.map((item, index) => {
        return (
          <>
            {index === 0 && <P>{columnTitleLeft}</P>}
            <Wrapper
              style={{
                width: `${sizeWidth}px`,
                height: `${sizeHeight}px`,
                backgroundColor: `${onChangeBackground(
                  item.status,
                  `${typeDisplay === 2 ? "" : "#fff"}`
                )}`,
                color: `${item.status !== 0 ? COLOR_WHITE : COLOR_BLACK}`,
                pointerEvents: `${disabledBoxItem ? "none" : "initial"}`,
              }}
              key={index}
              className={`${classMarginBottom} ${
                item.active ? "active" : "un-active"
              } box-item cursor text-center d-flex justify-content-center align-items-center`}
              onClick={(e) => {
                handleActiveAnswer(item.icon_id);
                onAction(e, item.icon_id, numberClickQuestion, type);
              }}
            >
              {onShowUIFollowType(typeGame, item, typeText, fontSizeContent)}
            </Wrapper>
          </>
        );
      })}
    </div>
  );
};
export default QuestionContent;

function onShowUIFollowType(type, item, typeText, fontSizeContent) {
  switch (type) {
    case 5:
    case 1:
    case 2:
      return (
        <img
          className="w-100"
          src={`${URL_IMAGE_QUESTION}${item.path}`}
          alt="#"
        />
      );
    case 4:
      return (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ width: "100%", height: "100%" }}
        >
          <TextComponent
            typeText={typeText}
            fontSize={`${fontSizeContent}px`}
            data={item?.props[0]?.text}
          />
        </div>
      );
    default:
      return;
  }
}

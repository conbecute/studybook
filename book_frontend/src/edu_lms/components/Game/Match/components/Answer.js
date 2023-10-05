import _ from "lodash";
import { useEffect, useState } from "react";
import {
  URL_IMAGE_QUESTION,
  COLOR_WHITE,
  COLOR_BLACK,
  TYPE_TEXT,
  TYPE_LATEX,
} from "../../../../constants/type";
import { onChangeBackground } from "../selection";
import { P, Wrapper } from "./styles";
import TextComponent from "edu_lms/components/TextComponent";

const Answer = ({
  data,
  onAction,
  sizeWidth,
  sizeHeight,
  typeGame,
  disabledBoxItem,
  typeDisplay,
  columnTitleRight,
  classNameQuestion,
  classMarginBottom,
  numberClickQuestion,
  typeDisplayContent,
  fontSizeContent,
}) => {
  const [answers, setAnswers] = useState(data);
  const typeText = _.includes(typeDisplayContent, TYPE_TEXT) ? TYPE_TEXT : TYPE_LATEX;

  useEffect(() => {
    setAnswers(data);
  }, [data]);
  const handleActive = (id) => {
    const newAnswers = answers.map((answer) => {
      return { ...answer, active: answer.icon_id === id };
    });
    setAnswers(newAnswers);
  };
  return (
    <div className={`${classNameQuestion} answer-wrapper quicksand-medium`}>
      {answers.map((item, index) => {
        return (
          <>
            {index === 0 && <P>{columnTitleRight}</P>}
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
                handleActive(item.icon_id);
                onAction(e, item.icon_id, numberClickQuestion);
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
export default Answer;

function onShowUIFollowType(type, item, typeText, fontSizeContent) {
  switch (type) {
    case 5:
    case 2:
    case 4:
      return (
        <div
          className="d-flex justify-content-center align-items-center text-center"
          style={{ width: "100%", height: "100%" }}
        >
          <TextComponent
            typeText={typeText}
            fontSize={`${fontSizeContent}px`}
            data={item?.props[0]?.text}
          />
        </div>
      );
    case 1:
      return (
        <img
          className="w-100"
          src={`${URL_IMAGE_QUESTION}${item.path}`}
          alt="#"
        />
      );
    default:
      return;
  }
}

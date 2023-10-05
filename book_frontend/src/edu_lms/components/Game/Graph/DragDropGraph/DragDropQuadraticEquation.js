import classNames from "classnames";
import TextComponent from "edu_lms/components/TextComponent";
import { INNER_WIDTH, GAME_TYPE, CTA_POPUP_TYPE } from "edu_lms/constants/type";
import styled from "styled-components";
import { convertNumber, convertSigns, QUESTION } from "../constant";
import AnswerComponent from "../../AnswerComponent";

const BoardStyle = styled.div`
  width: max-content;
  margin: 0 auto;
  .graph {
    width: ${window.innerWidth > INNER_WIDTH.MOBILE ? "400px" : "100%"};
    height: ${window.innerWidth > INNER_WIDTH.MOBILE
      ? "400px"
      : `${window.innerWidth}px`};
  }
  .overlay {
    background-color: transparent;
    top: 0;
  }
`;

export default function DragDropQuadraticEquation({
  showResult,
  question,
  countCorrect,
  onResetData,
  activeQuestion,
  isReview,
  factor,
}) {
  const { a, b, c } = factor;
  return showResult && question.length > 1 ? (
    <AnswerComponent
      checkScreen={CTA_POPUP_TYPE.finalReport}
      totalAnswer={countCorrect}
      totalQuestion={question.length}
      onResetData={onResetData}
    />
  ) : (
    <div
      className={classNames("position-relative", {
        "pl-5": window.innerWidth > INNER_WIDTH.MOBILE,
      })}
    >
      <div className="monkey-f-header mb-5 monkey-fz-20 d-flex">
        <h2 className="d-inline pt-3">{QUESTION}</h2>
        <TextComponent
          data={`\\(y = ${convertNumber(a)}${a !== 0 ? "x^2" : ""} ${
            b > 0 ? "+" : ""
          } ${convertNumber(b)}${b !== 0 ? "x" : ""} ${convertSigns(c)}\\)`}
        />
        {/* {convertSigns(convertNumber(b))}x {convertSigns(c)} */}
      </div>
      <BoardStyle className="position-relative">
        <div
          id={activeQuestion < question.length ? `jxgbox${activeQuestion}` : ""}
          className="graph"
        />

        {isReview && <div className="position-absolute w-100 h-100 overlay" />}
      </BoardStyle>
    </div>
  );
}

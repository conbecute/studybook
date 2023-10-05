import classNames from "classnames";
import styled from "styled-components";
import TextComponent from "edu_lms/components/TextComponent";
import { INNER_WIDTH } from "edu_lms/constants/type";
import { convertNumber, convertSigns, QUESTION } from "./constants";

const BoardStyle = styled.div`
  width: max-content;
  margin: 0 auto;
  .jxgbox {
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

export default function DragDropQuadratic({ factor, graphId }) {
  return (
    <div
      className={classNames("position-relative", {
        "pl-5": window.innerWidth > INNER_WIDTH.MOBILE,
      })}
    >
      <div className="monkey-f-header mb-5 mt-3 monkey-fz-20 d-flex">
        <h2 className="d-inline pt-2">{QUESTION}</h2>
        <TextComponent
          data={`\\(y = ${convertNumber(factor.a)}${
            factor.a !== 0 ? "x^2" : ""
          } ${factor.b > 0 ? "+" : ""} ${convertNumber(factor.b)}${
            factor.b !== 0 ? "x" : ""
          } ${convertSigns(factor.c)}\\)`}
        />
      </div>
      <BoardStyle className="position-relative">
        <div id={graphId} className="jxgbox" />
      </BoardStyle>
    </div>
  );
}

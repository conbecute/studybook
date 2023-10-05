import classNames from "classnames";

import { INNER_WIDTH } from "edu_lms/constants/type";
import {
  ANSWERS_TITLE_QUADRATIC,
  convertNumber,
  convertSigns,
  QUESTION,
} from "../constants";
import TextComponent from "edu_lms/components/TextComponent";
import { BoardStyle, CheckAnswer, InputGraph } from "../styles";

export default function FillTheBlankQuadratic({
  data,
  factor,
  isCheckActive,
  valueInputXa,
  valueInputYa,
  valueInputXb,
  valueInputYb,
  valueInputXc,
  valueInputYc,
  setValueInputXa,
  setValueInputYa,
  setValueInputXb,
  setValueInputYb,
  setValueInputXc,
  setValueInputYc,
  isShowGraph,
  graphId,
  onPlaying,
  isReadOnly,
  showCorrectAnswer,
  isNotEmptyValue,
}) {
  return (
    <div
      className={classNames("position-relative", {
        "pl-5": window.innerWidth > INNER_WIDTH.MOBILE,
        "vh-100": isShowGraph && isNotEmptyValue,
      })}
    >
      <div className="mb-4 monkey-fz-24">
        <div className="monkey-f-header d-flex mt-2">
          <h2 className="pt-2">{QUESTION}</h2>
          <TextComponent
            data={`\\(y = ${convertNumber(factor.a)}${
              factor.a !== 0 ? "x^2" : ""
            } ${factor.b > 0 ? "+" : ""} ${convertNumber(factor.b)}${
              factor.b !== 0 ? "x" : ""
            } ${convertSigns(factor.c)}\\)`}
          />
        </div>
      </div>
      <div className="m-2 position-relative monkey-fz-24">
        <div>{ANSWERS_TITLE_QUADRATIC}</div>
        <CheckAnswer
          isCheckActive={data?.historyAnswer?.checkActive?.[0]}
          isShowGraph={isShowGraph}
          showCorrectAnswer={showCorrectAnswer}
          className="mt-4 mb-4 pl-2 mt-2 monkey-fz-24"
        >
          <span className="monkey-f-header monkey-color-orange">A</span>
          <span>{" ( "}</span>
          <InputGraph
            type="number"
            value={valueInputXa}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputXa(target.value);
              onPlaying(false);
            }}
          />
          <span>{"; "}</span>
          <InputGraph
            type="number"
            value={valueInputYa}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputYa(target.value);
              onPlaying(false);
            }}
          />
          <span>{" )"}</span>
        </CheckAnswer>
        <CheckAnswer
          isCheckActive={data?.historyAnswer?.checkActive?.[1]}
          isShowGraph={isShowGraph}
          showCorrectAnswer={showCorrectAnswer}
          className="pl-2 mb-4"
        >
          <span className="monkey-f-header monkey-color-orange">B</span>
          <span>{" ( "}</span>
          <InputGraph
            type="number"
            value={valueInputXb}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputXb(target.value);
              onPlaying(false);
            }}
          />
          <span>{"; "}</span>
          <InputGraph
            type="number"
            value={valueInputYb}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputYb(target.value);
              onPlaying(false);
            }}
          />
          <span>{" )"}</span>
        </CheckAnswer>
        <CheckAnswer
          isCheckActive={data?.historyAnswer?.checkActive?.[2]}
          isShowGraph={isShowGraph}
          showCorrectAnswer={showCorrectAnswer}
          className="pl-2"
        >
          <span className="monkey-f-header monkey-color-orange">C</span>{" "}
          <span>{"( "}</span>
          <InputGraph
            type="number"
            value={valueInputXc}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputXc(target.value);
              onPlaying(false);
            }}
          />
          <span>{"; "}</span>
          <InputGraph
            type="number"
            value={valueInputYc}
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            onChange={({ target }) => {
              setValueInputYc(target.value);
              onPlaying(false);
            }}
          />
          <span>{" )"}</span>
        </CheckAnswer>
        <BoardStyle
          id={graphId}
          className={classNames("jxgbox position-absolute", {
            "active-board": isShowGraph && isNotEmptyValue,
          })}
        />
      </div>
    </div>
  );
}

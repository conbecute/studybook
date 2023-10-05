import classNames from "classnames";
import _ from "lodash";
import TextComponent from "edu_lms/components/TextComponent";
import { INNER_WIDTH } from "edu_lms/constants/type";
import {
  ANSWERS_TITLE,
  convertNumber,
  convertSigns,
  QUESTION,
} from "../constants";
import { BoardStyle, CheckAnswer, InputGraph } from "../styles";

export default function FillTheBlankFirstDegree({
  data,
  isCheckActive,
  graphId,
  valueInputXa,
  valueInputXb,
  valueInputYa,
  valueInputYb,
  setValueInputXa,
  setValueInputYa,
  setValueInputXb,
  setValueInputYb,
  isShowGraph,
  factor,
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
              factor.a !== 0 ? "x" : ""
            } ${convertSigns(factor.b)} \\)`}
          />
        </div>
      </div>
      <div
        className={classNames("m-5 position-relative monkey-fz-24", {
          pointer: isReadOnly,
        })}
      >
        <h2>{ANSWERS_TITLE}</h2>
        <CheckAnswer
          isCheckActive={data?.historyAnswer?.checkActive?.[0]}
          isShowGraph={isShowGraph}
          showCorrectAnswer={showCorrectAnswer}
          className="mt-4 mb-4 pl-2 mt-2"
        >
          <span className="monkey-f-header monkey-color-orange">A</span>
          <span>{" ( "}</span>
          <InputGraph
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            type="number"
            value={valueInputXa}
            onChange={({ target }) => {
              setValueInputXa(target.value);
              onPlaying(false);
            }}
          />
          <span>{"; "}</span>
          <InputGraph
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            type="number"
            value={valueInputYa}
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
          className="pl-2"
        >
          <span className="monkey-f-header monkey-color-orange">B</span>
          <span>{" ( "}</span>
          <InputGraph
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            type="number"
            value={valueInputXb}
            onChange={({ target }) => {
              setValueInputXb(target.value);
              onPlaying(false);
            }}
          />
          <span>{"; "}</span>
          <InputGraph
            className={classNames("h-50", {
              pointer: isReadOnly,
            })}
            type="number"
            value={valueInputYb}
            onChange={({ target }) => {
              setValueInputYb(target.value);
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

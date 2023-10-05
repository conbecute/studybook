import classNames from "classnames";
import styled from "styled-components";
import TextComponent from "edu_lms/components/TextComponent";
import { INNER_WIDTH } from "edu_lms/constants/type";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import {
  convertNumber,
  convertSigns,
  DISEQUATIONS,
  SYSTEM_OF_INEQUALITIES,
  DRAW_LINE,
  EQUATION,
  configQuestion,
} from "./selection";
import CheckRegion from "./CheckRegion";
import Result from "./Result";

export default function Question({
  question,
  activeQuestion,
  isReview,
  inputDomain,
  register,
  checkResult,
  checkInput,
  showAlert,
}) {
  const dataQuestion = configQuestion(question);

  return (
    <div
      className={classNames("position-relative", {
        "pl-3": window.innerWidth > INNER_WIDTH.MOBILE,
      })}
    >
      <div className="d-flex monkey-f-header mb-2 monkey-fz-20">
        <h2 className="pt-3">
          {question[0]?.coefficient?.length === EQUATION
            ? DISEQUATIONS
            : SYSTEM_OF_INEQUALITIES}
        </h2>
        <QuestionText>
          <MathpixLoader>
            <MathpixMarkdown text={dataQuestion} />
          </MathpixLoader>
        </QuestionText>
      </div>
      <p className="pt-3 monkey-fz-20 font-weight-bold">
        {!inputDomain ? "Bước 1:" : "Bước 2:"}
      </p>
      {!inputDomain ? (
        <div className=" mb-3 monkey-fz-20">
          {question[0].coefficient.map((item, index) => (
            <div key={index} className="d-flex position-relative">
              <Equation className="pl-3 pt-2 position-relative">
                {DRAW_LINE}
                {question[0]?.coefficient?.length !== EQUATION ? (
                  <>
                    <span className="monkey-fz-16 position-absolute">
                      {++index}
                    </span>
                    &nbsp;&nbsp;:
                  </>
                ) : (
                  <>:</>
                )}
              </Equation>
              <TextComponent
                data={`\\(${convertNumber(item.coefficient_a)}${
                  item.coefficient_a !== 0 ? "x" : ""
                } ${convertSigns(item.coefficient_b, item.coefficient_a)} ${
                  item.coefficient_b !== 0 ? "y" : ""
                } = ${item.coefficient_c}\\)`}
              />
              <br />
            </div>
          ))}
        </div>
      ) : (
        <CheckRegion
          question={question[0].coefficient}
          register={register}
          checkInput={checkInput}
          showAlert={showAlert}
        />
      )}
      <BoardStyle className="position-relative">
        <div
          id={activeQuestion < question.length ? `jxgbox${activeQuestion}` : ""}
          className="graph"
        />
        {isReview && (
          <div className="position-absolute w-100 h-100 overlay"></div>
        )}
      </BoardStyle>
      {checkResult && <Result question={question[0].coefficient} />}
    </div>
  );
}

const BoardStyle = styled.div`
  width: max-content;
  padding-top: 20px;
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

const QuestionText = styled.div`
  font-size: 24px;
`;

const Equation = styled.h3`
  span {
    bottom: -5px;
  }
`;

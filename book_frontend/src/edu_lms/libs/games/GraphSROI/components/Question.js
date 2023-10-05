import React from "react";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import {
  DISEQUATIONS,
  SYSTEM_OF_INEQUALITIES,
  EQUATION,
  configQuestion,
} from "edu_lms/components/Game/Graph/RegionGraph/selection";

export default function Question({ question }) {
  const dataQuestion = configQuestion(question);
  return (
    <div>
      <div className="d-flex monkey-f-header mb-2">
        <h2 className="pt-3">
          {question[0]?.coefficient?.length === EQUATION
            ? DISEQUATIONS
            : SYSTEM_OF_INEQUALITIES}
        </h2>
        <div className="title-question">
          <MathpixLoader>
            <MathpixMarkdown text={dataQuestion} />
          </MathpixLoader>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import renderHTML from "react-render-html";
import _ from "lodash";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";

export default function TitleLatex({ dataConfigType, item }) {
  return (
    <>
      {_.includes(dataConfigType, TypeGameMultipleChoice.LATEX) ? (
        <MathpixLoader>
          <MathpixMarkdown text={String(item.props[0]?.text) || ""} />
        </MathpixLoader>
      ) : (
        renderHTML(item.props[0]?.text)
      )}
    </>
  );
}

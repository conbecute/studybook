import _ from "lodash";
import MathpixLoader from "mathpix-markdown-it/lib/components/mathpix-loader";
import MathpixMarkdown from "mathpix-markdown-it/lib/components/mathpix-markdown";
import React, { useState } from "react";
import styles from "../MathInput.module.scss";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../../constants/type";
import UseSound from "../../../UseSound";
import { formatQuestionTitle } from "../../DragAndDrop/selection";
import { TypeGameMultipleChoice } from "../../selection";

const style = {
  borderRadius: "10px",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  marginBottom: "0.6rem",
  float: "left",
  position: "relative",
  marginLeft: "30px",
};
const TitleQuestion = ({ questionTitle, fontSizeTitle, typeQuestion }) => {
  return (
    <div style={{ ...style }}>
      <>
        {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) &&
          questionTitle[0]?.icon[0]?.props[0]?.audio[0]?.path && (
            <UseSound
              src={`${URL_AUDIO}${questionTitle[0]?.icon[0]?.props[0]?.audio[0]?.path}`}
            />
          )}
      </>
      {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
        <span
          style={{ fontSize: fontSizeTitle ? fontSizeTitle : "25px" }}
          className={`quicksand-bold ${styles.mathPix}`}
        >
          <MathpixLoader>
            <MathpixMarkdown
              text={
                String(questionTitle?.icon[0]?.props[0]?.text)
                  ? String(questionTitle?.icon[0]?.props[0]?.text)
                  : ""
              }
            />
          </MathpixLoader>
        </span>
      )}
      {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
        questionTitle?.icon[0]?.path && (
          <div className="question-name mb-3 text-center">
            <img
              src={`${URL_IMAGE_QUESTION}${questionTitle?.icon[0]?.path}`}
              alt=""
            />
          </div>
        )}
    </div>
  );
};

export default TitleQuestion;

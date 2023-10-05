import React from "react";
import { URL_AUDIO } from "edu_lms/constants/type";
import UseSound from "edu_lms/components/UseSound";
import styles from "./DragAndDropText.module.scss";
import TextComponent from "edu_lms/components/TextComponent";

const style = {
  borderRadius: "10px",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  marginBottom: "0.6rem",
  position: "relative",
  marginTop: "20px",
};

const TitleQuestion = ({ questionTitle, fontSizeTitle, typeText }) => {
  return (
    <div style={{ ...style }}>
      <>
        {questionTitle?.props[0]?.audio[0]?.path && (
          <UseSound
            src={`${URL_AUDIO}${questionTitle?.props[0]?.audio[0]?.path}`}
          />
        )}
      </>
      <span
        style={{ fontSize: fontSizeTitle ? `${fontSizeTitle}px` : "25px" }}
        className={`${styles.fontSizeQuestionBox} monkey-f-header`}
      >
        {questionTitle && (
          <TextComponent
            data={questionTitle?.props[0]?.text}
            typeText={typeText ?? ["text"]}
          />
        )}
      </span>
    </div>
  );
};

export default TitleQuestion;

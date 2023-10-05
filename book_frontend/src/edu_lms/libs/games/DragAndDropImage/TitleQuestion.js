import React from "react";
import { URL_AUDIO } from "edu_lms/constants/type";
import UseSound from "edu_lms/components/UseSound";
import styles from "./DragAndDropImage.module.scss";
import styled from "styled-components";
import TextComponent from "edu_lms/components/TextComponent";

const style = {
  borderRadius: "10px",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  position: "relative",
};

const TitleQuestion = ({ questionTitle, dataConfig }) => {
  return (
    <div style={{ ...style }}>
      <>
        {questionTitle?.props[0]?.audio[0]?.path && (
          <UseSound
            src={`${URL_AUDIO}${questionTitle?.props[0]?.audio[0]?.path}`}
          />
        )}
      </>
      <Tilte
        className={`${styles.fontSizeTitleQuestion} quicksand-bold`}
        style={{
          fontSize: dataConfig.font_size_question
            ? `${dataConfig.font_size_question}px`
            : "24px",
        }}
      >
        {questionTitle && (
          <TextComponent
            data={questionTitle?.props[0]?.text}
            typeText={dataConfig.type_text ?? ["text"]}
          />
        )}
      </Tilte>
    </div>
  );
};

export default TitleQuestion;

const Tilte = styled.span`
  font-size: 24px;
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
  }
`;

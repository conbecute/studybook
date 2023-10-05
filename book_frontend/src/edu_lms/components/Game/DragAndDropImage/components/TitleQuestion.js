import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import React, { useState } from "react";
import { URL_AUDIO } from "../../../../constants/type";
import UseSound from "../../../UseSound";
import styled from "styled-components";

const style = {
  borderRadius: "10px",
  padding: "0.7rem 1.5rem",
  marginRight: "1rem",
  marginBottom: "0.6rem",
  float: "left",
  position: "relative",
};

const TitleQuestion = ({ questionTitle, fontSizeTitle, typeText }) => {
  return (
    <div style={{ ...style }}>
      <>
        {questionTitle[0]?.props[0]?.audio[0]?.path && (
          <UseSound
            src={`${URL_AUDIO}${questionTitle[0]?.props[0]?.audio[0]?.path}`}
          />
        )}
      </>
      {questionTitle[0]?.props[0]?.text && (
        <TitleQuestionWrapper>
          <LatextComponent
            typeText={typeText}
            fontSize={fontSizeTitle ?? "25"}
            data={questionTitle[0]?.props[0]?.text}
          />
        </TitleQuestionWrapper>
      )}
    </div>
  );
};

export default TitleQuestion;
const TitleQuestionWrapper = styled.div`
  ol {
    margin-left: 20px;
  }
`;

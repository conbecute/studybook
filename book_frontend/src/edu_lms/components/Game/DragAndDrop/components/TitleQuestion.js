import React from "react";
import styled from "styled-components";
import { URL_AUDIO } from "../../../../constants/type";
import UseSound from "../../../UseSound";
import TextComponent from "edu_lms/components/TextComponent";

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
        <TextWrapper fontSize={fontSizeTitle} className="quicksand-bold">
          <TextComponent
            data={questionTitle[0]?.props[0]?.text}
            typeText={typeText}
            fontSize={fontSizeTitle}
          />
        </TextWrapper>
      )}
    </div>
  );
};

export default TitleQuestion;

const TextWrapper = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "25")}px;
`;

import React from "react";
import styled from "styled-components";
import { showCharacterInBook } from "../../selection";

const LabelComponent = ({
  typeIndex,
  background,
  color,
  index,
  languageBook,
}) => {
  return (
    <Label background={background} color={color}>
      {showCharacterInBook(typeIndex, index, languageBook)}
    </Label>
  );
};
export default LabelComponent;

const Label = styled.span`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
`;

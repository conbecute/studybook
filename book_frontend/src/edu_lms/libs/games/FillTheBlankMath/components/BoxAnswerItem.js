import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";
import {
  TYPE_SPLIT,
  TEXT_SPLIT,
  COLOR_RED,
  COLOR_GRAY,
  COLOR_BLUE,
} from "edu_lms/constants/type";
import TextComponent from "edu_lms/components/TextComponent";

const BoxAnswerItem = ({
  index,
  data,
  typeText,
  fontSize,
  indexQuestion,
  new_answer_id,
  setValue,
  getValues,
  onPlaying,
  indexResult,
  showCorrectAnswer,
  isReadOnly,
  isDone,
  newArrInputName,
  setIsEdit,
  isEdit,
}) => {
  const fieldName = `${new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`;
  const answer = newArrInputName.find((item) => item[fieldName]);
  const isCorrect = answer?.[fieldName] == 1;
  const [valueInput, setStateValueInput] = useState("?");

  const onFocusInputPage = (e) => {
    if (valueInput === "?") {
      setStateValueInput("");
    }
    onPlaying(false);
    isEdit = true;
  };
  const borderColor = getBorderColor(
    isEdit,
    isCorrect,
    showCorrectAnswer,
    isDone,
    indexResult
  );

  const onChangeValue = (e) => {
    setIsEdit(true);
    setStateValueInput(e.target.value);
    setValue(fieldName, e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Fragment>
      {data === TEXT_SPLIT && (
        <InputWrapper
          key={index}
          className="form-group position-relative pt-3 mb-3"
        >
          <ContentEditable
            index={index}
            style={{
              border: `2px solid ${borderColor}`,
              borderRadius: "5px",
              fontSize: fontSize,
            }}
            className={`form-control text-center mb-2 pt-1 pb-1 pr-4 pl-4 `}
            html={getValues(fieldName) || ""}
            onFocus={onFocusInputPage}
            disabled={isReadOnly}
            name={fieldName}
            placeholder="?"
            onChange={onChangeValue}
          />
        </InputWrapper>
      )}
      {data !== TEXT_SPLIT && (
        <span key={index}>
          <TextComponent
            typeText={typeText}
            fontSize={`${fontSize}px`}
            data={data}
            fontWeight="normal"
          />
        </span>
      )}
    </Fragment>
  );
};

export default BoxAnswerItem;

function getBorderColor(isEdit, isCorrect, showCorrectAnswer, isDone) {
  if (showCorrectAnswer && !isEdit && isDone) {
    return isCorrect ? COLOR_BLUE : COLOR_RED;
  }

  return COLOR_GRAY;
}
const InputWrapper = styled.div`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
  }
`;

import { Fragment } from "react";
import ContentEditable from "react-contenteditable";
import {
  TYPE_SPLIT,
  TEXT_SPLIT,
  COLOR_RED,
  COLOR_GRAY,
  COLOR_BLUE,
} from "edu_lms/constants/type";
import TextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import fillTheBlankStyle from "../FillTheBlank.module.scss";
import styles from "../FillTheBlank.module.scss";
import styled from "styled-components";

const BoxAnswerItem = ({
  index,
  data,
  typeText,
  fontSize,
  indexQuestion,
  new_answer_id,
  handlePlaying,
  isEdit,
  setIsEdit,
  newArrInputName,
  setValue,
  getValues,
  showCorrectAnswer,
  isDone,
  isReadOnly,
}) => {
  const fieldName = `${new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`;
  const answer = newArrInputName.find((item) => item[fieldName]);
  const isCorrect = answer?.[fieldName] == 1;
  const borderColor = getBorderColor(
    isEdit,
    isCorrect,
    showCorrectAnswer,
    isDone
  );

  const onChangeValue = (e) => {
    setIsEdit(true);
    handlePlaying();
    setValue(fieldName, e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Fragment>
      {data === TEXT_SPLIT && (
        <InputWrapper
          fontSize={fontSize}
          key={index}
          className={`form-group position-relative pt-3 mb-2 ${fillTheBlankStyle.gameFIB001}`}
        >
          <ContentEditable
            style={{
              border: `2px solid ${borderColor}`,
              borderRadius: "5px",
              fontSize: `${fontSize}px`,
            }}
            className={`form-control text-center mb-2 pt-1 pb-1 pr-4 pl-4 ${styles.inputText}`}
            html={getValues(fieldName) || ""}
            name={fieldName}
            placeholder="?"
            onChange={onChangeValue}
            disabled={isReadOnly}
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

import { useState } from "react";
import ContentEditable from "react-contenteditable";
import renderHTML from "react-render-html";
import {
  TYPE_SPLIT,
  TEXT_SPLIT,
  COLOR_RED,
  COLOR_GRAY,
  COLOR_BLUE,
} from "../../../../../constants/type";
import TextComponent from "../../../../TextComponent";

const BoxAnswerItem = ({
  index,
  dataStatus,
  data,
  typeText,
  fontSize = 24,
  indexResult,
  indexQuestion,
  new_answer_id,
  setValue,
  getValues,
}) => {
  const [valueInput, setStateValueInput] = useState("?");
  const fieldName = `${new_answer_id}${TYPE_SPLIT}-${index}${indexQuestion}-${index}`;

  const onFocusInputPage = (e) => {
    if (valueInput === "?") {
      setStateValueInput("");
    }
  };
  const onChangeValue = (e) => {
    setStateValueInput(e.target.value);
    setValue(fieldName, e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (data === TEXT_SPLIT) {
    return (
      <ContentEditable
        index={index}
        autoComplete="off"
        style={{
          border: `1px solid ${onColorBorder(dataStatus, indexResult)}`,
          borderRadius: "5px",
          fontSize: fontSize,
          display: "inline-block",
          width: "auto",
          margin: "0 10px",
          lineHeight: "2",
        }}
        className="form-control text-center pt-2 pb-2 pr-4"
        html={getValues(fieldName) || ""}
        onFocus={onFocusInputPage}
        name={fieldName}
        placeholder="?"
        onChange={onChangeValue}
      />
    );
  }

  if (typeText === "text") {
    return (
      <div className="d-inline" key={index}>
        {renderHTML(data)}
      </div>
    );
  }

  return (
    <TextComponent
      typeText={typeText}
      fontSize={`${fontSize}px`}
      data={data}
      fontWeight="normal"
    />
  );
};

export default BoxAnswerItem;

function onColorBorder(arrayStatus, indexResult) {
  let result = COLOR_GRAY;
  if (arrayStatus[indexResult] === 1) {
    result = COLOR_BLUE;
  }
  if (arrayStatus[indexResult] === 2) {
    result = COLOR_RED;
  }
  return result;
}

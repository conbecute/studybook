import { Fragment, useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
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

  return (
    <Fragment>
      {data === TEXT_SPLIT && (
        <div
          key={index}
          className="form-group position-relative pt-3 mr-3 ml-3 mb-3 game-fib001"
        >
          <ContentEditable
            index={index}
            autoComplete="off"
            style={{
              border: `1px solid ${onColorBorder(dataStatus, indexResult)}`,
              borderRadius: "5px",
              fontSize: fontSize,
            }}
            className="form-control text-center pt-2 pb-2 pr-4 pl-4"
            html={getValues(fieldName) || ""}
            onFocus={onFocusInputPage}
            name={fieldName}
            placeholder="?"
            onChange={onChangeValue}
          />
        </div>
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

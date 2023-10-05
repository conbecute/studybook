import React from "react";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import renderHTML from "react-render-html";
import {
  TEXT_SPLIT,
  COLOR_RED,
  COLOR_BLUE,
} from "../../../../../constants/type";
import TextComponent from "edu_lms/components/TextComponent";
import LatextComponent from "edu_lms/components/LatextComponent";
import styles from "./BoxAnswerItem.module.scss";

const BoxAnswerItem = ({
  index,
  counter,
  data,
  typeText,
  blankAnswer,
  nameControl,
  fontSize,
  color,
  setAnswer,
  setLengthAnswer,
  lengthAnswer,
  type_answer,
}) => {
  const CustomOption = (props) => {
    const { data, innerRef, innerProps, children } = props;
    return !data.custom ? (
      <div ref={innerRef} {...innerProps}>
        <LatextComponent
          data={children}
          typeText={typeText || ["latex"]}
          fontSize={`${fontSize}px`}
        />
      </div>
    ) : (
      <components.Option {...props} />
    );
  };

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <LatextComponent
        data={children}
        typeText={typeText || ["latex"]}
        fontSize={`${fontSize}px`}
      />
    </components.SingleValue>
  );

  const handleChange = (e) => {
    setAnswer(e.label);
    setLengthAnswer(e.label.length);
  };

  if (data === TEXT_SPLIT) {
    return (
      <div
        className={`form-group position-relative mr-2 ml-2 mb-0 mt-0 d-inline ${styles.textSplit}`}
      >
        <Controller
          name={`demo_${index}_${counter}`}
          control={nameControl}
          rules={{ required: true }}
          defaultValue={null}
          render={({ onChange, value }) => (
            <Select
              components={{ Option: CustomOption, SingleValue }}
              options={Object.values(blankAnswer).filter(
                (item) => typeof item === "object"
              )}
              styles={onCustomStyles(
                blankAnswer,
                lengthAnswer,
                typeText,
                type_answer
              )}
              value={value}
              onChange={(e) => {
                onChange(e);
                handleChange(e);
              }}
              placeholder={
                <div className="select-placeholder-text test">?</div>
              }
            />
          )}
        />
      </div>
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
      fontSize={fontSize}
      data={data}
      fontWeight="normal"
    />
  );
};

export default BoxAnswerItem;

function onCustomStyles(blankAnswer, lengthAnswer, typeText, type_answer) {
  let isStatus = blankAnswer[blankAnswer.length - 1];
  let max = 0;
  blankAnswer.map((item, index) => {
    if (index <= blankAnswer.length - 1) {
      if (max < item?.text?.length) {
        max = item.text.length;
      }
    }
  });

  let width = 10 * max;
  if (typeText && typeText.includes("latex") && max > 5) {
    width = 10 * max + 100;
  } else if (
    typeText &&
    lengthAnswer &&
    !typeText.includes("latex") &&
    max > 5
  ) {
    if (lengthAnswer >= 25) {
      width = 10 * max;
    }
    if (lengthAnswer < 25 && lengthAnswer >= 20) {
      width = 10 * max + 250;
    }
    if (lengthAnswer < 20 && lengthAnswer >= 15) {
      width = 10 * lengthAnswer + 200;
    }
    if (10 <= lengthAnswer && lengthAnswer < 15) {
      width = 10 * lengthAnswer + 150;
    }
    if (lengthAnswer < 10) {
      width = 200;
    }
  } else if (type_answer && type_answer.includes("image")) {
    width = 10 * max + 100;
  } else if (max < 40) {
    width = 10 * max + 100;
  } else {
    width = 10 * max;
  }

  const resultColor =
    isStatus === 1
      ? "2px solid " + COLOR_BLUE + " !important"
      : isStatus === 0
      ? "2px solid " + COLOR_RED + " !important"
      : "";
  return {
    menu: (provided) => ({
      ...provided,
      textAlign: "center",
    }),

    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 35,
      width: width > 700 ? 400 : width,
      border: resultColor,
      verticalAlign: "middle",
    }),
    valueContainer: (base) => ({
      ...base,
      justifyContent: "center",
    }),
    singleValue: (base) => ({
      ...base,
      borderRadius: 5,
      display: "flex",
      margin: "auto",
      top: "45%",
    }),
    placeholder: () => ({
      margin: "auto",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      height: "100%",
      paddingTop: "15",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
      visibility: "hidden",
      paddingBottom: "10%",
      height: "85%",
    }),
  };
}

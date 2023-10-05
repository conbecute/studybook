import React, { useEffect } from "react";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import {
  TEXT_SPLIT,
  COLOR_RED,
  COLOR_BLUE,
  COLOR_GRAY,
} from "edu_lms/constants/type";
import TextComponent from "edu_lms/components/TextComponent";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";
import styles from "./BoxAnswerItem.module.scss";

const BoxAnswerItem = ({
  index,
  counter,
  data,
  typeText,
  blankAnswer,
  nameControl,
  fontSize,
  fontSizeAnswer,
  color,
  dataHistory,
  setValue,
  showCorrectAnswer,
  onChangeValue,
  isEdit,
  isReadOnly,
}) => {
  const name = `demo_${index}_${counter}`;
  useEffect(() => {
    dataHistory && setValue(name, dataHistory[name]);
  }, [dataHistory]);
  const CustomOption = (props) => {
    const { data, innerRef, innerProps, children } = props;
    return !data.custom ? (
      <div ref={innerRef} {...innerProps}>
        <LatextComponent
          data={children}
          typeText={["latex"]}
          fontSize={`${fontSizeAnswer}px`}
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
        typeText={["latex"]}
        fontSize={fontSizeAnswer}
      />
    </components.SingleValue>
  );
  return (
    <>
      {data === TEXT_SPLIT && (
        <div
          className={`form-group position-relative mr-2 ml-2 mb-0 mt-0 ${styles.textSplit}`}
        >
          <Controller
            name={name}
            control={nameControl}
            defaultValue="null"
            render={({ onChange, value }) => (
              <Select
                onChange={(e) => {
                  onChange(e);
                  onChangeValue(true);
                }}
                value={value}
                components={{ Option: CustomOption, SingleValue }}
                options={Object.values(blankAnswer)}
                styles={onCustomStyles(
                  dataHistory?.[name],
                  showCorrectAnswer,
                  isEdit,
                  blankAnswer
                )}
                placeholder={
                  <div className="select-placeholder-text test">?</div>
                }
                isOptionDisabled={() => isReadOnly}
              />
            )}
          />
        </div>
      )}
      {data !== TEXT_SPLIT && (
        <span
          style={{
            color: color,
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "37px",
          }}
          key={index}
        >
          <LatextComponent
            data={data}
            typeText={typeText ? typeText : ["text"]}
            fontWeight={"normal"}
            fontSize={fontSizeAnswer}
          />
        </span>
      )}
    </>
  );
};

export default BoxAnswerItem;

function onCustomStyles(data, showCorrectAnswer, isEdit, blankAnswer) {
  const widths = blankAnswer.map((item) => item.label.length * 10);
  const maxWidth = Math.max(...widths);
  const status = data?.is_correct;
  const resultColor = `2px solid ${
    !showCorrectAnswer || isEdit
      ? "f70"
      : status !== undefined
      ? status
        ? COLOR_BLUE
        : COLOR_RED
      : COLOR_GRAY
  } !important`;

  return {
    menu: (provided) => ({
      ...provided,
      textAlign: "center",
      zIndex: 3,
    }),

    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 35,
      width: maxWidth + 100,
      border: resultColor,
      verticalAlign: "middle",
    }),
    valueContainer: (base) => ({
      ...base,
      justifyContent: "center",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
  };
}

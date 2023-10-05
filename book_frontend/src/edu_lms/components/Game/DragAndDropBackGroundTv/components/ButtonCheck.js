import React, { useState } from "react";
import { connect } from "react-redux";
import { BOOK_LANGUAGE } from "../../../../constants/type";

const ButtonCheck = ({
  onResetData,
  onCheckData,
  isDislabeled = true,
  languageBook,
  className = "mt-4",
  isReset,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div className={`${className} text-right pr-3 pl-3`}>
      {!isReset ? (
        <button
          onClick={onCheckData}
          disabled={isDislabeled}
          className={`${
            isDislabeled ? "monkey-bg-gray" : "monkey-bg-blue"
          } btn cursor monkey-color-white`}
          id="tooltip-reset-drap-drop"
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
              ?.buttonCheck
          }
        </button>
      ) : (
        <button
          onClick={onResetData}
          disabled={isDislabeled}
          className={`${
            isDislabeled ? "monkey-bg-gray" : "monkey-bg-blue"
          } btn cursor monkey-color-white`}
          id="tooltip-reset-drap-drop"
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
              ?.buttonRefresh
          }
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { languageBook } = state.readingBookReducers;
  return {
    languageBook,
  };
};

export default connect(mapStateToProps)(ButtonCheck);

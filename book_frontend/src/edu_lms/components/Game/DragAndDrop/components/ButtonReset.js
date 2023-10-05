import React from "react";
import { connect } from "react-redux";
import { BOOK_LANGUAGE } from "../../../../constants/type";

const ButtonReset = ({
  onResetData,
  isDislabeled = true,
  languageBook,
  className = "mt-4",
}) => {
  return (
    <div className={`${className} text-right pr-3 pl-3`}>
      <button
        onClick={() => onResetData()}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const { languageBook } = state.readingBookReducers;
  return {
    languageBook,
  };
};

export default connect(mapStateToProps)(ButtonReset);

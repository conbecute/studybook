import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { BOOK_LANGUAGE } from "edu_lms/constants/type";
import { Tooltip } from "reactstrap";

const ButtonReset = ({
  onResetData,
  onCheckAnswers,
  disabledButtonCheck = false,
  isDislabeled = true,
  isButtonCheck = false,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const languageBook = useSelector(
    (state) => state.readingBookReducers.languageBook
  );

  return (
    <div className="text-right pr-3 pl-3 mt-4 mb-2">
      {isButtonCheck && (
        <button
          disabled={!disabledButtonCheck}
          className={`${
            !disabledButtonCheck ? "monkey-bg-gray" : "monkey-bg-blue"
          } btn cursor monkey-color-white`}
          onClick={onCheckAnswers}
        >
          {
            BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
              ?.buttonCheck
          }
        </button>
      )}
      {!isButtonCheck && (
        <Fragment>
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
          <Tooltip
            isOpen={tooltipOpen}
            target="tooltip-reset-drap-drop"
            toggle={toggle}
          >
            {
              BOOK_LANGUAGE.filter((ele) => ele.id === +languageBook)[0]
                ?.buttonRefresh
            }
          </Tooltip>
        </Fragment>
      )}
    </div>
  );
};
export default ButtonReset;

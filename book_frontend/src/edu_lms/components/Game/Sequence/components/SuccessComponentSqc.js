import React, { Fragment, useState } from "react";
import { Tooltip } from "reactstrap";
import { BOOK_LANGUAGE } from "../../../../constants/type";
import fireworks from "../../../../assets/images/fireworks.png";
import { ANSWER_STATUS } from "edu_lms/constants/type";
import sad from "../../../../assets/images/sad.png";

const SuccessComponentSqc = ({
  data,
  result,
  onResetData,
  languageBook,
  setIndexQuestion,
  setShowSuccess,
  setStateResult,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const results = result.filter((item) => item.status === ANSWER_STATUS.WRONG);
  const pass = results.length / data.game_config.data.length > 0.7;

  const resetData = () => {
    onResetData();
    setIndexQuestion(0);
    setShowSuccess(false);
    setStateResult(data.game_config.data);
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center h-100 text-center monkey-fz-30">
        <div className="d-inline-flex w-50 align-items-center">
          <div className="fireworks w-100 text-center">
            <img alt="result" src={pass ? fireworks : sad} />
          </div>
          <div className="results w-100">
            <p className="text-center">
              <span className="monkey-color-blue">
                {results.length}/{data.game_config.data.length}
              </span>
              {
                BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                  ?.editShowResult
              }{" "}
            </p>

            {pass ? (
              <span className="pt-4 monkey-fz-14 text-center">
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                    ?.congratulation
                }
              </span>
            ) : (
              <span className="pt-4 monkey-fz-14 text-center">
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                    ?.sorry
                }
              </span>
            )}
            <div className="mb-5 p-3">
              <button
                onClick={resetData}
                className="btn monkey-bg-blue monkey-color-white cursor"
                id="tooltip-reset"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                    ?.buttonRefresh
                }
              </button>
              <Tooltip
                isOpen={tooltipOpen}
                target="tooltip-reset"
                toggle={toggle}
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id === languageBook)[0]
                    ?.msgRefresh
                }
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SuccessComponentSqc;

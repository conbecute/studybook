import React, { Fragment, useState } from "react";
import { Tooltip } from "reactstrap";
import { BOOK_LANGUAGE } from "../../../../constants/type";
import fireworks from "../../../../assets/images/fireworks.png";
import sad from "../../../../assets/images/sad.png";

const SuccessComponent = ({ data, result, onResetData, languageBook }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const results = result.filter(Boolean).length / data.length;
  const pass = results > 0.7 ? true : false;
  return (
    <Fragment>
      <div className="d-flex justify-content-center h-100 text-center monkey-fz-30">
        <div className="d-inline-flex w-50 align-items-center">
          <div className="fireworks w-100 text-center">
            {pass ? <img src={fireworks} /> : <img src={sad} />}
          </div>
          <div className="results w-100">
            <p className="text-center">
              <span className="monkey-color-blue">
                {result.filter(Boolean).length}/{data.length}
              </span>
              {
                BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                  ?.editShowResult
              }{" "}
            </p>

            {pass ? (
              <span className="pt-4 monkey-fz-14 text-center">
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                    ?.congratulation
                }
              </span>
            ) : (
              <span className="pt-4 monkey-fz-14 text-center">
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                    ?.sorry
                }
              </span>
            )}
            <div className="mb-5 p-3">
              <button
                onClick={onResetData}
                className="btn monkey-bg-blue monkey-color-white cursor"
                id="tooltip-reset"
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
                    ?.buttonRefresh
                }
              </button>
              <Tooltip
                isOpen={tooltipOpen}
                target="tooltip-reset"
                toggle={toggle}
              >
                {
                  BOOK_LANGUAGE.filter((ele) => ele.id == languageBook)[0]
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

export default SuccessComponent;

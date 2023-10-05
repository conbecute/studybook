import React, { Fragment, useState } from "react";
import { Tooltip } from "reactstrap";
import { BOOK_LANGUAGE } from "edu_lms/constants/type";
import fireworks from "edu_lms/assets/images/fireworks.png";
import sad from "edu_lms/assets/images/sad.png";
import styled, { css } from "styled-components";

const SuccessComponent = ({
  totalQuestion,
  countCorrect,
  onResetData,
  languageBook,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const results = countCorrect / totalQuestion;
  const pass = results > 0.7 ? true : false;
  return (
    <Fragment>
      <div className="d-flex justify-content-center h-100 text-center monkey-fz-30">
        <div className="d-inline-flex w-50 align-items-center d-relative">
          <WrapperIconResult className="fireworks w-100 text-center">
            {pass ? (
              <img className="mx-auto" src={fireworks} />
            ) : (
              <img className="mx-auto" src={sad} />
            )}
          </WrapperIconResult>
          <div className="results w-100">
            <p className="text-center">
              <span className="monkey-color-blue">
                {countCorrect}/{totalQuestion}
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

const WrapperIconResult = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
`;

export default SuccessComponent;

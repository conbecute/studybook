import styled from "styled-components";
import classNames from "classnames";
import { INNER_WIDTH } from "edu_lms/constants/type";

const Result = styled.div`
  z-index: 9;
  i {
    font-size: 28px;
  }
`;
export default function QuestionResult({ result }) {
  return (
    <div className="d-flex justify-content-end position-relative">
      {result === true && (
        <Result
          className={classNames(
            "d-flex align-items-center monkey-bg-success text-white d-inline p-2 px-2 rounded-pill",
            {
              "position-absolute": window.innerWidth > INNER_WIDTH.IPAD,
            }
          )}
        >
          <i className="fa fa-smile-o pr-2" aria-hidden="true"></i>
          <span className="monkey-fz-16">Chính xác</span>
        </Result>
      )}
      {result === false && (
        <Result
          className={classNames(
            "d-flex align-items-center monkey-bg-error text-white d-inline p-2 px-2 rounded-pill",
            {
              "position-absolute": window.innerWidth > INNER_WIDTH.IPAD,
            }
          )}
        >
          <i className="fa fa-frown-o pr-2" aria-hidden="true"></i>
          <span className="monkey-fz-16">Sai rồi</span>
        </Result>
      )}
    </div>
  );
}

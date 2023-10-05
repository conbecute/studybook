import React from "react";
import * as TYPE from "../../../constants/type";
import styled from "styled-components";
import ImgTry from "../../../assets/images/img-try.svg";

const ExamExercisesBoxWrapper = ({
  data,
  provinceId,
  onPopupExamExercises,
}) => {
  return (
    <ExamExercisesBox>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <img src={ImgTry} alt="#" style={{ height: "130px" }} />
          <ExamTotal className="mr-3 ml-3">
            <h4 className="monkey-fz-20">{data.title}</h4>
            <p>
              <span>{data.total}</span> câu hỏi trắc nghiệm
            </p>
          </ExamTotal>
        </div>
        <div className="text-center">
          {data.result && (
            <div className="position-relative">
              <i
                style={{
                  position: "absolute",
                  top: "19px",
                  left: "-11px",
                  zIndex: 55,
                  transform: "rotate(45deg)",
                  color: "#ff7707",
                }}
                className="fa fa-star monkey-color-yellow monkey-fz-30"
                aria-hidden="true"
              ></i>
              <p className="mb-2">Kết quả cao nhất</p>
              <ExamTotal>
                <ul
                  className="list-group list-group-flush monkey-bc-violet border-radius mb-3"
                  style={{
                    border: "1px solid #ff7707",
                    borderRadius: "15px",
                  }}
                >
                  <li className="list-group-item p-2">
                    Kết quả:{" "}
                    <span className="monkey-color-violet">{data?.result}</span>
                  </li>
                  <li className="list-group-item p-2">
                    Xếp loại:{" "}
                    <span className="monkey-color-violet">
                      {" "}
                      {TYPE.TYPE_RANK[data?.rank]}
                    </span>
                  </li>
                </ul>
              </ExamTotal>
            </div>
          )}
          {provinceId != 8929 && (
            <button
              onClick={() => onPopupExamExercises(data)}
              className="btn btn-pr"
            >
              Làm bài kiểm tra
            </button>
          )}
        </div>
      </div>
    </ExamExercisesBox>
  );
};
export default ExamExercisesBoxWrapper;

const ExamExercisesBox = styled.div`
  background-color: ${TYPE.COLOR_WHITE};
  border-radius: 20px;
  box-shadow: 0 5px 15px 0 rgb(0 0 0 / 10%);
  padding: 3rem;
  margin-bottom: 5px;
`;
const ExamTotal = styled.div`
  h4,
  span {
    color: #ff7707;
  }
`;

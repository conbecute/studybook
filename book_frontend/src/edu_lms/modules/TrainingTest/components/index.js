import React from "react";
import TitleComponent from "../../../components/title";
import * as TEXT from "../../../constants/text";

const TrainingTestWrapper = ({ onStartWork }) => {
  return (
    <div className="training_test_wrapper monkey-bg-light-gray monkey-pt-15 monkey-pb-15">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <TitleComponent
              title={TEXT.TITLE_TRAINING_TEST}
              className="monkey-color-violet text-uppercase monkey-fz-34 mt-5 text-center"
            />
            <TitleComponent
              title={TEXT.TITLE_TRAINING_TEST_2}
              className="monkey-color-violet monkey-fz-30 text-center mb-5"
            />
          </div>
          <div className="col-12">
            <div className="training_test_body mb-5">
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="monkey-bg-white p-5"
                  style={{
                    boxShadow: "0 0 15px 0 #cfcfcf",
                    borderRadius: "1rem",
                  }}
                >
                  <ul className="mb-4 pl-0 monkey-fz-20">
                    <li className="mb-1">
                      Ngày bắt đầu: {TEXT.DATE_TRAINING["start"]}
                    </li>
                    <li className="mb-1">
                      Ngày kết thúc: {TEXT.DATE_TRAINING["end"]}
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      onClick={onStartWork}
                      className="btn monkey-bg-violet pr-3 pl-3 pt-2 pb-2 hvr-registration monkey-f-bold monkey-color-white nav-link-monkey rounded-pill text-uppercase"
                    >
                      LÀM BÀI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="training_test_footer">
              <div
                style={{
                  width: "80%",
                  margin: "auto",
                  border: "1px solid #0066b2",
                }}
                className="mb-5"
              ></div>

              <TitleComponent
                title={TEXT.FOOTER_TRAINING_TEST}
                className="monkey-color-violet text-uppercase monkey-fz-34 text-center mb-5"
              />
              <div className="body">
                <ul className="mb-3">
                  {TEXT.FOOTER_TRAINING_TEST_2.map((item, index) => {
                    return (
                      <li key={index} className="mb-1">
                        {item}
                      </li>
                    );
                  })}
                </ul>
                <p className="monkey-f-bold mb-3">Lưu ý:</p>
                <ul className="mb-3 monkey-f-bold">
                  {TEXT.FOOTER_TRAINING_TEST_3.map((item, index) => {
                    return (
                      <li key={index} className="mb-1">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrainingTestWrapper;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Tooltip } from "reactstrap";
import { onChangeBgColorWhenActive } from "../selection";
import * as TYPE from "../../../constants/type";
import { onDispatchResetQuestion } from "../../../modules/ListQuiz/actions";
import PopupSubmitTraining from "./PopupSubmitTraining";
import PopupBackTraining from "./PopupBackTraining";
import * as PATH from "edu_lms/constants/path";

const Header = ({
  data,
  isMenu,
  onSubmit,
  title,
  onNextQuestion,
  currentQuestion,
  quickPlayMode,
  toggleQuickPlayMode,
  submitted,
  setSubmitted,
  indexQuestion,
  total,
  onHandleDot,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPopupConfirm, setShowPopupConfirm] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const [showPopupBackTraining, setShowPopupBackTraining] = useState(false);
  const onCheckHandleSubmit = () => {
    let isFinish = true;
    data.forEach((item) => {
      if (!item.disabled) {
        isFinish = false;
        setIsDone(false);
      }
    });
    if (!isFinish) {
      setShowPopupConfirm(true);
    } else {
      setShowPopupConfirm(true);
      setIsDone(true);
    }
  };

  const onCheckAnswers = () => {
    let dataAnswers = [];
    data.forEach((item) => {
      const resultFilterAnswer = item.answers.filter(
        (itemAnswer) => itemAnswer.status === 1
      )[0]?.answer_id;
      dataAnswers = [...dataAnswers, resultFilterAnswer];
    });
    setSubmitted(true);
    setShowPopupConfirm(false);
    onSubmit(dataAnswers);
    onHandleDot(0, data[0]);
  };
  const onClickBack = () => {
    submitted && history.push(`${PATH.ROUTE_PATH_V3_TRAINING}#ketqua`);
    setShowPopupBackTraining(true);
  };

  const btnColor = onChangeBgColorWhenActive(currentQuestion || []);

  const answered = data.filter(
    (item) => !!item.answers?.find((a) => a.status === 1)
  );
  const totalAnswered = answered.length;

  return (
    <>
      <HeaderWrapper isMenu={isMenu}>
        {submitted ? (
          <a href={`${PATH.ROUTE_PATH_V3_TRAINING}#ketqua`}>
            <Button
              variant="outline-secondary"
              onClick={onClickBack}
              style={{ minWidth: "150px" }}
            >
              <i
                className="fa fa-chevron-left cursor pr-2"
                aria-hidden="true"
              />
              Kết quả kiểm tra tập huấn
            </Button>
          </a>
        ) : (
          <Button
            variant="outline-secondary"
            onClick={onClickBack}
            style={{ minWidth: "150px" }}
          >
            <i className="fa fa-chevron-left cursor pr-2" aria-hidden="true" />
            Kết quả kiểm tra tập huấn
          </Button>
        )}
        {title && (
          <h2 className="text-center text-uppercase monkey-color-orange h2 font-weight-bold">
            {title}
          </h2>
        )}

        <div className="d-flex align-items-center cursor">
          {!submitted && (
            <div className="d-flex align-items-center cursor">
              <div
                className="cursor mb-3 pl-2 mb-md-0 pl-md-0"
                id="reading-support-tooltip"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  className="fa fa-question-circle monkey-fz-18 monkey-color-orange mr-2"
                  style={{ marginTop: "5px" }}
                  aria-hidden="true"
                />
                <Tooltip
                  className="d-block"
                  placement="left"
                  isOpen={tooltipOpen}
                  target="reading-support-tooltip"
                  toggle={toggleTooltip}
                >
                  Chế độ làm bài nhanh sẽ tự động chuyển câu tiếp theo khi chọn
                  xong đáp án.
                </Tooltip>
              </div>
              <div>
                <Form.Check
                  type="switch"
                  id="quick-play-switch"
                  label="Làm bài nhanh"
                  checked={quickPlayMode}
                  onChange={toggleQuickPlayMode}
                  disabled={submitted}
                />
              </div>
              <button
                className={classNames(
                  "btn text-uppercase ml-2 monkey-color-white",
                  {
                    "monkey-bg-orange":
                      indexQuestion + 1 !== total &&
                      !submitted &&
                      btnColor === TYPE.COLOR_BLUE,
                    "monkey-bg-gray":
                      indexQuestion + 1 === total ||
                      submitted ||
                      btnColor !== TYPE.COLOR_BLUE,
                  }
                )}
                style={{
                  pointerEvents:
                    !submitted &&
                    btnColor === TYPE.COLOR_BLUE &&
                    indexQuestion + 1 !== total
                      ? "initial"
                      : "none",
                  opacity:
                    indexQuestion + 1 !== total &&
                    !submitted &&
                    btnColor === TYPE.COLOR_BLUE
                      ? 1
                      : 0.4,
                }}
                onClick={() => onNextQuestion(currentQuestion)}
              >
                Tiếp theo
              </button>
            </div>
          )}

          {submitted ? (
            <button
              className="btn text-uppercase mr-4 ml-2 monkey-color-white monkey-bg-orange"
              onClick={() => {
                dispatch(onDispatchResetQuestion(true));
                setSubmitted(false);
              }}
            >
              Kiểm tra lại
            </button>
          ) : (
            <button
              className="btn text-uppercase mr-4 ml-2 monkey-color-white monkey-bg-orange"
              onClick={onCheckHandleSubmit}
            >
              Nộp bài ({totalAnswered}/{total})
            </button>
          )}
        </div>
      </HeaderWrapper>
      <PopupSubmitTraining
        show={showPopupConfirm}
        setShow={setShowPopupConfirm}
        onSubmitExam={onCheckAnswers}
        isComplete={isDone}
        showPopupConfirmTraining={showPopupConfirm}
      />
      {!submitted && (
        <PopupBackTraining
          show={showPopupBackTraining}
          onHide={() => setShowPopupBackTraining(false)}
          setShow={setShowPopupBackTraining}
        />
      )}
    </>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: ${(props) => (props.isMenu ? "333" : "445")};
  top: 0px;
  right: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  padding-left: ${(props) => (props.isMenu ? "200px" : "0")};
  transition: padding 0.5s linear;
  border-bottom: 1px solid #d7d7d7;
  i:hover {
    color: #ff7707;
    transition: 0.3s ease-in-out;
  }
  @media (max-width: 600px) {
    padding-left: 0px;
    width: calc(100% - 100px);
    overflow: scroll;

    div button {
      width: 150px;
      padding: 5px !important;
    }
    h2,
    i {
      font-size: 20px;
      margin-bottom: 0px;
    }
    button {
      font-size: 12px;
    }
    .btn {
      padding: 0;
      i {
        font-size: 12px;
      }
    }
  }
`;

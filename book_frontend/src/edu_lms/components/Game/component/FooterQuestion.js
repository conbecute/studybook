import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Alert } from "reactstrap";
import ExerciseCorrect from "../../../assets/images/exercise-correct.svg";
import { COLOR_GRAY, COLOR_BLUE } from "../../../constants/type";
import { onDispatchDataAlert } from "../../ListQuestion/actions";

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  width: 100%;
  .alert {
    position: absolute;
    top: -96px;
    width: 295px;
    right: 5px;
  }
`;

const FooterQuestion = ({
  currentIndex,
  questionList,
  disabled,
  alert,
  isButtonNextQuestion,
  onSubmitForm,
  onNextQuestion,
  onDispatchDataAlert,
}) => {
  const onDismiss = () => {
    const dataAlert = {
      color: "",
      visible: false,
      text: "",
    };
    onDispatchDataAlert(dataAlert);
  };

  return (
    <FooterWrapper>
      <div className="footer-left d-flex align-items-center justify-content-end position-relative">
        <div className="d-flex align-items-center justify-content-center ml-3 mr-3">
          {questionList.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: `${currentIndex === index ? "12px" : "8px"}`,
                  height: `${currentIndex === index ? "12px" : "8px"}`,
                  border: `1px solid ${COLOR_GRAY}`,
                  borderRadius: "50%",
                  margin: "0 5px",
                  backgroundColor: onBackgroundColor(item.game.isAnswer),
                }}
              ></div>
            );
          })}
        </div>
        <div className="footer-right">
          {isButtonNextQuestion ? (
            <button
              onClick={() => onNextQuestion(2)}
              className="btn monkey-color-white pr-3 pl-3 pt-2 pb-2 monkey-bg-blue cursor"
            >
              Câu hỏi tiếp theo
            </button>
          ) : (
            <button
              onClick={() => onSubmitForm()}
              disabled={disabled}
              style={{ opacity: disabled ? "0.2" : "1" }}
              className={`${
                disabled ? "monkey-bg-black" : "monkey-bg-blue cursor"
              } btn monkey-color-white pr-3 pl-3 pt-2 pb-2`}
            >
              Kiểm tra
            </button>
          )}

          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            <div className="d-flex justify-content-center align-items-center">
              {alert.color === "info" && (
                <img className="mr-3" src={ExerciseCorrect} alt="#" />
              )}
              {alert.text}
              {alert.color !== "info" && (
                <u
                  onClick={() => onNextQuestion(3)}
                  className="ml-1 cursor monkey-color-blue"
                >
                  bỏ qua!
                </u>
              )}
            </div>
          </Alert>
        </div>
      </div>
    </FooterWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(FooterQuestion);

function onBackgroundColor(type) {
  switch (type) {
    case 2:
      return COLOR_BLUE;
      break;
    case 3:
      return COLOR_GRAY;
      break;
    default:
      return "#fff";
  }
}

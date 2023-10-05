import { ANSWER_STATUS, INNER_WIDTH } from "edu_lms/constants/type";
import styled from "styled-components";

function getAnswerColor(checkActive, showAlert) {
  if (showAlert) {
    if (checkActive === ANSWER_STATUS.CORRECT) {
      return "green";
    }
    return "red";
  }
  return "gray";
}

export const CheckAnswer = styled.p`
  input {
    width: 50px;
    border: 1px solid
      ${(props) =>
        !props.checkActive
          ? "gray"
          : getAnswerColor(props.checkActive, props.showAlert)};
    color: ${(props) => getAnswerColor(props.checkActive, props.showAlert)}}}
  }
  span {
    color: ${(props) =>
      `${props.showAlert && getAnswerColor(props.checkActive, props.showAlert)}
      } !important`};
  }
`;

export const ShowAlert = styled.div`
  margin-right: 35px;
  ${(props) => props.styleAlertGame}
`;

export const BoardStyle = styled.div`
  top: ${window.innerWidth > INNER_WIDTH.MOBILE ? "0" : "100%"};
  right: ${window.innerWidth > INNER_WIDTH.MOBILE ? "40px" : "0"};
  width: ${window.innerWidth > INNER_WIDTH.MOBILE ? "400px" : "100%"};
  height: ${window.innerWidth > INNER_WIDTH.MOBILE
    ? "400px"
    : `${window.innerWidth}px`};
  display: none;
  &.active-board {
    display: block;
  }
`;

export const TitleAnswer = styled.div`
  font-size: 28px;
`;

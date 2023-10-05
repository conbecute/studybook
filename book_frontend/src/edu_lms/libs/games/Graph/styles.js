import styled from "styled-components";
import _ from "lodash";
import { ANSWER_STATUS, INNER_WIDTH } from "edu_lms/constants/type";

export const BoardStyle = styled.div`
  margin-top: 230px;
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

export const InputGraph = styled.input`
  &.pointer {
    pointer-events: none;
  }
  width: 150px;
`;

export function getAnswerColorGameFillTheGraph(
  isCheckActive,
  isShowGraph,
  showCorrectAnswer
) {
  if (isShowGraph && showCorrectAnswer) {
    if (isCheckActive === ANSWER_STATUS.WRONG) {
      return "red";
    }
    return "green";
  }
  return "gray";
}
export const CheckAnswer = styled.p`
  input {
    border: 1px solid
      ${(props) =>
        getAnswerColorGameFillTheGraph(
          props.isCheckActive,
          props.isShowGraph,
          props.showCorrectAnswer
        )};
    color: ${(props) =>
      getAnswerColorGameFillTheGraph(
        props.isCheckActive,
        props.isShowGraph,
        props.showCorrectAnswer
      )}}}

  span {
    color: ${(props) =>
      `${getAnswerColorGameFillTheGraph(
        props.isCheckActive,
        props.isShowGraph,
        props.showCorrectAnswer
      )}
      } !important`};
`;

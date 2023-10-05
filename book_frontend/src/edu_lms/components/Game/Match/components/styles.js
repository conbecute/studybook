import styled from "styled-components";
import { ANSWER_STATUS } from "edu_lms/constants/type";

const P = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  color: red;
  text-align: center;
`;

const Wrapper = styled.div`
  &.active {
    border: 2px solid #ff7707;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  &.un-active {
    border: 1px solid gray;
  }
`;

export { P, Wrapper };

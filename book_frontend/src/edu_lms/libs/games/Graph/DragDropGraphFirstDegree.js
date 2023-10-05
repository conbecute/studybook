import classNames from "classnames";
import TextComponent from "edu_lms/components/TextComponent";
import { INNER_WIDTH } from "edu_lms/constants/type";

import styled from "styled-components";
import { convertNumber, convertSigns, QUESTION } from "./constants";

const WrapperGameAxis = styled.div`
  .jxgbox {
    margin: 0 auto;
    width: ${window.innerWidth > INNER_WIDTH.MOBILE ? "400px" : "100%"};
    height: ${window.innerWidth > INNER_WIDTH.MOBILE
      ? "400px"
      : `${window.innerWidth}px`};
  }
  .graph-submit {
    right: 20px;
    bottom: 20px;
  }
`;

export default function DragDropGraphFirstDegrees({ factor, graphId }) {
  return (
    <WrapperGameAxis
      className={classNames("position-relative", {
        "pl-5": window.innerWidth > INNER_WIDTH.MOBILE,
      })}
    >
      <div className="d-flex monkey-f-header mb-5 mt-3 monkey-fz-20">
        <h2 className="pt-2">{QUESTION}</h2>
        <TextComponent
          data={`\\(y = ${convertNumber(factor.a)}x ${convertSigns(
            factor.b
          )} \\)`}
        />
      </div>
      <div className="jxgbox" id={graphId} />
    </WrapperGameAxis>
  );
}

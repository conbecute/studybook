import MathpixLoader from "mathpix-markdown-it/lib/components/mathpix-loader";
import MathpixMarkdown from "mathpix-markdown-it/lib/components/mathpix-markdown";
import renderHTML from "react-render-html";
import _ from "lodash";
import { TYPE_TEXT } from "edu_lms/constants/type";
import styled from "styled-components";
import classNames from "classnames";

const LatextComponent = ({ data, typeText, fontSize }) => {
  return (
    <TextWrapper fontSize={fontSize}>
      {_.includes(typeText, TYPE_TEXT) ? (
        <div
          className={classNames({
            "p-2 pl-3": !!data,
          })}
        >
          {renderHTML(data)}
        </div>
      ) : (
        <div>
          <MathpixLoader>
            <MathpixMarkdown text={String(data) ? String(data) : ""} />
          </MathpixLoader>
        </div>
      )}
    </TextWrapper>
  );
};
export default LatextComponent;

const TextWrapper = styled.div`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
  }
`;

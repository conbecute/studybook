import React from "react";
import styled from "styled-components";
import { COLOR_GREEN } from "../../../../constants/type";
const FooterComponent = ({ data, indexQuestion, onHandleQuestion }) => {
  return (
    <Footer>
      <div>
        {data.map((item, index) => (
          <span
            onClick={() => onHandleQuestion(index)}
            key={index}
            className={`${
              indexQuestion === index ? "monkey-color-blue" : ""
            } mr-3 ml-3 cursor monkey-fz-20`}
            style={{
              borderBottom: `${
                indexQuestion === index ? `2px solid ${COLOR_GREEN}` : "initial"
              }`,
            }}
          >
            {data.length > 1 && index + 1}
          </span>
        ))}
      </div>
    </Footer>
  );
};
export default FooterComponent;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

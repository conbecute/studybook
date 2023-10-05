import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { URL_IMAGE_QUESTION, URL_AUDIO } from "../../../../constants/type";
import { onResultIcon, TypeGameMultipleChoice } from "../../selection";
import MultipleChoiceCheckbox from "../MultipleChoiceCheckbox.module.scss";

const ImageComponent = ({
  isTotal,
  item,
  iconList,
  color,
  typeAnswer,
  typeText,
  isBorder = true,
}) => {
  const resultData = onResultIcon(item.answer_id, iconList[0]?.icons);
  return (
    <div>
      <ImagesWrapper
        color={isBorder ? color : "transparent"}
        isBorder={isBorder}
      >
        <div
          style={{ paddingTop: "65px" }}
          className={`${MultipleChoiceCheckbox.gameMultipleImg}`}
        >
          {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
            <img
              style={{
                height: `${isTotal ? "150px" : "200px"}`,
                marginBottom: "25px",
              }}
              src={`${URL_IMAGE_QUESTION}${resultData.path}`}
              alt="#"
            />
          )}
        </div>
      </ImagesWrapper>
      <ClickAnswer
        className="d-flex justify-content-center monkey-fz-25 mt-4"
        style={{
          display: "block",
          marginTop: "30px",
          position: "fixed",
          opacity: "0",
          paddingLeft: "50%",
        }}
      >
        Đáp án
      </ClickAnswer>
    </div>
  );
};

export default ImageComponent;

const ImagesWrapper = styled.div`
  width: ${(props) => `${props.isBorder ? "80%" : "100%"}`};
  border-radius: 15px;
  margin: auto;
  border: 1px solid ${(props) => props.color};
  text-align: ${(props) => `${props.isBorder ? "center" : "left"}`}; ;
`;

const ClickAnswer = styled.button`
  display: block;
  margintop: 30px;
  position: fixed;
  opacity: 0;
  paddingleft: 50%;
`;

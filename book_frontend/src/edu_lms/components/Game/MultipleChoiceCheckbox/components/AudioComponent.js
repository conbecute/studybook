import React from "react";
import _ from "lodash";
import { URL_IMAGE_QUESTION, URL_AUDIO } from "../../../../constants/type";
import { onResultIcon, TypeGameMultipleChoice } from "../../selection";
import AudioComponent from "../../../AudioComponent";
import styled from "styled-components";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

const AudioGameComponent = ({
  item,
  iconList,
  fontSize,
  fontSizeAnswer,
  typeAnswer,
  typeText,
  isBorder = true,
}) => {
  const resultData = onResultIcon(item.answer_id, iconList[0]?.icons);
  return (
    <Content>
      {_.includes(typeAnswer, TypeGameMultipleChoice.AUDIO) && (
        <BtnAudio className="d-flex justify-content-center monkey-fz-25 position-absolute">
          <AudioComponent
            src={`${URL_AUDIO}${resultData?.props[0]?.audio[0]?.path}`}
          />
        </BtnAudio>
      )}
      {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
        <p
          className={`${isBorder ? "mb-3" : "pl-3"} text-left`}
          style={{ marginTop: "12px" }}
        >
          <LatextComponent
            typeText={typeText}
            fontSize={fontSizeAnswer ?? ""}
            data={String(resultData.props[0]?.text) || ""}
            fontWeight="normal"
          />
        </p>
      )}
    </Content>
  );
};

export default AudioGameComponent;
const BtnAudio = styled.div`
  right: 100%;
`;

const Content = styled.div`
  margin-bottom: 10px;
`;

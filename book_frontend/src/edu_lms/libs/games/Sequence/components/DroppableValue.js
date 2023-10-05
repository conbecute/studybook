import React from "react";
import styled from "styled-components";
import _ from "lodash";
import {
  URL_IMAGE_QUESTION,
  COLOR_WHITE,
  COLOR_BLACK,
  ANSWER_STATUS,
} from "edu_lms/constants/type";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

export default function DroppableValue({ item, dataGameConfig }) {
  return (
    <div>
      {_.includes(dataGameConfig.type_answer, TypeGameMultipleChoice.AUDIO) && (
        <CheckAnswer
          className=" monkey-fz-16 fa fa-volume-up cursor hvr-registration"
          aria-hidden="true"
          item={item}
        />
      )}
      {_.includes(dataGameConfig.type_answer, TypeGameMultipleChoice.IMAGE) && (
        <img
          src={`${URL_IMAGE_QUESTION}${item.path}`}
          className="w-100"
          alt="#"
        />
      )}
      {_.includes(dataGameConfig.type_answer, TypeGameMultipleChoice.TEXT) && (
        <LatextComponent
          data={item.props[0]?.text}
          typeText={dataGameConfig.type_text_content}
          fontSize={dataGameConfig?.font_size_answer}
        />
      )}
    </div>
  );
}

const CheckAnswer = styled.i`
  position: absolute;
  z-index: 100;
  top: -20px;
  left: -3px;
  color: ${(props) =>
    props.item.status !== ANSWER_STATUS.DEFAULT ? COLOR_WHITE : COLOR_BLACK};
`;

import React, { Fragment } from "react";
import _ from "lodash";
import {
  URL_IMAGE_QUESTION,
  URL_AUDIO,
  COLOR_WHITE,
  COLOR_BLACK,
} from "edu_lms/constants/type";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

const DroppableValue = ({
  onSrcAudio,
  item,
  typeAnswer,
  fontSizeAnswer,
  typeTextContent,
}) => {
  return (
    <Fragment>
      {_.includes(typeAnswer, TypeGameMultipleChoice.AUDIO) && (
        <i
          onClick={() =>
            onSrcAudio(`${URL_AUDIO}${item.props[0]?.audio[0]?.path}`)
          }
          className=" monkey-fz-16 fa fa-volume-up cursor hvr-registration"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "100",
            top: "-20px",
            left: "-3px",
            color: `${item.status !== 0 ? COLOR_WHITE : COLOR_BLACK}`,
          }}
        ></i>
      )}
      {_.includes(typeAnswer, TypeGameMultipleChoice.IMAGE) && (
        <img
          src={`${URL_IMAGE_QUESTION}${item.path}`}
          className="w-100"
          alt="#"
        />
      )}
      {_.includes(typeAnswer, TypeGameMultipleChoice.TEXT) && (
        <LatextComponent
          data={item.props[0]?.text}
          typeText={typeTextContent}
          fontSize={fontSizeAnswer}
        />
      )}
    </Fragment>
  );
};
export default DroppableValue;


import React from "react";
import _ from "lodash";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../../constants/type";
import { TypeGameMultipleChoice } from "../../selection";
import AudioComponent from "../../../AudioComponent";
import MultipleChoiceCheckbox from "../MultipleChoiceCheckbox.module.scss";
import LatextComponent from "edu_lms/modules/DoingExercise/LatextComponent";

const TitleComponent = ({
  text,
  typeQuestion,
  fontSize,
  typeText,
  srcAudio,
  srcImage,
}) => {
  return (
    <div className="quicksand-bold">
      <div>
        <div className="d-flex justify-content-start align-items-top">
          {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) && (
            <div className="d-flex justify-content-start">
              <AudioComponent src={`${URL_AUDIO}${srcAudio}`} />
            </div>
          )}
          {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
            <div
              className={`ml-3 mt-3 text-left ${MultipleChoiceCheckbox.gameMultiple}`}
            >
              <LatextComponent
                typeText={typeText}
                fontSize={fontSize ?? ""}
                data={String(text) ? String(text) : ""}
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
            srcImage && (
              <img
                src={`${URL_IMAGE_QUESTION}${srcImage}`}
                alt="#"
                className="w-100 mt-2"
              />
            )}
        </div>
      </div>
    </div>
  );
};
export default TitleComponent;

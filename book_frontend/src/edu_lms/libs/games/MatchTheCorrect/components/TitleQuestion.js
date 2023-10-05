import React, { useState, useRef } from "react";
import renderHTML from "react-render-html";
import _ from "lodash";
import classNames from "classnames";
import FullScreen from "edu_lms_v2/components/FullScreen";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";

export default function TitleQuestion({ typeQuestion, title }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const refQuestion = useRef();

  return (
    <>
      {_.includes(typeQuestion, TypeGameMultipleChoice.LATEX) ? (
        <MathpixLoader>
          <MathpixMarkdown
            text={
              String(title?.props[0]?.text) ? String(title?.props[0]?.text) : ""
            }
          />
        </MathpixLoader>
      ) : (
        renderHTML(title?.props[0]?.text)
      )}
      {title?.path && (
        <div
          ref={refQuestion}
          className={classNames("position-relative monkey-bg-white", {
            "mw-100 mh-100": isFullScreen,
          })}
        >
          <img
            src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${title?.path}`}
            alt="#"
            className={classNames("m-auto", {
              "image-question-exercise": !isFullScreen,
              "image-question-exercise-full": isFullScreen,
            })}
          />
          <FullScreen
            ref={refQuestion}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </div>
      )}
    </>
  );
}

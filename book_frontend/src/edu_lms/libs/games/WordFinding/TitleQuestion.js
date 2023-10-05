import { useRef, useState } from "react";
import renderHTML from "react-render-html";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import _ from "lodash";
import classNames from "classnames";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import styles from "./WordFinding.module.scss";
import FullScreen from "edu_lms_v2/components/FullScreen";
import { formattedFontSize } from "../../../components/Game/WordFinding/components";

const TitleQuestionWordFinding = ({ text, urlImage, dataGameConfig }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const refQuestion = useRef();
  const {
    type_question: typeQuestion,
    type_text: typeText,
    font_size: fontSize,
  } = dataGameConfig;

  return (
    <div className={`title pr-3 pl-3 quicksand-bold ${styles.titleQuestion}`}>
      {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) &&
        !_.includes(typeText, TypeGameMultipleChoice.LATEX) &&
        text && (
          <h4
            style={{ fontSize: formattedFontSize(fontSize) }}
            className="mb-3 mt-2"
          >
            {renderHTML(text)}
          </h4>
        )}
      <h4
        fontSize={{ fontSize: formattedFontSize(fontSize) }}
        className="mb-3 mt-2 text-left "
      >
        {_.includes(typeText, TypeGameMultipleChoice.LATEX) && (
          <MathpixLoader>
            <MathpixMarkdown text={text ? String(text) : ""} />
          </MathpixLoader>
        )}
      </h4>
      <div
        ref={refQuestion}
        className="d-flex justify-content-center align-items-center"
      >
        {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) && urlImage && (
          <div
            className={classNames("position-relative mb-3", {
              "mw-100 mh-100": isFullScreen,
            })}
          >
            <img
              className={classNames({
                "image-question-exercise": !isFullScreen,
                "image-question-exercise-full": isFullScreen,
              })}
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_FOLDER_UPLOAD_IMAGE}/${urlImage}`}
              alt="#"
            />
            <FullScreen
              ref={refQuestion}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TitleQuestionWordFinding;

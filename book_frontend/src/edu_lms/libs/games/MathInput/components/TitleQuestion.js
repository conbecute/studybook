import React, { useRef, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import classNames from "classnames";
import { URL_AUDIO, URL_IMAGE_QUESTION } from "../../../../constants/type";
import UseSound from "edu_lms/components/UseSound/index";
import { TypeGameMultipleChoice } from "edu_lms/components/Game/selection";
import FullScreen from "edu_lms_v2/components/FullScreen";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";

const TitleQuestion = ({
  questionTitle,
  fontSizeTitle,
  typeQuestion,
  isReadOnly,
}) => {
  const refQuestion = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <TitleMath>
      <>
        {_.includes(typeQuestion, TypeGameMultipleChoice.AUDIO) &&
          questionTitle?.icon?.props[0]?.audio[0]?.path && (
            <UseSound
              src={`${URL_AUDIO}${questionTitle[0]?.icon[0]?.props[0]?.audio[0]?.path}`}
            />
          )}
      </>

      {_.includes(typeQuestion, TypeGameMultipleChoice.TEXT) && (
        <MathPix className="quicksand-bold">
          <MathpixLoader>
            <MathpixMarkdown
              text={String(questionTitle?.icon[0]?.props[0]?.text) ?? ""}
              isReadOnly={isReadOnly}
            />
          </MathpixLoader>
        </MathPix>
      )}

      {_.includes(typeQuestion, TypeGameMultipleChoice.IMAGE) &&
        questionTitle?.icon[0]?.path && (
          <div
            ref={refQuestion}
            className={classNames("position-relative monkey-bg-white", {
              "mw-100 mh-100": isFullScreen,
            })}
          >
            <img
              src={`${process.env.REACT_APP_MEDIA_URL_APP}${process.env.REACT_APP_IMG_CMS}/${questionTitle?.icon[0]?.path}`}
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
    </TitleMath>
  );
};

export default TitleQuestion;
const TitleMath = styled.div`
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  float: left;
  position: relative;
  margin: 25px 15px 0 30px;
`;

const MathPix = styled.span`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "24px")};
  @media (max-width: 768px) {
    font-size: 18px !important ;
  }
`;

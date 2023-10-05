import { forwardRef, useImperativeHandle, useRef } from "react";
import classNames from "classnames";
import styled from "styled-components";
import IconAudio from "edu_lms/assets/images/speaker-filled-audio-toolc.svg";
import { URL_AUDIO } from "edu_lms/constants/type";
import { OBJECT_CHANGE_STATE } from "../constant";
import TitleQuestion from "../components/TitleQuestion";
import TitleLatex from "../components/TitleLatex";

const Item = styled.div`
  border-radius: 12px;
  min-height: 150px;
  border: 4px solid #d7d7d7;
  &:hover,
  &.selected-answer {
    border: 2px solid #ff7707;
  }
  .match-content {
    background-color: #ffbe88;
    border-radius: 12px;
  }

  &.correct-answer {
    border: 4px solid #23bf2d;
  }

  &.wrong-answer {
    border: 4px solid #ec0000;
  }
  @media (max-height: 768px), (max-width: 576px) {
    min-height: 100px;
    border: 2px solid #d7d7d7;
    &.correct-answer {
      border: 2px solid #23bf2d;
    }
    &.wrong-answer {
      border: 2px solid #ec0000;
    }
  }
`;

const TextAnswers = styled.p`
  color: #2a404f;
  font-size: ${(props) => `${props.fontSize}px`};
`;
const Title = styled.div`
  font-size: ${(props) => props.fontSize || 24}px;
  margin-top: 15px;
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
    margin-top: 5px;
  }
`;

const VerticalWrapper = styled.div`
  padding: 0 48px 48px;
  @media (max-width: 500px) {
    padding: 8px;
  }

  .list-item {
    width: 25%;
    @media (max-width: 500px) {
      width: 35%;
    }
  }

  .width-canvas {
    width: 50%;
    @media (max-width: 500px) {
      width: 30%;
    }
  }
`;

function MatchTextTextVertical(
  {
    id,
    dataMatch,
    title,
    dataQuestion,
    dataAnswers,
    handlePlayAudio,
    handleDataMatch,
    showCorrectAnswer,
    dataConfig,
  },
  ref
) {
  const lastObject = dataMatch[dataMatch.length - 1];
  const refCanvas = useRef();
  const mainRef = useRef();
  useImperativeHandle(ref, () => ({
    domQuestions: mainRef.current.firstChild.childNodes,
    domAnswers: mainRef.current.lastChild.childNodes,
    width: mainRef.current.offsetWidth,
    offsetTop: refCanvas.current.offsetTop,
  }));

  return (
    <VerticalWrapper className="m-auto" style={{ maxWidth: "1000px" }}>
      <Title className="monkey-f-header" fontSize={dataConfig?.font_size_title || dataConfig?.font_size}>
        <TitleQuestion typeQuestion={dataConfig?.type_text} title={title} />
      </Title>
      <div className="d-flex justify-content-between mb-5" ref={mainRef}>
        <div className="d-flex flex-column mt-4 list-item">
          {dataQuestion.map((item, index) => (
            <Item
              key={index}
              className={classNames("cursor p-2 mb-2 ", {
                "correct-answer": item.isCorrect && showCorrectAnswer,
                "wrong-answer": item.isCorrect === false && showCorrectAnswer,
                "selected-answer":
                  lastObject?.questionId === item.icon_id &&
                  Object.values(lastObject).length === OBJECT_CHANGE_STATE,
              })}
              id={item.icon_id}
            >
              <div
                className="h-100 position-relative d-flex match-content h-100"
                onClick={(e) => handleDataMatch(e, "question", item.icon_id)}
              >
                {item.props[0]?.audio[0]?.path && (
                  <img
                    src={IconAudio}
                    alt=""
                    className="cursor p-1 position-absolute"
                    onClick={() =>
                      handlePlayAudio(
                        `${URL_AUDIO}${item.props[0]?.audio[0]?.path}`
                      )
                    }
                  />
                )}
                <TextAnswers
                  className="text-center m-auto"
                  fontSize={dataConfig.font_size_content}
                >
                  <TitleLatex
                    dataConfigType={dataConfig?.type_question}
                    item={item}
                  />
                </TextAnswers>
              </div>
            </Item>
          ))}
        </div>

        <div ref={refCanvas} className="position-relative mt-4 width-canvas">
          <canvas id={`canvas-match-image-vertical-${id}`} />
        </div>

        <div className="d-flex flex-column mt-4 list-item">
          {dataAnswers.map((item, index) => (
            <Item
              key={index}
              className={classNames("cursor p-2 mb-2", {
                "correct-answer": item.isCorrect && showCorrectAnswer,
                "wrong-answer": item.isCorrect === false && showCorrectAnswer,
                "selected-answer":
                  lastObject?.answerId === item.icon_id &&
                  Object.values(lastObject).length === OBJECT_CHANGE_STATE,
              })}
              id={item.icon_id}
            >
              <div
                className="h-100 position-relative d-flex match-content"
                onClick={(e) => handleDataMatch(e, "answer", item.icon_id)}
              >
                {item.props[0]?.audio[0]?.path && (
                  <img
                    src={IconAudio}
                    alt=""
                    className="cursor p-1 position-absolute"
                    onClick={() =>
                      handlePlayAudio(
                        `${URL_AUDIO}${item.props[0]?.audio[0]?.path}`
                      )
                    }
                  />
                )}
                <TextAnswers
                  className="text-center m-auto"
                  fontSize={dataConfig.font_size_content}
                >
                  <TitleLatex
                    dataConfigType={dataConfig?.type_question}
                    item={item}
                  />
                </TextAnswers>
              </div>
            </Item>
          ))}
        </div>
      </div>
    </VerticalWrapper>
  );
}

export default forwardRef(MatchTextTextVertical);

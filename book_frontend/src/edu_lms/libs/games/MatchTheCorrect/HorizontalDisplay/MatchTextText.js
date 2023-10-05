import { forwardRef, useImperativeHandle, useRef } from "react";
import classNames from "classnames";
import styled from "styled-components";
import IconAudio from "edu_lms/assets/images/speaker-filled-audio-toolc.svg";
import { URL_AUDIO } from "edu_lms/constants/type";
import { HEIGHT_CANVAS, OBJECT_CHANGE_STATE } from "../constant";
import TitleQuestion from "../components/TitleQuestion";
import TitleLatex from "../components/TitleLatex";

const Item = styled.div`
  border-radius: 12px;
  width: 20%;
  border: 2px solid transparent;
  &:hover,
  &.selected-answer {
    border: 2px solid #ff7707;
  }
  .match-content {
    background-color: #ffbe88;
    border-radius: 12px;
  }

  &.correct-answer {
    border: 2px solid #23bf2d;
  }

  &.wrong-answer {
    border: 2px solid #ec0000;
  }
`;

const TextAnswers = styled.p`
  padding: 0 20px 0 30px;
  font-size: ${(props) => `${props.fontSize}px`};
`;

const WrapperCanvas = styled.div`
  left: 0;
  transform: translateY(-100%);
`;
const Title = styled.div`
  font-size: ${(props) => props.fontSize || 24}px;
  margin-top: 15px;
  @media (max-height: 768px), (max-width: 576px) {
    font-size: 18px;
    margin-top: 5px;
  }
`;

function MatchTextText(
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
  const mainRef = useRef();
  useImperativeHandle(ref, () => ({
    domQuestions: mainRef.current.firstChild.childNodes,
    domAnswers: mainRef.current.lastChild.childNodes,
  }));
  return (
    <div className="pr-5 pl-5 mb-5 pb-5 m-auto" style={{ maxWidth: "1400px" }}>
      <Title className="h3 monkey-f-header" fontSize={dataConfig?.font_size_title || dataConfig?.font_size}>
        <TitleQuestion typeQuestion={dataConfig?.type_text} title={title} />
      </Title>
      <div ref={mainRef}>
        <div
          className="d-flex justify-content-around mt-4"
          style={{
            marginBottom: `${HEIGHT_CANVAS}px`,
          }}
        >
          {dataQuestion.map((item, index) => (
            <Item
              key={index}
              className={classNames("cursor monkey-box-shadow p-3", {
                "correct-answer": item.isCorrect && showCorrectAnswer,
                "wrong-answer": item.isCorrect === false && showCorrectAnswer,
                "selected-answer":
                  lastObject?.questionId === item.icon_id &&
                  Object.values(lastObject).length === OBJECT_CHANGE_STATE,
              })}
              id={item.icon_id}
            >
              <div
                className="h-100 position-relative d-flex match-content"
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
        <WrapperCanvas className="position-absolute">
          <canvas id={`canvas-match-image-${id}`} />
        </WrapperCanvas>

        <div className="d-flex justify-content-around">
          {dataAnswers.map((item, index) => (
            <Item
              key={index}
              className={classNames("cursor monkey-box-shadow p-3", {
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
    </div>
  );
}

export default forwardRef(MatchTextText);

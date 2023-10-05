import styled from "styled-components";
import CheckAnswer from "./CheckAnswer";
import Timer from "./Timer";
import ProcessBar from "./ProcessBar";
import { forwardRef } from "react";
import classNames from "classnames";
import { INNER_WIDTH, PLAY_MODE } from "edu_lms/constants/type";

function OverviewQuestionSet(
  {
    questions,
    onChangeQuestion,
    activeQuestionIndex,
    hasAnsweredChecking,
    onTimeUp,
    limitedTime,
    isComplete,
    percentDoing,
    percentage,
    playMode
  },
  ref
) {
  return (
    <OverviewWrapper
      className={classNames("", {
        "scrollbar-question": window.innerWidth >= INNER_WIDTH.TABLET,
      })}
    >
      <div className="d-flex d-md-block justify-content-center mx-5 mx-md-1 mt-lg-4">
        {!isComplete && playMode !== PLAY_MODE.PRACTICE_V2 && (
          <Timer
            isCountDown={!hasAnsweredChecking}
            limitedTime={limitedTime}
            onTimeUp={onTimeUp}
          />
        )}
        <ProcessBar
          strokeWidth={10}
          percentage={percentage}
          percentDoing={percentDoing}
          hasAnsweredChecking={hasAnsweredChecking}
          isPlayModeExamV2={playMode === PLAY_MODE.PRACTICE_V2}
        />
      </div>
      <CheckAnswer
        questions={questions}
        onChangeQuestion={onChangeQuestion}
        activeQuestionIndex={activeQuestionIndex}
        hasAnsweredChecking={hasAnsweredChecking}
        ref={ref}
        isComplete={isComplete}
        playMode={playMode}
      />
    </OverviewWrapper>
  );
}

const OverviewWrapper = styled.div`
  @media (min-width: 768px) {
    width: 25%;
    padding-bottom: 70px;
  }
`;

export default forwardRef(OverviewQuestionSet);

import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import * as Games from "edu_lms_v2/libraries/hoc10Game/games";
import { TYPE_GAME } from "edu_lms_v2/libraries/hoc10Game/constants";
import THEMES from "edu_lms_v2/libraries/hoc10Game/constants/themes";
import { formatActivityDataMTC_003 } from "edu_lms_v2/libraries/hoc10Game/helpers/MTC_003";
import { formatActivityDataMTC_BG } from "edu_lms_v2/libraries/hoc10Game/helpers/MTC_BG";
import { formatActivityDataMAT_BG } from "edu_lms_v2/libraries/hoc10Game/helpers/MAT_BG";
import { formatActivityDataMAT_001 } from "edu_lms_v2/libraries/hoc10Game/helpers/MAT_001";
import { formatActivityDataMathInput } from "edu_lms_v2/libraries/hoc10Game/helpers/MathInput";
import { formatActivityDataGraph001 } from "edu_lms_v2/libraries/hoc10Game/helpers/Graph001";
import { formatActivityDataGraph002 } from "edu_lms_v2/libraries/hoc10Game/helpers/Graph002";
import { formatActivityDataSROI_001 } from "edu_lms_v2/libraries/hoc10Game/helpers/SROI_001";
import { formatActivityDataFIBMath } from "edu_lms_v2/libraries/hoc10Game/helpers/FIBMath";
import { formatActivityDataFIB_001 } from "edu_lms_v2/libraries/hoc10Game/helpers/FIB_001";
import { formatActivityDataFIB_003 } from "edu_lms_v2/libraries/hoc10Game/helpers/FIB_003";
import { formatActivityDataFIB_BG } from "edu_lms_v2/libraries/hoc10Game/helpers/FIB_BG";
import { formatActivityDataWordFinding } from "edu_lms_v2/libraries/hoc10Game/helpers/WordFinding";
import { formatActivityDataSQC_001 } from "edu_lms_v2/libraries/hoc10Game/helpers/SQC_001";
import { formatActivityDataDAD } from "edu_lms_v2/libraries/hoc10Game/helpers/DAD";

import QuestionResult from "./QuestionResult";
import PopupSuggestions from "./PopupSuggestions";
import { onResultUserInfo } from "../selection";
import { sendErrorToTelegram } from "./selection";

function DoingExerciseWrapper(
  {
    data,
    hasAnsweredChecking = false,
    onComplete,
    onPlaying = () => {},
    showCorrectAnswer = false,
    isComplete,
    toggle,
    showPopupSuggestions,
    isReadOnly,
    token,
  },
  ref
) {
  const [isUserHoc10, setIsUserHoc10] = useState(false);

  useEffect(() => {
    if (token) {
      const userInfo = onResultUserInfo();
      setIsUserHoc10(userInfo.is_user_hoc10);
    }
  }, [token]);

  useEffect(() => {
    if (data && !data?.is_locked && !isUserHoc10 && data?.activity_id) {
      const content = `Lỗi hiển thị bộ đề Đang cập nhật... activity ID ${data?.activity_id} activity name${data?.activity_name} `;
      sendErrorToTelegram(content, data?.activity_id);
    }
  }, [data]);

  if (!data?.is_locked && !isUserHoc10) {
    return (
      <QuestionContent
        className={`pb-5 ${!isComplete ? "scrollbar-question" : ""}`}
      >
        <div className="h3 text-center mt-5">Đang cập nhật</div>
      </QuestionContent>
    );
  }

  const iconList = !_.isEmpty(data?.icon_list) && data?.icon_list[0].icons;
  const suggestions = data?.game_config?.suggestions;
  const guides = data?.game_config?.guide;
  const typeText = data?.game_config?.type_text_suggest;

  const gameId = data?.data?.game_id || data?.game_id;

  const renderGameOnQuestionSet = (gameId) => {
    switch (gameId) {
      case TYPE_GAME.MTC_003:
        const formattedActivityMTC_003 = formatActivityDataMTC_003(data);
        return (
          <Games.MTC_003
            ref={ref}
            gameData={formattedActivityMTC_003[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswerProp={data.selectedAnswer}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
            theme={THEMES.MultipleChoice.Outline}
          />
        );
      case TYPE_GAME.CKB_001:
        const formattedActivityCKB_001 = formatActivityDataMTC_003(data);
        return (
          <Games.CKB_001
            ref={ref}
            gameData={formattedActivityCKB_001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswersProp={data.selectedAnswers}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
            theme={THEMES.MultipleChoice.Outline}
          />
        );
      case TYPE_GAME.MTC_BG:
        const formattedActivityMTC_BG = formatActivityDataMTC_BG(data);
        return (
          <Games.MTC_BG
            ref={ref}
            gameData={formattedActivityMTC_BG[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswersProp={data.selectedAnswers}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.MAT_BG:
        const formattedActivityMAT_BG = formatActivityDataMAT_BG(data);
        return (
          <Games.MAT_BG
            ref={ref}
            gameData={formattedActivityMAT_BG[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswersProp={data.selectedAnswers}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.MAT_001:
        const formattedActivityMAT_001 = formatActivityDataMAT_001(data);
        return (
          <Games.MAT_001
            ref={ref}
            gameData={formattedActivityMAT_001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswersProp={data.selectedAnswers}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.MathInput:
        const formattedActivityMathInput = formatActivityDataMathInput(data);
        return (
          <Games.MathInput
            ref={ref}
            gameData={formattedActivityMathInput[0]}
            hideResultAnswer={!hasAnsweredChecking}
            inputtedAreasProp={data.inputtedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.Graph_001:
        const formattedActivityGraph001 = formatActivityDataGraph001(data);
        return (
          <Games.Graph001
            ref={ref}
            gameData={formattedActivityGraph001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswerProp={data.selectedAnswer}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.Graph_002:
        const formattedActivityGraph002 = formatActivityDataGraph002(data);
        return (
          <Games.Graph002
            ref={ref}
            gameData={formattedActivityGraph002[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswerProp={data.selectedAnswer}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.SROI_001:
        const formattedActivitySROI001 = formatActivityDataSROI_001(data);
        return (
          <Games.SROI_001
            ref={ref}
            gameData={formattedActivitySROI001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAnswerProp={data.selectedAnswer}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.FIB_Math:
        const formattedActivityFIBMath = formatActivityDataFIBMath(data);
        return (
          <Games.FIBMath
            ref={ref}
            gameData={formattedActivityFIBMath[0]}
            hideResultAnswer={!hasAnsweredChecking}
            inputtedAreasProp={data.inputtedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.FIB_001:
        const formattedActivityFIB_001 = formatActivityDataFIB_001(data);
        return (
          <Games.FIB_001
            ref={ref}
            gameData={formattedActivityFIB_001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            inputtedAreasProp={data.inputtedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
            theme={THEMES.FIB.Primary}
          />
        );
      case TYPE_GAME.FIB_003:
        const formattedActivityFIB_003 = formatActivityDataFIB_003(data);
        return (
          <Games.FIB_003
            ref={ref}
            gameData={formattedActivityFIB_003[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedAreasProp={data.selectedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
            theme={THEMES.FIB.Primary}
          />
        );
      case TYPE_GAME.FIB_BG:
        const formattedActivityFIB_BG = formatActivityDataFIB_BG(data);
        return (
          <Games.FIB_BG
            ref={ref}
            gameData={formattedActivityFIB_BG[0]}
            hideResultAnswer={!hasAnsweredChecking}
            inputtedAreasProp={data.inputtedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.WordFinding:
        const formattedActivityWordFinding = formatActivityDataWordFinding(data);
        return (
          <Games.WordFinding
            ref={ref}
            gameData={formattedActivityWordFinding[0]}
            hideResultAnswer={!hasAnsweredChecking}
            selectedTextsProp={data.selectedTexts}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      case TYPE_GAME.SQC_001:
        const formattedActivitySQC_001 = formatActivityDataSQC_001(data);
        return (
          <Games.SQC_001
            ref={ref}
            gameData={formattedActivitySQC_001[0]}
            hideResultAnswer={!hasAnsweredChecking}
            sequencedAnswersProp={data.sequencedAnswers}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
            theme={THEMES.Sequence.Primary}
          />
        );
      case TYPE_GAME.DAD_Text:
      case TYPE_GAME.DAD_Image:
        const formattedActivityDAD = formatActivityDataDAD(data);
        return (
          <Games.DAD
            ref={ref}
            gameData={formattedActivityDAD[0]}
            hideResultAnswer={!hasAnsweredChecking}
            droppedAreasProp={data.droppedAreas}
            showCorrectAnswer={showCorrectAnswer}
            onPlaying={onPlaying}
            onComplete={onComplete}
            isReadOnly={isReadOnly}
          />
        );
      default:
        return null;
    }
  };

  return (
    <QuestionContent
      className={`pb-5 ${!isComplete ? "scrollbar-question" : ""}`}
    >
      <PopupSuggestions
        suggestions={suggestions}
        guides={guides}
        iconList={iconList}
        show={showPopupSuggestions}
        toggle={toggle}
        typeText={typeText}
      />

      {hasAnsweredChecking && !isComplete && (
        <QuestionResult result={data?.isCorrect} />
      )}

      {renderGameOnQuestionSet(gameId)}

    </QuestionContent>
  );
}

export default forwardRef(DoingExerciseWrapper);

const QuestionContent = styled.div`
  @media (min-width: 768px) {
    width: 100%;
  }
`;

import _ from "lodash";
import { TypeGame } from "edu_lms/components/configGame";
import { DRAFT, PLAY_MODE } from "edu_lms/constants/type";
import { postNotiErrorExam } from "../../services/question";
import { useSelector } from "react-redux";

const PUBLIC_QUESTION = 1;

export const LEVEL_EXERCISE = {
  level_1: 1,
  level_2: 2,
  level_3: 3,
  level_4: 4,
};

export function onFormatDataGameConfig(data, onError) {
  let listQuestion = [];
  data?.forEach((question, index) => {
    try {
      if (
        question?.data?.game_id === TypeGame.MULTIPLE_CHOICE ||
        question?.data?.game_id === TypeGame.MULTIPLE_CHOICE_CHECKBOX
      ) {
        const dataAnswer = question?.data?.game_config?.data[0]?.answers?.map(
          (answer) => {
            let dataIcon = question?.data?.icon_list[0]?.icons?.filter(
              (icon) => icon.icon_id == answer.answer_id
            );
            return { ...answer, icon: dataIcon };
          }
        );

        if (question?.data?.icon_list) {
          const dataQuestion = question?.data?.icon_list[0]?.icons?.filter(
            (icon) =>
              icon.icon_id == question?.data?.game_config?.data[0]?.question
          );
          listQuestion.push({
            ...question,
            ...question.data,
            answers: dataAnswer,
            question: dataQuestion[0],
            game_id: question?.data?.game_id,
          });
        } else {
          throw new Error("errorMTCandCKB");
        }
      } else if (
        [
          TypeGame.MATCH,
          TypeGame.DRAG_DROP_IMAGE,
          TypeGame.DRAG_DROP_TEXT,
          TypeGame.FILL_THE_BLANK,
          TypeGame.FILL_THE_BLANK_DYNAMICALLY,
          TypeGame.FILL_THE_BLANK_WITH_DROPDOWN,
          TypeGame.MATH_INPUT,
          TypeGame.FILL_THE_BLANK_MATH,
          TypeGame.WORD_FINDING,
          TypeGame.SEQUENCE,
          TypeGame.MATCHING_BACKGROUND,
          TypeGame.DRAG_DROP_GRAPH,
          TypeGame.REGION_OF_THE_INEQUALITY,
          TypeGame.FILL_THE_BLANK_GRAPH,
          TypeGame.MULTIPLE_CHOICE_BACKGROUND,
          TypeGame.DRAG_DROP_BACK_GROUND_TV,
        ].includes(question?.data?.game_id)
      ) {
        listQuestion.push({
          ...question.data,
          id: question.id,
          activity_id: question.activity_id,
          game_id: question?.data?.game_id,
          score: question.score,
          is_locked: question.is_locked,
          activity_name: question.activity_name,
        });
      } else {
        listQuestion.push(question);
        throw new Error("ErrorGameId");
      }
    } catch (e) {
      if (typeof onError === "function") {
        onError({
          index: index + 1,
          questionId: question.id,
          activityId: question.activity_id,
          activityName: question.activity_name,
        });
      }
    }
  });
  return listQuestion;
}

export const getQuestionSetTitle = ({
  playMode,
  status,
  title,
  public_title,
}) => {
  let questionSetTitle = "";
  if (playMode === PLAY_MODE.PRACTICE) {
    questionSetTitle = status === PUBLIC_QUESTION ? title : `${DRAFT} ${title}`;
  }
  if (playMode === PLAY_MODE.EXAM) {
    questionSetTitle = public_title ?? `${DRAFT} ${title}`;
  }
  return questionSetTitle;
};

export const getQuestionsShuffle = (questions, idParam) => {
  let questionsShuffle = [];
  const historyGame = JSON.parse(localStorage.getItem("history"));
  if (historyGame && historyGame.id_questions_set === idParam) {
    questionsShuffle = historyGame.data;
  } else {
    localStorage.removeItem("history");
    localStorage.removeItem("timer");
    questionsShuffle = _.shuffle(questions);
  }
  return questionsShuffle;
};

export function sendErrorToTelegram(content, activity_id) {
  const link = document.URL;
  const error = {
    content,
    link,
    activity_id,
  };
  if (process.env.NODE_ENV === "production") {
    postNotiErrorExam(error);
  }
}

export const getLevelExercise = (matrixBookContent) => {
  let numberOfQuestionsLevel = {
    level_1: 1
  };

  if (!_.isEmpty(matrixBookContent)) {
    numberOfQuestionsLevel = matrixBookContent;
  }

  for (let _level in numberOfQuestionsLevel) {
    if (numberOfQuestionsLevel[_level] > 0) {
      return LEVEL_EXERCISE[_level];
    }
  }

  return LEVEL_EXERCISE.level_1;
};

export const skipActivityExercise = (questions) => {
  const activitys = questions.map((question) => question.activity_id);

  return activitys.toString();
};

export const handleTrackingErrorActivities =
  (formatActivityData) => (gameId) => {
    try {
      throw Error("sdffdf");
      return formatActivityData;
    } catch (error) {
      return { error };
    }
  };

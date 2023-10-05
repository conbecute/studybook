import _ from "lodash";
import {
  ROUTE_PATH_EXERCISE,
  ROUTE_PATH_PRACTIVE,
  ROUTE_PATH_V3_STUDENT_MOCK_TEST,
} from "edu_lms/constants/path";
import { PLAY_MODE } from "edu_lms/constants/type";

export const QUESTION_DISTANCE = 60;
export const TOTAL_QUESTIONS_CORRECT = 10;
export const DEFAULT_VALUE_LEVEL = 1;

export const PATHNAME_PLAY_MODE = {
  [ROUTE_PATH_EXERCISE]: PLAY_MODE.PRACTICE,
  [ROUTE_PATH_V3_STUDENT_MOCK_TEST]: PLAY_MODE.EXAM,
  [ROUTE_PATH_PRACTIVE]: PLAY_MODE.PRACTICE_V2,
};

export const onGetPlayMode = (pathname) => {
  for (const mode in PATHNAME_PLAY_MODE) {
    if (_.includes(pathname, mode)) {
      return PATHNAME_PLAY_MODE[mode];
    }
  }

  return false;
};

export const getRandomQuestionWrong = (questions = []) => {
  const indexRandom = Math.random() * questions.length;
  
  return questions[Math.floor(indexRandom)];
};

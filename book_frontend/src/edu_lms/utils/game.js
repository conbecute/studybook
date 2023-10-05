import { ANSWER_STATUS } from '../constants/type';

const COLOR = {
  Default: "#000000",
  Correct: "#92c83e",
  Wrong: "#ee202e",
};

const getColorInputAnswer = (status) => {
  if (status === ANSWER_STATUS.CORRECT) return COLOR.Correct;
  if (status === ANSWER_STATUS.WRONG) return COLOR.Wrong;
  return COLOR.Default;
};

export { getColorInputAnswer };

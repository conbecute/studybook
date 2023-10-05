import _ from "lodash";
import {
  TYPE_COMPARISON_MATH,
  TYPE_CALCULATION,
  ASC_DESC,
  DESC_ASC,
  AUDIO_SUCCESS,
  AUDIO_ERROR,
  COLOR_GREEN,
  COLOR_WHITE,
  AUDIO_VICTORY,
  TYPE_VIETNAMESE,
} from "../../constants/type";

export const onOrderBy = (data, calculation) => {
  switch (calculation) {
    case TYPE_CALCULATION.ADDITION:
    case TYPE_COMPARISON_MATH.LESS_THAN:
    case ASC_DESC:
      return _.orderBy(data, [], ["asc", "desc"]);
    case TYPE_CALCULATION.SUBTRACTION:
    case TYPE_COMPARISON_MATH.GREATER_THAN:
    case DESC_ASC:
      return _.orderBy(data, [], ["desc", "asc"]);
    default:
      return _.orderBy(data, [], ["asc", "desc"]);
  }
};
export const onRangeArray = (numberStart, numberEnd, numberRange = 1) => {
  return _.range([numberStart], [numberEnd], [numberRange]);
};

export const onRandomNumberGenerator = (
  min = 0,
  max = 1,
  fractionDigits = 0,
  inclusive = true
) => {
  const precision = Math.pow(10, Math.max(fractionDigits, 0));
  const scaledMax = max * precision;
  const scaledMin = min * precision;
  const offset = inclusive ? 1 : 0;
  const num =
    Math.floor(Math.random() * (scaledMax - scaledMin + offset)) + scaledMin;

  return num / precision;
};

export const onResultRandomNumber = (numberStart, numberEnd) => {
  return (
    Math.floor(Math.random() * (numberEnd - numberStart + 1)) + numberStart
  );
};

export const resultNumber = (
  correctAnswer,
  resultNumberOne,
  calculation,
  type
) => {
  switch (calculation) {
    case TYPE_CALCULATION.ADDITION:
      return type === 1
        ? correctAnswer - resultNumberOne
        : parseFloat(correctAnswer - resultNumberOne).toFixed(1);
      break;
    case TYPE_CALCULATION.SUBTRACTION:
      return type === 1
        ? correctAnswer + resultNumberOne
        : parseFloat(correctAnswer + resultNumberOne).toFixed(1);
      break;
    default:
      return false;
  }
};

export const LABEL_ANSWER = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "M",
  12: "N",
  13: "O",
  14: "P",
  15: "Q",
  16: "R",
  17: "S",
  18: "T",
};

export const LABEL_ANSWER_VIETNAMESE = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "G",
  6: "H",
  7: "I",
  8: "K",
  9: "L",
  10: "M",
  11: "N",
  12: "O",
};
export const LABEL_ANSWER_NUMBER = {
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
  7: "8",
  8: "9",
  9: "10",
  10: "11",
  11: "12",
  12: "13",
  13: "14",
  14: "15",
  15: "16",
  16: "17",
  17: "18",
  18: "19",
};

export const TypeGameMultipleChoice = {
  IMAGE: "image",
  AUDIO: "audio",
  TEXT: "text",
  VIDEO: "video",
  LATEX: "latex",
  IMG_IMG: 1,
  IMG_TEXT_TEXT: 2,
  IMG_TEXT_IMAGE_TEXT: 3,
  TEXT_TEXT: 4,
  IMAGE_TEXT: 5,
};

export const onChangeIsAnswerDataQuestion = (dataQuestion, data, number) => {
  return dataQuestion.map((item) => {
    if (item.game.question === data.question) {
      item.game.isAnswer = number;
    }
    return { ...item };
  });
};

export const AlertSuccessDefault = {
  color: "info",
  visible: true,
  text: "Bạn trả lời đúng",
  icon: "fa-smile-o",
  srcAudio: AUDIO_SUCCESS,
};
export const AlertSuccess = {
  color: "info",
  visible: true,
  text: "Bạn trả lời đúng",
  icon: "fa-smile-o",
  srcAudio: AUDIO_VICTORY,
};

export const styleAlertGame =
  "position: absolute; right: 0px; bottom: 50px; top: inherit; z-index: 999; padding: 0";

export const AlertError = {
  color: "danger",
  visible: true,
  text: "Bạn trả lời sai",
  icon: "fa-frown-o",
  srcAudio: AUDIO_ERROR,
};

export const AlertErrorValidate = {
  color: "warning",
  visible: true,
  text: "Bạn cần hoàn thành đầy đủ bài tập trước khi kiểm tra",
  icon: "",
  srcAudio: AUDIO_ERROR,
};

export const AlertSuccessEnglish = {
  color: "info",
  visible: true,
  text: "Correct!",
  icon: "fa-smile-o",
  srcAudio: AUDIO_SUCCESS,
};
export const AlertErrorEnglish = {
  color: "danger",
  visible: true,
  text: "Try again!",
  icon: "fa-frown-o",
  srcAudio: AUDIO_ERROR,
};

export const AlertDefault = {
  color: "",
  visible: false,
  text: "",
  icon: "",
  srcAudio: "",
};

export const styleWrapper = {
  height: "92%",
  overflowY: "scroll",
  overflowX: "hidden",
};
export const styleFooterWrapper = {
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  zIndex: "23",
};
export const styleDisplayFlex = (
  display = "flex",
  justifyContent = "center",
  alignItems = "center"
) => {
  return {
    display: display,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
};
export const styleCssGrid = (number = 3, gridGap = "0rem") => {
  return {
    gridTemplateColumns: `repeat(${number}, 1fr)`,
    display: "grid",
    gridGap: `${gridGap}`,
  };
};
export const styleHover = (backgroundColor, color, borderColor) => {
  return {
    backgroundColor: backgroundColor || `${COLOR_GREEN}`,
    color: color || `${COLOR_WHITE}`,
    border: borderColor || `1px solid ${COLOR_GREEN}`,
  };
};

export function onResultIcon(id, iconList) {
  let result = {};
  if (iconList) {
    result = iconList.filter((item) => item?.icon_id == id)[0];
  }
  return result;
}

export function onResultAnswerIcon(
  data,
  dataIcons,
  type = 2,
  id = "answer_id"
) {
  const result = data.map((item) => {
    const resultFilterIcon = dataIcons.filter(
      (icon) => icon.icon_id == item[`${id}`]
    )[0];
    return { ...item, ...resultFilterIcon, status: type === 1 ? 0 : false };
  });
  return result;
}

export function onResultConfigData(data, dataIcons, type = 2) {
  const result = data.map((item) => {
    const resultFilterIcon = dataIcons.filter(
      (icon) => icon.icon_id == item.icon_id
    )[0];
    return { ...item, ...resultFilterIcon, status: type === 1 ? 0 : false };
  });
  return result;
}
export function numberColumns(result) {
  switch (result) {
    case 1:
      return 2;
    case 4:
    case 5:
      return 3;
    default:
      return Math.round(result);
  }
}

export const showCharacterInBook = (typeIndex, index, languageBook) => {
  switch (typeIndex) {
    case "number":
      return LABEL_ANSWER_NUMBER[index];
    case "alphabet":
      if (languageBook === TYPE_VIETNAMESE) {
        return LABEL_ANSWER_VIETNAMESE[index];
      }
      return LABEL_ANSWER[index];
    default:
      return LABEL_ANSWER[index];
  }
};

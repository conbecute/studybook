import _ from "lodash";
import { onResultIcon, onResultAnswerIcon } from "../selection";

export function onChangeColor(status) {
  let result = "monkey-color-black monkey-bc-transparent";
  switch (Number(status)) {
    case 1:
      return (result = "monkey-color-blue monkey-bc-blue");
    case 2:
      return (result = "monkey-bg-green monkey-bc-green monkey-color-white");
    case 3:
      return (result = "monkey-bg-red monkey-bc-red monkey-color-white");
    case 4:
      return (result = "monkey-color-black monkey-bc-green");
    default:
      return result;
  }
}

export const TypeQuestion = {
  IMAGE: "image",
  AUDIO: "audio",
  TEXT: "text",
  VIDEO: "video",
  IMG_IMG: 1,
  IMG_TEXT_TEXT: 2,
  IMG_TEXT_IMAGE_TEXT: 3,
  TEXT_TEXT: 4,
  IMAGE_TEXT: 5,
};

export function onConfigData(data) {
  const dataConfig = data.game_config.data.map((dataAnswer) => {
    const answersAddIcon = onResultAnswerIcon(
      dataAnswer?.answers,
      data?.icon_list[0]?.icons,
      1
    );
    const dataConvert = answersAddIcon.map((item) => {
      const result = _.split(item.answer_text, "#");
      const answerText = result.map((item, index) => ({
        value: item,
        id: `${item}_${index}`,
        status: 0,
      }));
      const answerResult = item?.answer_result
        ? _.split(item.answer_result, "#")
        : [];
      return {
        ...item,
        answer_text: answerText,
        answer_result: answerResult,
        input: {
          show: false,
          text: "",
          status: 0,
        },
      };
    });
    const question = onResultIcon(
      dataAnswer?.question,
      data?.icon_list[0]?.icons
    );

    return { ...dataAnswer, answers: dataConvert, question: question };
  });
  return dataConfig;
}

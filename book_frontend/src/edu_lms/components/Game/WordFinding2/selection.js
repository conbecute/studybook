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

export function onConfigData(data) {
  const dataConfig = data.game_config.data.map((dataAnswer) => {
    const answersAddIcon = onResultAnswerIcon(
      dataAnswer?.answers,
      data?.icon_list[0]?.icons,
      1
    );
    const dataConvert = answersAddIcon.map((item) => {
      const answerResult = item?.answer_result
        ? _.split(item.answer_result, "#")
        : [];
      return {
        ...item,
        answer_text: item.answer_text,
        answer_result: answerResult,
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

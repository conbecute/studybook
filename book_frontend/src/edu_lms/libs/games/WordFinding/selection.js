import {
  onResultAnswerIcon,
  onResultIcon,
} from "edu_lms/components/Game/selection";
import _ from "lodash";

export function onChangeColor(status, showCorrectAnswer) {
  let result = "monkey-color-black monkey-bc-transparent";
  const colorResult = "monkey-color-yellow monkey-bc-yellow";
  switch (Number(status)) {
    case 1:
      return (result = colorResult);
    case 2:
      if (showCorrectAnswer) {
        return (result = "bg-wfd-green bc-green-wfd monkey-color-white");
      } else {
        return (result = colorResult);
      }
    case 3:
      if (showCorrectAnswer) {
        return (result = "monkey-bg-red monkey-bc-red monkey-color-white");
      } else {
        return (result = colorResult);
      }
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
      const result = _.split(item.answer_text, " ");
      const answerText = result.map((item, index) => ({
        value: item,
        id: `${item}_${index}`,
        status: 0,
      }));
      const answerCovert = getAnswerFirstResult(item.answer_result);
      const answerResult = answerCovert ? _.split(answerCovert, "#") : [];
      return { ...item, answer_text: answerText, answer_result: answerResult };
    });
    const question = onResultIcon(
      dataAnswer?.question,
      data?.icon_list[0]?.icons
    );

    return { ...dataAnswer, answers: dataConvert, question: question };
  });
  return dataConfig;
}

const getAnswerFirstResult = (answerResult) => {
  let answerFirstResult = answerResult;
  if (_.includes(answerResult, "&&")) {
    answerFirstResult = answerResult.split("&&")[0];
  }
  return answerFirstResult;
};

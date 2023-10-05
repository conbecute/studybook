import _ from "lodash";
import { onResultIcon, onResultAnswerIcon } from "../selection";
import {
  ANSWER_STATUS,
  FORMAT_GAME_WORD_FINDING,
} from "edu_lms/constants/type";

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
      const result = _.split(item.answer_text, " ");
      const answerText = result.map((item, index) => ({
        value: item,
        id: `${item}_${index}`,
        status: 0,
      }));
      let answerResult = [];
      if (item.answer_result) {
        let results = [item.answer_result];
        results = item.answer_result?.split("&&");
        answerResult = results.map((item, index) => {
          return _.split(item, "#");
        });
      }

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

export function formatResult(dataAnswer) {
  const dataFormatAnswers = dataAnswer.answers.map((item) => {
    const answerText = item.answer_text.filter((answerText) => {
      return answerText.status === ANSWER_STATUS.CORRECT;
    });
    const valueAnswer = answerText.map((answers) =>
      answers.value.replace(FORMAT_GAME_WORD_FINDING, "")
    );
    let answerResult = item.answer_result[0];
    if (item?.answer_result?.length > 1) {
      answerResult = item.answer_result.flat(1);
      item.answer_result.forEach((results) => {
        const answers = _.xor(results, valueAnswer);
        if (answers.length === 0) {
          answerResult = results;
        }
      });
    }
    return { ...item, answer_result: answerResult };
  });
  return [{ ...dataAnswer, answers: dataFormatAnswers }];
}
